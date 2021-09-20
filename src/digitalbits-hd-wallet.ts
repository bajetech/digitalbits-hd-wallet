import has from "lodash.has";
import * as bip39 from "bip39";
import { derivePath } from "./hd-key";
import { Keypair } from "xdb-digitalbits-base";

const ENTROPY_BITS = 256; // = 24 word mnemonic

const INVALID_SEED = "Invalid seed (must be a Buffer or hex string)";
const INVALID_MNEMONIC = "Invalid mnemonic (see bip39)";

/**
 * Configurable options defining how to generate the mnemonic
 */
export interface GenerateMnemonicOptions {
  /**
   * Entropy bits
   *
   * @default 256
   */
  entropyBits?: number;

  /**
   * Name of a language wordlist as defined in the 'bip39' npm module.
   * See {@link https://github.com/bitcoinjs/bip39/tree/master/src/wordlists}
   *
   * @default 'english'
   */
  language?: string;

  /**
   * RNG function (default is crypto.randomBytes)
   */
  rngFn?: (size: number) => Buffer;
}

/**
 * Class for SEP-0005 key derivation.
 *
 * This code is copied and adapted from:
 *   https://github.com/chatch/stellar-hd-wallet/blob/b529d5ad19e9cc31029fd9fbae724856adf4b953/src/stellar-hd-wallet.js
 *
 * to use with the DigitalBits blockchain network and ecosystem.
 *
 * @see {@link https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0005.md|SEP-0005}
 */
class DigitalBitsHDWallet {
  private seedHex: string;

  /**
   * Instance from a BIP39 mnemonic string.
   * @param mnemonic - A BIP39 mnemonic
   * @param password - Optional mnemonic password.
   *                   Defaults to undefined
   * @param language - Optional language of mnemonic.
   *                   Defaults to 'english'
   * @throws {Error} Invalid Mnemonic
   */
  static fromMnemonic(mnemonic: string, password: string | undefined = undefined, language: string = "english") {
    if (!DigitalBitsHDWallet.validateMnemonic(mnemonic, language)) {
      throw new Error(INVALID_MNEMONIC);
    }
    return new DigitalBitsHDWallet(bip39.mnemonicToSeedSync(mnemonic, password).toString("hex"));
  }

  /**
   * Instance from a seed
   * @param seed - binary seed
   * @throws {TypeError} Invalid seed
   */
  static fromSeed(seed: string | Buffer) {
    let seedHex;

    if (Buffer.isBuffer(seed)) seedHex = seed.toString("hex");
    else if (typeof seed === "string") seedHex = seed;
    else throw new TypeError(INVALID_SEED);

    return new DigitalBitsHDWallet(seedHex);
  }

  /**
   * Generate a mnemonic using BIP39
   * @param options - Options defining how to generate the mnemonic
   * @throws {TypeError} Language not supported by bip39 module
   * @throws {TypeError} Invalid entropy
   */
  static generateMnemonic({
    entropyBits = ENTROPY_BITS,
    language = "english",
    rngFn = undefined,
  }: GenerateMnemonicOptions = {}) {
    if (language && !has(bip39.wordlists, language))
      throw new TypeError(`Language ${language} does not have a wordlist in the bip39 module`);
    const wordlist = bip39.wordlists[language];
    return bip39.generateMnemonic(entropyBits, rngFn, wordlist);
  }

  /**
   * Validate a mnemonic using BIP39
   * @param mnemonic - A BIP39 mnemonic
   * @param language - name of a language wordlist as
   *          defined in the 'bip39' npm module. See module.exports.wordlists:
   *          here https://github.com/bitcoinjs/bip39/blob/master/index.js
   *
   *          Defaults to 'english'
   * @throws {TypeError} Language not supported by bip39 module
   */
  static validateMnemonic(mnemonic: string, language: string = "english") {
    if (language && !has(bip39.wordlists, language))
      throw new TypeError(`Language ${language} does not have a wordlist in the bip39 module`);
    const wordlist = bip39.wordlists[language];
    return bip39.validateMnemonic(mnemonic, wordlist);
  }

  /**
   * New instance from seed hex string
   * @param seedHex - Hex string
   */
  constructor(seedHex: string) {
    this.seedHex = seedHex;
  }

  /**
   * Derive key given a full BIP44 path
   *
   * @param path - BIP44 path string (eg. m/44'/148'/8')
   * @return Key binary as Buffer
   */
  derive(path: string): Buffer {
    const data = derivePath(path, this.seedHex);
    return data.key;
  }

  /**
   * Get DigitalBits account keypair for child key at given index
   *
   * @param index - Account index into path m/44'/148'/{index}
   * @return Keypair instance for the account
   */
  getKeypair(index: number): Keypair {
    const key = this.derive(`m/44'/148'/${index}'`);
    return Keypair.fromRawEd25519Seed(key);
  }

  /**
   * Get public key for account at
   *
   * @param index - Account index into path m/44'/148'/{index}
   * @return Public key
   */
  getPublicKey(index: number): string {
    return this.getKeypair(index).publicKey();
  }

  /**
   * Get secret for account at index
   * @param index -  Account index into path m/44'/148'/{index}
   * @return Secret
   */
  getSecret(index: number): string {
    return this.getKeypair(index).secret();
  }
}

export default DigitalBitsHDWallet;
