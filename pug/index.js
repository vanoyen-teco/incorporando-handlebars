// Config del servidor
const express = require('express');
const app = express();
const apiRouter = require('./src/RouterApi');
const path = require('path');
const PORT = 8080;

app.set("views", "./src/views");
app.set("view engine", "pug");

app.use('/', apiRouter.router);
app.use('/', apiRouter.errorHandler);

app.use(express.static(path.join(__dirname ,'public')));

app.listen(PORT, () => {
    console.log('Servidor iniciado.');
})
app.on("error", error => console.log(`Error en servidor ${error}`));