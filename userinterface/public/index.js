if(typeof web3 !== 'undefined')
var web3 = new Web3(web3.currentProvider);
else
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var abiArray = [ { "constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "w", "type": "string" } ], "name": "setWord", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getWord", "outputs": [ { "name": "", "type": "string", "value": "HelloPatrick" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "_word", "type": "string", "index": 0, "typeShort": "string", "bits": "", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;word", "template": "elements_input_string", "value": "HelloDennis" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "a", "type": "address" } ], "name": "Changed", "type": "event" } ];
VotingContract = web3.eth.contract(abiArray);

// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0x0e370db711e0e4706087dad7ccb78cf052ee0e5f');

function voteForCandidate(candidate) {
  var word = $("#word").val();
  try {
    contractInstance.setWord(word, {from: web3.eth.accounts[0]}, function() {
      $("#currentword").html(contractInstance.getWord.call().toString());
    });
  } catch (err) {
  }
}

$(document).ready(function() {
    let val = contractInstance.getWord.call().toString()
    $("#currentword").html(val);
});

