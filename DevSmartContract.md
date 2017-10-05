# Developing, Testing and deploying a smart contract
The following will give a short introduction to the tooling for developing a smart contract for ethereum using solidity, visual studio code and truffle.
A good introduction on solidity can be found here: https://solidity.readthedocs.io/en/develop/
General best practices to be considered for solidity development can be found here: https://github.com/ConsenSys/smart-contract-best-practices

## Project setup and hello world
1. We will be using truffle - which is a popular tool chain and has very good [documentation](http://truffle.readthedocs.io/en/beta/). Open a command line (on your prepared dev box) and install truffle by running.
~~~
npm install -g truffle
~~~
2. Next you are going to need a local blockchain rpc server to test develop against. Install it by running
~~~
npm install -g ethereumjs-testrpc
~~~
3. Initialize a truffle project by creating a new folder and running the following command init
~~~
truffle init
~~~
4. If you are running windows you have to rename the created `truffle.js` file to `truffle-config.js` in order for it to work. 
5. Launch VSCode and open the folder 
~~~
code .
~~~
6. On the first run there will be no syntax highlighting for solitity - in order for that to work you need to press `Ctrl + P` and run `ext install Solidity` to download and install the [solidity extension](https://github.com/juanfranblanco/vscode-solidity).
7. Modify the truffle config file to change the network to your azure network rpc endpoint

A good set of samples can be found here: https://github.com/EthereumEx/blockchain-060 
