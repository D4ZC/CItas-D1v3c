import React from 'react';
import { View , StyleSheet} from 'react-native'
import {Text} from 'react-native-paper'
const CalendarioUI = () => {
    return ( 
        <>
            <View style={styles.container}>                
                <View style={styles.topCalendar}>
                        
                </View>
                <View style={styles.blankCalendar}>
                    <Text style={styles.number}>12</Text>
                    <Text style={styles.month}>Septiembre</Text>
                </View>
            </View>            
            
        </>
     );
}
 
const styles = StyleSheet.create({
    container:{
        minHeight:'20%',
        justifyContent:'center',
        alignItems:'center',
        
        minWidth:'30%'
    },
    topCalendar:{
        minWidth:170,
        minHeight:20,
        maxHeight:'20%',
        backgroundColor:"#FFE232",
        
    },
    blankCalendar:{
        minWidth:170,
        minHeight:150,
        backgroundColor:'white',        
        maxHeight:'80%',
        justifyContent:'center',
        alignItems:'center',

    },
    number:{
        fontSize:60,
        color:"#707070"
    },
    month:{
        fontSize:30,
        color:"#707070"
    }

})
export default CalendarioUI;