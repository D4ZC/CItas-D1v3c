import React, {useState,useContext} from 'react';
import { View, Button, Text, StyleSheet ,Alert} from 'react-native'
import {TextInput} from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';

import FirebaseContext from '../../context/firebase/firebaseContext';
// import UserContext from '../../context/user/userContext'

import {citasRepetidas} from '../../utils/functions';
const CalendarPicker = () => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);    
    const [date,setDate] = useState('')
    const [time,setTime] = useState('')
    const [subject,setSubject] = useState('')    
    const [horasItems,setHorasItems] = useState(itemsDefault)

    // const {carrera,nombre,codigo,centro} = useContext(UserContext)
    const {firebase} = useContext(FirebaseContext); 
  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const confirmarFecha = (dia) => {
      setDate(dia)
      hideDatePicker();
      agregarItemsElements()
    };

    const itemsDefault = [     
      {label: '07:00', value: '0700', key : '0700'},
      {label: '08:00', value: '0800', key : '0800'},
      {label: '09:00', value: '0900', key : '0900'},
      {label: '10:00', value: '1000', key : '1000'},
      {label: '11:00', value: '1100', key : '1100'},
      {label: '12:00', value: '1200', key : '1200'},
      {label: '13:00', value: '1300', key : '1300'},
      {label: '14:00', value: '1400', key : '1400'},
      {label: '15:00', value: '1500', key : '1500'},
      {label: '16:00', value: '1600', key : '1600'},
      {label: '17:00', value: '1700', key : '1700'},
      {label: '18:00', value: '1800', key : '1800'},
      {label: '19:00', value: '1900', key : '1900'},]

    const confirmarCita = () => {
      if (date == ''|| time == ''){
        Alert.alert("Algunos campos no han sido seleccionados","Por favor revíselos")
        return
      }
      const day = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`      
      const cita = {
        day,
        date,
        time,
        subject,
        // nombre,
        // codigo,
        // centro,
        // carrera,                
      }
      
    
      agregarCita(cita)      
        // firebase.db.collection('citas').add(cita)                    
        agregarItemsElements()
        //Prueba              
    }
    const agregarCita = async (cita) => {
      try{
       const cite = await firebase.db.collection("cita").add(cita)
        .then(refDoc => {
          console.log(`ID Document ${refDoc}`)
        }).catch(error=>{console.log(error)})     
        console.log(cite)   
      }catch(e){
        console.log(e)
      }
    }

    //Items del RNPicker Select    
    var itemsElements = { }
    agregarItemsElements =  () => {
      // const today = new Date() // Obtiene la fecha de hoy
      const todayParse = `${date.getFullYear()}-${(date.getMonth())}-${date.getDate()}` // Parsea la fecha de hoy a cadena: "YYYY-MM-DD"      
       firebase.db.collection("cita").where("day", "==", todayParse).onSnapshot(manejarSnapshot)
      // .then(c=>console.log(c))
      // .catch(error=>console.log(error))
      
    }

    function manejarSnapshot(snapshot){
      const citasDia = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });
      
      const horasNoDisponibles = citasRepetidas(citasDia)
      itemsElements = itemsDefault.filter(item=> {
        const encontrado = horasNoDisponibles.find(cita=> cita == item.value)        
        if(encontrado){
          return false
        } 
        return true
      } )
        setHorasItems(itemsElements)
        console.log(horasItems)
    }


    return (  
        <>
        <View style={styles.container}>
          <View>
            {/* <Text>{nombre } - {codigo}</Text> */}
            {/* <Text>{centro} -  {carrera }</Text> */}
          </View>
            <View>
              <Button title="Seleccionar día" onPress={showDatePicker} />
              <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={confirmarFecha}
                  onCancel={hideDatePicker}
                  locale='es_ES'
              />
            </View>
            {horasItems&&(
              <RNPickerSelect                               
                style={{height: 50, width: 100}}
                onValueChange={(itemValue, itemIndex) =>setTime(itemValue)}
                items={horasItems}
              />)}
            
        </View>

        <View>

          <View style={styles.containerDate}>
            { date ? (<Text style={styles.title}>Cita agendada para el dia: </Text>) 
                  : (<Text style={styles.titleNothing}>Aun no se ha seleccionado una fecha</Text>) }
            {/* <Text>{date.getDate()} del mes { date.getMonth()} </Text> */}
            <Text style={styles.titleInfo}>{date.toString()}</Text>
            
            { time ? (<Text style={styles.title}>A la hora: </Text>) 
                  : (<Text style={styles.titleNothing}>Aun no se ha seleccionado un horario</Text>) }
            <Text style={styles.titleInfo}>{time}</Text>
          </View>
          
          
          <TextInput 
            label="Asunto"
            multiline={true}
            numberOfLines={3}
            placeholder="Titulación"
            value={subject}
            onChangeText={text=>setSubject(text)}
          />

          <Button
            title="Confirmar cita"
            onPress={ () => confirmarCita() }            
          />
        </View>
        </>
    );
}

 const styles = StyleSheet.create({
  container:{    
    justifyContent:'center',
    alignItems:'center'
  },
  containerDate:{
    alignSelf:'center',
    height:250,
    justifyContent: 'center',
    alignItems: 'center',
    width:'90%',
    backgroundColor:'white',
    borderColor:'black',
    borderWidth:3,
    borderRadius:3,
    margin:20
  },
  title:{
    fontWeight:'bold',
    fontSize:24,
    textAlign:'center'
  },
  titleInfo:{     
    fontSize:22,
    textAlign:'center'
  },
  titleNothing:{
    color:'red',
    fontSize:23,
    textAlign:'center',
    margin:10

  }
 })
export default CalendarPicker;