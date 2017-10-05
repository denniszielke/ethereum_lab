
var express = require('express');
var bodyParser = require('body-parser');
var Web3 = require('web3');
var contract = require('truffle-contract');

var helloContractAbi = require('./HelloSmartContract.json');
var app = express();
app.set("port", process.env.PORT || 8083);

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json 
app.use(bodyParser.json())

app.get("/", function (req, res) {
    console.log("hello world")
    res.end("hello world");
});

var rpcEndpoint = process.env.RPC_ENDPOINT;
var contractAddress = process.env.CONTRACT_ADDRESS;
var HelloSmartContract = contract(helloContractAbi);
var web3 = new Web3(new Web3.providers.HttpProvider(rpcEndpoint));

HelloSmartContract.at(contractAddress);
app.get("/getWord", function (req, res) {
    console.log("triggering get word");
    HelloSmartContract.setProvider(web3.currentProvider);
    console.log("getting");
    HelloSmartContract.deployed().then(function(contractInstance) {
        if (contractInstance !== undefined){
            contractInstance.getWord.call().then(function(v) {
                console.log("got value");
                console.log(v.toString());
                res.end(v.toString());
            });
        }
    }); 
});

app.post("/setWord", function (req, res) {
  console.log("triggering set word");
      
  var user = req.headers["user"];
  var password = req.headers["password"];
  var word = req.headers["word"];

  console.log(user);
  console.log(word);
  //web3.personal.unlockAccount(user, password, 1000);

  console.log("triggering set word");
  HelloSmartContract.setProvider(web3.currentProvider);
  console.log("setting");
  HelloSmartContract.deployed().then(function(contractInstance) {
      if (contractInstance !== undefined){
          contractInstance.setWord(word, {gas: 140000, from: web3.eth.accounts[0]}).then(function(v) {
              console.log("set value");
              console.log(v.toString());
              res.end(v.toString());
          });
      }
  }); 

});

app.listen(app.get("port"), function () {
    console.log("Listening on port", app.get("port"));
});
