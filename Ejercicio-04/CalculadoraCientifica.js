"use strict";
const ERROR="ERROR";
const PUNTO = '.'
const VACIO=" "
class CalculadoraBasica {

    constructor() {
        this.pantalla = VACIO;
        this.memoria = Number(0);
        this.operando1 = null;
        this.operando2 = null;
        this.operacion = "";
        this.resultado=Number(0);

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
            if (this.pantalla.charAt(-1)=== simbolo) {
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
        this.pantalla =VACIO;

    }
    sumarMemoria() {
        this.quitarSimboloDecimales(PUNTO);
        this.operando1 = Number(this.pantalla)
        this.operando2 = Number(this.memoria)
        this.operacion = "+";
        this.ejecutarOperaciónBasica();
        this.pantalla =VACIO;

    }

    borrar() {

        this.pantalla = VACIO;
        this.actualizarPantalla();
    }
    borrarError() {
        if(this.pantalla===ERROR){
         this.pantalla= VACIO;
 
        }else{
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
        this.pantalla =  VACIO;

    }
    raizCuadrada() {
        this.quitarSimboloDecimales(PUNTO);
        this.asignarOperandoUnarias();
        this.operacion = 'sqrt'
        this.resultado=  Math.sqrt(this.operando1);//devuelve un number
        this.procesarResultado();
        this.actualizarPantalla();
        this.pantalla =  VACIO;

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
        if (this.pantalla !=  VACIO) {
            this.operando1 = Number(this.pantalla);
        } else {
            this.operando1 = this.memoria;
        }
    }
    asignarOperandos() {
        
        if(this.pantalla!= VACIO){
            //Si la pantalla está vacía no asigno operandos, ya que Number( ) devuelve 0, produciendo resultados erróneos en operaciones como la multiplicación 
            if ( this.operando1 !== null && this.operando2 === null) {
            
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
        this.pantalla =  VACIO;;

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

    /**
     * Este método hace uso de "Eval" para obtener el resultado de las operaciones simples( x , / , + , -)
     * Se realiza mediante este manejo de las posibles excepciones producidas durante el proceso de evaluación de la 
     * expresión que representa la operación.
     */
    #operacionSimple() {

        try {
            this.resultado=eval(this.operando1 + this.operacion + this.operando2);
            this.procesarResultado();
        }
        catch (err) {
            //En caso de que eval de lugar a una excepción, se mostrará el mensaje de error.
            console.log(err)
            this.pantalla =ERROR;
        }

    }
    /*
     * Este método recibe el resultado de una operación y lo guarda en memoria y en el operando1. 
     * En caso de que la expresión evalue a NaN , memoria y operando 1 no serán modificados, 
     * y el mensaje "ERROR" se mostrará en la pantalla.   
     */
    procesarResultado() {
        if(!isNaN(this.resultado)){
            this.memoria =this.resultado;//devuelve un number
            this.pantalla = this.memoria;
        }else{
            this.pantalla=ERROR;
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

        this.ejecutarOperaciónBasica();
        this.pantalla = Math.PI;
        this.actualizarPantalla();

    }
    borrarDigito() {
        this.borrarUltimoDigito();
    }
    factorial() {
        this.quitarSimboloDecimales(COMA);
        this.ejecutarOperaciónBasica();
        this.asignarOperandoUnarias();
        this.resultado= math.factorial(this.operando1);
        this.procesarResultado();
    }
    seno() {
        this.quitarSimboloDecimales(COMA);
        this.ejecutarOperaciónBasica();
        this.asignarOperandoUnarias();
      
        this.shiftIsPressed ? this.resultado= Math.asin(this.operando1) : resultado = Math.sin(this.operando1);
        this.procesarResultado();

    }
   decimales() {
        this.pantalla += ",";
        this.actualizarPantalla();
    }
    potenciaDeXBase10() {
        
        this.quitarSimboloDecimales(COMA);
        this.asignarOperandoUnarias();
        this.operando2=Number(10)
        this.resultado = Math.pow(this.operando2, this.operando1);
        this.procesarResultado();
    }
    potenciaDeXBaseY() {
        console.log("operando 1 :"+this.operando1+" operando2:"+this.operador2)
        this.quitarSimboloDecimales(COMA);
        this.ejecutarOperaciónBasica();
        this.asignarOperandoUnarias();
        this.resultado = Math.pow(this.operando1, this.operando2);
        this.procesarResultado();
    }
    coseno() {
        this.quitarSimboloDecimales(COMA);
        this.ejecutarOperaciónBasica();
        this.asignarOperandoUnarias();
        this.shiftIsPressed ? this.resultado = Math.acos(this.operando1) : resultado = Math.cos(this.operando1);
        this.procesarResultado();
    }
    tangente() {
        this.quitarSimboloDecimales(COMA);
        this.ejecutarOperaciónBasica();
        this.asignarOperandoUnarias();
        this.shiftIsPressed ? this.resultado= Math.atan(this.operando1) : this.resultado = Math.tan(this.operando1);
        this.procesarResultado();
    }
    log() {
        this.quitarSimboloDecimales(COMA);
        this.ejecutarOperaciónBasica();
        super.asignarOperandoUnarias();
        this.resultado = Math.log(this.operando1);
        this.procesarResultado();
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
  
}

var calculadoraCientifica = new CalculadoraCientifica();