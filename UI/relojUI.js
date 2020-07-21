import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import {Avatar} from 'react-native-paper';
import Calendar from './calendarioUI';


const RelojUI = (props) => {
    

    return ( 
        <>
            <View style={styles.container}>
            {/* <Avatar.Text size={400} label="12" style={styles.avatar} /> */}
            
            <View style={styles.circle}>
                <Text style={styles.time}>12:00</Text>
            </View>
            </View>
            {props.children}
        </>
     );
}
 
const styles = StyleSheet.create({
    container:{
        // flex:1,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'#005858',
        width:"100%",
        minHeight:250,             
    } ,    
    circle:{        
        width:"100%",
        backgroundColor:'white',
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#018D8D',
        borderWidth:10
    },
    time:{
        color:'#707070',
        fontSize:80,
        marginHorizontal:5
    }
})
export default RelojUI;