var autoRetrieveFlag = false; //true
var nodeType = 'geth';
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

  startUp();

})

function startUp(){

    if(web3 && web3.isConnected()){
        setData('connect_status','Connected', false);
        setWeb3version();
    }else{
        setData('connect_status','Not Connected', true);
    }

}

function setWeb3version(){
    var versionJson = {};

    web3.version.getNode(function( error, result){
        if(error) setData('version_information', error, true );
        else{
            setData('version_information', result, false)
        }

        if (result.toLowerCase().includes('metamask')){
            nodeType = 'metamask';
        }else if( result.toLowerCase().includes('testrpc')){
            nodeType = 'testrpc';
        }else
            nodeType = 'geth';
    })
}
