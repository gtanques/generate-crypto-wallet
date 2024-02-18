const bip39 = require('bip39');
const bip = require('bip32');
const bitcoin = require('bitcoinjs-lib');

// rede test
const network = bitcoin.networks.testnet;

// 1 mainnet 0 testnet
const path = "m/49'/1'/0'/0/0";

const mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// root wallet HD
const root = bip.fromSeed(seed, network);

// create account - pvt - public key
let account = root.derivePath(path);

// node
const node = account.derive(0);

let btcAddress = bitcoin.payments.p2pkh(
	{
		pubkey: account.publicKey, network 
	}
).address;


console.log('Address: ', btcAddress);
console.log('private key: ', account.toWIF());
console.log('seed: ', mnemonic);
console.log('Wallet created!');