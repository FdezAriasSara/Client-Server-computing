"use strict";

const KML = "application/vnd.google-earth.kml+xml"
const XML ="text/xml"
class MapaKML {
    constructor() {
        this.lat = 43.35292995631171;
        this.long = -5.85017750566773;

    }
    procesarArchivos() {

        var filelist = $("input[type='file']").prop("files")
        
        var reader = new FileReader();
        if (filelist[0].type == KML && filelist[0].name.match(/.kml/)) {
            var posicionCentro = { lat: this.lat, lng: this.long };
            var mapa = new google.maps.Map(document.querySelector("section[title='mapa-dinamico']"), { zoom: 13, center: posicionCentro, mapTypeId: 'satellite' });
            var marcador =new google.maps.Marker({ title: "Centro", position: posicionCentro, map: mapa });
           
            reader.onload = function (event) {
                var kmlDocument = $.parseXML(reader.result),
                $kml = $(kmlDocument),
                $elementos=$kml.find("Placemark")
                $.each($elementos,function(){
                    var nombreSitio=$(this).children("name").text();
					var latYlong=$(this).children("Point").children("coordinates").text().split(",");
					var coordenadas = { lat: Number.parseFloat(latYlong[1]), lng: Number.parseFloat(latYlong[0])};
				
                    var marcador = new google.maps.Marker({
                        position: coordenadas,
                         map: mapa,
                        label: {
                          text: nombreSitio
                         
                      }
                  });
                })


            }
            reader.readAsText(filelist[0]);
            reader.onError = function () {
                $("main").append("<h3>Error</h3><p>No se ha podido leer el archivo.</p>")
            }

        } else {
            $("main").append("<section title='error'><h2>Error</h2><p>El archivo tiene que ser de tipo application/vnd.google-earth.kml+xml y extensión .kml</p></section>")
        }

    }
    getMapaDinamico(){
        var posicionCentro = { lat: this.lat, lng: this.long };
        var mapa = new google.maps.Map(document.querySelector("section[title='mapa-dinamico']"), { zoom: 13, center: posicionCentro, mapTypeId: 'satellite' });
        var marcador =new google.maps.Marker({ title: "Centro", position: posicionCentro, map: mapa });
    }
 
  

}
var map=new Object();
var mapaKml = new MapaKML();

map.getMapaDinamico=mapaKml.getMapaDinamico.bind(mapaKml)