"use strict";

class MapaGeoJSON {
    constructor() {
        this.lat = 43.35292995631171;
        this.long = -5.85017750566773;

    }
    procesarArchivos() {

        var filelist = $("input[type='file']").prop("files")

        var reader = new FileReader();

        if (filelist[0].name.match(/.geojson/)) {
            var posicionCentro = { lat: this.lat, lng: this.long };
            var mapa = new google.maps.Map(document.querySelector("section[title='mapa-dinamico']"), { zoom: 13, center: posicionCentro, mapTypeId: 'satellite' });
            var marcador = new google.maps.Marker({ title: "Centro", position: posicionCentro, map: mapa });

            reader.onload = function (event) {
                var jsonDocument = JSON.parse(reader.result);

                for (var i = 0; i < jsonDocument.features.length; i++) {
                    var nombreSitio = jsonDocument.features[i].properties.name;
                    var coord = jsonDocument.features[i].geometry.coordinates.toString().split(",")
                    var latYlong =
                    {
                        lat: Number.parseFloat(coord[1]),
                        lng: Number.parseFloat(coord[0])
                    };


                    var marcador = new google.maps.Marker({
                        position: latYlong,
                        map: mapa,
                        label: {
                            text: nombreSitio

                        }
                    });
                }
            }



            reader.readAsText(filelist[0]);
            reader.onError = function () {
                $("main").append("<h3>Error</h3><p>No se ha podido leer el archivo.</p>")
            }

        } else {
            $("main").append("<section title='error'><h2>Error</h2><p>El archivo tiene que ser de tipo application/geo+json y extensión .geojson</p></section>")
        }

    }
    getMapaDinamico() {
        var posicionCentro = { lat: this.lat, lng: this.long };
        var mapa = new google.maps.Map(document.querySelector("section[title='mapa-dinamico']"), { zoom: 13, center: posicionCentro, mapTypeId: 'satellite' });
        var marcador =new google.maps.Marker({ title: "Centro", position: posicionCentro, map: mapa });
    }



}
var map = new Object();
var mapajson = new MapaGeoJSON();

map.getMapaDinamico = mapajson.getMapaDinamico.bind(mapajson)