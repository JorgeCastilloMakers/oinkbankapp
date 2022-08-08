//OBTENEMOS LOS DATOS INGRESADOS EN EL INPUT + EL ID DEL MENSAJE DE ERROR
let formElement = document.getElementById("form-login");
let userElement = document.getElementById("name-login")
let passwordElement = document.getElementById("password-login");
let loginErrorElement = document.getElementById("error");

loginErrorElement.style.display = "none";

//TRANSFORMAMOS EL OBJETO DEL LOCALSTORAGE NUEVAMENTE EN UN ARRAY
let localStore = localStorage.getItem("users");

let usersList = [];

if (localStore) {
    usersList = JSON.parse(localStore);
}

//COMPROBAMOS QUE LOS VALORES DE USER Y PASS CORRESPONDAN EN EL ARRAY PRIMERO BUSCANDO EL USUARIO SI EL USUARIO COINCIDE ITERA Y BUSCA LA PASS
//SI COINCIDEN AMBOS OBTEMOS EL TRUE Y NOS DIRIGIMOS AL HOME CLIENTE

function loginUser (e) {
    e.preventDefault();

    loginErrorElement.style.display = "none";


    let user = userElement.value;
    let password = passwordElement.value;

    if (user !== "" && password !== ""){

        let match = false;

        usersList.forEach(userEl => {
            if (userEl.user === user){
                if (userEl.pass === password){
                    match = true;
                    //validacion para mostrar loading

                    usersList.forEach(e=>{
                        if(e.loaded === false)
                        {
                            location.href = "loading.html"
                            localStorage.setItem("userON", JSON.stringify(userEl));

                        }else if(e.loaded === true)
                        {
                            location.href = "/actionsUser/homeCliente.html"
                            localStorage.setItem("userON", JSON.stringify(userEl));
                    
                            return;
                        }
                    })
                    
                }
            }
        });

        if (!match){
            loginErrorElement.style.display = "block";
            loginErrorElement.innerHTML = "Datos Incorrectos";
        }
    } else {
        loginErrorElement.style.display = "block";
        loginErrorElement.innerHTML = "Por favor, complete todos los campos";
    }
}

formElement.addEventListener("submit", (e) => loginUser(e));