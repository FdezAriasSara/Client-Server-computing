"use strict";
const VACIO = ""
const ERROR = "ERROR"
class CalculadoraRPN {

    constructor() {

        this.pilaOperandos = new Array();
        this.memoria = Number(0);
        this.operando2 = null;
        this.operando1 = null;
        this.resultado = null;
        this.operandoActual = VACIO;
        this.shiftIsPressed = false;

    }
    digitos(value) {
        this.operandoActual += value;
        document.querySelector('textArea[name="operandoActual"]').value = this.operandoActual;
    }

    /**
    * Método que introduce un operando a la pila y actualiza la representación visual de la misma.
    */
    pushOperando(operando) {
        document.querySelector('textArea[name="pilaOperandos"]').value = VACIO;//vaciamos el area del número que está siendo introducido porque se ha seleccionado enter.
        if (isNaN(operando)) {
            document.querySelector('textArea[name="pilaOperandos"]').value = ERROR;
        } else {

            this.pilaOperandos.push(Number(operando));//convertimos el numero introducido a number y lo metemos en la pila de operadores.
            this.actualizarPila();
            this.memoria = operando;
        }


    }
    actualizarPila() {
        document.querySelector('textArea[name="pilaOperandos"]').value = VACIO;
        var gap = ":      "

        for (let index = this.pilaOperandos.length - 1; index >= 0; index--) {
            var currentIndex = index + 1;
            if (currentIndex > 9) {
                gap = ":  "
            }
            document.querySelector('textArea[name="pilaOperandos"]').value += currentIndex + gap + this.pilaOperandos[index] + "\n";

        }
    }

    suma() {
        this.asignarOperandos();
        this.resultado = this.operando1 + this.operando2;
        this.pushOperando(this.resultado);
    }
    resta() {
        this.asignarOperandos();
        this.resultado = this.operando1 - this.operando2;
        this.pushOperando(this.resultado);

    }
    multiplicacion() {
        this.asignarOperandos();
        this.resultado = this.operando1 * this.operando2;
        this.pushOperando(this.resultado);
    }
    division() {
        this.asignarOperandos();
        this.resultado = this.operando1 / this.operando2;
        this.pushOperando(this.resultado);

    }
    cambioSigno() {
        this.asignarOperandosUnaria();
        this.operando2 = Number(-1)
        this.resultado = this.operando1 * this.operando2;
        this.pushOperando(this.resultado);

    }
    cuadrado() {

        this.asignarOperandos();
        this.operando2 = Number(2);
        this.resultado = Math.pow(this.operando1, this.operando2);
        this.pushOperando(this.resultado);

    }
    mostrarPi() {
        this.operandoActual = VACIO;
        this.digitos(Math.PI)
    }
    potenciaDeYBaseX() {
        this.asignarOperandos();
        this.resultado = Math.pow(this.operando1, this.operando2);
        this.pushOperando(this.resultado);
    }
    potenciaBase10() {
        this.asignarOperandosUnaria();
        this.operando2 = Number(10);
        this.resultado = Math.pow(this.operando2, this.operando1);
        this.pushOperando(this.resultado);
    }
    raízCuadrada() {
        this.asignarOperandosUnaria();
        this.resultado = Math.sqrt(this.operando1);
        this.pushOperando(this.resultado);
    }
    seno() {

        this.asignarOperandosUnaria();
        this.shiftIsPressed ? this.resultado = Math.asin(this.operando1) : this.resultado = Math.sin(this.operando1);
        this.pushOperando(this.resultado);

    }
    coseno() {

        this.asignarOperandosUnaria();
        this.shiftIsPressed ? this.resultado = Math.acos(this.operando1) : this.resultado = Math.cos(this.operando1);
        this.pushOperando(this.resultado);
    }
    tangente() {
        this.asignarOperandosUnaria();
        this.shiftIsPressed ? this.resultado = Math.atan(this.operando1) : this.resultado = Math.tan(this.operando1);
        this.pushOperando(this.resultado);
    }
    borrarMemoria() {
        this.memoria = Number(0);
        this.#shiftBotonesMemoria();
    }
    borrarUltimoDigito() {

        this.operandoActual = this.operandoActual.slice(0, -1)
        document.querySelector('textArea[name="operandoActual"]').value = this.operandoActual;

    }
    borrarError() {
        this.pilaOperandos.pop();
        this.actualizarPila();
    }
    reiniciar() {
        this.pilaOperandos = new Array();
        this.memoria = Number(0);
        this.operando2 = null;
        this.operando1 = null;
        this.resultado = null;
        this.operandoActual = VACIO;
        this.shiftIsPressed = false;

    }
    recuperarMemoria() {
        this.pilaOperandos = new Array()
        this.operando1 = null;
        this.operando2 = null;
        this.pushOperando(this.memoria)
    }
    restarMemoria() {
        this.operando2 = this.memoria;
        this.pushOperando(this.operando2);
        this.resultado = this.operando1 - this.operando2;
        this.pushOperando(this.resultado);

    }
    sumarMemoria() {
        this.operando2 = this.memoria;
        this.pushOperando(this.operando2);
        this.resultado = this.operando1 + this.operando2;
        this.pushOperando(this.resultado);
    }
    almacenarEnMemoria() {
        this.memoria = Number(this.pilaOperandos[0]);
        this.#shiftBotonesMemoria();
    }
    #shiftBotonesMemoria() {
        var estado = (this.memoria === Number(0))

        document.querySelector('input[name="mr"]').disabled = estado;
        document.querySelector('input[name="mc"]').disabled = estado;
    }
    asignarOperandos() {

        if (this.pilaOperandos.length >= 2) {
            this.operando2 = this.pilaOperandos.pop()
            this.operando1 = this.pilaOperandos.pop()
        }

    }

    asignarOperandosUnaria() {

        if (this.pilaOperandos.length >= 1) {
            this.operando1 = this.pilaOperandos.pop()
        }

    }
    enter() {

        this.pushOperando(this.operandoActual);
        this.operandoActual = VACIO;
        document.querySelector('textArea[name="operandoActual"]').value = VACIO;

    }
    shift() {
        //En caso de que shift no esté presionado y se presione (!(false)&true=true)
        //En caso de que shift  esté presionado y se presione de nuevo(!(true)&true=false)
        this.shiftIsPressed = !(this.shiftIsPressed) & true;
        if (this.shiftIsPressed) {
            document.querySelector('input[name="sin"]').value = "arcsin";
            document.querySelector('input[name="cos"]').value = "arcos";
            document.querySelector('input[name="tan"]').value = "arctan";
        } else {
            document.querySelector('input[name="sin"]').value = "sin";
            document.querySelector('input[name="cos"]').value = "cos";
            document.querySelector('input[name="tan"]').value = "tan";
        }

    }

    procesarTeclas(event) {

        var keyPressed = event.key;

        if (keyPressed !== VACIO) {
            if (Number.isInteger(Number(keyPressed)) && !event.shiftKey) {

                this.digitos(Number(keyPressed))
            } else if (event.shiftKey && event.ctrlKey) {
                //Esta funcionalidad será la asociada a la tecla de ↑
                //De esta forma, se podrá hacer uso de otros los eventos asociados a letras mayúsculas
                //o símbolos que requieran de shift 
                this.shift();
            }
            else {

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
                    case "_":
                        this.cambioSigno();
                        break;
                    case "p":
                        this.mostrarPi();
                        break;
                    case "y":
                        this.potenciaDeYBaseX();
                        break;
                    case "x":
                        this.cuadrado();
                        break;
                    case "o":
                        this.coseno();
                        break;
                    case "s":
                        this.seno();
                        break;
                    case "t":
                        this.tangente();
                        break
                    case "c":
                        //letra o
                        this.reiniciar();
                        break;
                    case "e":
                        this.borrarError();
                        break;
                    case "Backspace":
                        this.borrarUltimoDigito();
                        break;
                    case "e":
                        this.exp();
                        break;
                    case "m":
                        this.mod();
                        break;
                    case "l":
                        this.log();
                        break;
                    case "!":
                        this.factorial();
                        break;
                    case ",":
                        this.decimales();
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
                    case "G":
                        this.almacenarEnMemoria();
                        break;
                    case "B":
                        this.borrarMemoria();
                        break;


                    case "Enter":
                        this.enter();
                        break;
                    default:
                        break;
                }
            }
        }
    }

}

const HEXA = Number(16);
const DECIMAL = Number(10);
const OCTAL = Number(8);
const BINARIA = Number(2);

class CalculadoraEspecializada extends CalculadoraRPN {
    constructor() {
        super();
        this.baseActual = DECIMAL;
    }
    convertirA(baseResultado) {

        if (this.baseActual != DECIMAL) {

            this.#convertirADecimalDesde();
        }

        this.#convertirDeDecimalA(baseResultado)
        this.baseActual = Number(baseResultado);
        this.#restringirTeclas();

    }


    #convertirDeDecimalA(baseResultado) {


        for (var indice = 0; indice < this.pilaOperandos.length; indice++) {

            var cociente = this.pilaOperandos[indice]
            var resto;
            var resultado = new Array();
            do {

                resto = cociente % baseResultado;
                cociente = Math.floor(cociente / baseResultado);
                resultado.push(String(resto))

            } while (cociente >= baseResultado)



            var numeroObtenido = String(cociente);
            for (var i = resultado.length - 1; i >= 0; i--) {
                numeroObtenido += resultado[i];
            }
            this.pilaOperandos[indice] = Number(numeroObtenido)



        }
        this.actualizarPila();
    }
    #convertirPilaADecimal(){
        
        for (var index = 0; index < this.pilaOperandos.length; index++) {
            var numeroDecimal=VACIO;
            const element = String(this.pilaOperandos[index]);
            for (let digito = 0; digito <element.length; digito++) {
               var dig=element[digito];
                switch(dig){
                    case "A":
                        numeroDecimal+='10'
                        break;
                     case "B":
                        numeroDecimal+='11'
                        break;
                     case "C":
                        numeroDecimal+='12'
                        break;
                    case "D":
                        numeroDecimal+='13'
                        break;
                     case "E":
                        numeroDecimal+='14'
                        break;
                     case "F":
                        numeroDecimal+='15'
                        break;
                     default:
                        numeroDecimal+=dig;
                        break;
                }
                
            }
            this.pilaOperandos[index]=Number(numeroDecimal)
        }
    }
   
    #convertirADecimalDesde() {
        if(this.baseActual==HEXA){
            this.#convertirPilaADecimal();
        }
        this.pilaOperandos.forEach(NumeroAConvertir => {

            var resultado = Number(0);
            var numeroOriginal = String(NumeroAConvertir);
            var potencia = Number(0);
            var factorConversion;
            for (var indice = numeroOriginal.length - 1; indice >= 0; indice--) {

                const digitoActual = Number(numeroOriginal[indice]);

                factorConversion = Math.pow(DECIMAL, potencia);
                resultado += digitoActual * factorConversion;
                potencia++;
            }
            this.pushOperando(resultado);
        });




    }

    escribeLetra(letra){
        this.operandoActual+=letra;
        document.querySelector('textArea[name="operandoActual"]').value = this.operandoActual;
    }
    procesarTeclas(evento) {
        super.procesarTeclas(evento);
        var keyPressed = evento.key;
        switch (keyPressed) {
            case "b":
                this.convertirABinario();
                break;
            case "a":
                this.convertirAOctal();
                break;
            case "d":
                this.convertirADecimal();
                break;
            case "A":
                this.escribeLetra("A");
                break;
            case "B":
                this.escribeLetra("B");
                break;
            case "Z":
                this.escribeLetra("Z");
                break;
            case "D":
                this.escribeLetra("D");
                break;
            case "E":
                this.escribeLetra("E");
                break;
            case "F":
                this.escribeLetra("F");
                break;
            case "h":
                this.convertirAHexadecimal();
                break;

        }

    }
    enter(){
        if(this.baseActual==HEXA){
            this.pilaOperandos.push(this.operandoActual)
            this.actualizarPila();
            this.operandoActual = VACIO;
             document.querySelector('textArea[name="operandoActual"]').value = VACIO;
        }else{
            super.enter();
        }
        
    }

    #restringirTeclas() {
        var pre = 'input[name="';

        switch (this.baseActual) {
            case BINARIA:

                for (let i = 0; i < 10; i++) {
                    var selector = pre + i + '"]'
                    document.querySelector(selector).disabled = true;
                }

                document.querySelector('input[name="0"]').disabled = false;
                document.querySelector('input[name="1"]').disabled = false;
                document.querySelector('input[name="dec"]').disabled = false;
                document.querySelector('input[name="hex"]').disabled = false;
                this.#disableLetras(true)
                this.#disableOperaciones(true);
                break;
            case OCTAL:

                //habilitamos los números del 0 al 7 y los botones de cambio de base y borrado.

                for (let i = 0; i < 8; i++) {
                    var selector = pre + i + '"]'
                    document.querySelector(selector).disabled = false;
                }


                document.querySelector('input[name="dec"]').disabled = false;
                document.querySelector('input[name="bin"]').disabled = false;
                document.querySelector('input[name="hex"]').disabled = false;
                document.querySelector('input[name="enter"]').disabled = false;
                this.#disableLetras(true)
                this.#disableOperaciones(true);
                break;
            case DECIMAL:
                for (let i = 0; i < 10; i++) {
                    var selector = pre + i + '"]'
                    document.querySelector(selector).disabled = false;
                }
                document.querySelector('input[type="button"]').disabled = false;
                this.#disableLetras(true)
                this.#disableOperaciones(false);
                break;
            case HEXA:
                document.querySelector('input[type="button"]').disabled = true;
                //habilitamos los números del 0 al 9 y los botones de cambio de base y borrado.
                for (let i = 0; i < 10; i++) {
                    var selector = pre + i + '"]'
                    document.querySelector(selector).disabled = false;
                }
                this.#disableOperaciones(true);
                document.querySelector('input[name="dec"]').disabled = false;
                document.querySelector('input[name="bin"]').disabled = false;
                document.querySelector('input[name="oct"]').disabled = false;
                this.#disableLetras(false)

                break;
        }
        document.querySelector('input[name="enter"]').disabled = false;
        document.querySelector('input[name="ce"]').disabled = false;
        document.querySelector('input[name="c"]').disabled = false;
    }
    #disableOperaciones(estado) {
        document.querySelector('input[name="cuadrado"]').disabled = estado;
        document.querySelector('input[name="potencia"]').disabled = estado;
        document.querySelector('input[name="sin"]').disabled = estado;
        document.querySelector('input[name="cos"]').disabled = estado;
        document.querySelector('input[name="tan"]').disabled = estado;
        document.querySelector('input[name="sqrt"]').disabled = estado;
        document.querySelector('input[name="baseDiez"]').disabled = estado;
        document.querySelector('input[name="log"]').disabled = estado;
        document.querySelector('input[name="suma"]').disabled = estado;
        document.querySelector('input[name="resta"]').disabled = estado;
        document.querySelector('input[name="multiplicacion"]').disabled = estado;
        document.querySelector('input[name="sqrt"]').disabled = estado;
        document.querySelector('input[name="division"]').disabled = estado;
        document.querySelector('input[name="pi"]').disabled = estado
        document.querySelector('input[name="mod"]').disabled = estado
        document.querySelector('input[name=","]').disabled = estado

    }
    #disableLetras(estado) {
        document.querySelector('input[name="A"]').disabled = estado;
        document.querySelector('input[name="B"]').disabled = estado;
        document.querySelector('input[name="C"]').disabled = estado;
        document.querySelector('input[name="D"]').disabled = estado;
        document.querySelector('input[name="E"]').disabled = estado;
        document.querySelector('input[name="F"]').disabled = estado;
    }
}
var calculadoraEspecial = new CalculadoraEspecializada();
document.addEventListener('keydown', (event) => {
    calculadoraEspecial.procesarTeclas(event);
});