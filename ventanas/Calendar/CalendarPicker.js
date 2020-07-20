import React, {useState,useContext} from 'react'; // Hooks para estado y contexto
import { View, Text, StyleSheet ,Alert} from 'react-native'
import {TextInput} from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker"; //comp. para seleccionar dia
import RNPickerSelect from 'react-native-picker-select'; // comp para seleccionar la hora disponible
import { Button }  from 'react-native-paper';
import FirebaseContext from '../../context/firebase/firebaseContext'; // Contexto para acceder a firestore
import UserContext from '../../context/user/userContext'// contexto para acceder a la info del usuario

import {citasRepetidas} from '../../utils/functions'; // // Recibe el arreglo de todas las citas de un dia y regresa un arreglo con las horas que ya se han repetido 3 veces

const CalendarPicker = () => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);    
    const [date,setDate] = useState('')
    const [time,setTime] = useState('')
    const [subject,setSubject] = useState('')    
    const [horasItems,setHorasItems] = useState(itemsDefault)

    const {carrera,nombre,codigo,centro} = useContext(UserContext) // Obtener los datos del usuario del context
    const {firebase} = useContext(FirebaseContext); //Obtener las funciones de firebase
  
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
      //Agregar la fecha seleccionada
      const cita = {
        day,
        date,
        time,
        subject,
        nombre,
        codigo,
        centro,
        carrera,                
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
        // console.log(cite)   
      }catch(e){
        console.log(e)
      }
    }

    //Items del RNPicker Select    
    var itemsElements = { }
    agregarItemsElements =  () => {
      
      const todayParse = `${date.getFullYear()}-${(date.getMonth())}-${date.getDate()}` // Parsea la fecha de hoy a cadena: "YYYY-MM-DD"      
       firebase.db.collection("cita").where("day", "==", todayParse).onSnapshot(manejarSnapshot) // Traer solo los de la fecha seleccionada
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
        // console.log(horasItems)
    }


    return (  
        <>
        <View style={styles.container}>
          <View>
            {/* <Text>{nombre } - {codigo}</Text> */}
            {/* <Text>{centro} -  {carrera }</Text> */}
          </View>
            <View>
              <Button style={styles.fechaBtn}
               title="Seleccionar Fecha" onPress={showDatePicker} >
               <Text style={styles.textoCita}>Seleccionar Fecha</Text>
               </Button>
               <Text style={styles.textoCita2}>Selecciona una hora</Text>
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
            { date ? (<Text style={styles.title}>Fecha seleccionada: </Text>) 
                  : (<Text style={styles.titleNothing}>Fecha no seleccionada</Text>) }
            {/* <Text>{date.getDate()} del mes { date.getMonth()} </Text> */}
            <Text style={styles.titleInfo}>{date.toString()}</Text>
            
            { time ? (<Text style={styles.title}>Hora: </Text>) 
                  : (<Text style={styles.titleNothing}>Horario no seleccionado</Text>) }
            <Text style={styles.titleInfo}>{time}</Text>
          </View>
          
          {/* Hay que verificar si cierra el teclado en otros dispositivos */}
          <TextInput 
            label="Asunto:"
            multiline={true}
            numberOfLines={3}
            placeholder="Escribe tu asunto aqui:"
            // value={subject}
            onChangeText={text=>setSubject(text)}
          />

          <Button style={styles.citaBtn}
             
            onPress={ () => confirmarCita() }   
          >
          <Text style={styles.textoCita}>Confirmar Cita</Text>
          </Button>
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
    backgroundColor:'#077070',
    borderColor:'white',
    borderWidth:1,
    borderRadius:10,
    margin:20
  },
  title:{
    fontWeight:'bold',
    fontSize:24,
    textAlign:'center',
    color:'white'
  },
  textoCita:{
    color:"white"
  },
  textoCita2:{
    color:"black",
    right: 100,
    top: 10
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

  },
  citaBtn:{
    width:"60%",
    backgroundColor:"#055A5A",
    borderRadius:30,
    height:50,
    left: 80,
    top:40,
    alignItems:"center",
    justifyContent:"center",
  },
  fechaBtn:{
    width:"80%",
    top:10,
    backgroundColor:"#018D8D",
    borderRadius:10,
    height:50,
    alignItems:"center",
    justifyContent:"center",
  }
 })
export default CalendarPicker;
