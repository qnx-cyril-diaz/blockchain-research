// setting ui data
var etherscanBaseUrl='https://ropsten.etherscan.io/';

function setData(docElementId, html, errored){
    document.getElementById(docElementId).innerHTML = html;
    if (errored) document.getElementById(docElementId).classList = 'notready';
    else document.getElementById(docElementId).classList = 'ready';
}

function  setUIBasedOnNodeType(){

}

function removeAllChildItems(elementId){
    var ele = document.getElementById(elementId);
    //console.log(ele);
    while(ele.hasChildNodes()){
        ele.removeChild(ele.firstChild);
    }
}
function addAccountBalancesToList(listId, index, accountBalance){
    var li = document.createElement('LI');
    li.class = 'ready';
    var input = document.createElement('P');
    input.class = 'ready';
    input.innerText = accountBalance + ' Ether';
    li.appendChild(input);
    var list = document.getElementById(listId);
    list.appendChild(li);
}

function addAccountsToList(listId, index, account){
    var li = document.createElement('LI');
    var input = document.createElement('INPUT');
    input.value = account;
    input.id = 'account' + index;
    input.disable = true;
    li.appendChild(input);
    var list = document.getElementById(listId);
    list.appendChild(li);
}

function  addAccountsToSelects(accounts){  
    console.log(accounts);
    removeAllChildItems('send_from_account');
    removeAllChildItems('send_to_account');
    removeAllChildItems('select_to_unlock_account');
    for (var i = 0; i < accounts.length; i++) {
        addOptionToSelect('send_from_account', accounts[i].substring(0,15)+'...', accounts[i]);
        addOptionToSelect('send_to_account', accounts[i].substring(0,15)+'...', accounts[i]);
        addOptionToSelect('select_to_unlock_account', accounts[i].substring(0,15)+'...', accounts[i]);
    }
}

function addOptionToSelect(selectId, text, value){
    var option = document.createElement('OPTION');
    option.text = text;
    option.value = value;
    var select = document.getElementById(selectId);
    select.appendChild(option)
}

function generateTransactionJSON(){
    var toObject = createTransactionObject();
    console.log(toObject);
    setData('send_transaction_object_json', JSON.stringify(toObject,undefined,3), false);
}

function createTransactionObject(){
    var txObject = {}

    txObject.from = document.getElementById('send_from_account').value;
    txObject.to = document.getElementById('send_to_account_value').value;
    var valueEther = document.getElementById('send_value_in_ether').value;
    var valueInWei = web3.toWei(valueEther, 'ether');
    txObject.value = valueInWei;

    if(document.getElementById('send_gas') !== 'default'){
        txObject.gas = document.getElementById('send_gas').value;
    }
    if(document.getElementById('send_gas_price') !== 'default'){
        txObject.gasPrice = document.getElementById('send_gas_price').value;
    }
    if(document.getElementById('send_data') !== 'default'){
        var data = document.getElementById('send_data').value;
        txObject.data = web3.toHex(data);
    }
    if(document.getElementById('send_nonce') !== 'default'){
        txObject.nonce = document.getElementById('send_nonce').value;
    }

    return txObject;
}

function resetTransactionObjectParameters(){
    document.getElementById('send_gas').value = 'default';
    document.getElementById('send_gas_price').value = 'default';
    document.getElementById('send_data').value = 'default';
    document.getElementById('send_nonce').value = 'default';
    document.getElementById('send_value_in_ether').value = 0;
    generateTransactionJSON();
}

function createEtherscan(){
    var url = etherscanBaseUrl;
    
    if(type === 'tx'){
        url += 'tx/'+hashOrNumber;
    } else if(type === 'block'){
        url += 'block/'+hashOrNumber;
    } else if(type === 'address'){
        url += 'address/'+hashOrNumber;
    } 
    return url;
}