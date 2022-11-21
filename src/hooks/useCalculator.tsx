import { useRef, useState } from "react";

import {Operadores} from '../screens/CalculadoraScreen'
export const useCalculator = () => {


    const [numero, setNumero] = useState('0');
    const [numeroAnterior, setNumeroAnterior] = useState('0');
    const ultimaOperacion = useRef<Operadores>();
  
    const limpiar = () => {
      setNumero('0');
      setNumeroAnterior('0');
    }
  
    const armarNumero = ( numeroTexto: string ) => {
      //nan
      // No aceptar doble punto
      if (numero.includes('.') && numeroTexto === '.') return;
      
      if (numero.startsWith('0') || numero.startsWith('-0')) {
        //punto decimal 
        if (numeroTexto ==='.') {
          setNumero( numero + numeroTexto);
          //evaluar si es otro cero y hay un punto
        } else if( numeroTexto === '0' && numero.includes('.')) {
          setNumero( numero + numeroTexto );
          //evaluar numero diferente de cero y si no hay punto
        } else if (numeroTexto !== '0' && !numero.includes('.')) {
          setNumero(numeroTexto);
          //evitar el 000.0
        } else if (numeroTexto === '0' && !numero.includes('.')) {
          setNumero(numero);
        } else setNumero(numero + numeroTexto);
      } else setNumero(numero+numeroTexto);
      
      if (numero === 'Nan') setNumero(numeroTexto); 
    }
  
    const btnDel = () => {
      setNumero(numero.slice(0,-1));
      if (numero.length === 1) setNumero('0');
      if ( numero.length === 2 && numero.includes('-')) setNumero('0');
    }
    const positivoNegativo = () => {
      if ( numero.includes('-')) {
        setNumero( numero.replace('-',''));
      } else {
        setNumero( ('-'+ numero));
      }
    }
    const cambiarNumAnt = () => {
      if (numero.endsWith('.')) setNumeroAnterior(numero.slice(0,-1));
      else setNumeroAnterior(numero);
      setNumero('0')
    }
  
    const btnDividir = () => {
      cambiarNumAnt();
      ultimaOperacion.current = Operadores.dividir;
    }
    const btnSumar = () => {
      cambiarNumAnt();
      ultimaOperacion.current = Operadores.suma;
    }
    const btnRestar = () => {
      cambiarNumAnt();
      ultimaOperacion.current = Operadores.resta;
    }
    const btnMultiplicar = () => {
      cambiarNumAnt();
      ultimaOperacion.current = Operadores.multplicar;
    }
  
    const calcular = () => {
      if (numero === 'Nan') return
      const num1 = Number( numero );
      const num2 = Number( numeroAnterior );
      if (num2 === 0 ) return
  
      switch (ultimaOperacion.current) {
        case Operadores.suma:
          setNumero( String(num2 + num1) );
          break;
        case Operadores.resta:
          setNumero( String(num2 - num1) );
          break;
        case Operadores.multplicar:
          setNumero( String(num1 * num2) );
          break;
        case Operadores.dividir:
          if (num1 === 0) setNumero('Nan');
          else setNumero( String(num2 / num1) );
          break;
      }
      setNumeroAnterior('0');
    }
    return{
        //propiedades
        numeroAnterior,
        numero,
        
        //metodos
        positivoNegativo,
         limpiar,
         btnDel,
         btnDividir,
         armarNumero,
         btnMultiplicar,
         btnRestar,
         btnSumar ,
        calcular
        
    }
}
