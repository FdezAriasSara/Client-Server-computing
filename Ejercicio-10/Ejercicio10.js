"use strict"
const START_CASE = "start"
const END_CASE = "end"
class RedElectrica {

    constructor() {
        this.urlBase = "https://apidatos.ree.es/es/datos/"
        this.url = ""
        this.dataType = "json"
        this.startDate = "2018-01-01T00:00"
        this.endDate = "2018-12-31T23:59"
        this.widget = ""
        //En caso de no indicarse los límites geográficos emplea el peninsular por defecto
        this.geo_trunc = "&geo_limit=peninsular&geo_id=8741"
        this.time_trunc = ""
    }
    realizarConsulta() {

        this.#procesarFormulario();
        $.ajax({
            context: this,//Para que la llamada dentro de la función de sucess use this=redElectrica
            dataType: this.dataType,
            url: this.url,
            method: this.method,

            success: function (data) {
                //https://apidatos.ree.es/es/datos/demanda/evolucion?start_date=2022-02-01T00:00:00.000Z&end_date=2022-12-01T00:00:00.000Z&&geo_limit=ccaa&geo_ids=5&time_trunc=&time_trunc=month
                 this.mostrarDatos(data)
            },
            error: function (error) {
                
                this.mostrarError(error)
            },
        })
    }
    mostrarDatos(datos){
        var contenido="<h2>"+this.widget.replace('-',' ')+"</h2><p name='last-update'>"+this.datos.data.last-update+"</p><p>"+this.datos.data.description+"</p>";
        var atributos="<p>Información: <ul>";
        var attrArray=datos.included.attributes ;
        for(var key of attrArray){
            atributos+="<li>"+key+":"+attrArray[key]+"</li>";
        }
        atributos+="</ul></p>";
        $("section[title='resultados']").append(contenido)
    }
    mostrarError(error){
        $("section[title='resultados']").append(error)
    }
    #convertirFecha(fecha, caso) {
        try {
            caso == START_CASE ? this.startDate = new Date(fecha).toISOString() : this.endDate = new Date(fecha).toISOString();

        } catch (err) {
            //mantener fecha base

        }
    }
    #procesarAmbitoGeografico() {
        var geotrunc;
        $("input[type='radio']", "fieldset[name='geo_trunc']").each(
            function () {
                if ($(this).is(":checked")) {
                    geotrunc = $(this).attr("name")

                }
            }
        )
        if (geotrunc) {
            this.geo_trunc = geotrunc;
        }
    }
    #procesarAmbitoHorario() {
        var timetrunc;
        $("input[type='radio']", "fieldset[name='time_trunc']").each(
            function () {

                if ($(this).is(":checked")) {
                    timetrunc = $(this).attr("name")

                }
            }
        )
        if (timetrunc) {

            this.time_trunc = timetrunc;
        }
    }
    #procesarWidget() {
        var wid;
        $("input[type='radio']", "fieldset[name='widget']").each(
            function () {
                if ($(this).is(":checked")) {
                    wid = $(this).attr("name")

                }
            }
        )
        if (wid) {

            this.widget = wid;
        }

    }
    #procesarFormulario() {

        this.#convertirFecha($("input[name='start_date']").val(), START_CASE)
        this.#convertirFecha($("input[name='end_date']").val(), END_CASE)
        this.#procesarAmbitoGeografico();
        this.#procesarAmbitoHorario();
        this.#procesarWidget();

        var timeFormat = "?start_date=" + this.startDate + "&end_date=" + this.endDate + "&"

        this.url = this.urlBase + "demanda/" + this.widget + timeFormat + this.geo_trunc + "&time_trunc=" + this.time_trunc;



 
    }

}
var redElectrica = new RedElectrica();