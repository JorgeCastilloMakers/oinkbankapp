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
    const labelNombreServicio = document.createElement('label');
    const nombreServicio = document.createElement('h2');
    const montoServicio = document.createElement('span');
    const vencimiento = document.createElement('p');
    const alerta = document.createElement('span');
    const btnDesvincular = document.createElement('button');
    btnDesvincular.setAttribute("id", "botonDesvincular");


    contenedorServicios.appendChild(divs);
    divs.appendChild(labelNombreServicio);
    divs.appendChild(nombreServicio);
    divs.appendChild(contenedorMonto);
    contenedorMonto.appendChild(signoPesos);
    contenedorMonto.appendChild(montoServicio);
    divs.appendChild(vencimiento);
    divs.appendChild(alerta);
    divs.appendChild(btnDesvincular);

    btnDesvincular.innerHTML = "Desvincular";
    
    signoPesos.innerHTML = "$";
    labelNombreServicio.innerHTML = "Servicio: "
    nombreServicio.innerHTML = `${nomSer}`;
    montoServicio.innerHTML = `${montoSer}`;
    vencimiento.innerHTML = `${venSer}`;
////////COMPARACION DE VENCIMIENTO//////

    usuariONN.servicios.forEach(el => {

        if (el.nombre === nombreServicio.textContent){
           if (el.pagado != true){
            alerta.innerHTML = "Sin Abonar";
            alerta.style.backgroundColor = "#ff00007a";
           } else {
            alerta.innerHTML = "Pagado";
           }
           

        }


    })
//////////////////////////////////////////

//////FUNCION DESVINCULAR////// con bugs
    btnDesvincular.onclick = function (){    
        usuariONN.servicios.forEach(el => {            
          if(el.nombre === nombreServicio.textContent){
            if (!el.pagado === false){
                        let index = usuariONN.servicios.indexOf(el);
                        usuariONN.servicios.splice(index, 1);
                        localStorage.setItem("userON", JSON.stringify(usuariONN));
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Se ha desvinculado el servicio',
                            timer: 1500,
                            confirmButtonColor: '#FF9999',
                        })

                        
                        arrayDeUsers.forEach(e=>{
                            if(e.nombre === usuariONN.nombre)
                            {   
                                e.servicios.forEach(ea=>{
                                    e.servicios.splice(index, 1);
                                
                                    localStorage.setItem("users", JSON.stringify(arrayDeUsers));
                                })
                            }
                        })     
                
            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No puedes desvincular un servicio impago',
                    confirmButtonColor: '#FF9999',
                    footer: '<a href="/actionsUser/pagarServicios.html">¿Quieres pagarlo antes?</a>'
                  })

                }      
            
          }
    })}

}


///////CUANDO CARGA LA PAGINA CREA LAS CARDS
addEventListener('load', () => {

usuariONN.servicios.forEach(el => {
        contenido(el.nombre, el.monto, el.vencimiento);

})    


})