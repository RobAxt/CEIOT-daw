//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var utils   = require('./mysql-connector');
var fs      = require('fs');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================

app.get('/devices/', function(req, res, next) {
    devices = [
        { 
            'id': 1, 
            'name': 'Lampara 1', 
            'description': 'Luz living', 
            'state': 0, 
            'type': 1, 
        },
        { 
            'id': 2, 
            'name': 'Ventilador 1', 
            'description': 'Ventilador Habitacion', 
            'state': 1, 
            'type': 2, 
        },
    ]
   
    res.send(JSON.stringify(devices)).status(200);
});

app.get('/dato/', function(req, res, next) {

    fs.readFile('/home/node/app/src/datos.json',(err, data)=> {
        if (err) {
            console.error(err);
            return;
          }
        data = JSON.parse(data);
        console.log(JSON.stringify(data));
        res.json(data).status(200);
    });   
    
});

app.get('/devices/:id/:state', function(req, res, next) {
    res.send("Parametros: " + req.params.id + " " + req.params.state); 
}); 


app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

// //============================================================================
// //import de modulo eventos
// const eventos= require('events');

// //Creo objeto eventEmitter
// const eventEmitter = new eventos.EventEmitter();

// //Creo una cuncion handlre que se encarga de manejar un evento
// const connectHandler = function connected(){
//     console.log("Conexion exitosa");
//     eventEmitter.emit("data_recibida");
// }

// //Bindeo el evento conexion al handlee creado anteiormente
// eventEmitter.on('conexion',connectHandler);
// //Bindeo el evento con funcion anonima
// eventEmitter.on('data_recibida', function(){
//     console.log("Llego data");
// });
// //emito evento
// eventEmitter.emit('conexion');
//=============================================================================
// let persona = require('./datos.js');
// console.log(persona.nombre + ' ' + persona.apellido);
//=======[ End of file ]=======================================================
