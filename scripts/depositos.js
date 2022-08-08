let cbuPropio = document.getElementById("cbu-user");
let localStore = localStorage.getItem("users");
let userON = localStorage.getItem("userON");
let cbuTercero = document.querySelector('#cbu-tercero');
let montoDepositoTercero = document.querySelector('#monto-deposito-tercero');
let montoDepositarPropio = document.querySelector('#monto-deposito-propio');
let motivoDepositoPropio = document.querySelector('#motivo-deposito-propio')
let divCtaPropia = document.getElementById("cta-propia");
let botonCtaPropia = document.getElementById("btn-cta-propia");
let divCtaTercero = document.getElementById("cta-terceros");
let botonCtaTercero = document.getElementById("btn-cta-terceros");
let botonClose= document.getElementById("close-window");
let botonCloseTerceros= document.getElementById("close-window-terceros");


divCtaPropia.style.display = "none";
divCtaTercero.style.display = "none";

botonCtaPropia.onclick = function(){
    divCtaPropia.style.display = "flex";
    divCtaTercero.style.display = "none";
}
botonCtaTercero.onclick = function(){
    divCtaPropia.style.display = "none";
    divCtaTercero.style.display = "flex";
}
botonClose.onclick = function(){
    divCtaPropia.style.display = "none";
    divCtaTercero.style.display = "none";
}
botonCloseTerceros.onclick = function(){
    divCtaTercero.style.display = "none";
}


let arrayDeUsers = [];
let usuariONN = [];
let usuarioDestino = [];

if(localStore)
{
    arrayDeUsers = JSON.parse(localStore);
}
if(userON)
{
    usuariONN = JSON.parse(userON);
}
if(localStore)
{
    usuarioDestino = JSON.parse(localStore);
}


let cbu = usuariONN.cbu;
cbuPropio.style.display = "block";
cbuPropio.innerHTML = `${cbu}`;
// cbuTercero.style.display = "block";
let saldoActual = usuariONN.saldo;

    
function depositarPropia(){
 
    if(montoDepositarPropio.value !== "0") {
        saldoActual = Number(montoDepositarPropio.value) + Number(saldoActual);
        usuariONN.saldo = saldoActual;
        localStorage.setItem("userON", JSON.stringify(usuariONN));

        arrayDeUsers.forEach(user => {
            if(user.cbu === usuariONN.cbu) {
                user.saldo = Number(saldoActual);
                localStorage.setItem("users", JSON.stringify(arrayDeUsers));
            };
        });

        Swal.fire({
            title: '¡Su deposito se realizo con éxito!',
            imageUrl: '/images/happy-pig.gif',
            imageWidth: 100,
            imageHeight: 100,
            imageAlt: 'happy-pig',
            confirmButtonColor: '#FF9999',
          })

    } else {
    Swal.fire({
        title: 'Oops...!',
        text: 'Su deposito no pudo ser procesado.',
        imageUrl: '/images/cry-pig.png',
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: 'cry-pig',
        confirmButtonColor: '#FF9999',
      })
    document.getElementById("monto-deposito-propio").value="";
    divCtaPropia.style.display = "none";
};

function depositarTerceros() {
    arrayDeUsers.forEach(elements=> {
        if(cbuTercero.value === elements.cbu) {
            console.log("test primera condicion");
            if(usuariONN.saldo >= montoDepositoTercero.value) {
                elements.saldo = Number(elements.saldo) + Number(montoDepositoTercero.value); 
                usuariONN.saldo = Number(usuariONN.saldo) - Number(montoDepositoTercero.value);
                console.log("segunda condicion")
                arrayDeUsers.forEach(e => {
                    if (e.cbu === usuariONN.cbu) {
                        e.saldo = e.saldo - montoDepositoTercero.value;
                    }
                    localStorage.setItem("userON", JSON.stringify(usuariONN));
                    localStorage.setItem("users", JSON.stringify(arrayDeUsers));
                    console.log("test tercera condicion")
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Su transferencia se realizó con éxito',
                        showConfirmButton: true,
                        timer: 3000,
                        confirmButtonColor: '#FF9999',
                        customClass:'sweet-fire',
                    })
                    console.log("cuarta")
                });
            } else {
                console.log("quinta - error");
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Su transferencia no pudo ser procesada.',
                    showConfirmButton: true,
                    timer: 3000,
                    confirmButtonColor: '#FF9999',
                    customClass:'sweet-fire',
                })
            };
        };
    });
    document.getElementById("monto-deposito-tercero").value="";
    divCtaTercero.style.display = "none";    
};
}