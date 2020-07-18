import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabScreen from './ventanas/MainTabScreen/MainTabScreen';

import { DrawerContent} from './ventanas/DrawContent/DrawContent';
import ComentariosScreen from './ventanas/Comentarios/comentario';

import FirebaseState from './context/firebase/firebaseState' ;

const Drawer = createDrawerNavigator();

// --------------------------Inicial --------------------------------
function App() {
  return (
    <FirebaseState>
    <NavigationContainer>
      <Drawer.Navigator drawerContent = {props => <DrawerContent {... props} />}>
        <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
        <Drawer.Screen name="ComentariosDrawer" component={ComentariosScreen} />
        {/* <Drawer.Screen name="SoporteScreen" component={SoporteScreen} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
    </FirebaseState>
  );
}

export default App;