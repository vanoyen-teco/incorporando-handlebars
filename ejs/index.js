// Config del servidor
const express = require('express');
const app = express();
const apiRouter = require('./src/RouterApi');
const path = require('path');
const PORT = 8080;
const menuItems = require('./src/modules/menu');
const handlebars = require('express-handlebars')
const {engine} = handlebars;

app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: "layout.hbs",
    })
);
app.locals.navItems = menuItems.menu;

app.set("views", "./src/views");
app.set("view engine", "hbs");

app.use('/', apiRouter.router);
app.use('/', apiRouter.errorHandler);

app.use(express.static(path.join(__dirname ,'public')));

app.listen(PORT, () => {
    console.log('Servidor iniciado.');
})
app.on("error", error => console.log(`Error en servidor ${error}`));