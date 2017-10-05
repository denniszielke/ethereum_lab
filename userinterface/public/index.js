if(typeof web3 !== 'undefined')
  var web3 = new Web3(web3.currentProvider);
else
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var HelloSmartContract = TruffleContract(HelloContractAbi);
HelloSmartContract.setProvider(web3.currentProvider);

function setWord() {
  var word = $("#word").val();
  console.log("setting word");
  console.log(word);
  try {
    HelloSmartContract.deployed().then(function(contractInstance) {
      if (contractInstance !== undefined){
          contractInstance.setWord(word, {gas: 140000, from: web3.eth.accounts[0]}).then(function(v) {
            console.log("set value");
            contractInstance.getWord.call().then(function(v) {
              console.log("got value");
              console.log(v.toString());
              $("#currentword").html(v.toString());
            });
          });
        }
    }); 
  } catch (err) {
  }
}

$(document).ready(function() {
  console.log("getting value");
  HelloSmartContract.deployed().then(function(contractInstance) {
    if (contractInstance !== undefined){
        contractInstance.getWord.call().then(function(v) {
            console.log("got value");
            console.log(v.toString());
            $("#currentword").html(v.toString());
        });
    }
  });
});

