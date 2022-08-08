//CONSTRUCTOR DE FECHA ACTUAL
let fechaActual = new Date();
let año = fechaActual.getFullYear();
let mes = fechaActual.getMonth() + Number(1);
let dia = fechaActual.getDate();

if (mes < 10){
    mes = "0"+(fechaActual.getMonth()+ Number(1));
}
if (dia < 10){
    dia = "0"+(fechaActual.getDate());
}

let hoy = `${año}-${mes}-${dia}`;

/////////////////////TRAYENDO LOS DATOS DE USUARIOS////////////////////////////////////
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
///////////////////////////////////////////////////////////




//CREAMOS EL HTML DE LAS CARDS
let contenedorServicios = document.querySelector('#contenedorServicios');

function contenido (nomSer, montoSer){

    const divs = document.createElement('div');
            const contenedorMonto = document.createElement('div');
            const nombreServicio = document.createElement('h2');
            const signoPesos = document.createElement('label');
            const montoServicio = document.createElement('span');
            const labelFechaPago = document.createElement('label');
            const fechaPago = document.createElement('p');
         

            contenedorServicios.appendChild(divs);
            divs.appendChild(nombreServicio);
            divs.appendChild(contenedorMonto);
            contenedorMonto.appendChild(signoPesos);
            contenedorMonto.appendChild(montoServicio);
            divs.appendChild(labelFechaPago);
            divs.appendChild(fechaPago);


            labelFechaPago.innerHTML = "Fecha de pago: ";

            signoPesos.innerHTML = "$";
            nombreServicio.innerHTML = `${nomSer}`;
            montoServicio.innerHTML = `${montoSer}`;

                usuariONN.servicios.forEach(e => {
                 if (e.nombre === nombreServicio.textContent){
                        feDePago = e.fechaPago;
                        fechaPago.innerHTML = `${feDePago}`; 
                        }
                    })



        } 


///////CUANDO CARGA LA PAGINA CREA LAS CARDS
addEventListener('load', () => {

usuariONN.servicios.forEach(el => {
    if (el.pagado === true){
        contenido(el.nombre, el.monto);
    }
})    


})