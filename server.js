var express = require('express'),
    app = express(),
    sqlite3 = require('sqlite3').verbose(),
    bodyParser = require('body-parser'),
    db = new sqlite3.Database('docs/users.db');

app.use(express.static('public'));

// Permitir a express recibir datos desde el post
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('port', (process.env.PORT || 5000));

// Inicialización de la Base de Datos
db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='t_usuarios'", function(err, rows) {
  if(err !== null) {
    console.log(err);
  }
  else if(rows === undefined) {
    db.run('CREATE TABLE "t_usuarios" ' +
           '("id" INTEGER PRIMARY KEY AUTOINCREMENT, ' +
           '"email" VARCHAR(50), ' +
           '"username" VARCHAR(25), ' +
           '"password" VARCHAR(50))', function(err) {
      if(err !== null) {
        console.log(err);
      }
      else {
        console.log("Creada la tabla t_usuarios");
      }
    });
  }
  else {
    console.log("Tabla t_usuarios ya está creada");
  }
});

app.get('/', function (req, res) {
   res.sendFile( __dirname + '/public/login.html');
});

// app.get('/index.html', function (req, res) {
//    res.sendFile( __dirname + "/" + "index.html" );
// })

// app.get('/base_de_datos.html', function (req, res) {
//    res.sendFile( __dirname + "/" + "base_de_datos.html" );
// })
// app.get('/mapa_web.html', function (req, res) {
//    res.sendFile( __dirname + "/" + "mapa_web.html" );
// })
// app.get('/redes_de_computadores.html', function (req, res) {
//    res.sendFile( __dirname + "/" + "redes_de_computadores.html" );
// })
// app.get('/uya.html', function (req, res) {
//    res.sendFile( __dirname + "/" + "uya.html" );
// })

// Definimos una ruta para hacer el login de usuarios
app.post('/login', function(req, res) {
  sqlUsername = db.prepare("SELECT username FROM t_usuarios WHERE username='" + req.body.username + "' and password='" + req.body.password + "'");
  sqlUsername.get(function(err, row){
      if(err)
          throw err;
      else
          if(row)
            res.sendFile( __dirname + "/index1.html" );
          else
            console.log("Usuario no encontrado")
            res.render('login_error.jade', {title: "login_error"})
      });
});

app.listen(app.get('port'), function() {
  console.log("La aplicación Node esta corriendo en el puerto:", app.get('port'));
});
