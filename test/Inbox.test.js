const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

beforeEach(async () => {
    //list all accounts
    // web3.eth.getAccounts()
    //     .then(fetchedAccounts => {
    //         console.log(fetchedAccounts);
    //     });
    web3.eth.getAccounts()
    .then(fetchedAccounts => {
        console.log(fetchedAccounts);
    });

    //use account to deploy contract

});

describe('Inbox', () => {
    it('deploys a contract', () => {

    });
});