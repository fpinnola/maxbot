import React, { useState } from 'react';
import { Slider, StyleSheet, Image, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity , FlatList } from 'react-native';
import { useHeaderHeight } from 'react-navigation-stack';


//TODO: Optimize bottom bar for different phone shapes
export default function Chat() {

    const [input, setInput] = useState("");
    const [feelingLoggerOpen, setFeelingLoggerOpen] = useState(false);
    const [sliderColor, setSliderColor] = useState("#AAA");
    const [sliderVal, setSliderVal] = useState(0.5);
    const [messages, setMessages] = useState([

        {
            text: "Hello I'm Max, your virtual assistant. How are you doing today?",
            userID: "max",
            time: Math.round(new Date().getTime())
        },
        {
            time: Math.round(new Date().getTime() - 1),
            text: "Today",
            userID: "system"
        }
    ]);
    const headerHeight = useHeaderHeight();

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

    const getRGB = (min, max, val) => {
        let ratio = (val-min) / (max-min);
        console.log(ratio);
        let r, g;
        if(ratio < 0.5) {
            r = 255;
            g = Math.round(2* ratio * 255);
        } else {
            r = Math.round(255 * (1 - ratio) * 2);
            g = 255;
        }

        let b = 0;
        return {
            r: r,
            g: g,
            b: b
        }
    }

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      }
      
    function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function feelingString(value) {
        if (value < 2) {
            return "Very Poorly"
        } else if (value < 4) {
            return "Unwell"
        } else if (value < 6) {
            return "Fair"
        } else if (value < 8) {
            return "Pretty Good"
        } else {
            return "Great!"
        }
    }

    const feelingLogger = () => {
        return (
        <View style={{width: "100%", height: 275, backgroundColor: "#fff", alignItems: "center", justifyContent: "space-around", position: "absolute", bottom: 0, zIndex: 1}}>
            <Text style={textStyles.header}>How are you feeling?</Text>
        <Text style={textStyles.subheader}>{feelingString(sliderVal)}</Text>
            <View style={{height: 60, width: "100%", alignItems: "center", marginBottom: 35}}>
                <Slider
                    style={{width: "90%", height: 40}}
                    minimumValue={0}
                    maximumValue={10}
                    value={sliderVal}
                    minimumTrackTintColor={sliderColor}
                    maximumTrackTintColor={sliderColor}
                    onValueChange={(val) => {
                        var rgb = getRGB(0,10,val);
                        console.log(rgb);
                        let newValue = rgbToHex(rgb.r, rgb.g, rgb.b);
                        setSliderColor(newValue);
                        setSliderVal(val);
                    }}
                />
                <TouchableOpacity 
                onPress={()=> {
                    //TODO: Log Feelings
                    setFeelingLoggerOpen(false);
                }}
                style={{width: "90%", height: 45, backgroundColor: "#8F00FF", borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
                    <Text style={[textStyles.buttonText]}>Done</Text>

                </TouchableOpacity>
            </View>
        </View>
        )

    }


  return (
    <View style={styles.container}>
      {feelingLoggerOpen ? feelingLogger() :      
        <TouchableOpacity 
        onPress={() => {
            setFeelingLoggerOpen(true);
        }}
        style={{position: "absolute",zIndex: 1, width: 50, height: 50, justifyContent: "center", alignItems: "center", backgroundColor: "#8F00FF", borderRadius: 25, right: 25, top: 25}}>
            <Image style={{height: 24, width: 24}} source={require('../assets/medical.png')}/>
        </TouchableOpacity>
      }
      <FlatList 
        style={{ width: "100%", flex: 1,  }}
        data={messages.sort(function (x, y) {
            return y.time - x.time;
        })}
        keyExtractor={(item) => String(item.time)}
        renderItem={({item, index}) => {
            if (item.userID === "system") {
                return (
                    <View style={{width: "100%", alignItems: "center", padding: 10}}>
                        <View style={{backgroundColor: "rgba(243,0,255,0.17)", width: 90, height: 35, justifyContent: "center", alignItems: "center", borderRadius: 20}}>
                            <Text style={{fontFamily: "Lato-Bold", fontSize: 16, color: "#8F00FF"}}>Today</Text>
                        </View>
                    </View>

                )
            }
            if (item.userID === "max") {
                return (
                    <View style={{width: "100%", padding: 10, alignItems: "flex-start"}}>
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
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} keyboardVerticalOffset={headerHeight} style={{width: "100%"}}>
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


const textStyles = StyleSheet.create({
    header: {
        fontFamily: "Lato-Bold",
        fontSize: 22
    },
    subheader: {
        fontFamily: "Lato-Bold",
        fontSize: 18
    },
    buttonText: {
        fontFamily: "Lato-Bold",
        fontSize: 18,
        color: "#fff"
    }
})