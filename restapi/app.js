
var express = require('express');
var bodyParser = require('body-parser');
var Web3 = require('web3');

var abiArray = [
    {
      "constant": false,
      "inputs": [
        {
          "name": "user",
          "type": "address"
        },
        {
          "name": "car",
          "type": "address"
        },
        {
          "name": "newStatus",
          "type": "uint256"
        }
      ],
      "name": "updateStatus",
      "outputs": [
        {
          "name": "sufficient",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "car",
          "type": "address"
        }
      ],
      "name": "getCarStatus",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getUserStatus",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "car",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "newValue",
          "type": "uint256"
        }
      ],
      "name": "StatusUpdated",
      "type": "event"
    }
  ];

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
var contractAddress = process.env.CONTRACT_AdDRESS;

app.post("/updatestatus", function (req, res) {
    console.log("triggering update status");
    console.log(req.headers);
    console.log(req.body);
    // var reqBody = JSON.parse
    console.log(req.header["user"]);
        
    var web3 = new Web3(new Web3.providers.HttpProvider(rpcEndpoint));
    // console.log(web3);
    var coinbase = web3.eth.coinbase;
    var balance = web3.eth.getBalance(coinbase);

    console.log(balance);

    var MyContract = web3.eth.contract(abiArray);
    var user = req.headers["user"];
    var id = req.headers["id"];
    var password = req.headers["password"];
    var newstatus = req.headers["status"];

    console.log(user);
    console.log(id);

    web3.personal.unlockAccount(user, password, 1000);

    var myContractInstance = MyContract.at(contractAddress);
    // console.log(myContractInstance);

    console.log("writing");
    myContractInstance.updateStatus(user, car, newstatus, 
    { from: user }, function(err, result) { 
        console.log(err); 
        console.log(result); 
        res.end(result);
    });

});

app.listen(app.get("port"), function () {
    console.log("Listening on port", app.get("port"));
});
