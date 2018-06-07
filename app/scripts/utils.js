// setting ui data

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
    //removeAllChildItems('send_from_account');
    //removeAllChildItems('send_to_account');
    removeAllChildItems('select_to_unlock_account');
    for (var i = 0; i < accounts.length; i++) {
        //addOptionToSelect('send_from_account', accounts[i].substring(0,15)+'...', accounts[i]);
        //addOptionToSelect('send_to_account', accounts[i].substring(0,15)+'...', accounts[i]);
        addOptionToSelect('select_to_unlock_account', accounts[i].substring(0,15)+'...', accounts[i]);
    }
}

function addOptionToSelect(selectId, text, value){
    var option = document.createElement('OPTION');
    option.text = text;
    option.value = value;
    var select = document.getElementById(selectId);
    select.appendChild(option);
}