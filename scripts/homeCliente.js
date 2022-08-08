let userWelcome = document.getElementById("user-welcome");
let localStore = localStorage.getItem("userON");
let userLogOn = [];

if (localStore) {
    userLogOn = JSON.parse(localStore);
}
//acá lo que se hace es tomar la primer letra del nombre (0), pasarlo a mayúsculas con toUpperCase,
// y posteriormente se le suma el resto del string sin su primer letra. EJ: facundo --> F + acundo = Facundo
let user = userLogOn.nombre;

userWelcome.style.display = "block";
userWelcome.innerHTML = `${user}`;



let balance = document.getElementById('user-balance');

let userBalance = userLogOn.saldo;

balance.innerHTML = (`${userBalance}`);
