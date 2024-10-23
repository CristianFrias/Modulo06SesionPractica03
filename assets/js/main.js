const urlBase = "http://localhost:3000"

// const listarPersona = () => {
//     $.ajax({
//         method: "GET",
//         url:`${urlBase}/listar-persona`,
//         data: {},
//         success: function(data) {
//             console.log(data); 
//         },
//         error: function (error) {
            
//         }
//     })
// }

// FUNCION READY
$(() => {
    $("#formulario").submit(function(event) {
        // CAPTURAR EL EVENTO, CAPTURA LA INFORMACION QUE HAY DENTRO DEL INPUT
        event.preventDefault();
        const rut = $("#txt-rut").val();
        const nombre = $("#txt-nombre").val();
        const apellido = $("#txt-apellido").val();

        $(".error").addClass("d-none") // BUSCA TODOS LOS ELEMENTOS QUE TENGAN LA CLASE ERROR Y AGREGAMOS CLASE PARA QUE NO SE MUESTREN
        
        // AJAX, FUNCION DE JS DESDE EL FRONT
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
                // console.log(data);
                alert(data.message)
            },
            error: function (error) {
                // console.log(error.responseJSON.message); 
                if (error.status == 409){ // CUANDO OCURRE ERROR 409 MUESTRA MENSAJE DE ALERTA AMARILLO, MOSTRANDO EL MENSAJE DEL BACKEND
                    $("#alerta-validacion").removeClass("d-none").html(error?.responseJSON?.message || '') // VARIANTES DE RESPUESTAS
                    // alert("Error de validación")
                } else {
                    $("#alerta-error").removeClass("d-none").html(error?.responseJSON?.message || 'Error Interno.') // SIGNOS DE INTERROGACIÓN ES QUE SI NO ENCUENTRAN EL MENSAJE EN RUTA MUESTRA EL MENSAJE 'Error Interno.'
                    // alert("Error interno del Servidor")
                }
            }
        })
    })
    // listarPersona();
})