import assert from "assert";
import has from "lodash/has.js";
import DigitalBitsHDWallet from "../src/digitalbits-hd-wallet.mjs";

const assertKeypair = (actualKeypair, expectedPublicKey, expectedSecret) => {
  assert.strictEqual(actualKeypair.publicKey(), expectedPublicKey);
  assert.strictEqual(actualKeypair.secret(), expectedSecret);
};

const specTestCase = (num) => () => {
  let testCase;
  let wallet;

  before(async function () {
    testCase = await import(`./data/sep0005-testcase-${num}.js`);
    testCase = testCase.default;

    wallet = has(testCase, "passphrase")
      ? DigitalBitsHDWallet.fromMnemonic(testCase.seedWords, testCase.passphrase)
      : DigitalBitsHDWallet.fromMnemonic(testCase.seedWords);
  });

  it("derives expected parent key", () => {
    assert.strictEqual(wallet.derive(`m/44'/148'`).toString("hex"), testCase.parentKey);
  });

  it("derives expected child keys", () => {
    testCase.keypairs.forEach(([publicKey, secret], index) =>
      assertKeypair(wallet.getKeypair(index), publicKey, secret)
    );
  });
};

describe("SEP-0005", () => {
  describe("Test Case 1", specTestCase(1));
  describe("Test Case 2", specTestCase(2));
  describe("Test Case 3", specTestCase(3));
  describe("Test Case 4", specTestCase(4));
  describe("Test Case 5", specTestCase(5));
});
