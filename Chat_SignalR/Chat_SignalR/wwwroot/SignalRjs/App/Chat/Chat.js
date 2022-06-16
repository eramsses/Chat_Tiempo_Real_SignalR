"use strict"

var conexion = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Inhabilitar el botón de enviar hasta que se conecte
document.getElementById("btnEnviar").disabled = true;

conexion.on("RecibirMensaje", function (user, message) {
    var li = document.createElement("li");
    li.textContent = `${user} - ${message}`;

    document.getElementById("lstMensajes").appendChild(li);
});

conexion.start().then(function () {
    document.getElementById("btnEnviar").disabled = false;

    var li = document.createElement("li");
    li.textContent = "Bienvenido al Chat con SignalR";

    document.getElementById("lstMensajes").appendChild(li);

}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("btnEnviar").addEventListener("click", function (event) {
    var usuario = document.getElementById("txtUsuario").value;
    var mensaje = document.getElementById("txtMensaje").value;

    document.getElementById("txtMensaje").value = "";
    document.getElementById("txtMensaje").focus;
    conexion.invoke("EnviarMensaje", usuario, mensaje).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});