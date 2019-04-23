# Setup blockchain based loyalty dApp or Setup blockchain based Reward System

**How to Set Up Loyalty Tokens on the XinFin Network**

Need to set up a blockchain loyalty app but find the whole thing confusing? You're not alone. We created this guide to setting up a loyalty token on our blockchain loyalty platform to make life that little bit easier for our community. 


**Setting up a Blockchain Loyalty App – A Step-By-Step Guide**

**Step 1**: Visit [My Contract](https://MyContract.co) and set up your own Smart Contract. You can define the terms of your Loyalty Token Contract and enter all the details that you want to include, such as the name, symbol and total amount of tokens you would like supplied. Make sure you deploy the contract on the public XinFin Network. 

Once the token has been both created and deployed on the public network you should download your own private key and store it in a safe place. We advise you to store your private key using a paper wallet, arguably the safest way to ensure its security.


**Step 2**: Setup the [XinFin Full node](https://github.com/XinFinOrg/XinFin-Node) to gain total control over both your private key and your data backup abilities.


**Step 3**: Install Dependencies. 
This step involves installing your dependencies. For this you will need to download and install [Nodejs and npm](https://docs.npmjs.com/getting-started/installing-node "Nodejs install") if you do not already have them. The code you will need to install the dependencies is as follows:

`npm install xdc3@1.0.0-beta.41`


**Step 4**: Download the ready script file then teach the API Command to Manage your Loyalty Tokens with your ERP/CRM system

e.g. `node Token_Transfer.js RPC_IP RPC_Port from_address to_address amount contract_address private_key decimals`

Execute XRC20 Transfer : 
`node Token_Transfer.js testnet.xinfin.network 443 xdcD000ea0B094EB93Bf4a545994048e630DFef922d  xdca5b6045297fc6aec660a2769e3bad08acb2098b3  1000  xdc880997e0a6de5671e8fc9e7b5424cd07b51c9ab8  c3d09a56285d70a531128cec7eb5ae905070f17705d2e1d112eaafd7d257f29b 18`

**Other Useful Command**

eth.estimateGas

eth.getGasPrice

eth.getTransactionCount

eth.accounts.signTransaction

eth.sendSignedTransaction

Ref Link: https://github.com/ethereum/wiki/wiki/JavaScript-API

Note: XinFin Network Replace Address start from OX to XDC 


**Troubleshooting**

Public discussions on the technical issues. Please Join Below mention Public Chat or Group. 

[Slack Public Chat](https://launchpass.com/xinfin-public), 

[Telegram Chat](http://bit.do/Telegram-XinFinDev), 

[Forum](https://xinfin.net)
