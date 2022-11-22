"use strict";
const ERROR = "ERROR";
const PUNTO = '.'
const VACIO = " "
class CalculadoraBasica {

    constructor() {
        this.pantalla = VACIO;
        this.memoria = Number(0);
        this.operando1 = null;
        this.operando2 = null;
        this.operacion = "";
        this.resultado = Number(0);
    }

    actualizarPantalla() {
        document.formulario.pantalla.value = this.pantalla;

    }


    digitos(value) {

        this.pantalla += value;
        this.actualizarPantalla();
    }
    decimales() {
        this.quitarSimboloDecimales(PUNTO);

        if (!this.pantalla.includes(".")) {
            this.pantalla += ".";
            this.actualizarPantalla();
        }

    }
    /*En caso de que tras introducir una punto se presione el simbolo de una operación, se borrará automáticamente*/
    quitarSimboloDecimales(simbolo) {
        if (this.pantalla.length > 0) {
            if (this.pantalla.charAt(-1) === simbolo) {
                this.borrarUltimoDigito();
            }
        }

    }

    suma() {
        this.quitarSimboloDecimales(PUNTO);
        this.asignarOperandos();
        this.ejecutarOperaciónBasica();
        this.operacion = '+';

    }
    resta() {
        this.quitarSimboloDecimales(PUNTO);
        this.asignarOperandos();
        this.ejecutarOperaciónBasica();
        this.operacion = '-';

    }
    multiplicacion() {
        this.quitarSimboloDecimales(PUNTO);
        this.asignarOperandos();
        this.ejecutarOperaciónBasica();
        this.operacion = '*';

    }
    division() {
        this.quitarSimboloDecimales(PUNTO);
        this.asignarOperandos();
        this.ejecutarOperaciónBasica();
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
        this.ejecutarOperaciónBasica();
        this.pantalla = VACIO;

    }
    sumarMemoria() {
        this.quitarSimboloDecimales(PUNTO);
        this.operando1 = Number(this.pantalla)
        this.operando2 = Number(this.memoria)
        this.operacion = "+";
        this.ejecutarOperaciónBasica();
        this.pantalla = VACIO;

    }

    reiniciar() {

        this.pantalla = VACIO;
        this.actualizarPantalla();
    }
    borrarError() {
        if (this.pantalla === ERROR) {
            this.pantalla = VACIO;

        } else {
            this.borrarUltimoDigito();
        }

    }
    borrarUltimoDigito() {
        this.pantalla = this.pantalla.slice(0, -1)
        this.actualizarPantalla();
    }
    igual() {
        this.quitarSimboloDecimales(PUNTO);
        this.actualizarPantalla();
        this.asignarOperandos();
        this.ejecutarOperaciónBasica();
        this.operando1 = null;
        this.operando2 = null;
    }
    porcentaje() {
        this.quitarSimboloDecimales(PUNTO);
        this.asignarOperandoUnarias();
        this.operando2 = Number(this.pantalla);
        this.operacion = "%"
        this.resultado = this.operando1 * Number(eval(this.operando2 + "/" + Number(100)))
        this.procesarResultado();
        this.actualizarPantalla();
        this.pantalla = VACIO;

    }
    raizCuadrada() {
        this.quitarSimboloDecimales(PUNTO);
        this.asignarOperandoUnarias();
        this.operacion = 'sqrt'
        this.resultado = Math.sqrt(this.operando1);//devuelve un number
        this.procesarResultado();
        this.actualizarPantalla();
        this.pantalla = VACIO;

    }

    cambioSigno() {
        this.quitarSimboloDecimales(PUNTO);
        this.asignarOperandoUnarias();
        this.operando2 = Number(-1);
        this.operacion = "*";
        this.ejecutarOperaciónBasica();
    }
    asignarOperandoUnarias() {
        //Si la pantalla está vacía no asigno operandos, ya que Number( ) devuelve 0, produciendo resultados erróneos en operaciones como la multiplicación                                                             
        if (this.pantalla !== VACIO) {
            this.operando1 = Number(this.pantalla);
        } else {
            this.operando1 = this.memoria;
        }
    }
    asignarOperandos() {

        if (this.pantalla != VACIO) {
            //Si la pantalla está vacía no asigno operandos, ya que Number( ) devuelve 0, produciendo resultados erróneos en operaciones como la multiplicación 
            if (this.operando1 !== null && this.operando2 === null) {

                this.operando2 = Number(this.pantalla);
            } else {

                this.operando1 = Number(this.pantalla);
            }
        }

    }
    /**
     * Método que ejecuta los calculos de las operaciones básicas: Suma, resta , multiplicación y división.
    * Estas presentan una estructura similar:
    *   -En caso de que el segundo operando sea null , se le asigna un elemento neutro.
    *   -Una vez estemos seguros de que ningún operando es null, se realiza la operación llamando a eval en #operaciónSimple, y se guarda
    *   el resultado de la misma en memoria y en el operando 1. En caso de ser errónea se muestra el mensaje "error"
    *   -Una vez hemos hecho el cálculo, establecemos como null el segundo operando.ç
    *   -Actualizamos la pantalla y nos preparamos para las siguientes operaciones. (vaciando el elemento pantalla internamente)
    */
    ejecutarOperaciónBasica() {

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
        this.pantalla = VACIO;;

    }
    /**
     * En caso de que el segundo operando sea null a la hora de llamar a ejecutar cálculos, 
     * se le asigna un número que no modifique el actual operando1.
     * En caso de sumas y restas, será 0.
     * En caso de multiplicaciones y divisiones , 1.
     * @param {*} neutro 
     */
    #operandoNeutro(neutro) {
        if (this.operando2 === null) {
            this.operando2 = neutro;
        }
    }

    /**
     * Este método hace uso de "Eval" para obtener el resultado de las operaciones simples( x , / , + , -)
     * Se realiza mediante este manejo de las posibles excepciones producidas durante el proceso de evaluación de la 
     * expresión que representa la operación.
     */
    #operacionSimple() {

        try {
            this.resultado = eval(this.operando1 + this.operacion + this.operando2);
            this.procesarResultado();
        }
        catch (err) {
            //En caso de que eval de lugar a una excepción, se mostrará el mensaje de error.
            console.log(err)
            this.pantalla = ERROR;
        }

    }
    /*
     * Este método recibe el resultado de una operación y lo guarda en memoria y en el operando1. 
     * En caso de que la expresión evalue a NaN , memoria y operando 1 no serán modificados, 
     * y el mensaje "ERROR" se mostrará en la pantalla.   
     */
    procesarResultado() {
        if (!isNaN(this.resultado)) {
            this.memoria = this.resultado;//devuelve un number
            this.pantalla = this.memoria;
        } else {
            this.pantalla = ERROR;
        }

    }
    procesarTeclas(event){
        var keyPressed = event.key;
        if (keyPressed !== VACIO) {
            if (Number.isInteger(Number(keyPressed)) && !event.shiftKey) {

                this.digitos(Number(keyPressed))
            } else {

                switch (keyPressed) {

                    case "+":
                        this.suma();
                        break;
                    case "-":
                        this.resta();
                        break;
                    case "*":
                        this.multiplicacion();
                        break;
                    case "/":
                        this.division();
                        break;
                    case "r":
                        this.raizCuadrada();
                        break;
                    case "s":
                        this.cambioSigno();
                        break;
                    case "O":
                        //letra o
                        this.reiniciar();
                        break;
                    case "C":
                        this.borrarError();
                        break;
                    //creo que en términos de usabilidad será mas intuitivo y fácil de entender si 
                    //las operaciones de memoria requieren que el caracter esté en mayúsculas
                    case "M":
                        this.recuperarMemoria();
                        break;
                    case "R":
                        this.restarMemoria();
                        break;
                    case "S":
                        this.sumarMemoria();
                        break;    
                    case "%":
                        console.log("hola")
                        this.porcentaje();
                        break;
                    case ".":
                        this.decimales();
                    case "Enter":
                        this.igual();
                        break;
                }
            }
        }
    }

}

var calculadora = new CalculadoraBasica();
document.addEventListener('keydown', (event) => {
    calculadora.procesarTeclas(event);
});