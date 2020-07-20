import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabScreen from './ventanas/MainTabScreen/MainTabScreen';

import { DrawerContent} from './ventanas/DrawContent/DrawContent';
import ComentariosScreen from './ventanas/Comentarios/comentario';
import Login from './ventanas/login/Login2'

import UserState from './context/user/userState';
import FirebaseState from './context/firebase/firebaseState' ;

import { createStackNavigator } from '@react-navigation/stack';

const Drawer = createDrawerNavigator();
const stack = createStackNavigator();

// --------------------------Inicial --------------------------------
function App() {
  return (
    <FirebaseState>
      <UserState>
        <NavigationContainer>
          
          <Drawer.Navigator drawerContent = {props => <DrawerContent {... props} />}>
            <Drawer.Screen name="Login" component={Login}/>
            <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
            <Drawer.Screen name="ComentariosDrawer" component={ComentariosScreen} />
            {/* <Drawer.Screen name="SoporteScreen" component={SoporteScreen} /> */}
          </Drawer.Navigator>
        </NavigationContainer>
      </UserState>
    </FirebaseState>
  );
}

export default App;