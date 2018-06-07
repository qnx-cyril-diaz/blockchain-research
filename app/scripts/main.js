var autoRetrieveFlag = false; //true
var nodeType = 'geth';
var accounts;

//On load

window.addEventListener('load', function(){

  if(typeof web3 !== 'undefined'){
      web3 = new Web3(web3.currentProvider);
      console.log('injected web3 found')
  } else {
        console.log('injected web3 not found')
        web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        var provider = document.getElementById('provide_url').value;
        web3 = new Web3(new Web3.providers.HttpProvider(provider));
  }

  startApp();

})

function startApp(){

    if(web3 && web3.isConnected()){
        setData('connect_status','Connected', false);
        setWeb3version();
        if(autoRetrieveFlag) doGetAccounts();
    }else{
        setData('connect_status','Not Connected', true);
    }
    //doConnect();
    doGetNodeStatus();
}
function doConnect()    {

    // Get the provider URL
    var provider = document.getElementById('provider_url').value;
    var provider = document.getElementById('provider_url').value;
    window.web3 = new Web3(new Web3.providers.HttpProvider(provider));
    startApp();

}


function doGetNodeStatus(){

    web3.net.getListening(function(error, result){
        //console.log(result)
        if (error) setData('get_peer_count', error, true);
        else{
            web3.net.getPeerCount(function(error, result){
                if (error){
                    setData('get_peer_count', error, true);
                }else{
                    //console.log(result)
                    setData('get_peer_count','Peer Count ' + result, (result==0));
                }
            })
        }
    });
}

function setWeb3version(){
    var versionJson = {};

    web3.version.getNode(function( error, result){
        if(error) setData('version_information', error, true );
        else{
            setData('version_information', result, false)
            console.log('ver'+result)
        }

        if (result.toLowerCase().includes('metamask')){
            nodeType = 'metamask';
        }else if( result.toLowerCase().includes('testrpc')){
            nodeType = 'testrpc';
        }else
            nodeType = 'geth';
    })

    setUIBasedOnNodeType();
}

function doGetAccounts(){
    
    web3.eth.getAccounts(function(error, result){
        //console.log('result'+result)
        if(error){
            setData('accounts_count', error, true );
        }else{
            accounts = result;
            setData('accounts_count', ' ' + result.length, false);
            console.log('result.length'+result.length)
            if(result.length == 0){             
                if(nodeType == 'metamask'){
                    alert('Unlock Metamask and click Get Accounts')
                }
                return;
            }
        }

        removeAllChildItems('accounts_list');

        for (var i = 0; i < result.length; i++){
            addAccountsToList('accounts_list', i, result[i]);
        }

        var coinbase = web3.eth.coinbase;
        //console.log(coinbase);
        setData('coinbase', '' + coinbase, false);

        var defaultAccount = web3.eth.defaultAccount;
        if(!defaultAccount){
            web3.eth.defaultAccount = result[0];
            defaultAccount = '[Undefined]' + result[0];
        }

        setData('defaultAccount', ' ' + defaultAccount, false);

        doGetBalances(accounts);
        console.log(accounts);
        addAccountsToSelects(accounts);
    })
}

function doGetBalances(accounts){

    removeAllChildItems('account_balances_list');

    for (var i= 0; i<accounts.length; i++){
        web3.eth.getBalance(accounts[i], web3.eth.defaultBlock, function(error, result){
            var bal = web3.fromWei(result, 'ether').toFixed(2);
            addAccountBalancesToList('account_balances_list', i, bal)
        })
    }
}

function doUnlockAccount(){
    setData('lock_unlock_result', 'fetching', true);
    var account = document.getElementById('select_to_unlock_account').value;
    //var account = $('#select_to_unlock_account')[0].value;
    var password = document.getElementById('unlock_account_password').value;
   
    web3.personal.unlockAccount(account, password, function(error, result){
        if(error){
            setData('lock_unlock_result', error, true);
        }else{
            if (result){
                setData('lock_unlock_result', 'Unlocked ' + account, false);
            }else{
                setData('lock_unlock_result', 'Invalid Password', true);
            }
        }
    })
}

function doLockAccount(){
    setData('lock_unlock_result', 'fetching', true );
    var account = document.getElementById('select_to_unlock_account').value;

    web3.personal.lockAccount(account, function(error, result){
        console.log(error, result);
        if (error){
            setData('lock_unlock_result', error, true);
        } else{
            setData('lock_unlock_result', 'Locked ' + account, false);
        }
    });
}
