import "../stylesheets/app.css";
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract';

// Import our contract artifacts and turn them into usable abstractions.
import metacoin_artifacts from '../../build/contracts/MetaCoin.json'

var MetaCoin = contract(metacoin_artifacts);
var accounts;
var account;


if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

window.App = {
  login: () =>  {
    var qrcode =  require("/usr/lib/node_modules/qrcode-terminal/");
    var Connect = require("/usr/lib/node_modules/uport-connect/").Connect;
    var uriHandler = uri => qrcode.generate(uri, {small: true});
    var uport = new Connect('App', {uriHandler});
    web3 = uport.getWeb3()
    web3.eth.getCoinbase((e,r) => console.log(e,r));
    // uport.requestCredentials({requested: ['name', 'country']}).then(res => console.log(res));
  },
  start: () => {
    var self = this;
    // Bootstrap the Researcher abstraction for Use.
    MetaCoin.setProvider(web3.currentProvider);
    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts( (e, accs) => {
      if (e != null) {
        alert("There was an error fetching your accounts.");return;}
      if (accs.length == 0) {
        alert("Couldn't get any accounts!");return;}
      accounts = accs;
      account = accounts[0];
      self.refreshBalance();
    });
  },

  setStatus: (msg) =>  {
    var status = document.getElementById("status");
    status.innerHTML = msg;
  },

  reflectAWork: () => {
    // var self = this;
    var docID = parseInt(document.getElementById("docID").value);
    var researcher;
    MetaCoin.deployed().then((instance) => {
      researcher = instance;
      return reseacher.pushAWork(docID);
    }).then(() => {}).catch((e) => {console.log(e);});
  }
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
window.App.start();
});
