# Deployment of Ethereum explorer
If you are deploying smart contracts to public ethereum you will probably use an explorer like [https://etherscan.io/](https://etherscan.io/) to discover blocks, transactions and accounts. Since you have now deployed your own private network (and unfortunately there is no explorer included in the package) you will want to have the same capabilities. Here is how you get it. Make sure you have configured the [RPC API](EnvironmentSetup.md#EthereumConfiguration) in the previous step.

## Deploying to Azure
There is a customized version of the [https://github.com/etherparty/explorer](https://github.com/etherparty/explorer) in my [github](https://github.com/denniszielke/explorer) which allows the simplified deployment to an azure app service instance. To deploy enter the rpc endpoint from the ethereum deployment output and enter it as a parameter. 

<a href="https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fdenniszielke%2Fexplorer%2Fmaster%2Farm%2Ftemplate.json" target="_blank">
    <img src="http://azuredeploy.net/deploybutton.png"/>
</a> 

After the deployment has been completed you should be able to enter the url of the created app service instance and the list of transactions in your ethereuem blockchain network.
![Deployment output](./images/explorer.png)