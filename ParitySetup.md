# Installing Parity on Azure

Provision an Ubuntu 16.04 LTS in Azure an connect to it.

## Installing dependencies
https://github.com/paritytech/parity/wiki/Setup

1. Install required packages
~~~
sudo apt-get install openssl libssl-dev libudev-dev pkg-config gcc g++ cargo
~~~

2. Install rust
~~~
curl https://sh.rustup.rs -sSf | sh
~~~

3. Use the online binary installer
~~~
bash <(curl https://get.parity.io -kL)
~~~

4. Lookup the internal IP address and the public IP of the network interface of your ubuntu vm in the azure portal:
Change the inbound port rules to allow 443, 8546 and 8080 to your node in your network security group configuration:
![](/img/2017-10-13-08-29-11.png)

5. Now we need to create our parity config - use the config generator from https://paritytech.github.io/parity-config-generator/ 
Look up further documentation here. You should be fine if you use the config.toml from the parity folder.
https://github.com/paritytech/parity/wiki/Configuring-Parity#config-file


6. Make sure to set your internal IP to all places in the config

7. Create the config file
~~~
mkdir -p ~/.local/share/io.parity.ethereum/ && touch ~/.local/share/io.parity.ethereum/config.toml
~~~

and add the contents from [config.toml](https://raw.githubusercontent.com/denniszielke/ethereum_lab/master/parity/config.toml) to it

~~~
nano ~/.local/share/io.parity.ethereum/config.toml
~~~

8. Add your [devchain.json](https://raw.githubusercontent.com/denniszielke/ethereum_lab/master/parity/devChain.json) config file contents to it

~~~
nano ~/.local/share/io.parity.ethereum/ownDevChain.json
~~~

9. Launch your chain and surf to it on your browser
~~~
parity --ui-no-validation --unsafe-expose --ui-port 8080
~~~

http://yourdnws.de:8080

10. You will be promted with the following message
![](/img/2017-10-13-11-32-02.png)

11. Open up another ssh session on your vm and run the following command
~~~
parity signer new-token
~~~

Enter the output in your browser

12. Now create an account. Notice that you do not have any ether on it.
Remember the adress. Open up your ownDevChain.json file and enter your adress (replace the existing value 0x00E9627736daBd961BeC44897F05b604A23027D5 ).

Restart parity and you should have enough ether to start.

## Add ssl certicate (optional)

1. Add 443 to inbound rules
![](/img/2017-10-13-09-31-29.png)

2. Add A-Record to IP Adress
Choose your favorite dns provider and point it to your azure public ip of the ubunut vm

3. Create an ssl certificate
```
sudo apt-get install letsencrypt
sudo letsencrypt certonly --standalone -d <subdomain>.<domain>.com
sudo apt-get install nginx
```

Use the default /etc/nginx/nginx.conf

Edit /etc/nginx/sites-enabled/default and take the values from [nginxssl.conf](https://raw.githubusercontent.com/denniszielke/ethereum_lab/master/parity/nginxssl.conf)
~~~
nano /etc/nginx/sites-enabled/default
~~~

4. Remember to update subdomain.domain.com with your values in the config file

5. Start ngingx
~~~
sudo service nginx start
~~~

HAPPY HACKING!

![](/img/2017-10-13-11-57-16.png)
