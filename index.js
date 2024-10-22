// DESARROLLO BACKEND
const express = require("express")
const app = express();
const port = 3_000;
const { v4: uuidv4 } = require('uuid');
const { readFileSync, writeFileSync } = require("fs")
const dataPersona = `${__dirname}/data/personas.txt`

// DEJAMOS ASSETS A MODO PUBLICO, ES AQUI DONDE APLICAMOS STATIC
app.use("/publica/", express.static(`${__dirname}/assets`))

// Levantamos APP dentro de PORT 
app.listen(port, () => console.log(`Aplicación ejecutándose por el puerto ${port}`));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`)
    // res.send("Ruta raíz"); // SOLO PARA COMPROBAR QUE ESTÉ FUNCIONANDO
})

app.get("/registrar-persona", (req, res) => {
    const rut = req.query.rut
    const nombre = req.query.nombre
    const apellido = req.query.apellido

    const persona = {
        id: uuidv4(),
        rut,
        nombre,
        apellido
    }

    const contentString = readFileSync(dataPersona, "utf8");
    const contentJS = JSON.parse(contentString);

    contentJS.push(persona)

    writeFileSync(dataPersona, JSON.stringify(contentJS), "utf-8");


    res.json({message: "Registo exitoso", data: persona})
})