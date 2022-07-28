// Utilicé el js de la última entrega.
// Hice que el return de la función respuestaAutomatica se imprima en el HTML, en vez de salir por un alert.

const cliente = [
    {
        nombreCompleto: "Daniel Perez",
        email: "daniel.perez@gmail.com",
        telefono: 1164324110,
        pais: "argentina",
        mensaje: "Favor de enviarme info de los precios por mail.",
    },
    {
        nombreCompleto: "Roxana Zully",
        email: "daniel.perez@gmail.com",
        telefono: 2226577859,
        pais: "uruguay",
        mensaje: "Necesito info de la cobertura, envienmela por correo por favor.",
    },
    {
        nombreCompleto: "Agustina Moyano",
        email: "agus_m@gmail.com",
        telefono: 1165458709,
        pais: "argentina",
        mensaje: "Favor de enviarme info de los precios por mail",
    },
    {
        nombreCompleto: "Robert Gomez",
        email: "g.robert22@gmail.com",
        telefono: 1355074390,
        pais: "brasil",
        mensaje: "Necesito informacion, contáctenme.",
    },
]

const respuestaAutomatica = (nombreCliente, mailCliente, telefonoCliente) => {
    return (`
    
        <h1 class="titulo"> GRACIAS POR TU CONTACTO </h1>

        <h2 class="titulo"> ${nombreCliente}! </h2>

        <p class="parrafo"> Por favor, corrobora los siguientes datos:

        <div class="datos">
            <p class="parrafoDatos">Correo electrónico: ${mailCliente}</p>
            <p class="parrafoDatos">Teléfono: ${telefonoCliente}</p>
        </div>

        <p class="parrafo">Estaremos respondiendo tu consulta a la brevedad por alguno de los canales de contacto ingresados. Saludos!</p>`
    )
}

console.log(cliente)

cliente.push(
    {
        nombreCompleto: prompt("Ingrese su nombre completo:").toUpperCase(),
        email: prompt("Ingrese su correo electrónico:"),
        telefono: Number(prompt("Ingrese su número de telefono con el código de área, sin 0 y sin 15:")),
        pais: prompt("Ingrese su país de origen:").toLowerCase(),
        mensaje: prompt("Ingrese su consulta:"),        
    }
)

const divRespuesta = document.querySelector(".contenedor")

divRespuesta.innerHTML = respuestaAutomatica(cliente[cliente.length - 1].nombreCompleto, cliente[cliente.length - 1].email, cliente[cliente.length - 1].telefono)

const clienteExtranjero = cliente.filter((curr => {
    return curr.pais != "argentina"
}))

console.log(clienteExtranjero)







