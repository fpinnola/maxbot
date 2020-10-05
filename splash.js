import React from 'react';
import { ImageBackground, Text, TouchableOpacity } from "react-native";
import Chat from './Chat'
import LogList from './logList';
export default function Splash({ navigation }) {
    return (
        <ImageBackground style={{width: "100%", height: "100%"}} source={require('./assets/healthyfern.jpeg')} >
            <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => {
                navigation.navigate("LogList", LogList);
            }}
            style={{backgroundColor: "rgba(0,0,0,0)", width: "100%", height: "100%", padding: 50}}> 
                <Text style={{color: "#fff", fontFamily: "Lato-Bold", fontSize: 36, marginTop: 10}}>salus</Text>
                <Text style={{color: "#fff", fontFamily: "Lato-Regular", fontSize: 22, marginTop: 25 }}>Welcome back! How do you feel?</Text>
                <Text style={{color: "#fff", fontFamily: "Lato-Regular", fontSize: 22 }}>. . .</Text>
                <Text style={{color: "#fff", fontFamily: "Lato-Regular", fontSize: 12, position: "absolute", bottom: 25, alignSelf: "center"}}>Click anywhere to enter.</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}