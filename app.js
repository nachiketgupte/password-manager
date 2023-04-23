const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const Web3 = require('web3');
const contract = require('truffle-contract');

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
const myContractArtifact = require('./build/contracts/passwordManager.json');

const MyContract = contract(myContractArtifact);
MyContract.setProvider(web3.currentProvider);
const contractAbi = require('./build/contracts/passwordManager.json').abi;
const contractAddress = require('./build/contracts/passwordManager.json').networks[5777].address;
const passwordManager = new web3.eth.Contract(contractAbi, contractAddress);

app.get('/deploy', async (req, res) => {
    try {
      // Steps to deploy the contract go here
      const contractInstance = await MyContract.deployed();
      const contractAddress = contractInstance.address;
      res.send(`Contract deployed at address: ${contractAddress}`);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error deploying contract');
    }
});


app.get('/myFunction', (req, res) => {
    passwordManager.methods.addNewPassword('nac', '123', 'fb').send({from: '0x214DAa794A170973c995C22bA5297C407Cfb3983', gas:150000})
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        // Handle errors
        res.send(error);
      });
});

app.get('/fetchPassword',async (req,res)=>{
    const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);
    try {
        const password = await contractInstance.methods.fetchPassword('fb').call({from:'0x214DAa794A170973c995C22bA5297C407Cfb3983'});
        res.send(`Password for fb: ${password}`);
      } catch (err) {
        res.status(500).send(`Error getting password: ${err}`);
      }
})


app.get("/",(req,res)=>{
    res.render("index");
})
app.listen(3000,()=>{
    console.log('Server running on port 3000');
})

