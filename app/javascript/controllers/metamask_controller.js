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
    const contract_address = '0xb905fF47F1778Bb4D8aA7b177fc0ad5698165331'
    let address = await this.getAccount()
    await this.getBalance(address)
    await this.getContractBalance(contract_address, address)
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

  async getContractBalance(contract_address, address) {
    const web3 = new Web3(ethereum)
    let minABI = [
      // balanceOf
      {
        "constant": true,
        "inputs": [{ "name": "_owner", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "name": "balance", "type": "uint256" }],
        "type": "function"
      }
    ];
    const myContract = new web3.eth.Contract(minABI, contract_address)
    let balance_in_wei = await myContract.methods.balanceOf(address).call();
    let balance = Math.round(web3.utils.fromWei(balance_in_wei, 'ether') * 10000) / 10000
    this.token_balanceTarget.innerHTML = balance
    return balance
  }
}