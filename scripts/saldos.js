let localStore = localStorage.getItem("userON");
let balance = document.getElementById('user-balance');
let userLogOn = [];

if (localStore) {
    userLogOn = JSON.parse(localStore);
}

let userBalance = userLogOn.saldo;

balance.innerHTML = (`${userBalance}`);