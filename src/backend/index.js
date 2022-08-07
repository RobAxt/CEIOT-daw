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
            res.send({"error": "Error interno"}).status(500);
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
                res.send({"error": "Error interno"}).status(500);
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
    if (req.body.id != undefined && req.body.key != undefined && req.body.value != undefined&& req.body.id > 0 ) {
        console.log(`id: ${req.body.id} and key: ${req.body.key} - value: ${req.body.value}`);
        utils.query(`UPDATE Devices SET ${req.body.key} = "${req.body.value}" WHERE id = ${req.body.id}`, function (err, result, fields) {
            if (err) {
                console.error(err);
                res.send({"error": "Error interno"}).status(500);
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
    if (req.body.name != undefined && req.body.description != undefined && req.body.type != undefined && req.body.type >= 0){
        console.log("ADD: Name: " + req.body.name + " Description: " + req.body.description + " Type: " + req.body.type);
        utils.query(`INSERT INTO Devices (name, description, state, type) VALUES ("${req.body.name}","${req.body.description}",0,${req.body.type})`, function (err, result, fields) {
            if (err) {
                console.error(err);
                res.send({"error": "Error interno"}).status(500);
                return;
            }
             res.send(req.body).status(200);
        }); 
    }
}); 

app.delete('/delete', function(req, res, next) {
    if (req.body.id != undefined && req.body.id > 0){
        console.log("BORRAR: "+ req.body.id);
        utils.query(`DELETE FROM Devices WHERE id = ${req.body.id}`, function (err, result, fields) {
            if (err) {
                 console.error(err);
                 res.send({"error": "Error interno"}).status(500);
                 return;
             }
             res.send(req.body).status(200);
        }); 
    }
}); 

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//============================================================================
