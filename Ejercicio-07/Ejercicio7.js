"use strict"; 
class ejercicio7 {
    constructor() {
        this.haSidoRecorrido=false;
    }
    mostrarElemento(nombre) {
        $(nombre).show();
    }
    ocultarElemento(nombre) {
        $(nombre).hide();

    }
    borrarElemento(nombre){
        $(nombre).remove();

    }
    añadirAside() {

        var titulo = "<h3>'Paranormal'</h3>"
        var p1 = "<p>Término que alude a supuestos fenómenos descritos en la cultura popular, en el folclore y en otros cuerpos de conocimiento no científicos cuya existencia se describe como más allá del alcance de la comprensión científica “normal”.</p>"
        var p2 = " <p>Los modelos científicos estándar explican que lo que parece ser un fenómeno paranormal suele ser una interpretación errónea, un malentendido o una variación anómala (es decir, poco frecuente) de los fenómenos naturales.</p>"
        var contenidoAside = "<aside>" + titulo + p1 + p2 + "</aside>";

        $("footer").before(contenidoAside)
    }
    añadirArticulo() {

        var titulo = "<h3>Un siglo del 'poltergeist' allerano</h3>"
        var p1 = "<p>Una noche, Concepción González despertó sobresaltada por los lloros del bebé. Antes de llegar a la habitación, el llanto cesó. Cuando abrió la puerta, se encontró con que la cuna se mecía para calmar al niño. Nadie la estaba sujetando. </p>"
        var p2 = "<p>Los fenómenos cesaron años más tarde, y con un arreglo sorprendente. Narra la familia que Concepción escuchó una noche que la llamaba una voz. Se dirigió a la habitación y se encontró con 'una figura' que le dijo que tenía que pagar unas misas por su hermana fallecida. También le contó un secreto, que no podría desvelar hasta su muerte. </p>"
        var p3 = "<p>Dicen que Concepción cumplió su palabra y, en sus 103 años de vida, no soltó prenda. La noche de su muerte, cuando iba a confesar el misterio a una de sus hijas, quedó sin aliento antes de contarlo.</p>"
        var contenidoArticulo = "<article>" + titulo + p1 + p2 + p3 + "</article>";
        $("main").after(contenidoArticulo);
    }
    añadirAudio() {
        var introduccion = "<p>En el siguiente podcast , Iker Jiménez trata el caso de este pueblo</p>"
        var src = ' <source src="podcast.mp3" type="audio/mp3" />'
        var contenidoAudio = introduccion + "<audio controls>" + src + "</audio>"
        $(":first", "section:eq(1)").after(contenidoAudio)
    }

    sumaFilas() {
        var total = 0;

        $("td", document.body).each(function() {
            total+= Number($(this).text());
        })

 

        $("table").after("<h2>Suma de filas y columnas</h2><p>"+total+"</p>")
     
    }

   
    recorrerDOM(){
		if(!this.haSidoRecorrido){
			var listaDom = " ";
            listaDom+="<ul>";
			var elementosDom=$("*", document.body);//recorremos todos los elementos del dom como se dijo en teoría
			for(var i =0;i< elementosDom.length; i++){
				var etiquetaPadre = $(elementosDom[i]).parent().get(0).tagName;
                listaDom+="<li>"+"Etiqueta padre : "  + etiquetaPadre + " Etiqueta actual : " + $(elementosDom[i]).get(0).tagName +"</li>"
			}
            listaDom+="</ul>";
			this.haSidoRecorrido=true;
		}
		
		$("section[title='listaDOM']").append(listaDom);
		
	}

}
var e7 = new ejercicio7();

