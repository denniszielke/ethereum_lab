# Writing the first smart contract

This is about writing and deploying your first smart contract to your blockchain using Mist.

## Create an account and transfer ether
1. Launch Mist (make sure you are using the right command line parameters -> [Mist configuration](DeveloperSetup.md))
2. Create an account
![](/img/2017-10-04-23-26-05.png)
3. Make sure to pick a good passphrase (and remember it). Give it a nice alias so that you can find it again.
4. Copy your adress, go to your admin page and transfer ether to your adress. It will take a couple of seconds and then you should have 1000 ether more.
![](/img/2017-10-04-23-31-34.png)

## Deploy and test your first smart contract
1. Go for "Contracts"
2. Go for "Deploy contract"
3. Make sure to select under "From" your new account  
4. Copy & paste a smart contract from the 'hellosmartcontract' folder. Start with the 'hellosmartcontract.sol'. Make sure to select the smart contract on the right and provide some initial value like for example 'HelloDennis'.
![](/img/2017-10-04-23-39-01.png)
5. Click 'Deploy'.
6. Sometime the estimation for gas is wrong. So make sure that you provide enough gas and enter the correct password.
![](/img/2017-10-04-23-43-30.png)
7. Return to your Accounts overview page (https://wallet.ethereum.org/) and see that your contracts gets mined.
![](/img/2017-10-04-23-45-09.png)
8. After it has been created you can click on it and see the details like the current word ('HelloDennis') on the left and the available functions on the right ('Set Word').
![](/img/2017-10-04-23-47-10.png)
9. You can now write a new value 
![](/img/2017-10-04-23-48-37.png)
10. Enter your password again to sign the transaction
![](/img/2017-10-04-23-49-43.png)
11. Go back to your overview page and see the transaction commit to the blockchain
![](/img/2017-10-04-23-50-50.png)
12. After it has been confirmed you can click on your smart contract again and see that the value has indeed changed.
![](/img/2017-10-04-23-52-04.png)

See and check out the other smart contracts in the demo folder.