"use strict";
const TXT = "text/plain"
const XML = "text/xml"
const JSON = "application/json"
class ApiFile {
    constructor() {


    }
    procesarArchivos() {
        var filelist = $("input[type='file'").prop("files")
        var element;
        for (var i = 0; i < filelist.length; i++) {
            element = filelist[i]
            this.#mostrarDatos(element);
            if (element.type === TXT || element.type === XML || element.type === JSON) {
                this.#mostrarContenido(element, new FileReader());//creo un nuevo fileReaeder para evitar el que se produzca un error: "The object is already busy reading Blobs"
            }
        }
        //Si no es un json,xml o txt, no se mostrará su contenido, solo sus datos.
    }
    #mostrarDatos(archivo) {
        var datos = "<section title='" + archivo.name + archivo.type + "'><h3>" + archivo.name + "</h3><p>Metadatos del archivo:</p><ul><li>Última modificación :" + new Date( archivo.lastModified) + "</li><li>Tamaño:" + archivo.size + " bytes</li></ul></section>"
        $("main").append(datos)
    }
    /**
     * Método basado en el ejemplo del estándar :https://www.w3.org/TR/FileAPI/#dfn-filelist
     *  Debido a que los archivos terminan de cargarse de forma posterior a las secciones que contendrán su contenido,
     *  indico, mediante el atributo name de dicha sección a cuál quiero que se añada la información.
     *   Empleo la combinación name/type para evitar que , al coincidir varios archivos con el mismo nombre se creen dos secciones con el mismo nombre
     * @param {*} archivo , objeto File obtenido del input.
     * @param {*} reader , objeto de la api de HTML5 , apiFile. Se crea un nuevo objeto reader en cada llamada, para evitar llamar a un reader "ocupado"
     */
    #mostrarContenido(archivo, reader) {

        reader.onload = function () {
           
            var contenido = ""
            if (archivo.type === XML) {
                $("section[title='" + archivo.name + archivo.type + "']").append("<h3>Contenidos del archivo</h3>")
                $("section[title='" + archivo.name + archivo.type + "']").append("<p></p>")
                contenido +=  reader.result 
                $("p:last","section[title='" + archivo.name + archivo.type + "']").text(contenido)
               
            } else {
                contenido +="<h3>Contenidos del archivo</h3><pre>"+ reader.result + "</pre>"
                $("pre","section[title='" + archivo.name + archivo.type + "']").append(contenido)
            }
           
        }
        reader.readAsText(archivo, "UTF-8");
        reader.onError = function () {
            $("section[title='" + archivo.name + archivo.type + "']").append("<h3>Error</h3><p>No se ha podido leer el archivo.</p>")
        }

    }


}
var apiFile = new ApiFile();