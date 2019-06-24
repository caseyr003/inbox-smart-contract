const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

// UPDATE THESE TWO LINES RIGHT HERE FOR WEB3 VERSION 1.0.0-beta.26 <-----------------
// const provider = ganache.provider();
// const web3 = new Web3(provider);

let accounts;
let inbox;
const INITIAL_MESSAGE = 'Hi there!';
const NEW_MESSAGE = 'See you later!';

beforeEach(async () => {
    //list all accounts
    // web3.eth.getAccounts()
    //     .then(fetchedAccounts => {
    //         console.log(fetchedAccounts);
    //     });
    accounts = await web3.eth.getAccounts();

    //use account to deploy contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
        .send({ from: accounts[0], gas: '1000000' });

    // ADD THIS ONE LINE RIGHT HERE FOR WEB3 VERSION 1.0.0-beta.26 <---------------------
    // inbox.setProvider(provider);
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_MESSAGE);
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage(NEW_MESSAGE).send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, NEW_MESSAGE);
    });

});