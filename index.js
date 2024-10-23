// DESARROLLO BACKEND
const express = require("express")
const { v4: uuidv4 } = require('uuid');
const { validate, clean, format, getCheckDigit } = require('rut.js')
const { readFileSync, writeFileSync } = require("fs");
const app = express(); // INSTANCIA APLICACION EXPRESS
const port = 3_000;
const dataPersonas = `${__dirname}/data/personas.txt`

// DEJAMOS ASSETS A MODO PUBLICO, ES AQUI DONDE APLICAMOS STATIC
// PUBLICAMOS UNA CARPETA PARA QUE PUEDA SER ACCEDIDA DESDE EL FRONT
app.use("/publica/", express.static(`${__dirname}/assets`))

// Levantamos APP dentro de PORT 
app.listen(port, () => console.log(`Aplicación ejecutándose por el puerto ${port}`));
// FIN CONFIGURACIÓN BÁSICA PARA LEVANTAR UNA APP EN NODE


app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
    // res.send("Ruta raíz"); // SOLO PARA COMPROBAR QUE ESTÉ FUNCIONANDO
})

app.get("/registrar-persona", (req, res) => {
    let rut = req.query.rut
    const nombre = req.query.nombre
    const apellido = req.query.apellido

    try {
        if (rut == "") {
            return res.status(409).json({message: "Ingresar RUN."}) // 409 ES ERROR ESPECIFICO DE VALIDACIÓN
        }
        if (!validate(rut)) {
            return res.status(409).json({message: "RUN Inválido."})
        }

        rut = format(rut) // FORMATEANDO EL RUT

        // LEO EL ARCHIVO Y REALIZAMOS BÚSQUEDA EN EL RUT
        const contentString = readFileSync(dataPersonas, "utf8");
        const contentJS = JSON.parse(contentString);
        const busqueda = contentJS.find(item => item.rut == rut)

        // SI LA BÚSQUEDA NO CONSIGUE NADA
        if (busqueda) {
            return res.status(409).json({message: "RUN registrado previamente."})
        }

        if (nombre == "") {
            return res.status(409).json({message: "Ingresar Nombre."})
        }
        if (apellido == "") {
            return res.status(409).json({message: "Ingresar Apellido."})
        }
        // LÍNEA PARA FORZAR ERROR
        // throw "Error en registro"
    
            const persona = {
                id: uuidv4(),
                rut,
                nombre,
                apellido
            }            
            
    
            contentJS.push(persona);
    
            writeFileSync(dataPersonas, JSON.stringify(contentJS), "utf-8");
        
            res.json({message: "Registo exitoso", data: persona})
    } catch (error) {
        res.status(500).json({message: "Ocurrió un error, por favor intenta más tarde."})
    }

})

// app.get("/listar-persona", (req, res) => {
//     const contentString = readFileSync(dataPersonas, "utf8");
//     const contentJS = JSON.parse(contentString);

//     res.json({message: "Listado de personas registradas", data: contentJS})
// })