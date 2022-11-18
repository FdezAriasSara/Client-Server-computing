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
const COMA=','
class CalculadoraCientifica extends CalculadoraBasica {
    constructor() {
        super()
        this.shiftIsPressed = false;
    }
    mostrarPi() {

        this.ejecutarCalculos();
        this.pantalla = Math.PI;
        this.actualizarPantalla();

    }
    borrarDigito() {
        this.borrarUltimoDigito();
    }
    factorial() {
        this.quitarSimboloDecimales(COMA);
        this.ejecutarCalculos();
        this.asignarOperandoUnarias();
        this.memoria = math.factorial(this.operando1);
        this.#resultadoAOperando1();
    }
    seno() {
        this.quitarSimboloDecimales(COMA);
        this.ejecutarCalculos();
        this.asignarOperandoUnarias();
        this.shiftIsPressed ? this.memoria = Math.asin(this.operando1) : this.memoria = Math.sin(this.operando1);
        this.#resultadoAOperando1();

    }
   decimales() {
        this.pantalla += ",";
        this.actualizarPantalla();
    }
    
    potenciaDeXBaseY() {
        console.log("operando 1 :"+this.operando1+" operando2:"+this.operador2)
        this.quitarSimboloDecimales(COMA);
        this.ejecutarCalculos();
        this.asignarOperandoUnarias();
        this.memoria = Math.pow(this.operando1, this.operando2);
        this.#resultadoAOperando1();
    }
    coseno() {
        this.quitarSimboloDecimales(COMA);
        this.ejecutarCalculos();
        this.asignarOperandoUnarias();
        this.shiftIsPressed ? this.memoria = Math.acos(this.operando1) : this.memoria = Math.cos(this.operando1);
        this.#resultadoAOperando1();
    }
    tangente() {
        this.quitarSimboloDecimales(COMA);
        this.ejecutarCalculos();
        this.asignarOperandoUnarias();
        this.shiftIsPressed ? this.memoria = Math.atan(this.operando1) : this.memoria = Math.tan(this.operando1);
        this.#resultadoAOperando1();
    }
    log() {
        this.quitarSimboloDecimales(COMA);
        this.ejecutarCalculos();
        super.asignarOperandoUnarias();
        this.memoria = Math.log(this.operando1);
        this.#resultadoAOperando1();
    }
    shift() {
        //En caso de que shift no esté presionado y se presione (!(false)&true=true)
        //En caso de que shift  esté presionado y se presione de nuevo(!(true)&true=false)
        this.shiftIsPressed = !(this.shiftIsPressed) & true;
        if (this.shiftIsPressed) {
            document.formulario.sin.value = "arcsin";
            document.formulario.cos.value = "arcos";
            document.formulario.tan.value = "arctan";
        } else {
            document.formulario.sin.value = "sin";
            document.formulario.cos.value = "cos";
            document.formulario.tan.value = "tan";
        }

    }
    #resultadoAOperando1() {
        this.operando1 = this.memoria;
        this.pantalla = this.memoria;
        super.actualizarPantalla();
    }
}

var calculadoraCientifica = new CalculadoraCientifica();