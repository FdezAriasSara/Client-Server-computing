"use strict";
class GeoLocalizacion{
    constructor(){
        navigator.geolocation.getCurrentPosition(   this.almacenarDatosPosicion.bind(this)); // Hará que el navegador pida al usuario permiso de acceso a su ubicación.
        //get current position recibe un parámetro obligatorio y dos opcionales.
        //Estos parámetros serán objetos de tipo función.
    }
    almacenarDatosPosicion(pos){
    
            this.longitud         = pos.coords.longitude; 
            this.latitud          = pos.coords.latitude;  
            this.precision        = pos.coords.accuracy;
            this.altitud          = pos.coords.altitude;
            this.precisionAltitud = pos.coords.altitudeAccuracy;
            this.rumbo            = pos.coords.heading;
            this.velocidad        = pos.coords.speed;    
            this.ultimaActualización=new Date(pos.timestamp)  
        
         this.#mostrarDatos()
    }
    #mostrarDatos(){
        $("main").append("<section><h2>Usted se encuentra aquí</h2><ul><li>Coordenadas ("+this.latitud+", "+this.longitud+", "+this.altitud+")</li><li>Precisión (latitud y longitud) de "+this.precision+"</li>"+"<li>Precisión (altitud)  de "+this.precisionAltitud+"</li><li>Con rumbo a "+this.rumbo+ "</li><li>A una velocidad de "+this.velocidad+" m/s</li></ul> <p>Última actualización realizada "+this.ultimaActualización+"</p></section>")
    }
}
var ej11=new GeoLocalizacion();
