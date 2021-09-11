# digitalbits-hd-wallet

> 🔐 Key derivation for the DigitalBits blockchain (based on Stellar's [SEP-0005](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0005.md)) 🚀

<p align="center">
  <a href="https://www.npmjs.com/package/@bajetech/digitalbits-hd-wallet">
    <img alt="npm (scoped)" src="https://img.shields.io/npm/v/@bajetech/digitalbits-hd-wallet?style=for-the-badge">
  </a>
  <a href="https://nodejs.org">
    <img alt="Node.js" src="https://img.shields.io/badge/node->=12-yellowgreen?style=for-the-badge&labelColor=000000">
  </a>
  <a href="https://github.com/bajetech/digitalbits-hd-wallet/actions/workflows/pipeline.yml">
    <img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/bajetech/digitalbits-hd-wallet/digitalbits-hd-wallet%20CI?label=GitHub%20Actions&logo=github&style=for-the-badge">
  </a>
</p>

## Usage

```js
import DigitalBitsHDWallet from "@bajetech/digitalbits-hd-wallet";

const mnemonic = DigitalBitsHDWallet.generateMnemonic();
const wallet = DigitalBitsHDWallet.fromMnemonic(mnemonic);

wallet.getPublicKey(0); // => GDKYMXOAJ5MK4EVIHHNWRGAAOUZMNZYAETMHFCD6JCVBPZ77TUAZFPKT
wallet.getSecret(0); // => SCVVKNLBHOWBNJYHD3CNROOA2P3K35I5GNTYUHLLMUHMHWQYNEI7LVED
wallet.getKeypair(0); // => DigitalBitsBase.Keypair for account 0
wallet.derive(`m/44'/148'/0'`); // => raw key for account 0 as a Buffer

// wallet instance from seeds
const seedHex =
  "794fc27373add3ac7676358e868a787bcbf1edfac83edcecdb34d7f1068c645dbadba563f3f3a4287d273ac4f052d2fc650ba953e7af1a016d7b91f4d273378f";
const seedBuffer = Buffer.from(seedHex);
DigitalBitsHDWallet.fromSeed(seedHex);
DigitalBitsHDWallet.fromSeed(seedBuffer);

// mnemonics with different lengths
DigitalBitsHDWallet.generateMnemonic(); // 24 words
DigitalBitsHDWallet.generateMnemonic({ entropyBits: 224 }); // 21 words
DigitalBitsHDWallet.generateMnemonic({ entropyBits: 160 }); // 18 words
DigitalBitsHDWallet.generateMnemonic({ entropyBits: 128 }); // 12 words

// validate a mnemonic
DigitalBitsHDWallet.validateMnemonic("too short and non wordlist words"); // false
```

## Mnemonic Language

Mnemonics can be generated in any language supported by the underlying [bip39 npm module](https://github.com/bitcoinjs/bip39).

The full list of language keys are under exports 'wordlists' [here](https://github.com/bitcoinjs/bip39/blob/master/index.js).

### Usage

```js
import DigitalBitsHDWallet from "@bajetech/digitalbits-hd-wallet";

// traditional chinese - 24 words
DigitalBitsHDWallet.generateMnemonic({
  language: "chinese_traditional",
});
// => '省 从 唯 芽 激 顿 埋 愤 碳 它 炸 如 青 领 涨 骤 度 牲 朱 师 即 姓 讲 蒋'

// french - 12 words
DigitalBitsHDWallet.generateMnemonic({ language: "french", entropyBits: 128 });
// => 'directif terrible légume dérober science vision venimeux exulter abrasif vague mutuel innocent'
```

## Randomness

- NodeJs: crypto.randomBytes
- Browser: window.crypto.getRandomValues

(using [randombytes npm module](https://github.com/crypto-browserify/randombytes))

## Tests

All [SEP-0005 test cases](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0005.md#test-cases) are exercised [here](https://github.com/bajetech/digitalbits-hd-wallet/blob/main/test/sep0005.test.mjs) against [these](https://github.com/bajetech/digitalbits-hd-wallet/tree/main/test/data).

## Credits

This package was copied and adapted from [`stellar-hd-wallet`](https://github.com/chatch/stellar-hd-wallet) for use with the [DigitalBits blockchain network](https://digitalbits.io), which is itself adapted from the [Stellar blockchain network](https://www.stellar.org).

Specifically the following differences from `stellar-hd-wallet` are worthy of mention:

- GitHub Actions is used for a CI workflow instead of Travis CI.
- All package dependencies and dev dependencies are brought up-to-date and the code modified where necessary to use up-to-date APIs.
- The `xdb-digitalbits-base` package is used instead of `stellar-base`.
- The source and test files were converted to ES modules.
