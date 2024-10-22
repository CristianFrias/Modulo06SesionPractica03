const urlBase = "http://localhost:3000"

// FUNCION READY
$(() => {
    $("#formulario").submit(function(event) {
        // CAPTURAR EL EVENTO, CAPTURA LA INFORMACION QUE HAY DENTRO DEL INPUT
        event.preventDefault();
        const rut = $("#txt-rut").val();
        const nombre = $("#txt-nombre").val();
        const apellido = $("#txt-apellido").val();
        
        // AJAX, FUNCION DE JS
        $.ajax({
            // MÉTODO
            method: "GET",
            url: `${urlBase}/registrar-persona`,
            data: {
                rut,
                nombre,
                apellido
            },
            success: function (data) {
                alert("Datos enviados")
            },
            error: function (error) {
                alert("Ha sucedido un error")
            }
        })
    })
})