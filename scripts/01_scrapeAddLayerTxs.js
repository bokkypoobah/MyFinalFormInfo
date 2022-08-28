var fs = require('fs');
const util = require('util');
// npm install --save ethers
const { ethers } = require("ethers");

const MFFADDRESS="0xE8E2B12e02cefC12603e99cd414d9D9Ec82068cF";
const MFFABI=[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ApprovalCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"ApprovalQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"ApproveToCaller","type":"error"},{"inputs":[],"name":"BalanceQueryForZeroAddress","type":"error"},{"inputs":[{"internalType":"uint256","name":"_size","type":"uint256"},{"internalType":"uint256","name":"_start","type":"uint256"},{"internalType":"uint256","name":"_end","type":"uint256"}],"name":"InvalidCodeAtRange","type":"error"},{"inputs":[],"name":"MintERC2309QuantityExceedsLimit","type":"error"},{"inputs":[],"name":"MintToZeroAddress","type":"error"},{"inputs":[],"name":"MintZeroQuantity","type":"error"},{"inputs":[],"name":"OwnerQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"OwnershipNotInitializedForExtraData","type":"error"},{"inputs":[],"name":"TransferCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"TransferFromIncorrectOwner","type":"error"},{"inputs":[],"name":"TransferToNonERC721ReceiverImplementer","type":"error"},{"inputs":[],"name":"TransferToZeroAddress","type":"error"},{"inputs":[],"name":"URIQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"WriteError","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"fromTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"toTokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"ConsecutiveTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"uint256","name":"_layerIndex","type":"uint256"},{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"mimetype","type":"string"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct IndelibleERC721A.TraitDTO[]","name":"traits","type":"tuple[]"}],"name":"addLayer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_layerIndex","type":"uint256"},{"internalType":"uint256","name":"_traitIndex","type":"uint256"},{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"mimetype","type":"string"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct IndelibleERC721A.TraitDTO","name":"trait","type":"tuple"}],"name":"addTrait","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"allowListPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractData","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"image","type":"string"},{"internalType":"string","name":"banner","type":"string"},{"internalType":"string","name":"website","type":"string"},{"internalType":"uint256","name":"royalties","type":"uint256"},{"internalType":"string","name":"royaltiesRecipient","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_hash","type":"string"}],"name":"hashToMetadata","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_hash","type":"string"}],"name":"hashToSVG","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isAllowListActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isContractSealed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isMintActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPublicMintActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxPerAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxPerAllowList","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint64","name":"_count","type":"uint64"},{"internalType":"bytes32[]","name":"merkleProof","type":"bytes32[]"}],"name":"mint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"bytes32[]","name":"merkleProof","type":"bytes32[]"}],"name":"onAllowList","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"publicMintPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenIdA","type":"uint256"},{"internalType":"uint256","name":"tokenIdB","type":"uint256"}],"name":"reRollDuplicate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sealContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_backgroundColor","type":"string"}],"name":"setBackgroundColor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"image","type":"string"},{"internalType":"string","name":"banner","type":"string"},{"internalType":"string","name":"website","type":"string"},{"internalType":"uint256","name":"royalties","type":"uint256"},{"internalType":"string","name":"royaltiesRecipient","type":"string"}],"internalType":"struct IndelibleERC721A.ContractData","name":"_contractData","type":"tuple"}],"name":"setContractData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxPerAddress","type":"uint256"}],"name":"setMaxPerAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxPerAllowList","type":"uint256"}],"name":"setMaxPerAllowList","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"newMerkleRoot","type":"bytes32"}],"name":"setMerkleRoot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"bool","name":"_renderOffChain","type":"bool"}],"name":"setRenderOfTokenId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"toggleAllowListMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"togglePublicMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"toggleWrapSVG","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenIdToHash","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenIdToSVG","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenIdA","type":"uint256"},{"internalType":"uint256","name":"tokenIdB","type":"uint256"}],"name":"tokensAreDuplicates","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_layerIndex","type":"uint256"},{"internalType":"uint256","name":"_traitIndex","type":"uint256"}],"name":"traitData","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_layerIndex","type":"uint256"},{"internalType":"uint256","name":"_traitIndex","type":"uint256"}],"name":"traitDetails","outputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"mimetype","type":"string"}],"internalType":"struct IndelibleERC721A.Trait","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];


// Contract deployment 0xed0555bf0420aab38d62065f1cafdbce032528189a7483b2b8a95201f92734b3
let ADDLAYERTXHASHES = [
  "0x3f1e9e37464f14fe72a23b580ab5ddf86f7cd9ea572f2c2cfc80fd458773bebc",
  "0xc3bac8f516fd34ff25867373fb2965e8be73ac956923564af56d12c887d8bc87",
  "0x112adaf82a55ddd6c5e436b22637c59e4e81f250802a739b24a9e4146b84c2c3",
  "0xe47f8bb237f15adb5c68aafa3ac41059ed48d2f4038f7043c550be825d8f9286",
  "0x7de9ef2d90b85196f2083021b932c26b6a715ffdf6c04d254a1c093ea848ccef",
  "0xb7065b6d4f9abc8b37bb04775df2bcd9d7a5801572a9046dd52dcc67240c0eca",
  "0x1ee722e68cba678a6b7ef1404e2974a93e21ac92aba016e965f566a8e0ea3354",
  "0x300bf52b4d38565bb099b593913fc063dbc6029ece80b6d18cfbadb8e3296e65",
  "0x12a74348a39bee838c16b2c78015ebe7a89fa64fa088f569d39c29fb273ff1eb",
  "0xe1a0c8ff89791990815b33976dcc53b3f5e1c0f27f37a2b80699f626bb3282a9",
  "0xcf912acd2c22f581ab8ce69487e38ab1c4a3a87556161ae70e81a293f0017cb3",
  "0xaaea83cf9a26aeabcc12b62647e850cbf2fbcb5552ae666d3ca141085c590dbe",
  "0xacfc7d53c25ce6c918933e209ac1ada306d01d40082c4710dc2ee29e332d4e21",
  "0x5dc732ec369616f1adb6941415d87f518425149e8ffbd2cd2dcaab664fa1470b",
  "0x6188df9a320faebd87d63f496cfc43edee8bdeb0fc31b2a31840603ab75fcbeb",
  "0x86616e9064709e5545fd58880eb89a0998ebde330a5f399879b8b1defb47159c",
];
// Checked both these addLayer(2, ...) and the input data is the same
// ADDLAYERTXHASHES = [
//   "0x112adaf82a55ddd6c5e436b22637c59e4e81f250802a739b24a9e4146b84c2c3",
//   // "0xb7065b6d4f9abc8b37bb04775df2bcd9d7a5801572a9046dd52dcc67240c0eca",
// ];

let STARTBLOCKNUMBER=13045935;
let ENDBLOCKNUMBER=13047090;

async function doIt() {
  const provider = new ethers.providers.JsonRpcProvider();
  const signer = provider.getSigner()
  const blockNumber = await provider.getBlockNumber();
  const mff = new ethers.Contract(MFFADDRESS, MFFABI, provider);

  const data = [];
  for (const txHash of ADDLAYERTXHASHES) {
    const tx = await provider.getTransaction(txHash);
    const txReceipt = await provider.getTransactionReceipt(txHash);
    const block = await provider.getBlock(txReceipt.blockNumber);
    let decodedData = mff.interface.parseTransaction({ data: tx.data, value: tx.value });
    data.push({ tx, txReceipt, decodedData });
    // console.log("decodedData: " + JSON.stringify(decodedData, null, 2));
    // console.log(txHash + "\t" + decodedData.args[0] + "\t" + JSON.stringify(decodedData.args[1], null, 2));

    // for (const tuple of decodedData.args[1]) {
    //   console.log(txHash + "\t" + decodedData.args[0] + "\t" + JSON.stringify(tuple, null, 2));
    // }

    // console.log("decodedData.functionFragment.name: " + decodedData.functionFragment.name);
    // for (let i in decodedData.functionFragment.inputs) {
    //   const c = decodedData.functionFragment.inputs[i];
    //   console.log("  " + i + " " + c.name + " " + c.type + " " + decodedData.args[i]);
    // }
  }

  function hex2a(hexx) {
      var hex = hexx.toString();//force conversion
      var str = '';
      for (var i = 0; i < hex.length; i += 2)
          str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      return str;
  }

  // const test = "0x89504e470d0a1a0a0000000d494844520000003a0000003a0103000000db75d86b000000017352474201d9c92c7f000000097048597300000b1300000b1301009a9c1800000006504c5445000000000000a567b9cf0000000274524e53001a8bf134420000003b49444154789c6360a00bf0a448b707946642083192630e1361255880038cc1e2822187c5190e984230200271450343034c8403423560514c6f000073d202fe6a6cbab50000000049454e44ae426082";
  // const testOutput = ethers.utils.toUtf8Bytes(test);
  // console.log(test + " " + testOutput);

  console.log("txHash\tlayer\ttuple#\tname\tmimeType\tdata");
  for (const item of data) {
    let tupleIndex = 0;
    for (const tuple of item.decodedData.args[1]) {
      // console.log(item.tx.hash + "\t" + item.decodedData.args[0] + "\t" + tupleIndex + "\t" + tuple[0] + "\t" + tuple[1] + "\t" + tuple[2]);

      const name = tuple[0].toLowerCase().replace(/['\/ @]/g, '');
      let buffer = Buffer.from(tuple[2].substring(2), "hex");
      let filename = "images/layer" + item.decodedData.args[0] + "-trait" + tupleIndex.toString().padStart(3, '0') + "-" + name + '.' + tuple[1].replace(/^.*\//, '');
      // console.log(name + " => " + filename); //  + ' ' + buffer);
      console.log('\n#### Layer ' + item.decodedData.args[0] + ' Trait ' + tupleIndex.toString().padStart(3, '0') + ' ' + tuple[0]);
      console.log('<kbd><img src="scripts/' + filename + '" width="100px" height="100px"/></kbd>'); //  + ' ' + buffer);
      fs.writeFile(filename, buffer, (err) => {
        if (err) return console.error(err);
      //   // console.log("File successfully written !");
      });

      filename = "svgs/layer" + item.decodedData.args[0] + "-trait" + tupleIndex.toString().padStart(3, '0')+ "-" + name + ".svg"; // + tuple[1].replace(/^.*\//, '');
      const base64 = buffer.toString('base64');
      const content = '<svg width="1200" height="1200" viewBox="0 0 1200 1200" version="1.2" xmlns="http://www.w3.org/2000/svg" style="background-color:transparent;background-image:url(data:' + tuple[1] + ';base64,' +
        base64 + ');background-repeat:no-repeat;background-size:contain;background-position:center;image-rendering:-webkit-optimize-contrast;-ms-interpolation-mode:nearest-neighbor;image-rendering:-moz-crisp-edges;image-rendering:pixelated;"></svg>';
        // console.log(filename + " " + JSON.stringify(data1));
      fs.writeFile(filename, content, (err) => {
        if (err) return console.error(err);
      //   // console.log("File successfully written !");
      });

      tupleIndex++;
    }
  }
}

doIt();

// console.log(process.cwd());
