import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Chat from "./Chat.js"
import * as Font from 'expo-font';


export default function App() {

  Font.loadAsync({
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),

  });

  return (
      <Chat/>
  );
}
