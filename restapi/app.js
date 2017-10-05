
var express = require('express');
var bodyParser = require('body-parser');
var Web3 = require('web3');

var abiArray = [ { "constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "w", "type": "string" } ], "name": "setWord", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getWord", "outputs": [ { "name": "", "type": "string", "value": "HelloPatrick" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "_word", "type": "string", "index": 0, "typeShort": "string", "bits": "", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;word", "template": "elements_input_string", "value": "HelloDennis" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "a", "type": "address" } ], "name": "Changed", "type": "event" } ];

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

app.post("/getWord", function (req, res) {
    console.log("triggering get word");
        
    var web3 = new Web3(new Web3.providers.HttpProvider(rpcEndpoint));

    var MyContract = web3.eth.contract(abiArray);

    var myContractInstance = MyContract.at(contractAddress);

    console.log("reading");
    myContractInstance.getWord.call(function(err, result) {
        console.log(err);
        console.log(result);
        res.end(result);
    });
});

app.post("/setWord", function (req, res) {
  console.log("triggering set word");
      
  var web3 = new Web3(new Web3.providers.HttpProvider(rpcEndpoint));

  var MyContract = web3.eth.contract(abiArray);
  var user = req.headers["user"];
  var password = req.headers["password"];
  var word = req.headers["word"];

  console.log(user);
  console.log(word);

  web3.personal.unlockAccount(user, password, 1000);
  var myContractInstance = MyContract.at(contractAddress);

  console.log("writing");
  myContractInstance.setWord(word, 
  { from: user }, function(err, result) { 
      console.log(err); 
      console.log(result); 
      res.end(result);
  });

});

app.listen(app.get("port"), function () {
    console.log("Listening on port", app.get("port"));
});
