var express = require('express');
var app = express();

app.use(express.static('public'));
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
app.get('/login.html', function (req, res) {
   res.sendFile( __dirname + "/" + "login.html" );
})
app.get('/base_de_datos.html', function (req, res) {
   res.sendFile( __dirname + "/" + "base_de_datos.html" );
})
app.get('/mapa_web.html', function (req, res) {
   res.sendFile( __dirname + "/" + "mapa_web.html" );
})
app.get('/redes_de_computadores.html', function (req, res) {
   res.sendFile( __dirname + "/" + "redes_de_computadores.html" );
})
app.get('/uya.html', function (req, res) {
   res.sendFile( __dirname + "/" + "uya.html" );
})
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

})