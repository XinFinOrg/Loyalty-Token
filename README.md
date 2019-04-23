# Loyalty-Token
**How to set up loyalty token on XinFin.Network**

**Step 1**: Create and Deploy Loyalty Smart Contract and Deploy on Public network.

Goto: https://mycontract.co/ and create Loyalty Token (Token Contract) After Entering Detail like: Token Name, Token Symbol and Total Token Supply. 

Note: After Creating Token Contract then Deploy to XinFin Network and Download Private Key and store at safe place Without a doubt, the safest way to store any Private Key is using a paper wallet. 


**Step 2**: Setup XinFin Full node to get Full control over your Private key and Data backup. 

Follow step and setup XinFin Full Node :- https://github.com/XinFinOrg/XinFin-Node


**Step 3**: Install Dependencies. 
Download [Nodejs and npm](https://docs.npmjs.com/getting-started/installing-node "Nodejs install") if you don't have them

Install dependencies:

`npm install xdc3@1.0.0-beta.41`


**Step 4**: Dowlonad Ready Script File, Learn API Command to Manage Loyalty Loken with your ERP/CRM System: 

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