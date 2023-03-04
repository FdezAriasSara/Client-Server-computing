"use strict";
class GeoLocalizacion{
    constructor(){
        navigator.geolocation.getCurrentPosition(   this.almacenarDatosPosicion.bind(this),this.manejoDeErrores.bind(this)); // Hará que el navegador pida al usuario permiso de acceso a su ubicación.
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
    manejoDeErrores(error){
        //El error pasado como parámetro pertenecerá a GeolocationPositionError, por tanto, contará con una serie de constantes que suponen sus códigos de error.
        switch(error.code) {
            case error.PERMISSION_DENIED://Se produce cuando el usuario no dota a la app de permisos de acceso a la ubicación
                this.mensaje = "El usuario no permite la petición de geolocalización"
                break;
            case error.POSITION_UNAVAILABLE://Se produce cuando se produce algún error en un recurso  interno del obejto geolocation 
                this.mensaje = "Información de geolocalización no disponible"
                break;
            case error.TIMEOUT: //Se produce cuando no se reciben los datos de localización en el periodo estimado.(timeout)
                this.mensaje = "La petición de geolocalización ha caducado"
                break;
         //   case error.UNKNOWN_ERROR: No he encontrado este código de error en la documentación de la api (https://w3c.github.io/geolocation-api/#dom-geolocationpositionerror-code),
          // por lo que he decidido cambiarlo a un case default.
            default:
                this.mensaje = "Se ha producido un error desconocido"
                break;
            }
    }
    getMapaDinamico(){ 
        
        var puntoInicial={lat:  57.481883416923395, lng: -4.229894652076873};//Coordenadas Culloden Moor , escocia.
       
        //Es muy importante pasar , como primer parámetro de Map, un HTMLElement. En caso de usar jquery se debería usar (por ejemplo en este caso) $("section[title='mapa-dinamico']")[0] 
        //sino , dará lugar a una excepción de la api de google.
        var mapaOviedo = new google.maps.Map(document.querySelector("section[title='mapa-dinamico']"),{zoom: 10,center:puntoInicial});
        var marcador= new google.maps.Marker({position:puntoInicial,map:mapaOviedo}); //añadimos el marcador del punto inicial al mapa.
        
       
    }
}
var mapaDinamicoGoogle=new Object();//Creamos un objeto para encapsular la funcion de getMapaDinamico
var ej11=new GeoLocalizacion();
mapaDinamicoGoogle.getMapaDinamico=ej11.getMapaDinamico
