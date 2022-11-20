"use strict";
const VACIO=" "
class CalculadoraRPN{

    constructor(){
      
        this.pilaOperandos=new Array();
        this.memoria=null;
        this.operando2=null;
        this.operando1=null;
        this.resultado=null;
        this.operandoActual=VACIO;
        this.shiftIsPressed=false;
        
    }
    digitos(value) {

        
        this.operandoActual+=value;
        document.formulario.operandoActual.value=this.operandoActual;
    
    }

    /**
     * Método que introduce un operando a la pila y actualiza la representación visual de la misma.
     */
    pushOperando(operando){
        document.formulario.pilaOperandos.value=" ";//vaciamos el area del número que está siendo introducido porque se ha seleccionado enter.
        if(isNaN(operando)){
            document.formulario.pilaOperandos.value=ERROR;
        }else{
            this.pilaOperandos.push(Number(operando));//convertimos el numero introducido a number y lo metemos en la pila de operadores.
            for (let index = this.pilaOperandos.length-1; index >= 0; index--) {
                var currentIndex=index+1;
                document.formulario.pilaOperandos.value +=currentIndex +":\t\t\t\t\t\t"+this.pilaOperandos[index]+"\n";
                               
            }
            this.memoria=operando;
        }
        
       
    }

    suma() {
        this.asignarOperandos();
        this.resultado=this.operando1+this.operando2;        
        this.pilaOperandos=new Array();
        this.pushOperando(this.resultado);
    }
    resta() {
        this.asignarOperandos();
        this.resultado=this.operando1-this.operando2;     
        this.pilaOperandos=new Array();
        this.pushOperando(this.resultado);

    }
    multiplicacion() {
        this.asignarOperandos();
        this.resultado=this.operando1*this.operando2;         
        this.pilaOperandos=new Array();
        this.pushOperando(this.resultado);

    }
    division() {
        this.asignarOperandos();
        this.resultado=this.operando1/this.operando2;      
        this.pilaOperandos=new Array();
        this.pushOperando(this.resultado);   
      
        
        
     
    }
    cambioSigno() {
        this.asignarOperandosUnaria();
        this.operando2=Number(-1)
        this.resultado=this.operando1*this.operando2;      
        this.pilaOperandos=new Array();
        this.pushOperando(this.resultado);   
      
        
     
    }
    cuadrado(){
      
        this.asignarOperandos();     
        this.operando2=Number(2);
        this.resultado=Math.pow(this.operando1,this.operando2);
        this.pilaOperandos=new Array();
        this.pushOperando(this.resultado);  
        
    }
    potenciaDeYBaseX(){
        this.asignarOperandos();     
        this.resultado=Math.pow(this.operando1,this.operando2);
        this.pilaOperandos=new Array();
        this.pushOperando(this.resultado);  
    }
    potenciaBase10(){
        this.asignarOperandosUnaria();
        this.operando2=Number(10);
        this.resultado=Math.pow(this.operando2,this.operando1);
        this.pilaOperandos=new Array();
        this.pushOperando(this.resultado);  
    }
    raízCuadrada(){
        this.asignarOperandosUnaria();
        this.resultado=Math.sqrt(this.operando1)
        this.pilaOperandos=new Array();
        this.pushOperando(this.resultado);  
    }
    seno() {

        this.asignarOperandosUnaria();      
        this.shiftIsPressed ? this.resultado= Math.asin(this.operando1) :  this.resultado = Math.sin(this.operando1);
        this.pilaOperandos=new Array();
        this.pushOperando(this.resultado);  

    }
    coseno() {
        
        this.asignarOperandosUnaria();
        this.shiftIsPressed ? this.resultado = Math.acos(this.operando1) : this.resultado = Math.cos(this.operando1);
        this.pilaOperandos=new Array();
        this.pushOperando(this.resultado); 
    }
    tangente() {
        this.asignarOperandosUnaria();
        this.shiftIsPressed ? this.resultado= Math.atan(this.operando1) : this.resultado = Math.tan(this.operando1);
        this.pilaOperandos=new Array();
        this.pushOperando(this.resultado); 
    }
    borrarMemoria(){
        this.memoria=null;

    }
    recuperarMemoria(){
        this.pilaOperandos=new Array()
        this.operando1=null;
        this.operando2=null;
        this.pushOperando(this.memoria)
    }
    restarMemoria(){
        this.operando2=this.memoria;
        this.pushOperando(this.operando2);
        this.resultado=this.operando1-this.operando2;        
        this.pilaOperandos=new Array();
        this.pushOperando(this.resultado);

    }
    sumarMemoria(){
        this.operando2=this.memoria;
        this.pushOperando(this.operando2);
        this.resultado=this.operando1+this.operando2;        
        this.pilaOperandos=new Array();
        this.pushOperando(this.resultado);

    }
    almacenarEnMemoria(){
        this.memoria=Number(this.operandoActual);
    }
    asignarOperandos() {
        
        if(this.pilaOperandos.length>=2){

            this.operando2=this.pilaOperandos.pop()
            this.operando1=this.pilaOperandos.pop()
          
        }
       
    }
     
    asignarOperandosUnaria() {
        
        if(this.pilaOperandos.length>=1){

            
            this.operando1=this.pilaOperandos.pop()
          
        }
       
    }
    enter(){
       
        this.pushOperando(this.operandoActual);
        this.operandoActual=VACIO;
        document.formulario.operandoActual.value=VACIO;

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
var calculadoraRPN=new CalculadoraRPN();