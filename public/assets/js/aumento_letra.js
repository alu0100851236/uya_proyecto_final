
  function CambioTamanio(){
    var Boton=window.event.srcElement;
    var Elementos=document.getElementsByTagName("p")
  //  var Elementos=document.getElementById("AaSize")
    console.log(Boton.value)
    console.log(Elementos)
    for (i=0;i<Elementos.length;i++){
      Elementos[i].style.fontSize = Boton.value
    }
  };
