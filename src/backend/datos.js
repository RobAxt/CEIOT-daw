//=======[ Settings, Imports & Data ]==========================================

var fs      = require('fs');
var datos;

//=======[ Main module code ]==================================================

fs.readFile('/home/node/app/src/datos.json',(err, data)=> {
    if (err) {
        console.error(err);
        return;
    }
    datos = JSON.parse(data);
    console.log(" --- File: datos.json --- \r\n " + JSON.stringify(datos) + "\r\n ------------------------");
});

module.exports = datos;

//=======[ End of file ]=======================================================
