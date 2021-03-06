# Ethereum Consortium Setup on Azure
There are several deployment templates inside the Azure marketplace. The best option is the 'Ethereum consortium blockchain'. A very good description of the template capabilities and the parameters inside can be found in this technet article here:
[https://gallery.technet.microsoft.com/Bletchley-Ethereum-4bc7d80d](https://gallery.technet.microsoft.com/Bletchley-Ethereum-4bc7d80d)

After the deployment has gone trough you should copy and store the template output for later.
![High level setup](./images/deploytemplateoutput.png)

## Configuration of RPCAPI
After the deployment you need to configure the RPC-API to allow you to execute calls to the transaction nodes. If you have not done this with after the deployment you will be hit with an error message that sound like this 'The method personal_unlockAccount does not exist/is not available'.

In order to fix this you need to perform the following changes on all transaction nodes (all nodes containing a tx in their vm name):
1. Log via SSH into a transaction node (see output for first node)
~~~
ssh -p 3000 gethadmin@XXX.cloudapp.azure.com
~~~
2. Open the following file with your favorite editor (I am using nano with the -c parameter to show line numbers)
~~~
nano -c ~/start-private-blockchain.sh
~~~~
3. Look for the geth startup commands (should be in line 54)
~~~
52 echo "===== Starting geth node =====";
53 set -x;
54 nohup geth --datadir $GETH_HOME -verbosity $VERBOSITY --bootnodes $BOOTNODE_URLS --maxpeers $MAX_PEERS --nat none --networkid $NETWORK_ID --identity $IDENTITY $MINE_OPTIONS $FAST_SYNC --rpc --rpcaddr "$IPADDR" --rpccorsdomain "*" >> $GETH_LOG_FILE_PATH 2>&1 &
55 if [ $? -ne 0 ]; then echo "Previous command failed.  Exiting"; exit $?; fi
56 set +x;
57 echo "===== Started geth node =====";
~~~
4. Add the following to line 54 after `--rpccorsdomain "*"` and before `>> $GETH_LOG_FILE_PATH 2>&1 &`
~~~
--rpcapi "eth,net,web3,admin,personal"
~~~
so that if looks like this
~~~
nohup geth --datadir $GETH_HOME -verbosity $VERBOSITY --bootnodes $BOOTNODE_URLS --maxpeers $MAX_PEERS --nat none --networkid $NETWORK_ID --identity $IDENTITY $MINE_OPTIONS $FAST_SYNC --rpc --rpcaddr "$IPADDR" --rpccorsdomain "*" --rpcapi "eth,net,web3,admin,personal" >> $GETH_LOG_FILE_PATH 2>&1 &
~~~
5. Restart the transaction node with 
~~~
sudo reboot
~~~
6. If you have more than one transaction node you can connect to them by incrementing the port in the ssh template output (index start with 3000)


## Update geth

If you want to update the geth version you need to log into all the nodes and run the following commands:
```
sudo apt-get install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install ethereum
sudo apt-get upgrade
sudo reboot
```

This will take a while - also remember to not take down all the nodes at the same time.

Since there is by default no load balancer to get to the mining nodes you have to log into the transaction nodes and from there use the private IPs to access the mining nodes. The ip ranges can be looked up in the azure portal and are distributed in a simple setup:
10.0.1.4++ (first consortium member)
10.0.2.4++ (second consortium member)