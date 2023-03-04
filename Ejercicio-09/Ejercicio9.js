"use strict"
class Ejercicio8 {
    constructor() {
        this.apikey = "60765861f6ac56a75d275bbf8fc99505";
        this.dataType = "xml";
        this.tipo = "&mode=xml";
        this.lang = "&lang=es"
        this.method = "GET";
        this.responseData = ""
        this.unidades = "&units=metric";
    }


    pedirDatosDe(ciudad) {

        this.ciudad = ciudad;
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + this.tipo + this.unidades + this.lang + "&APPID=" + this.apikey;

        $.ajax({
            context: this,//Para que la llamada dentro de la función de sucess use this=e8
            dataType: this.dataType,
            url: this.url,
            method: this.method,

            success: function (data) {

                this.mostrarDatos(data)
            },
            error: function () {

                this.mostrarError()
            },
        })
    }
    mostrarDatos(data) {
        this.responseData = data;
        var contenido = "";

        contenido += "<section><h2>" + $('city', this.responseData).attr("name") + " (" + $('country', this.responseData).text() + ")" + "</h2>"
        contenido += "<p> (" + $('coord', this.responseData).attr("lat") + "º ," + $('coord', this.responseData).attr("lon") + "''')</p>"
        contenido += "<p><img src='http://openweathermap.org/img/wn/" + $('weather', this.responseData).attr("icon") + ".png' alt='Icono representando las condiciones metereológicas'/></p>"
        contenido += "<p>" + $('weather', this.responseData).attr("value") + "</p>"

        contenido += "<p>Temperatura:" + $('temperature', this.responseData).attr("value") + "(" + $('temperature', this.responseData).attr("unit") + ")</p>"
        contenido += "<p>Sensación térmica:" + $('feels_like', this.responseData).attr("value") + "(" + $('temperature', this.responseData).attr("unit") + ")" + "</p>";
        contenido += "<p>Máxima: " + $('temperature', this.responseData).attr("max") + "ºC , Mínima " + $('temperature', this.responseData).attr("min") + "(" + $('temperature', this.responseData).attr("unit") + ")</p>"
        contenido += "<p>Presión: " + $('pressure', this.responseData).attr("value") + "(" + $('pressure', this.responseData).attr("unit") + ")" + " </p>"
        contenido += "<p>Humedad: " + $('humidity', this.responseData).attr("value") + $('humidity', this.responseData).attr("unit") + "</p>"
        contenido  +="<p>Precipitaciones:"+$('precipitation', this.responseData).attr("mode")+"("+ $('precipitation', this.responseData).attr("value") +" mm )</p>"
        contenido += "<p>Viento-" + $('speed', this.responseData).attr("name") + ":<ul><li>Velocidad" + $('speed', this.responseData).attr("value") + "" + $('speed', this.responseData).attr("unit") + "</li>"
        contenido += "<li>Ráfagas:" + $('gusts', this.responseData).attr("value") + "</li>"
        contenido += "<li>Dirección:" + $('direction', this.responseData).attr("value") + "," + $('direction', this.responseData).attr("name") + "</li></ul><p>"
        contenido += "<p>Visibilidad:" + $('visibility', this.responseData).attr("value") + " metros</p>"
        contenido += "<p>Nubosidad:" + $('clouds', this.responseData).attr("value") + "% -" + $('clouds', this.responseData).attr("name") + " </p>"
       
        var amanecer = $('sun', this.responseData).attr("rise");
        var minutosZonaHoraria = new Date().getTimezoneOffset();
        var amanecerMiliSeg1970 = Date.parse(amanecer);
        amanecerMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
        var amanecerLocal = (new Date(amanecerMiliSeg1970)).toLocaleTimeString("es-ES");
        contenido += "<p>Amanece a las: " + amanecerLocal + "</p>"
        var oscurecer = $('sun', this.responseData).attr("set");
        var oscurecerMiliSeg1970 = Date.parse(oscurecer);
        oscurecerMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
        var oscurecerLocal = (new Date(oscurecerMiliSeg1970)).toLocaleTimeString("es-ES");
        contenido += "<p>Oscurece a las: " + oscurecerLocal + "</p>"
        var horaMedida = $('lastupdate', this.responseData).attr("value");
        var horaMedidaMiliSeg1970 = Date.parse(horaMedida);
        horaMedidaMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
        var horaMedidaLocal = (new Date(horaMedidaMiliSeg1970)).toLocaleTimeString("es-ES");
        var fechaMedidaLocal = (new Date(horaMedidaMiliSeg1970)).toLocaleDateString("es-ES");
        contenido += "<p>Última actualización:</p><p> " + fechaMedidaLocal + " , " + horaMedidaLocal + "</p>"

        contenido += "</section>"
        $("main").append(contenido)

    }
    mostrarError() {
        $("main").append.after("<section><h2>Error<h2><p>No se ha podido obtener los  this.responseData para " + this.ciudad + "</p></section>")
    }
    mostrarInfo() {
        this.pedirDatosDe("Oviedo")
        this.pedirDatosDe("Seul")
        this.pedirDatosDe("Campina Grande")
        this.pedirDatosDe("Murcia")

    }

}
var e9 = new Ejercicio8();

