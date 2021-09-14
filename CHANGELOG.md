# CHANGELOG

## v1.1.0

**NOTE**: This is a major bug-fix release (although only the minor release number is being given a bump). This is because there is no change to the API but the bug fixed is more serious than just releasing it as a patch update.

The individual changes are as follows:

- Adds @babel/plugin-transform-runtime as a devDependency, @babel/runtime as a dependency and updates babel configuration. [f6d3c1a](https://github.com/bajetech/digitalbits-hd-wallet/commit/f6d3c1acadc2d24724300ad3648f94f9308d9225)
- Changes source files extension from `.mjs` to `.js` [6553592](https://github.com/bajetech/digitalbits-hd-wallet/commit/655359237006b4a7f680adbeaf30324dd799cdc6)
- Updates tests so they will run given the change in src files from _.mjs to _.js [c8d3273](https://github.com/bajetech/digitalbits-hd-wallet/commit/c8d3273e74efc55b6b7f074557198540393634a9)

## v1.0.2

- NO code changes.
- README updated.

## v1.0.1

- Adds CHANGELOG.
- Fixes package-lock.json so it has the correct version number for the release.

## v1.0.0

This release comes with NO changes. Instead, we are simply bumping the version to 1.0.0 to indicate we are committed to following the [semantic versioning spec](http://semver.org) from this point on when publishing releases of this package.

## v0.0.10

Initial (official) release! 🎉

🔐 Key derivation for the DigitalBits blockchain (based on Stellar's [SEP-0005](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0005.md)) 🚀

Future versions will keep package dependencies up-to-date and refine the library's API as needed to support any changes to SEP-0005 or the underlying [bip39 npm module](https://github.com/bitcoinjs/bip39).
