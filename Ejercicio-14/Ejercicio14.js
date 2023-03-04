const EN = "en";
const ES = "es";
const IT = "it";
const NO = "no";
const FR = "fr";
const SUBS = "subs";
const CAP = "cap";
const MET = "met";
class AdaptadorMultimedia {
    constructor() {
        this.internalDNDType = 'text/plain'; //Tipo de datos que aceptaremos que sean arrastrados. En este caso, texto
        this.multimediaList = [{}]
        this.trackList = [{}]
        this.datosArchivosCargados = ""
    }
    //USO DE API DRAG AND DROP
    /**
     * Determina si el target accepta el contenido que se va a dejar caer
     * @param {*} event 
     */
    dragEnterHandler(event) {
        // cancel the event if the drag contains data of our type
        /**
         *  if(event.dataTransfer.types.length>0){
        
        if (event.dataTransfer.types===this.internalDNDType)
        event.preventDefault();
       }
         */


    }
    /**
     * Determina qué feedback mostrar al usuario 
     * @param {*} event 
     */
    dragOverHandler(event) {
        event.dataTransfer.dropEffect = 'copy';
        event.preventDefault();

    }
    dropHandler(event) {
        // drop the data    
        var data = event.dataTransfer.getData(this.internalDNDType);
        event.target.value = data; //cambia el valor por defecto del area de texto a el valor arrastrado

    }
    /**
     * Se simula la creacion de un archivo que contiene el track , que será insertado en el interior de la etiqueta video /Audio
     */
    añadirTrack() {
        var contenido = $("textarea", "fieldset[name='fs-tipo']").get()
        var tipo = $("input[type='radio']", "fieldset[name='fs-tipo']").is(":checked")
        var idioma = $("input[type='radio']", "fieldset[name='fs-idioma']").is(":checked")
        var nombre = $("textarea[name='nombre_archivo']", "fieldset[name='fs-tipo']").get()
        this.trackList.push({ nombre: nombre, tipo: tipo, lan: idioma })
    }
    //USO DE API FILE
    procesarArchivosVideo() {
        var filelist = $("input[name='subidaDirecta']").prop("files")

        var element;
        for (var i = 0; i < filelist.length; i++) {
            element = filelist[i]
            //por defecto , los archivos cargados con  api file generarán tracks de subtitulos en español

            this.multimediaList.push({ nombre: element.name, tipo: element.type })
            this.#mostrarDatos(element);

        }

    }
    procesarArchivosTrack() {
        var filelist = $("input[name='subidaDirecta']").prop("files")

        var element;
        for (var i = 0; i < filelist.length; i++) {
            element = filelist[i]
            //por defecto , los archivos cargados con  api file generarán tracks de subtitulos en español
            this.trackList.push({ nombre: element.name, tipo: "subtitles", lan: "es" })
            this.#mostrarDatos(element);

        }

    }
    #mostrarDatos(archivo) {

        this.datosArchivosCargados += "Nombre del archivo: " + archivo.name + "- Tipo: " + archivo.type + "-Útima modificación :" + new Date(archivo.lastModified) + "-Tamaño:" + archivo.size + " bytes\n"
        $("textarea[name='contenido']").text(this.datosArchivosCargados)
    }
    añadirTracks() {
        var videoElement = ""
        for (var element of this.multimediaList) {
            /**
             * No he sido capaz de evitar que esta parte diera errores de validacion , ya que los elementos dan undefined y produce warnings al tener srclang valor igual a  true o false.
             *  videoElement = "<video controls > <source src='" + element["nombre"]+"."+element["tipo"] + " type='video/" + element["tipo"] + "'>"

            *for (var track of this.trackList) {
                videoElement += "<track kind='" + track["tipo"]+ "' src='" +track["nombre"]+ ".vtt' srclang='" +track["lan"]+ "' />"

            *}
            videoElement += "</video>"
             */

        }
        // $("section[title='videos']").append(videoElement)
        this.mostrarTracks()
    }
    //USO API TextTrack O API Clipboard
    mostrarTracks() {
        var idiomas = { en: 0, es: 0, it: 0, fr: 0, no: 0 }
        var tipos = { subs: 0, cap: 0, met: 0 }
        var tracks;
        if (document.querySelector('video')) {//evitar errores si no hay elementos video aun
            tracks = document.querySelector('video').textTracks 
            for (var t of tracks) {

                this.#recuentoIdioma(t.language, idiomas)
                this.#recuentoTipo(t.kind, tipos)
            }
            $("p", "section[title='videos']").remove()
            $("section[title='resumen']").append("<p>De todos los tracks, " + idiomas[EN] + " son en inglés," + idiomas[FR] + " en francés y " + idiomas[ES] + " son en español . Hay " + idiomas[NO] + " archivos en noruego, asi como " + idiomas[IT] + " en italiano. </p>")
            $("section[title='resumen']").append("<p>Por otro lado, " + tipos[SUBS] + " son subtítulos,  " + tipos[CAP] + " son decripciones(captions) y " + tipos[MET] + " son metadatos. </p>")
        }


    }

    #recuentoIdioma(idioma, idiomas) {
        switch (idioma) {
            case EN:
                idiomas[EN] += 1
                break;
            case ES:
                idiomas[ES] += 1
                break;
            case IT:
                idiomas[IT] += 1
                break;
            case FR:
                idiomas[FR] += 1
                break;
            case NO:
                idiomas[NO] += 1
                break;
        }
    }
    #recuentoTipo(tipo, tipos) {
        switch (tipo) {
            case "subtitles":
                tipos[SUBS] += 1
                break;
            case "captions":
                tipos[CAP] += 1
                break;
            case "metadata":
                tipos[MET] += 1
                break;
        }
    }
}
var e14 = new AdaptadorMultimedia();
