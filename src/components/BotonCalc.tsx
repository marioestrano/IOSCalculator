import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {styles} from '../theme/appTheme';

interface Props {
    texto:string
    color?: string,
    textColor?: string,
    ancho?: boolean,
    action: ( numero: string ) => void
}

export const BotonCalc = ( {texto, color = '#2D2D2D', ancho = false, action}:Props ) => {
  return (
    <TouchableOpacity
    onPress={ () => action(texto)}>

        <View style={{
            ...styles.boton,
            backgroundColor: color,
            width: (ancho) ? 140 :70
        }}>
        <Text style={{
            ...styles.botonTexto,
            color: (color === '#9B9B9B') ? 'black' :'white'
        }}>{ texto }</Text>
    </View>

    </TouchableOpacity>

    )
}
