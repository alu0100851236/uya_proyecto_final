$(document).ready(function()
 {
     // Initialize Firebase
     var config = {
       apiKey: "AIzaSyC1HbGU8HMaH-UNuRBM7IgxgD1wWTAOomY",
       authDomain: "proyecto-uya-uya.firebaseapp.com",
       databaseURL: "https://proyecto-uya-uya.firebaseio.com",
       projectId: "proyecto-uya-uya",
       storageBucket: "proyecto-uya-uya.appspot.com",
       messagingSenderId: "683282630002"
     };
     firebase.initializeApp(config);

    var database = firebase.database();
    var id;
    var fecha;
    var titulo;
    var imagen;

    //fecha de publicacion de la foto
    const timeStamp = () => {
      let options = {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute:'2-digit'
      };
      let now = new Date().toLocaleString('es', options);
      return now;
    };

    $("#imagen").change(function()
    {
        var descriptor=new FileReader();
        descriptor.readAsDataURL(this.files[0]);

        descriptor.onloadend = function()
        {
            imagen=descriptor.result;
        };
    });


    $("#formulario_new_picture").change(function()
    {
        titulo=$("#titulo").val();

        if (titulo)
        {
            $("#botonGuardar").prop("disabled",false);
        }
        else
        {
            $("#botonGuardar").prop("disabled",true);
        }

    });


    $("#botonGuardar").click(function()
    {
        var f = new Date();
        var tmp = 9007199254740992;//MAX_SAFE_INTEGER = 9007199254740992;
        titulo=$("#titulo").val();
        //id = ((f.getFullYear()).toString()).concat(((f.getMonth() +1).toString()).concat(((f.getDate()).toString()).concat(((f.getHours()).toString()).concat(((f.getMinutes()).toString()).concat(((f.getSeconds()).toString()).concat((f.getUTCMilliseconds().toString())))))));
        tmp = tmp - (f.getFullYear()*10000000000);
        tmp = tmp - ((f.getMonth() +1)*100000000);
        tmp = tmp - (f.getDate()*1000000);
        tmp = tmp - (f.getHours()*10000);
        tmp = tmp - (f.getMinutes()*100);
        tmp = tmp - f.getSeconds();
        id = tmp;

        if (!imagen)
        {
            imagen="NONE";
        }

        // Indicamos que la referencia base de nuestra base de datos es post (algo así como el padre)
        // del que colgarán el resto de nodos hijos.
        /*
        var usersRef = new Firebase('https://samplechat.firebaseio-demo.com/users');
        var fredRef = usersRef.child('fred');
        var fredFirstNameRef = fredRef.child('name/first');
        */
        var referencia=database.ref("post");

        // Ahora estamos poniendo el titulo como clave en la colección
        // De esta manera podremos añadir nuevos titulos o actualizar uno ya existente.

        referencia.child(id).set(
        {
          titulo: titulo,
          fecha: timeStamp(),
          imagen: imagen
        },function()
        {
            alert('Su foto se a subido correctamente');
        });
    });
});
