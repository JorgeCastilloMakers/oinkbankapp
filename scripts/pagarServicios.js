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

function contenido (nomSer, montoSer, venSer, ){
    const divs = document.createElement('div');
    const contenedorMonto = document.createElement('div');
    const signoPesos = document.createElement('label');
    const nombreServicio = document.createElement('h2');
    const montoServicio = document.createElement('span');
    const labelFecha = document.createElement('label');
    const vencimiento = document.createElement('p');
    const alerta = document.createElement('span');
    const btnPagar = document.createElement('button');
    btnPagar.setAttribute("id", "botonPagar");


    contenedorServicios.appendChild(divs);
    divs.appendChild(nombreServicio);
    divs.appendChild(contenedorMonto);
    contenedorMonto.appendChild(signoPesos);
    contenedorMonto.appendChild(montoServicio);
    divs.appendChild(labelFecha);
    divs.appendChild(vencimiento);
    divs.appendChild(alerta);
    divs.appendChild(btnPagar);

    btnPagar.innerHTML = "Pagar";
    
    signoPesos.innerHTML ="$ ";
    labelFecha.innerHTML = "Fecha de vencimiento:"
    nombreServicio.innerHTML = `${nomSer}`;
    montoServicio.innerHTML = `${montoSer}`;
    vencimiento.innerHTML = `${venSer}`;


////////COMPARACION DE VENCIMIENTO//////

    usuariONN.servicios.forEach(el => {

        if (el.nombre === nombreServicio.textContent){
            if (el.vencimiento.valueOf() < hoy.valueOf()){
                alerta.innerHTML = "Vencida";
                alerta.style.backgroundColor = "#ff00007a";
            } else if (el.vencimiento.valueOf() >= hoy.valueOf() ){
                alerta.innerHTML = "En Fecha"
            }


        }


    })
//////////////////////////////////////////

//////FUNCION PAGAR//////
    btnPagar.onclick = function (){
    
        usuariONN.servicios.forEach(el => {
            
          if(el.nombre === nombreServicio.textContent)
          { 
            
            if(usuariONN.saldo < el.monto){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡No tienes saldo!',
                    confirmButtonColor: '#FF9999',
                    footer: '<a href="/actionsUser/depositos.html">Haz click aquí para realizar un depósito</a>'
                  })
            }else{
                
                usuariONN.saldo = usuariONN.saldo - el.monto;
                el.pagado = true;
                el.fechaPago = `${hoy}`;
                localStorage.setItem("userON", JSON.stringify(usuariONN));
                Swal.fire({
                    icon: 'success',
                    title: 'Has pagado el servicio',
                    confirmButtonColor: '#FF9999',
                  })
                arrayDeUsers.forEach(e=>{
                    e.saldo = usuariONN.saldo;
                    if(usuariONN.nombre === e.nombre){
                        e.servicios.forEach(ele => {
                        
                        ele.pagado=true;
                        ele.fechaPago = `${hoy}`;
                        localStorage.setItem("users", JSON.stringify(arrayDeUsers));    
                        
                        btnPagar.setAttribute('disabled', true);


                        })
                        
                    }
                })
                divs.style.display = 'none';
            }
            
          }
    })}

}


///////CUANDO CARGA LA PAGINA CREA LAS CARDS
addEventListener('load', () => {


usuariONN.servicios.forEach(el => {
    if (el.pagado === false){
        contenido(el.nombre, el.monto, el.vencimiento);

    }

})    


})

