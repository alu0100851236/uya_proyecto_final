$(document).ready(function()
 {
    var database = firebase.database();

    // Fijarse que la ruta de partida ahora es la colección post:
    var referencia=database.ref("post");

    var post={};
    referencia.on('value',function(datos)
    {
        post=datos.val();

        // Recorremos los post y los mostramos
        $.each(post, function(indice,valor)
        {
            var prevImagen='<div class="row">';
            prevImagen+='<a href="'+valor.imagen+'">';
            prevImagen+='<p><i class="fa fa-file-archive-o" aria-hidden="true"></i> '+valor.titulo+'('+valor.fecha+')</p>';
            prevImagen+='</a>';
            prevImagen+='</div>';
            $(prevImagen).appendTo('#listado');
        });

    },function(objetoError){
        console.log('Error de lectura:'+objetoError.code);
    });

});
