//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var utils   = require('./mysql-connector');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================

app.get('/devices/', function(req, res, next) {
    utils.query("SELECT * FROM Devices", function (err, result, fields) {
        if (err) {
            console.error(err);
            res.send("Error interno").status(500);
            return;
        }
        res.send(JSON.stringify(result)).status(200);
    });
});

app.get('/device/:id', function(req, res, next) {
    if(req.params.id != undefined && req.params.id > 0) {
        utils.query(`SELECT * FROM Devices WHERE id = ${req.params.id}`, function (err, result, fields) {
            if (err) {
                console.error(err);
                res.send("Error interno").status(500);
                return;
            }
            res.send(JSON.stringify(result[0])).status(200);
        });
    } else {
        console.error("GET a device: invalid id");
        res.send("Invalid Id").status(400);
    }
});

app.put('/update', function(req, res, next) {
    if (req.body.id != undefined && req.body.state != undefined && req.body.id > 0 && req.body.state >=0 && req.body.state <= 1) {
        console.log(`id: ${req.body.id} and state: ${req.body.state}`);
        utils.query(`UPDATE Devices SET state = ${req.body.state} WHERE id = ${req.body.id}`, function (err, result, fields) {
            if (err) {
                console.error(err);
                res.send("Error interno").status(500);
                return;
            }
            //console.log(result);
            res.send(req.body).status(200);
        }); 
    } else {
        console.error("PUT Update: error en parámetros del body");
        res.send("Error en parámetros del body").status(400);
    }
});

app.post('/add', function(req, res, next) {
    console.log(req.body);
    console.log("actualizar: "+ req.body.id);
    res.send("added");
}); 

app.delete('/delete', function(req, res, next) {
    console.log(req.body);
    console.log("actualizar: "+ req.body.id);
    res.send("deleted");
}); 

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//============================================================================
