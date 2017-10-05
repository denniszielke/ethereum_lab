# Accessing a smart contract via an API

In most cases you do want to interact with the smart contract from off-chain - which means you need an API that can be used from your application. This is a first step towards building an end-end application and will focus on building an API around your smart contract.

## Preparation
This assumes you have deployed your smart contract by using Mist in the previous step and now have an instance of your hellosmartcontract on your blockchain. The demo of the truffle tooling will be in the next chapter to improve this.

You need to retrieve the following information:

1. SmartContract adress (Copy adress)
2. ABI (Show interface)
![](/img/2017-10-05-08-01-55.png)

In this case the adress is (your will be different)
~~~
0xcea5B580088D4A33f7E5A8ECFF870a64a9Fe3a1C
~~~

and the ABI should look like this (if you have not modified it from the demo)
```
[ { "constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "w", "type": "string" } ], "name": "setWord", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getWord", "outputs": [ { "name": "", "type": "string", "value": "HelloPatrick" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "_word", "type": "string", "index": 0, "typeShort": "string", "bits": "", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;word", "template": "elements_input_string", "value": "HelloDennis" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "a", "type": "address" } ], "name": "Changed", "type": "event" } ]
```

## Deploying the smart contract to the local testrpc

For local testing it is faster (and cheaper) to use testrpc. Therefore we are also deploying the smart contract to the local testrpc. Remember that if you are running linux you have to rename truffle-config.js to truffle.js

1. Launch the local testrpc by
~~~
testprc
~~~
2. Enter the truffledemo folder and compile the smart contracts
~~~
truffle compile
~~~
3. You will get a new build folder that contains the ABI.
4. After running the migration the file will be updated with the latest adress for your smart contract instance
![](/img/2017-10-05-08-38-29.png)
5. Now lets interact with the smart contract via console. Open up the truffle console via
~~~
truffle console
~~~

You can now call the smart contract by running the following to read the word 
~~~
HelloSmartContract.deployed().then(function(contractInstance) {contractInstance.getWord.call().then(function(v) {console.log(v)})})
~~~

You can update the value by running the following 
~~~
HelloSmartContract.deployed().then(function(contractInstance) {contractInstance.setWord('HelloPatrick').then(function(v) {console.log(v.logs)})})
~~~

Read the value again and you will notice the change
![](/img/2017-10-05-08-50-02.png)

## Launching the demo app

In the folder restapi you will find a demo nodejs that you can use and configure:
1. Copy the '.env_template' file and update its value in a new file named '.env'
2. Update the config values with your smart contract adress and your rpc endpoint (use testrpc if you want)
3. Install the npm dependencies by running opening a cmd (or terminal if you use vscode)
~~~
npm install
~~~
4. Launch the api by running 
~~~
npm start
~~~
![](/img/2017-10-05-08-27-49.png)


## Interacting with the smart contract via API

The api is now up and running and ready to interact with. So far there is no user interface - but it is possible to use curl to interact with the api.

1. Call the web api running
~~~
curl -X POST http://localhost:8083/getWord
~~~

2. Update the value
~~~
curl -X POST -H 'user:0x562d6b80f5a636d833fe9893f18290aef04a2be3' -H 'word:HalloWelt' -H 'password:df19678e92edee25983ae83d99e2ea721b2475be03c7e5a7cc72c8029d9f4e3b' http://localhost:8083/setWord
~~~