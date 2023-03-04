"use strict";


class GeoLocalizacion {
  constructor(){
    this.lat=43.35292995631171;
    this.long=-5.85017750566773;
    navigator.geolocation.getCurrentPosition(   this.almacenarDatosPosicion.bind(this),this.manejoDeErrores.bind(this)); // Hará que el navegador pida al usuario permiso de acceso a su ubicación.
  }
  getMapaDinamico() {
 

    var posicionUsuario = {lat: this.lat, lng: this.long};
    var mapa = new google.maps.Map(document.querySelector("section[title='mapa-dinamico']"),{zoom:13,center:posicionUsuario,mapTypeId: 'satellite'});
    var marcador = new google.maps.Marker({title:"usted esta aquí",position:posicionUsuario,map:mapa});


    
  }
  almacenarDatosPosicion(pos){
    this.long = pos.coords.longitude; 
    this.lat   = pos.coords.latitude;  
  
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

}
var mapa=new Object();
var ej11 = new GeoLocalizacion()
mapa.getMapaDinamico=ej11.getMapaDinamico.bind(ej11)
