// Al trabajo anterior se le quitaron los prompt, para dar lugar al formulario en HTML.
// Utilizo el evento onsubmit para pushear los nuevos clientes al array cliente.
// El submit se habilita si los input tienen por lo menos 1 caracter.
// Cuando se envían los datos se inyecta al HTML el mensaje automático de agradecimiento, que cuenta un botón (Volver) para recargar la página utilizando el evento onclick.
// También use los eventos onmouseover/onmouseout para crear un efecto hover sobre el contenedor del formulario.


const cliente = []

class Cliente {
    constructor(nombre, telefono, email, pais, mensaje) {
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
        this.pais = pais;
        this.mensaje = mensaje;
    }
}

const contenedor = document.querySelector(".contenedor")
const formulario = document.querySelector("#formulario")
const datoNombre = document.querySelector("#nombreCompleto")
const datoTelefono = document.querySelector("#numeroDeTelefono")
const datoEmail = document.querySelector("#correoElectronico")
const datoPais = document.querySelector("#pais")
const datoMensaje = document.querySelector("#mensaje")
const submit = document.querySelector("#submit")
submit.disabled = true

formulario.oninput = () => {
    if (datoNombre.value.length < 1 || datoTelefono.value.length < 1 || datoEmail.value.length < 1 || datoMensaje.value.length < 1) {
        submit.disabled = true
    } else {
        submit.disabled = false
    }
}

contenedor.onmouseover = () => {
    contenedor.style.background = "rgba(0, 0, 0, 0.5)"
}

contenedor.onmouseout = () => {
    contenedor.style.background = "rgba(0, 0, 0, 0.3)"
}

formulario.onsubmit = (event) => {

    event.preventDefault()

    cliente.push(new Cliente(datoNombre.value, Number(datoTelefono.value), datoEmail.value, datoPais.value, datoMensaje.value))

    console.log(cliente)

    contenedor.innerHTML = ` <h2 class="titulo"> GRACIAS POR TU CONTACTO </h2>
    <h3 class="titulo"> ${datoNombre.value.toUpperCase()}! </h3>
    <p class="parrafo"> Por favor, corrobora los siguientes datos:
    <div class="datos">
        <p class="parrafoDatos">Correo electrónico: ${datoEmail.value}</p>
        <p class="parrafoDatos">Teléfono: ${datoTelefono.value}</p>
    </div>
    <p class="parrafo">Estaremos respondiendo tu consulta a la brevedad por alguno de los canales de contacto ingresados. Saludos!</p>
    <label>
        <input type="button" value="Volver" id="recargar">
    </label>`

    const submitVolver = document.querySelector("#recargar")

    submitVolver.onclick = () => {
        location.reload()
    }

    const clienteExtranjero = cliente.filter((curr => {
        return curr.pais != "Argentina"
    }))

    console.log(clienteExtranjero)
}

