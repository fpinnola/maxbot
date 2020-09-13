import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacityBase } from 'react-native';
import Chat from "./Chat.js"
import * as Font from 'expo-font';
import { AppLoading } from "expo";


const getFonts = () => 
  Font.loadAsync({
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
  });


export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);


  if (fontsLoaded) {
    return <Chat />;
  } else {
    return (
      <View>
        <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
      </View>
    )
  }
}
