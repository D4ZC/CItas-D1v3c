import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
const Cita = ({cita}) => {  
        console.log(cita)
    const {nombre,codigo,date,time,centro,carrera,subject} = cita
    
    // const dia = new Date(date*1000).toLocaleDateString("es-ES")
     
    return ( 
        <>            
            <View style={styles.container}>
                {/* <Text> Fecha: {dia} </Text> */}
                <Text>Hora: {time} </Text>
                <Text>Nombre: {nombre}</Text>
                <Text>Código: {codigo}</Text>
                <Text>centro: {centro}</Text>
                <Text>carrera: {carrera}</Text>
                <Text>Asunto: {subject}</Text>
            </View>
        </>
     );
}

const styles = StyleSheet.create({
    container:{
        marginVertical:5,
        alignItems:'center',
        borderColor:'gray',
        borderWidth: 2,
        marginHorizontal:10
    }
})

export default Cita;