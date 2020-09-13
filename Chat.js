import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity , FlatList } from 'react-native';

//TODO: Optimize bottom bar for different phone shapes
export default function Chat() {

    const [message, editMessage] = useState("Hello I am Max 0.1");
    const [input, setInput] = useState("");
    const [sent, setSent] = useState(false);
    const [messages, setMessages] = useState([
        {
            text: "Hello I'm Max, your virtual assistant. How are you doing today?",
            userID: "max",
            time: Math.round(new Date().getTime()/1000)
        }
    ]);

    const addMessage = (text, id) => {
        let current = messages;
        current.push({
            text: text,
            userID: id,
            time: Math.round(new Date().getTime())
        })

        setMessages(current);

        if (id != "max") {
            fetch('https://maxbot0.herokuapp.com/webhooks/rest/webhook', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: text,
                        sender: id
                    })
            })
            .then((res) => res.json())
            .then((responses) => {
                for (let i in responses) {
                    if (responses[i].text != undefined) {
                        let current = messages;
                        current.push({
                            text: responses[0].text,
                            userID: "max",
                            time: Math.round(new Date().getTime())
                        })
                        current.sort(function (x, y) {
                            return y.time - x.time;
                        })      
                        setMessages(current);      
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }}


  return (
    <View style={styles.container}>
      <FlatList 
        style={{height: "100%", width: "100%"}}
        data={messages.sort(function (x, y) {
            return y.time - x.time;
        })}
        keyExtractor={(item) => String(item.time)}
        renderItem={({item, index}) => {
            if (item.userID === "max") {
                return (
                    <View style={{width: "100%", padding: 10}}>
                        <View style={[{maxWidth: 300, padding: 10, backgroundColor: "#fff", borderRadius: 10 }, styles.shadow]}>
                            <Text style={styles.messageText}>{item.text}</Text>
                        </View>
                    </View>
                    );
            } else {
                return (
                    <View style={{width: "100%", padding: 10, alignItems: "flex-end"}}>
                        <View style={[{maxWidth: 300, padding: 10, backgroundColor: "#fff", borderRadius: 10 }, styles.shadow]}>
                            <Text style={styles.messageText} >{item.text}</Text>
                        </View>
                    </View>
                )
            }

        }}
        inverted={true}
        />
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} keyboardVerticalOffset={0} style={{width: "100%"}}>
        <View  style={{flexDirection:"row", backgroundColor: "white", width: "100%", height: 70, alignItems: "center", paddingHorizontal: 15}}>
            <View style={[{height: 40, flex:1, borderRadius: 20, alignItems: "center", borderColor: "#ccc", borderWidth: 1}, styles.shadow]}>
                <TextInput 
                style={{width: "95%", height: "100%", fontFamily: "Lato-Regular", fontSize: 16}} 
                placeholder={"Message"}
                value={input}
                onChangeText={(text) => {
                    setInput(text)
                }}/>
            </View>
            {
                input != "" ? (            
                <TouchableOpacity style={{marginLeft: 15}}
                    onPress={() => {
                        addMessage(input, "user");
                        setInput("");
                    }}>
                        <Text style={{color: "#8F00FF", fontFamily: "Lato-Bold", fontSize: 16}}>Send</Text>
                    </TouchableOpacity>) 
                    : null
            }

        </View>
      </KeyboardAvoidingView>

      <View style={{backgroundColor: "white", width: "100%", height: 25}}></View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
      shadowOffset: {width: 0, height: 0.5},
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 0.5,
  },
  messageText: {
      fontFamily: "Lato-Regular",
      fontSize: 16
  }
});
