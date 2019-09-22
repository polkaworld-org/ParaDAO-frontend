const { mnemonicGenerate } = require('@polkadot/util-crypto')

const count = process.argv[2];

console.log('export default [');
for (let i = 0; i < count; i++) {
  console.log('{')
  console.log(`name: 'MEMBER_${i+1}',`);
  console.log(`mnemonic: '${mnemonicGenerate(count)}',`);
  console.log('},')
}
console.log(']')