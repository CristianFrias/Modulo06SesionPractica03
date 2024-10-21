const express = require("express")
const app = express();
const port = 3_000;

// DEJAMOS ASSETS A MODO PUBLICO, ES AQUI DONDE APLICAMOS STATIC
app.use("/publica/", express.static(`${__dirname}/assets`))

// Levantamos APP dentro de PORT 
app.listen(port, () => console.log(`Aplicación ejecutándose por el puerto ${port}`));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`)
    // res.send("Ruta raíz"); // SOLO PARA COMPROBAR QUE ESTÉ FUNCIONANDO
})