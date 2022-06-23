const express = require('express');
const path = require('path');
const router = express.Router();

const Controlador = require('./Controller');

const errorHandler = (err, req, res, next)=>{
    res.status(err.status || 500);
    res.json({ error: err.message });
};

router.use(express.raw());
router.use(express.json());
router.use(express.urlencoded({extended:true})); 

router.get('/',(req, res)=>{
    res.render("home", {
        pageTitle: "Entregable Nº 5",
        rutaDestino: "./productos",
        scripts : [{ script: './home.js' }],
        isFormUploaded: false
    });
});
router.get('/form-success',(req, res)=>{
    const params = {
        pageTitle: "Entregable Nº 5",
        rutaDestino: "./productos",
        scripts : [{ script: './home.js' }],
        isFormUploaded: true
    };
    res.render("home", params);
});
router.post('/productos',(req, res)=>{
    const prod = Controlador.saveProducto(req.body);
    if(prod){
        res.redirect('./form-success');
    }else{
        res.redirect('./');
    }
});
router.get('/productos',(req, res)=>{
    let prods = Controlador.getProductos();
    if(!Array.isArray(prods)){
       prods = false; 
    }
    const params = {
        pageTitle: "Entregable Nº 5 | Ejs",
        productos : prods,
        scripts : false
    };
    res.render("productos", params);
});

module.exports = {
    router,
    errorHandler 
};