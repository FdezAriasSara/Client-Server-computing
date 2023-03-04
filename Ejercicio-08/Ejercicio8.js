"use strict"
class Ejercicio8 {
    constructor() {
        this.apikey = "60765861f6ac56a75d275bbf8fc99505";
        this.dataType = "json";
        this.lang = "&lang=es"
        this.method = "GET";
        this.responseData = ""
        this.unidades = "&units=metric";
    }


    pedirDatosDe(ciudad) {

        this.ciudad = ciudad;
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + this.unidades + this.lang + "&APPID=" + this.apikey;
       
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
        var contenido="";
        contenido+="<section><h2>" + this.responseData.name + " (" + this.responseData.sys.country + ")" + "</h2>"
        contenido+="<p> (" + this.responseData.coord.lat + "º ," + this.responseData.coord.lon + "''')</p>"
        contenido+="<p><img src='http://openweathermap.org/img/wn/" + this.responseData.weather[0].icon + ".png' alt='Icono representando las condiciones metereológicas'/><p>" 
        contenido+="<p>" + this.responseData.weather[0].description + "</p>"
        contenido+="<p>Temperaturas:<ul><li>Actual:"+this.responseData.main.temp+"ºC</li><li>Máxima:" + this.responseData.main.temp_max + "ºC</li><li>Mínima:" + this.responseData.main.temp_min + "ºC</li></ul></p>"
        contenido+="<p>Presión:<ul><li> Atmosférica " + this.responseData.main.pressure + "hPa</li>"
        contenido+="<li>Nivel del mar :"+this.responseData.main.sea_level+" hPa</li>"
        contenido+="<li>Nivel terrestre :"+this.responseData.main.grnd_level+" hPa</li></ul></p>"
        contenido+="<p>LLuvia (durante la última h): " + this.responseData.rain + " mm </p>" //volumen de lluvia en la última hora, en mm
        contenido+="<p>Nieve(durante la última h): " + this.responseData.snow + " mm </p>" //volumen de nieve en la última hora, en mm
        contenido+="<p>Humedad: " + this.responseData.main.humidity + "%</p>"
        contenido+="<p>Amanecer: " + new Date(this.responseData.sys.sunrise * 1000).toLocaleTimeString() + "</p>"
        contenido+="<p>Puesta del sol: " + new Date(this.responseData.sys.sunset * 1000).toLocaleTimeString() + "</p>"
        contenido+="<p>Viento<ul><li>Velocidad : " + this.responseData.wind.speed + "  m/s</li><li>Ráfagas : " + this.responseData.wind.gust + " m/s</li><li>Dirección : " + this.responseData.wind.deg + " grados</li></ul></p>"
        contenido+="<p>Visibilidad: " + this.responseData.visibility + " metros</p>"
        contenido+="<p>Nubosidad: " + this.responseData.clouds.all + " %</p>"
        contenido+="<p>Última actualización:</p><p> "+ new Date(this.responseData.dt * 1000).toLocaleDateString()+" "+ new Date(this.responseData.dt * 1000).toLocaleTimeString() + "h</p>"
       
        contenido+="</section>"
        $("main").append(contenido)
    }
    mostrarError() {
        $("main").append("<section><h2>Error<h2><p>No se ha podido obtener los datos para " + this.ciudad + "</p></section>")
    }
    mostrarInfo(){
       this.pedirDatosDe("Oviedo")
       this.pedirDatosDe("Seul")
       this.pedirDatosDe("Campina Grande")
       this.pedirDatosDe("Taiyuan")
    
    }
  
}
var e8 = new Ejercicio8();

