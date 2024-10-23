const urlBase = "http://localhost:3000"

const listarPersonas = () => {
    $.ajax({
        method: "GET",
        url:`${urlBase}/listar-personas`,
        data: {},
        success: function (data) {
            $("#tabla-personas tbody").html(""); // MÉTODO UTILIZADO PARA ELIMINAR LO QUE HAY DENTRO DEL HTML
            // DEBEMOS HACER UN RECORRIDO POR QUE EXISTE DATA DENTRO DE DATA
            // FOREACH, ES APLICABLE SOLO A ESTRUCUTRAS QUE CON ARREGLOS
            data.data.forEach(persona => {
                // console.log(persona); // PARA VERIFICAR QUE SE ESTE MOSTRANDO
                // APPEND SIRVE AGREGAR CONTENIDO AL HTML DESDE JS
                $("#tabla-personas tbody").append(`
                    <tr>
                        <td>${persona.id}</td>
                        <td>${persona.rut}</td>
                        <td>${persona.nombre}</td>
                        <td>${persona.apellido}</td>
                    </tr>
                `);
            });
            // console.log(data); 
        },
        error: function (error) { 
            $("#tabla-personas tbody").html(`
                <tr>
                    <td colspan="4" class="text-center text-danger">No es posible consultar las personas registradas.</td>
                </tr>
            `);
        }
    })
}

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
                $("#txt-rut, #txt-nombre, #txt-apellido").val("") // LIMPIA EL FORMULARIO PARA LUEGO LLEVARSE ESA DATA A LISTARPERSONAS()
                listarPersonas()
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
    listarPersonas();
})