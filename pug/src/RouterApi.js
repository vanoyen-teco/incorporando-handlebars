const express = require('express');
const router = express.Router();
const menuItems = require('./modules/menu');
const Controlador = require('./Controller');

const errorHandler = (err, req, res, next)=>{
    res.status(err.status || 500);
    res.json({ error: err.message });
};

router.use(express.raw());
router.use(express.json());
router.use(express.urlencoded({extended:true})); 

router.get('/', (req, res) => {
    res.render('home', {navItems: menuItems.menu, script: './home.js', formAlert: false, pageTitle: 'Entregable Nº 5'});
});
router.get('/productos', (req, res) => {
    let prods = Controlador.getProductos();
    if(!Array.isArray(prods)){
       prods = false; 
    }
    res.render('productos', {navItems: menuItems.menu, productos: prods, pageTitle: 'Entregable Nº 5 | Productos'});
});

router.post('/productos',(req, res)=>{
    const prod = Controlador.saveProducto(req.body);
    if(prod){
        res.redirect('./form-success');
    }else{
        res.redirect('./');
    }
});

router.get('/form-success',(req, res)=>{
    res.render('home', {navItems: menuItems.menu, script: './home.js', formAlert: true, pageTitle: 'Entregable Nº 5'});
});

module.exports = {
    router,
    errorHandler 
};