"use strict";
const PUNTO = '.'
class CalculadoraBasica {

    constructor() {
        this.pantalla = ' ';
        this.memoria = 0;
        this.operando1 = null;
        this.operando2 = null;
        this.operacion = "";

    }
    actualizarPantalla() {
        document.formulario.pantalla.value = this.pantalla;

    }

    digitos(value) {

        this.pantalla += value;
        this.actualizarPantalla();
    }
    decimales() {
        this.quitarSimboloDecimales();
   
        if(!this.pantalla.includes(".")){
            this.pantalla += ".";
            this.actualizarPantalla();
        }
 
    }
    /*En caso de que tras introducir una punto se presione el simbolo de una operación, se borrará automáticamente*/
    quitarSimboloDecimales(simbolo) {
        if (this.pantalla.length > 0) {
            //TODOOOOOOOOOOOOOOOOOOOOOO
            console.log(this.pantalla.charAt(-1))
            if (this.pantalla.charAt(-1)=== simbolo) {
                this.borrarUltimoDigito();
            }
        }

    }

    suma() {
        this.quitarSimboloDecimales(PUNTO);
        this.asignarOperandos();
        this.ejecutarCalculos();
        this.operacion = '+';

    }
    resta() {
        this.quitarSimboloDecimales(PUNTO);
        this.asignarOperandos();
        this.ejecutarCalculos();
        this.operacion = '-';

    }
    multiplicacion() {
        this.quitarSimboloDecimales(PUNTO);       
        this.asignarOperandos();     
        this.ejecutarCalculos();
        this.operacion = '*';

    }
    division() {
        this.quitarSimboloDecimales(PUNTO);
        this.asignarOperandos();
        this.ejecutarCalculos();
        this.operacion = '/';

    }
    recuperarMemoria() {
        this.quitarSimboloDecimales(PUNTO);
        this.pantalla = this.memoria;
        this.actualizarPantalla();
        this.operando1 = null;
        this.operando2 = null;
    }
    restarMemoria() {
        this.quitarSimboloDecimales(PUNTO);
        this.operando1 = Number(this.pantalla)
        this.operando2 = Number(this.memoria)
        this.operacion = "-";
        this.ejecutarCalculos();
        this.pantalla = " ";

    }
    sumarMemoria() {
        this.quitarSimboloDecimales(PUNTO);
        this.operando1 = Number(this.pantalla)
        this.operando2 = Number(this.memoria)
        this.operacion = "+";
        this.ejecutarCalculos();
        this.pantalla = " ";

    }

    borrar() {

        this.pantalla = ' ';
        this.actualizarPantalla();
    }
    borrarError() {
        //TODO -> BOTON CE

    }
    borrarUltimoDigito() {
        this.pantalla = this.pantalla.slice(0, -1)
        this.actualizarPantalla();
    }
    igual() {
        this.quitarSimboloDecimales(PUNTO);
        this.actualizarPantalla();
        this.asignarOperandos();
        this.ejecutarCalculos();
        this.operando1 = null;
        this.operando2 = null;
    }
    porcentaje() {
        this.quitarSimboloDecimales(PUNTO);
        this.asignarOperandoUnarias();
        this.operando2 = Number(this.pantalla);
        this.operacion = "%"
        this.pantalla = this.operando1 * Number(eval(this.operando2 + "/" + Number(100)))
        this.actualizarPantalla();
        this.pantalla = " ";

    }
    raizCuadrada() {
        this.quitarSimboloDecimales(PUNTO);
        this.asignarOperandoUnarias();
        this.operacion = 'sqrt'
        this.memoria = Math.sqrt(this.operando1);//devuelve un number
        this.pantalla = this.memoria;
        this.actualizarPantalla();
        this.pantalla = " ";

    }

    cambioSigno() {
        this.quitarSimboloDecimales(PUNTO);
        this.asignarOperandoUnarias();
        this.operando2 = Number(-1);
        this.operacion = "*";
        this.ejecutarCalculos();
    }
    asignarOperandoUnarias() {
       //Si la pantalla está vacía no asigno operandos, ya que Number( ) devuelve 0, produciendo resultados erróneos en operaciones como la multiplicación                                                             
        if (this.pantalla != " ") {
            this.operando1 = Number(this.pantalla);
        } else {
            this.operando1 = this.memoria;
        }
    }
    asignarOperandos() {
        
        if(this.pantalla!=" " ){
            //Si la pantalla está vacía no asigno operandos, ya que Number( ) devuelve 0, produciendo resultados erróneos en operaciones como la multiplicación 
            if ( this.operando1 !== null && this.operando2 === null) {
            
                this.operando2 = Number(this.pantalla);
            } else {
               
                this.operando1 = Number(this.pantalla);
            }
        }
       
    }
    ejecutarCalculos() {

        switch (this.operacion) {
            case "*":
                this.#operandoNeutro(Number(1))
                this.#operacionSimple();            
                this.operando2 = null;
                break;
            case "+":
                this.#operandoNeutro(Number(0))
                this.#operacionSimple(); 
                this.operando2 = null;
                break;
            case "/":
                this.#operandoNeutro(Number(1))
                this.#operacionSimple();             
                this.operando2 = null;
                break;
            case "-":
                this.#operandoNeutro(Number(0))
                this.#operacionSimple();
                this.operando2 = null;
                break;

        }
        this.actualizarPantalla();
        this.pantalla = " ";

    }
    /**
     * En caso de que el segundo operando sea null a la hora de llamar a ejecutar cálculos, 
     * se le asigna un número que no modifique el actual operando1.
     * En caso de sumas y restas, será 0.
     * En caso de multiplicaciones y divisiones , 1.
     * @param {*} neutro 
     */
    #operandoNeutro(neutro){
        if(this.operando2===null){
            this.operando2=neutro;
        }
    }

    #operacionSimple() {

        try {

            this.pantalla = eval(this.operando1 + this.operacion + this.operando2);
            this.memoria = Number(this.pantalla);
            this.operando1 = this.memoria;
           
        }
        catch (err) {
            console.log(err)
            this.pantalla = "ERROR"
        }

    }

}
var calculadora = new CalculadoraBasica();