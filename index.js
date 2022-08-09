// Se busca que la web genere un presupuesto estimativo según la información que brinde el usuario.
// Se le pide al cliente un aproximado de metros cuadrados o cúbicos, dependiendo del servicio que necesite. Con estos valores se determina el precio estimado.
// La información se pushea a un array para terminar en local storage.
// Se puede ingresar valores en cada uno de los servicios, todos se suman para brindar un total.

// Ususario: admin
// Contraseña: admin

const avisoRegistro = document.querySelector(".avisoRegistro")
const formularioLogin = document.querySelector("#login")
const inputUser = document.querySelector("#inputUser")
const inputPassword = document.querySelector("#inputPassword")
const botonCerrarSesion = document.querySelector("#cerrarSesion")
const botonRegistrate = document.querySelector("#botonRegistrate")
const formularioRegistro = document.querySelector("#formulario")
const datoNombre = document.querySelector("#nombreCompleto")
const datoTelefono = document.querySelector("#numeroDeTelefono")
const datoEmail = document.querySelector("#correoElectronico")
const datoPais = document.querySelector("#pais")
const datoUsuario = document.querySelector("#nuevoUsuario")
const datoContrasenia = document.querySelector("#nuevaContrasenia")
const seccionesTajetas = document.querySelector(".seccionesTajetas")



const valorPlatea = document.querySelector("#valorPlatea")
const inputM2Platea = document.querySelector("#m2Platea")
const botonCalcular = document.querySelector("#botonCalcular")
const botonSumarAlCarrito = document.querySelector("#botonSumarAlCarrito")

const valorAlisado = document.querySelector("#valorAlisado")
const inputM2Alisado = document.querySelector("#m2Alisado")
const botonCalcular2 = document.querySelector("#botonCalcular2")
const botonSumarAlCarrito2 = document.querySelector("#botonSumarAlCarrito2")

const valorExcavacion = document.querySelector("#valorExcavacion")
const inputM3Excavacion = document.querySelector("#m3Excavacion")
const botonCalcular3 = document.querySelector("#botonCalcular3")
const botonSumarAlCarrito3 = document.querySelector("#botonSumarAlCarrito3")

const valorRetiro = document.querySelector("#valorRetiro")
const inputM3Retiro = document.querySelector("#m3Retiro")
const botonCalcular4 = document.querySelector("#botonCalcular4")
const botonSumarAlCarrito4 = document.querySelector("#botonSumarAlCarrito4")



const carritoHTML = document.querySelector("#carritoHTML")
const precioTotalHTML = document.querySelector("#precioTotalHTML")

let carrito = []
const precioM2 = 3500
const precioM3 = 2500




botonRegistrate.addEventListener("click", (e) => {
    e.preventDefault()
    formularioRegistro.style.display = "flex"
    avisoRegistro.style.display = "none"
})


class NuevoUsuario {
    constructor(nombre, telefono, email, pais, usuario, contrasenia) {
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
        this.pais = pais;
        this.usuario = usuario;
        this.contrasenia = contrasenia
    }
}


const usuarios = [
    {
        nombre: "admin",
        telefono: 1234567890,
        email: "admin@admin",
        pais: "argentina",
        usuario: "admin",
        contrasenia: "admin"
    }
]


formularioRegistro.onsubmit = (event) => {
    event.preventDefault()
    usuarios.push(new NuevoUsuario(datoNombre.value, Number(datoTelefono.value), datoEmail.value, datoPais.value, datoUsuario.value, datoContrasenia.value))
    console.log(usuarios)
}


formularioLogin.onsubmit = () => {

    if (inputUser.value === usuarios[0].usuario && inputPassword.value === usuarios[0].contrasenia) {
        seccionesTajetas.style.display = "flex"
        formularioLogin.style.display = "none"
        botonCerrarSesion.style.display = "flex"
        avisoRegistro.style.display = "none"
        localStorage.setItem("user", true)
    } else {
        alert("Usuario o contraseña incorrectos")
        formularioLogin.reset()
    }
}


function estadoLogin() {
    const tokenLS = localStorage.getItem("user")
    if (tokenLS === "true") {
        seccionesTajetas.style.display = "flex"
        formularioLogin.style.display = "none"
        formularioRegistro.style.display = "none"
        botonCerrarSesion.style.display = "flex"
        avisoRegistro.style.display = "none"
    } else if (tokenLS !== "true") {
        seccionesTajetas.style.display = "none"
        formularioLogin.style.display = "flex"
        botonCerrarSesion.style.display = "none"
    }
}

estadoLogin()

botonCerrarSesion.addEventListener("click", (e) => {
    localStorage.removeItem("user")
    location.reload()
})






botonCalcular.onclick = () => {
    valorPlatea.style.display = "flex"
    valorPlatea.innerHTML = `  
    <p id="valorEstimado">Valor estimado: $${inputM2Platea.value * precioM2}</p>`
    botonSumarAlCarrito.style.display = "flex"
}

botonCalcular2.onclick = () => {
    valorAlisado.style.display = "flex"
    valorAlisado.innerHTML = `  
    <p id="valorEstimado">Valor estimado: $${inputM2Alisado.value * precioM2}</p>`
    botonSumarAlCarrito2.style.display = "flex"
}

botonCalcular3.onclick = () => {
    valorExcavacion.style.display = "flex"
    valorExcavacion.innerHTML = `  
    <p id="valorEstimado">Valor estimado: $${inputM3Excavacion.value * precioM3}</p>`
    botonSumarAlCarrito3.style.display = "flex"
}

botonCalcular4.onclick = () => {
    valorRetiro.style.display = "flex"
    valorRetiro.innerHTML = `  
    <p id="valorEstimado">Valor estimado: $${inputM3Retiro.value * precioM3}</p>`
    botonSumarAlCarrito4.style.display = "flex"
}






const carritoAlLS = (array) => {
    const carritoAJSON = JSON.stringify(array)
    localStorage.setItem("carrito", carritoAJSON)
}

const carritoDesdeLS = (clave) => {
    const valorDelLS = localStorage.getItem(clave)
    const parsearValor = JSON.parse(valorDelLS)
    console.log(parsearValor)
    return parsearValor
}

const agregarAlCarrito = (metros, precio, array) => array.push({
    metros: metros,
    precio: precio
})

const carritoAlHTML = (array) => {
    const carritoReducido = array.reduce((acc, curr) => {
        return acc + `<p id="valorEstimado"> Cantidad: ${curr.metros} - Valor: $ ${curr.precio} </p>`
    }, "")
    return carritoReducido
}






botonSumarAlCarrito.onclick = (e) => {
    e.preventDefault()
    agregarAlCarrito(inputM2Platea.value, inputM2Platea.value * precioM2, carrito)
    carritoAlLS(carrito)
    inputM2Platea.value = ""
    carritoHTML.innerHTML = carritoAlHTML(carrito)
    precioTotal(carrito)
}

botonSumarAlCarrito2.onclick = (e) => {
    e.preventDefault()
    agregarAlCarrito(inputM2Alisado.value, inputM2Alisado.value * precioM2, carrito)
    carritoAlLS(carrito)
    inputM2Alisado.value = ""
    carritoHTML.innerHTML = carritoAlHTML(carrito)
    precioTotal(carrito)
}

botonSumarAlCarrito3.onclick = (e) => {
    e.preventDefault()
    agregarAlCarrito(inputM3Excavacion.value, inputM3Excavacion.value * precioM3, carrito)
    carritoAlLS(carrito)
    inputM3Excavacion.value = ""
    carritoHTML.innerHTML = carritoAlHTML(carrito)
    precioTotal(carrito)
}

botonSumarAlCarrito4.onclick = (e) => {
    e.preventDefault()
    agregarAlCarrito(inputM3Retiro.value, inputM3Retiro.value * precioM3, carrito)
    carritoAlLS(carrito)
    inputM3Retiro.value = ""
    carritoHTML.innerHTML = carritoAlHTML(carrito)
    precioTotal(carrito)
}






let carritoTraidoDelLS = carritoDesdeLS("carrito")
carritoHTML.innerHTML = carritoAlHTML(carritoTraidoDelLS)
console.log(carritoTraidoDelLS)

function precioTotal(array) {
    const sumaPrecios = array.reduce((acc, curr) => {
        return Number(acc) + Number(curr.precio)
    }, "")
    return precioTotalHTML.innerHTML = `<p> TOTAL: $${sumaPrecios}</p>`
}

precioTotal(carritoTraidoDelLS)





