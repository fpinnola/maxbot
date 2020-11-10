import React, {useState} from 'react';
import { View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from "expo";
import MainStack from "./routes/mainstack"


const getFonts = () => 
  Font.loadAsync({
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
  });


export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);


  if (fontsLoaded) {
    return <MainStack />;
  } else {
    return (
      <View>
        <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
      </View>
    )
  }
}
