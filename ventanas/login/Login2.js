import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

export default class Login extends React.Component {
  state={
    codigo:"",
    nip:""
  }
  render(){
    return (
      <View style={styles.container}>

        <View style={{flex:4}}>
            <Image style={styles.logoDivec} source={require('../../images/DivecLogo.png')}  />
        </View>

        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Código:" 
            placeholderTextColor="#ffff"
            keyboardType = 'default'
            onChangeText={text => this.setState({codigo:text})}/>
        </View>

        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Nip:" 
            placeholderTextColor="#ffff"
            onChangeText={text => this.setState({nip:text})}/>
        </View>

        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Entrar</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoDivec:{
      flex : 1,
      alignSelf: 'center',
      width: 300,
      marginTop: 5,
    
  },
  
  inputView:{
    width:"80%",
    backgroundColor:"#00505c",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});