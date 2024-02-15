//accounts fron-to, check balance and transfer btn
const accountInput = document.querySelector('#fromAccount');
const btnCheck = document.querySelector('#btnCheck');

const amountInput = document.querySelector('#amount');

const toInput = document.querySelector('#toAccount');
const btnTransfer = document.querySelector('#btnTransfer');

//history table
const history = document.querySelector('#history');
const from = document.querySelector('#Hfrom');
const to = document.querySelector('#Hto');
const time = document.querySelector('#Htime');
const value = document.querySelector('#Hvalue');

//http from ganache, can be any web3 provider
const rpc = new Web3('HTTP://127.0.0.1:7545');

let account;

function initApp() {
    console.log('Initializing app...');
}


//check and display balance acc 1
async function checkBalance() {
    account = accountInput.value;
    const balance = await rpc.eth.getBalance(account);
    balanceFrom.innerHTML =rpc.utils.fromWei(balance, 'ether');

    const block = await rpc.eth.getBlock('latest');
    console.log(block); 

    if( block === null) return;
    
    const transactions = block.transactions;
    
    if (transactions !== null) {
        displayHistory(transactions);
    }
}

// display history
async function displayHistory(transactions) {
    history.innerHTML = '';
    for (let hash of transactions) {
       // console.log(hash);
        let tx = await rpc.eth.getTransaction(hash);
       // console.log(tx);
        createTransactionList(tx);
    }
}


function createTransactionList(transaction) {
    history.innerHTML += `
    <div class="transaction">
        <span>From: ${transaction.from}</span>
        <span>To: ${transaction.to}</span>
        <span>Value: ${rpc.utils.fromWei(transaction.value, 'ether')}</span>
    </div>
    `;
}


//display success message
function displaySuccessMessage() {
    alert('Transaction successful!');
}

async function updateBalance() {
    const balance = await rpc.eth.getBalance(account);
    balanceFrom.innerHTML = rpc.utils.fromWei(balance, 'ether');
}

//transfer
async function sendTransaction() {
    const toAccaunt = toInput.value;
    const amount = amountInput.value;

try{
    const tx = await rpc.eth.sendTransaction({
        from: account,
        to: toAccaunt,
        value: rpc.utils.toWei(amount, 'ether')
    });
    toInput.value = '';
    amountInput.value = '';  
    updateBalance();
    displaySuccessMessage();
} catch(error) {
    console.log(error);

}
}

document.addEventListener('DOMContentLoaded', initApp);
btnCheck.addEventListener('click', checkBalance);
btnTransfer.addEventListener('click', sendTransaction);