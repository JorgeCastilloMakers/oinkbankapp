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

let hoy = `${dia}-${mes}-${año}`;

//errores
let emptyError = document.getElementById('empty-error-add-service');
let invalidService = document.getElementById('service-invalid-error');
let noSaldoError = document.getElementById('nosaldo-error');

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


const expresion = {

	nombreService: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.

};



addEventListener('load', (e) =>{
    emptyError.style.display="none"
    invalidService.style.display="none" 
    noSaldoError.style.display="none"
})


function adherirServicio (){
    let nombreServicio = document.getElementById("nombreServicio");
    let montoServicio = document.getElementById("montoServicio");
    let vencimientoServicio = document.getElementById("vencimiento");   



    let nuevoServicio = {
        nombre: nombreServicio,
        monto: montoServicio,
        vencimiento: vencimientoServicio,
        pagado: false,
        fechaPago: "",
    };

    if(!nombreServicio.value ||
        !montoServicio.value ||
         !vencimientoServicio.value)
         {
            emptyError.style.display="flex";
            setTimeout(e =>{
                emptyError.style.display="none"
            }, 3000)
         }
    else if(expresion.nombreService.test(nombreServicio.value))
    {   
       if(montoServicio.value !== "0")
       {
            nuevoServicio.nombre = nombreServicio.value;
            nuevoServicio.monto = montoServicio.value;
            nuevoServicio.vencimiento = vencimientoServicio.value;
        
        
            usuariONN.servicios.push(nuevoServicio);
            arrayDeUsers.forEach(el => {
                if (usuariONN.cbu === el.cbu){
                    el.servicios.push(nuevoServicio);

                    localStorage.setItem('userON', JSON.stringify(usuariONN));
                    localStorage.setItem('users', JSON.stringify(arrayDeUsers));
                    location.href = "/actionsUser/servicios.html";
                }

        })
       }else{
        noSaldoError.style.display="flex";
        setTimeout(e =>{
           noSaldoError.style.display="none"
        }, 3000)
       }
       
    }else{
        invalidService.style.display="flex";
            setTimeout(e =>{
                invalidService.style.display="none"
            }, 3000)
    }
    
        


    


   



};
    





