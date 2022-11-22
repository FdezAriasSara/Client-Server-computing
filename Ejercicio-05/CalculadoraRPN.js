"use strict";
const VACIO = ""
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
        document.formulario.operandoActual.value = this.operandoActual;
    }

    /**
     * Método que introduce un operando a la pila y actualiza la representación visual de la misma.
     */
    pushOperando(operando) {
        document.formulario.pilaOperandos.value = VACIO;//vaciamos el area del número que está siendo introducido porque se ha seleccionado enter.
        if (isNaN(operando)) {
            document.formulario.pilaOperandos.value = ERROR;
        } else {
            var gap = ":      "
            this.pilaOperandos.push(Number(operando));//convertimos el numero introducido a number y lo metemos en la pila de operadores.
            for (let index = this.pilaOperandos.length - 1; index >= 0; index--) {
                var currentIndex = index + 1;
                if (currentIndex > 9) {
                    gap = ":  "
                }
                document.formulario.pilaOperandos.value += currentIndex + gap + this.pilaOperandos[index] + "\n";

            }
            this.memoria = operando;
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
        document.formulario.operandoActual.value = this.operandoActual;

    }
    borrarError(){
        this.operandoActual = VACIO;
        document.formulario.operandoActual.value = this.operandoActual;
    }
    reiniciar(){
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
        document.formulario.mc.disabled = estado;
        document.formulario.mr.disabled = estado;
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
        document.formulario.operandoActual.value = VACIO;

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

    procesarTeclas(event) {

        var keyPressed = event.key;
        console.log(keyPressed)
        if (keyPressed !== VACIO) {
            if (Number.isInteger(Number(keyPressed)) && !event.shiftKey) {

                this.digitos(Number(keyPressed))
            } else if(event.shiftKey && event.ctrlKey){
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
                    case "%":
                        this.porcentaje();
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


var calculadoraRPN = new CalculadoraRPN();
document.addEventListener('keydown', (event) => {
    calculadoraRPN.procesarTeclas(event);
});