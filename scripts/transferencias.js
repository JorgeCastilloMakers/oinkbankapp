
let montoInput = document.getElementById('monto-transferir');
let cbuInput = document.getElementById('cbu-destino');
let localStore = localStorage.getItem("users");
let userON = localStorage.getItem("userON");
/* let inputsToValidate = document.querySelectorAll('#transferencia-container input')  */

let succesTransfered= document.querySelector('#SuccesTransfered');
let incorrectOrEmpty = document.querySelector('#emptyIncorrect');

let addCBUButton = document.getElementById('addCBU-popUp');
let lightbox = document.querySelector('#lightbox-cbuAdd-msj')
let crossButton = document.querySelector('#img-click');
let addButton = document.querySelector('#add-a');
let selectCBU = document.querySelector('#select-input');
let emptyMSG = document.getElementById('empty-msg')
let closeEmptyPop = document.querySelector('#close-empty-idbutton');
let cbuDisabled = document.getElementById('cbu-disabled');
let cbuAddedMsj = document.querySelector('#cbu-added-message');
let showcontactlightbox = document.querySelector('#showcontactlightbox');
let sclButtonAceptar = document.querySelector('#showcontactlightbox button');



let arrayDeUsers = [];
let usuariONN = [];
let arrayDeCbus = [];



cbuAddedMsj.style.display="none"
incorrectOrEmpty.style.display="none"


lightbox.style.display="none"
showcontactlightbox.style.display="none"

let incorrect = true;

if(localStore)
{
    arrayDeUsers = JSON.parse(localStore);
}
if(userON)
{
    usuariONN = JSON.parse(userON);
}

let selectCBUarrays = usuariONN.agendaTransferencias;

let cargarCBUSselect = () =>{
   
   selectCBUarrays.forEach(elements =>{
        let option = document.createElement('option');
        let content = elements;
        option.setAttribute('id', 'option-select');
        
        arrayDeUsers.forEach(e =>{
            if(e.cbu === content)
            {
                content = e.nombre;
            }
        })

        option.value=elements;
        option.text=content;
        selectCBU.appendChild(option);
        
   })  
}
cargarCBUSselect();

//imprimir cbu del usuarioON.
let cargarCBUDefault = () =>{
    let cbuTitle = document.createElement('span');
    let content = document.createTextNode(usuariONN.cbu);
    cbuTitle.appendChild(content);
    cbuDisabled.appendChild(cbuTitle);

    cbuTitle.style.color="grey";
    cbuTitle.style.userSelect="none";
}
cargarCBUDefault();

//evento cuando se clickea una option en el SELECT CBU

//si se presiona el boton TRANSFERIR
addEventListener('submit', (e) =>{
    e.preventDefault();

    if(selectCBU.value === "" ||
    montoInput.value === "")
    {
        incorrectOrEmpty.style.display="flex";
        setTimeout(() =>{
            incorrectOrEmpty.style.display="none";
        },1200);
    }

    arrayDeUsers.forEach(elements=>{
        if(selectCBU.value === elements.cbu && montoInput.value != "")
        {
            if(usuariONN.saldo >= montoInput.value)
            {
		        elements.saldo = Number(elements.saldo) + Number(montoInput.value);
		            
		        usuariONN.saldo = usuariONN.saldo - montoInput.value;
		         
		        arrayDeUsers.forEach(e =>{
		            if(e.cbu === usuariONN.cbu)
		            {
		                e.saldo = e.saldo - montoInput.value;
		            }
		        })
		            
		        localStorage.setItem("userON", JSON.stringify(usuariONN));
		        localStorage.setItem("users", JSON.stringify(arrayDeUsers));

                //mensaje de exito
                Swal.fire({
                    title: 'Transferencia Realizada',
                    imageUrl: '/images/happy-pig.gif',
                    imageWidth: 100,
                    imageHeight: 100,
                    imageAlt: 'happy-pig',
                    confirmButtonColor: '#FF9999',
                  })



            }
            else{
                Swal.fire({
                    title: 'Oops...!',
                    text: 'No tienes fondos suficientes',
                    imageUrl: '/images/cry-pig.png',
                    imageWidth: 100,
                    imageHeight: 100,
                    imageAlt: 'cry-pig',
                    confirmButtonColor: '#FF9999',
                  })

            }
        }
       
    })
    

    
})


//te abre la ventanita del input para añadir un nuevo CBU
addCBUButton.addEventListener('click', (a)=>{
    lightbox.style.display="flex"
    
})

//registra cuando haces click en la cruz que cierra el popup de añadir CBU
crossButton.addEventListener('click', (e) =>{
    lightbox.style.display="none"
    
})

//lightbox que muestra la información (nombre, apellido y cbu) del usuario 
// al hacer click en agregar cbu.
let showContactInfo = (nombre, apellido, cbu) =>{
    showcontactlightbox.style.display="flex";
    document.getElementById('cbuid').innerHTML = `${cbu}`;
    document.getElementById('nombreapellido').innerHTML= `${nombre}, ${apellido}`;

    sclButtonAceptar.addEventListener('click', ()=>{
        showcontactlightbox.style.display="none";
    })

}

// si haces click en AGREGAR, dentro del popup de CBUadd
addButton.addEventListener('click', (e) =>{
    let cbu= cbuInput.value;
    
    let incorrect = true;

    if(cbu === "")
    {   
        incorrect = false;
        emptyMSG.style.display="flex"
        setTimeout(e=>{
            emptyMSG.style.display="none"
        },1000)
    }

    //se recorre el array de users, se busca una coincidencia de cbu y de ser true,
    //se crea un nuevo elemento de tipo option, se le agrega eltexto (cbu) y se almacena en el select
    
    arrayDeUsers.forEach(elements =>{
        if(elements.cbu ===cbu){
            if(!arrayDeCbus.includes(cbu)) //solucionar fix de repetir cbu's
            {  
                incorrect = false;
                if(!selectCBUarrays.includes(cbu)){
                
                    if(cbu !== usuariONN.cbu){
                        let newCbu = document.createElement('option');
                        let content = cbu;
                        newCbu.value = content;
                        newCbu.text = elements.nombre;
                        incorrect = false;
                        selectCBU.appendChild(newCbu);

                        //show info del contacto LIGHTBOX
                        showContactInfo(elements.nombre, elements.apellido, elements.cbu);
                        //end show info
                        //parte que almacena los nuevos contactos/cbu's
                        /* selectCBUarrays.push(elements.nombre);  */// nombre del usuario
                        arrayDeCbus.push(elements.cbu); //cbu del usuario
                        usuariONN.agendaTransferencias.push(elements.cbu);
                    
                    
            

                        arrayDeUsers.forEach(elements =>{
                            if(elements.cbu === usuariONN.cbu)
                            {
                                elements.agendaTransferencias.push(elements.cbu);
                            
                            }
                        }   )
                
                        localStorage.setItem("userON", JSON.stringify(usuariONN));
                        localStorage.setItem("users", JSON.stringify(arrayDeUsers));
                        cbuInput.value ="";
                        

                        cbuAddedMsj.style.display="flex";
                        setTimeout(() => {
                            cbuAddedMsj.style.display="none"
                        }, 800);
                        }else{
                            incorrect = false;
                            Swal.fire({
                                title: 'Oops...!',
                                text: '¡No puedes agendar tu propio CBU!',
                                confirmButtonColor: '#FF9999',
                              })


                            cbuInput.value = ""
                        }

                }else{
                    //cbu no repeat validation
                    cbuInput.value="";
                    incorrect = false;

                    Swal.fire({
                        title: 'Oops...!',
                        text: 'Error, el CBU ya esta agendado',
                        imageUrl: '/images/cry-pig.png',
                        imageWidth: 100,
                        imageHeight: 100,
                        imageAlt: 'cry-pig',
                        confirmButtonColor: '#FF9999',
                      })

                }

            }else{
                
                cbuInput.value="";
                incorrect = false;

                repeatLightbox.style.display="flex";
                setTimeout(()=>{
                    repeatLightbox.style.display="none";
                }, 1000);
                    
            }
            
        }
        })
        // si la variable incorrect sigue siendo true, significa que el programa no entró a la condicional
        //que valida que el cbu exista entre los usuarios creados. De ser así, se mostrará un error.
        if(incorrect === true){
            Swal.fire({
                title: 'Oops...!',
                text: 'No se encuentra ese CBU',
                imageUrl: '/images/cry-pig.png',
                imageWidth: 100,
                imageHeight: 100,
                imageAlt: 'cry-pig',
                confirmButtonColor: '#FF9999',
              })
        }

    })
    

// registra evento de click sobre la cruz que cierra el popup de "campo vacío"
/* closeEmptyPop.addEventListener('click', (e) =>{
    emptyMSG.style.display="none";

})
 */