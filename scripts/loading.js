/* let loaded = true; */
let localStore = localStorage.getItem("users");
let userON = localStorage.getItem("userON");


let arrayDeUsers = [];
let usuariONN = [];

if(localStore)
{
    arrayDeUsers = JSON.parse(localStore);
}
if(userON)
{
    usuariONN = JSON.parse(userON);
}
//setear loaded como true
arrayDeUsers.forEach(e=>{
    console.log(e.loaded)
    e.loaded = true;
    localStorage.setItem("users", JSON.stringify(arrayDeUsers));
})
//si se bugea, hacer lo de arriba con USUARIONN
//**// *//

setTimeout(e=>{
    location.href= "/actionsUser/homeCliente.html"
},2000)