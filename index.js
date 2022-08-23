

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
const carritoHTML = document.querySelector("#carritoHTML")
const botonBorrar = document.getElementsByClassName("botonBorrar")
const contenedorProductos = document.querySelector(".contenedorProductos")
const vaciarCarrito = document.getElementById("vaciarCarrito")

let carrito = JSON.parse(localStorage.getItem("carrito")) || []

// REGISTRO *****

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

    let formData = new FormData(event.target)

    fetch("https://formsubmit.co/ajax/gmb.lombardi92@gmail.com", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: "DATOS FORMULARIO",
            message: `
            Nombre: ${formData.get("nombre")}
            Teléfono: ${formData.get("phone")}
            Email: ${formData.get("email")}
            Pais: ${formData.get("pais")}
            Usuario: ${formData.get("usuario")}
            Contraseña: ${formData.get("contra")}`
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            alert("Formulario enviado")
        })
        .catch(error => {
            console.log(error)
            alert("Error al enviar formulario")
        });

    console.log(formData.get("nombre"))
    console.log(formData.get("phone"))
    console.log(formData.get("email"))
    console.log(formData.get("pais"))
    console.log(formData.get("usuario"))
    console.log(formData.get("contra"))
}

// LOGIN *****

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


// PRODUCTOS

function mostrarProductos(array) {
    array.forEach(producto => {
        contenedorProductos.innerHTML += `
        <div class="producto">           
            <p class="infoProducto">${producto.nombre} - Valor por ${producto.medicion}: $${producto.precio}</p>

            <div class="calculadoraMetros">
                        <label for="metros">Ingrese metros:</label>
                        <input type="number" id="input${producto.id}" class="inputMetros">
                    </div>
            
            <button class="agregar" id="${producto.id}">Agregar al carrito</button>
        </div>`
    });
}

mostrarProductos(servicios)


// AGREGAR AL CARRITO

let botonAgregar = document.getElementsByClassName("agregar")

const input001 = document.querySelector("#input001")
const input002 = document.querySelector("#input002")
const input003 = document.querySelector("#input003")
const input004 = document.querySelector("#input004")

function agregarAlCarrito(e) {
    carritoHTML.innerHTML = ""
    const boton = e.target;
    const idBoton = boton.getAttribute("id");
    const productoSeleccionado = servicios.find(producto => producto.id === idBoton)
    const valorProducto = productoSeleccionado.precio

    console.log(valorProducto)

    if (input001.value > 0) {
        valorInput = input001.value
    } else if (input002.value > 0) {
        valorInput = input002.value
    } else if (input003.value > 0) {
        valorInput = input003.value
    } else if (input004.value > 0) {
        valorInput = input004.value
    }



    productoSeleccionado.precio = valorProducto * Number(valorInput)
    carrito.push(productoSeleccionado)
    localStorage.setItem("carrito", JSON.stringify(carrito));

    swal("Agregaste " + productoSeleccionado.nombre + " por " + valorInput + " " + productoSeleccionado.medicion + " al carrito");

    mostrarCarrito()
    input001.value = ""
    input002.value = ""
    input003.value = ""
    input004.value = ""



    console.log(productoSeleccionado.precio)
    console.log(servicios)

}


for (boton of botonAgregar) {
    boton.addEventListener("click", agregarAlCarrito)
}

//MOSTRAR CARRITO

function mostrarCarrito() {
    carrito.forEach(curr => {
        carritoHTML.innerHTML += `
            <div class="productoCarrito">            
                <h2>${curr.nombre} - $${curr.precio}</h2>
                <button class="botonBorrar" id="${curr.id}">Eliminar</button>
            </div>
            `})
    let total = carrito.reduce((acc, curr) => acc + curr.precio, 0)
    let totalCompra = document.createElement("p")
    totalCompra.setAttribute("class", "total")
    totalCompra.innerText = ("Total: " + total)
    carritoHTML.append(totalCompra)

    let botonBorrar = document.getElementsByClassName("botonBorrar")

    for (botonX of botonBorrar) {
        botonX.addEventListener("click", eliminarProducto)
    }

    let terminarCompra = document.createElement("button")
    terminarCompra.setAttribute("class", "terminarCompra")
    terminarCompra.innerHTML = ("Finalizar compra")
    carritoHTML.append(terminarCompra)
    terminarCompra.addEventListener("click", () => {

    })
}

carrito.length && mostrarCarrito()

//ELIMINAR PRODUCTO

function eliminarProducto(e) {
    carritoHTML.innerHTML = ""
    const botonX = e.target;
    const idBotonX = botonX.getAttribute("id");
    let indexProducto = carrito.findIndex(producto => producto.id === idBotonX)
    carrito.splice(indexProducto, 1)
    localStorage.removeItem("carrito")
    localStorage.setItem("carrito", JSON.stringify(carrito))
    mostrarCarrito(carrito)
}

// VACIAR CARRITO

vaciarCarrito.addEventListener("click", () => {
    carrito = []
    localStorage.removeItem("carrito")
    swal("Productos eliminados", "Se ha vaciado el carrito", "info");
    carritoHTML.innerHTML = ""
})

console.log(carrito)