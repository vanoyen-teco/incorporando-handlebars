const express = require('express');
const path = require('path');
const router = express.Router();

const Controlador = require('./Controller');
const mainDir = path.normalize(__dirname+"/..");

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
        scripts : [{ script: './home.js' }]
    });
    //res.sendFile( mainDir + '/public/index.html');
    //res.send(Controlador.getProductos());
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
    //res.sendFile( mainDir + '/public/productos.html');
    //res.send(Controlador.getProductos());
});
router.get('/productos',(req, res)=>{
    let prods = Controlador.getProductos();
    if(!Array.isArray(prods)){
       prods = false; 
    }
    const params = {
        pageTitle: "Entregable Nº 5",
        productos : prods
    };
    res.render("productos", params);
});

// router.post('/',(req, res)=>{
//     const prod = Controlador.saveProducto(req.body);
//     (prod) ? res.status(200).json(prod) : res.status(400).json({error: `Error en los parametros requeridos`});
// })

// router.get('/:id',(req, res)=>{
//     const { id } = req.params;
//     const prod = Controlador.getProductoById(id);
//     (prod) ? res.status(200).json(prod) : res.status(404).json({error: `Producto no encontrado`});   
// })

// router.put('/:id',(req, res)=>{
//     const { id } = req.params;
//     const prod = Controlador.putProductoById(id, req.body);
//     (prod) ? res.status(200).json(prod) : res.status(400).json({error: `Error al actualizar`});   
// })

// router.delete('/:id',(req, res)=>{
//     const { id } = req.params;
//     const action = Controlador.delProductoById(id);
//     (action) ? res.status(200).json() : res.status(404).json();
// })

module.exports = {
    router,
    errorHandler 
};