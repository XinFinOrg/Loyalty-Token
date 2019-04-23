

//ip and port for the blockchain node to be connected
var wallet_ip = process.argv[2];
var wallet_port = process.argv[3];
//address from which tokens need to be sent
var from_address = process.argv[4];
//address to which tokens need to be sent
var to_address = process.argv[5];
//amount of tokens to be sent
var sendamount = process.argv[6];
//contract address of the ERC20 token
var coinAddress = process.argv[7];
//private key of the from address
var private_key = process.argv[8];
//predefined no. of decimals in the contract
var tokendecimal = process.argv[9];

//web3 library needed
const Web3 = require("xdc3");

//connecting to the web3 provider
if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(
    new Web3.providers.HttpProvider("http://" + wallet_ip + ":" + wallet_port)
  );
}

//if the token decimal isn't specified then set it to default 18 and converting the amount to decimal form
if (tokendecimal == 18 || tokendecimal == null) {
  var send_amount = web3.utils.toWei(sendamount);
} else {
  var send_amount = sendamount * Math.pow(10, tokendecimal);
}

//data required for estimating the gas that will be needed for the transaction to complete
var est_main_gas = { from: from_address, to: to_address, value: send_amount };

//standard ERC20 contract ABI
const coinabi = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "approve",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_from", type: "address" },
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "transferFrom",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "transfer",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" }
    ],
    name: "allowance",
    outputs: [{ name: "remaining", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
      { indexed: false, name: "value", type: "uint256" }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "owner", type: "address" },
      { indexed: true, name: "spender", type: "address" },
      { indexed: false, name: "value", type: "uint256" }
    ],
    name: "Approval",
    type: "event"
  }
];

//creating an instance of the ERC20 contract
const coin = new web3.eth.Contract(coinabi, coinAddress);
//checking the balance of the from address to asure that it has sufficient balance to complete the transaction
coin.methods.balanceOf(from_address).call(function(err, bal) {
  bal = web3.utils.fromWei(bal, "wei").toString(10);

//generating the data for the transfer method of the ERC20 contract
  const txdata = coin.methods.transfer(to_address, send_amount).encodeABI(); //to adress

//estimating the gas required for the transaction to be completed
  web3.eth.estimateGas(est_main_gas, function(gaslimit_err, gaslimit) {
 //getting the current gas price on the network or else setting it to minimum 4 Gwei so that it won't take much time to execute 
    web3.eth.getGasPrice(function(gas_err, getGasPrice) {
      if (gas_err) {
        console.log(JSON.stringify({ error1: gas_err }));

        getGasPrice = 4000000000;
      } else {
        if (getGasPrice < 4000000000 || getGasPrice == null) {
          getGasPrice = 4000000000;
        }
      }

//finding the nonce for the from address
      web3.eth.getTransactionCount(from_address, function(
        tx_count_err,
        transactionCount
      ) {
        if (tx_count_err) {
          console.log(
            JSON.stringify({ "transaction count error ": tx_count_err })
          );
        }

//generating the transaction data
        const trans_det = {
          nonce: transactionCount, // Replace by nonce for your account on geth node
          gasPrice: getGasPrice,
          gas: "200000",
          to: coinAddress, //contract address
          from: from_address, //coin base
          data: txdata
        };

//signing the transaction generated to get a raw transaction
        web3.eth.accounts.signTransaction(trans_det, private_key, function(
          sign_error,
          signedTransaction
        ) {
          if (sign_error) {
            console.log(
              JSON.stringify({ "sign transaction error ": sign_error })
            );
          }

//raw transaction to be sent to the network.
          const rawTransaction = signedTransaction.rawTransaction;
          //sending the raw transaction after converting it in to hex format
          web3.eth.sendSignedTransaction(
            rawTransaction.toString("hex"),
            function(trans_err, txid) {
                     //printing the transaction hash or error
              if (trans_err)
                console.log(JSON.stringify({ "transaction error": trans_err }));

              if (txid && txid != "")
                console.log(JSON.stringify({ tx: txid, hash: txid }));
            }
          );
        });
      });
    });
  });
});