import React from 'react';
import { ImageBackground, Text, TouchableOpacity } from "react-native";
import Chat from './Chat'
export default function Splash({ navigation }) {
    return (
        <ImageBackground style={{width: "100%", height: "100%"}} source={require('./assets/citynight.jpeg')} >
            <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => {
                navigation.navigate("Chat", Chat);
            }}
            style={{backgroundColor: "rgba(0,0,0,0.25)", width: "100%", height: "100%", padding: 50}}> 
                <Text style={{color: "#fff", fontFamily: "Lato-Bold", fontSize: 36, marginTop: 10}}>maxbot</Text>
                <Text style={{color: "#fff", fontFamily: "Lato-Regular", fontSize: 22, marginTop: 25 }}>Welcome back, Frankie! How do you feel tonight?</Text>
                <Text style={{color: "#fff", fontFamily: "Lato-Regular", fontSize: 22 }}>. . .</Text>
                <Text style={{color: "#fff", fontFamily: "Lato-Regular", fontSize: 12, position: "absolute", bottom: 25, alignSelf: "center"}}>Click anywhere to enter.</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}