var formulario = document.getElementById('formm');
var inputs = document.querySelectorAll('#formm input');
let users = JSON.parse(localStorage.getItem('users')) || [];

let errorRepeated = document.getElementById('errorRepeatedUser');

let localStore = localStorage.getItem("users");
let arrayDeUsers = [];

if(localStore)
{
    arrayDeUsers = JSON.parse(localStore);
}



const expresion = {
	usuario: /^[a-zA-Z0-9\_\-]{4,10}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{5,10}$/, // 4 a 12 digitos.
};

let camposStatus= {
    name: false,
    apell:false,
    user:false,
    pass:false
}


addEventListener('load', (e) =>{
    errorRepeated.style.display="none"
})

/* validación del formulario */ 
let validate = (e) =>{
    let actualInputName = e.target.name;

    switch (actualInputName){
        case "name":
            campusValidate(expresion.nombre, e.target, e.target.name);
        break;
        case "apell":
            campusValidate(expresion.nombre, e.target, e.target.name);
        break;
        case "user":
            campusValidate(expresion.usuario, e.target, e.target.name);
        break;
        case "pass":
            campusValidate(expresion.password, e.target, e.target.name);
        break;
    }
}

const campusValidate=(expresion, actualInput, campo)=>{
    if(expresion.test(actualInput.value)){
        document.getElementById(`${campo}Group`).classList.remove('form-group-incorrecto');
        document.getElementById(`${campo}Group`).classList.add('form-group-correcto');
        document.querySelector(`#${campo}Group i`).classList.add('fa-check-circle');
        document.querySelector(`#${campo}Group i`).classList.remove('fa-times-circle');
        /* document.querySelector(`#${campo}Group p`).style.display="none"; */
        camposStatus[campo] = true;
        let userInput = document.querySelector('#user');

        arrayDeUsers.forEach(e=>{
           
            if(e.user === userInput.value)
            {
                camposStatus.user = false;
            }
        })
    }else{
        document.getElementById(`${campo}Group`).classList.add('form-group-incorrecto');
        document.getElementById(`${campo}Group`).classList.remove('form-group-correcto');
        document.querySelector(`#${campo}Group i`).classList.remove('fa-check-circle');
        document.querySelector(`#${campo}Group i`).classList.add('fa-times-circle');
       /*  document.querySelector(`#${campo}Group p`).style.display="flex"; */
        camposStatus[campo] = false;
    }
}


inputs.forEach(elements =>{
    elements.addEventListener('keyup', validate);
    elements.addEventListener('blur',validate);
})

let cbuGenerate = () =>{
    return 'OINK-xxxx-xxxx-4xxx-yxxx-xx'.replace(/[xy]/g, function (c){
        let r  = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

addEventListener('submit', (e) =>{
    e.preventDefault();
    

    let nombreSaved = document.getElementById("name").value;
    let nombreSToUpperCase = nombreSaved[0].toUpperCase() + nombreSaved.substring(1).toLowerCase();
    let apellSaved = document.getElementById("apell").value;
    let apellSToUpperCase = apellSaved[0].toUpperCase() + apellSaved.substring(1).toLowerCase();

    let userSaved = document.getElementById("user").value;
    let passSaved = document.getElementById("pass").value;

    if(camposStatus.name && camposStatus.apell
        && camposStatus.user && camposStatus.pass)
        {  
                             
            document.getElementById('error').style.display="none";
        
            let plata = 10000;
        
            let newUser = {
                nombre: nombreSToUpperCase,
                apellido: apellSToUpperCase,
                user: userSaved,
                pass: passSaved,
                cbu: cbuGenerate(),
                saldo: plata,
                agendaTransferencias: [],
                servicios: [],
                loaded:false,
            };
        
            users.push(newUser);
            
            localStorage.setItem('users', JSON.stringify(users));
        
            window.location.href=("/actionsUser/login.html");
           
            //SI USERNAME === FALSE, SIGNIFICA QUE ESTÁ REPETIDO. Y SE EJECUTA ESTO:
            
        }else if(camposStatus.user === false && camposStatus.name === true
                && camposStatus.apell === true && camposStatus.pass === true ){  

                errorRepeated.style.display="flex"   
                document.getElementById('error').style.display="none";
        }
        else{
        document.getElementById('error').style.display="flex";
            errorRepeated.style.display="none"
        }
});






