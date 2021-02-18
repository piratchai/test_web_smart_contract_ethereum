/*
* Ref : https://gist.github.com/bajcmartinez/45bb7bb39fea940cd45a5e88759f58a5#file-web3-demo-html
* Ref : https://www.youtube.com/watch?v=9BjmH4lqRh4&feature=emb_logo
** ฟังก่อน : ไว้สำหรับ test concept การเรียกใช้ โดยใช้ web3 ของ javascript **
1. link to Metamask หาก deploy ผ่าน remix ใน network ใด ต้อง copy destination address มาระบุไว้ใน configuration, และ abi 
*/

var local = {};

setTimeout(function() {
    // -- set local ethereum -- //
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
    }

    // -- load inital -- //
    initial();
}, 0)

function initial() {
    functions();
    configurations();
    constants();
    loads();
}

function constants() {

}

async function loads() {
    local.on();
    local.updateStatus('Ready!');
    local.off();
}

async function configurations() {
    // -- load smart contract from test network -- //
    window.contract = await new window.web3.eth.Contract([{
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "getOwner",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getOwnerTest1",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getUsername",
            "outputs": [{
                "internalType": "string",
                "name": "",
                "type": "string"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "string",
                "name": "_username",
                "type": "string"
            }],
            "name": "setUsername",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ], '0xc335b3b8ce4086faff28d3f3c960a59d9829c2a4');
}

function functions() {
    local.getUsername = async function() {
        local.updateStatus('load username ...');
        const username = await window.contract.methods.getUsername().call();
        local.updateStatus(`username: ${username}`);
    }

    local.setUsername = async function() {
        local.on();
        local.updateStatus('set username ...');
        const account = await local.getCurrentAccount();
        var username_value = document.getElementById('username').value

        if (username_value == '') {
            local.off();
            alert('Please, input username.');
            return;
        }

        const result_setValue = await window.contract.methods.setUsername(username_value)
            .send({ from: account })
            .then(
                // -- success -- //
                function(r) {

                    local.updateStatus(`username: ${username_value}`);
                    console.log('set Username success : ', r)
                },
                // -- error -- //
                function(e) {

                    local.updateStatus(`username: ${username_value}`);
                    console.log('set Username error : ', e.message)
                });

        local.off();
    }

    local.getCurrentAccount = async function() {
        const accounts = await window.web3.eth.getAccounts();
        return accounts[0];
    }

    local.getOwner = async function() {
        local.updateStatus('load owner  ...');
        const owner = await window.contract.methods.getOwner().call();
        local.updateStatus(`owner : ${owner}`);
    }

    local.getOwnerTest1 = async function() {
        local.updateStatus('load owner1  ...');
        const ownerTest1 = await window.contract.methods.getOwnerTest1().call();
        local.updateStatus(`owner1 : ${ownerTest1}`);
    }

    local.updateStatus = function(status) {
        const statusEl = document.getElementById('status');
        statusEl.innerHTML = status;
        console.log(status);
    }

    // -- set control -- //
    local.on = function() {
        local.setDisabledControl(true);
        $("div.spanner").addClass("show");
        $("div.overlay").addClass("show");
    }

    local.setDisabledControl = function(value) {
        var inputUsername = document.getElementById('username');
        inputUsername.disabled = value;

        var btnSetUsername = document.getElementById('setUsername');
        btnSetUsername.disabled = value;
    }

    local.off = function() {
        $("div.spanner").removeClass("show");
        $("div.overlay").removeClass("show");
        local.setDisabledControl(false);
    }

    // -- / set control -- //
}