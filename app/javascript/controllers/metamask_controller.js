import { Controller } from '@hotwired/stimulus'
import Web3 from 'web3/dist/web3.min.js';

export default class extends Controller {
  static targets = ['address', 'balance', 'token_balance']

  connectWallet() {
    if (typeof ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
      try {
        // Request account access
        this.initializeWallet()
        return true
      } catch (e) {
        alert('oops, something went wrong !')
        // User denied access
        return false
      }
    }else{
      alert('Please install MetaMask or other wallets')
    }
  }

  async initializeWallet() {
    const token_address = '0xb905fF47F1778Bb4D8aA7b177fc0ad5698165331'
    let address = await this.getAccount()
    await this.getBalance(address)
    await this.getTokenBalance(token_address, address)
  }

  async getAccount() {
    let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    let account = accounts[0];
    this.addressTarget.innerHTML = account
    return account
  }

  async getBalance(address) {
    const web3 = new Web3(ethereum)
    let balance_in_wei = await web3.eth.getBalance(address)
    let balance = Math.round(web3.utils.fromWei(balance_in_wei, 'ether') * 10000) / 10000
    this.balanceTarget.innerHTML = balance
    return balance
  }

  async getTokenBalance(token_address, address) {
    const web3 = new Web3(ethereum)
    let minABI = [
      // balanceOf
      {
        "constant": true,
        "inputs": [{ "name": "_owner", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "name": "balance", "type": "uint256" }],
        "type": "function"
      }, {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{ "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ];
    const myContract = new web3.eth.Contract(minABI, token_address)
    let balance_raw = await myContract.methods.balanceOf(address).call();
    let decimals = await myContract.methods.decimals().call();
    let balance = Math.round(balance_raw / (10 ** decimals))
    this.token_balanceTarget.innerHTML = balance
    return balance
  }
}