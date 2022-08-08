let userCBU = document.getElementById("user-cbu");
let userName = document.getElementById("user-name");
let userApell = document.getElementById("user-apell");
let balance = document.getElementById('user-balance');

let localStore = localStorage.getItem("userON");
let userLogOn = [];

if (localStore) {
    userLogOn = JSON.parse(localStore);
}

let cbu = userLogOn.cbu;
userCBU.style.display = "block";

let nombre = userLogOn.nombre;
userName.style.display = "block";

let apellido = userLogOn.apellido;
userApell.style.display = "block";

userCBU.innerHTML = `${cbu}`;
userName.innerHTML = `${nombre}`;
userApell.innerHTML = `${apellido}`;


let userBalance = userLogOn.saldo;

balance.innerHTML = (`${userBalance}`);

function copiarCBU() {

    navigator.clipboard.writeText(cbu);

    Swal.fire({
        position: 'center',
        confirmButtonColor: '#FF9999',
        title: 'Copiado en el portapapeles!',
        timer: 1500,
      })



}
