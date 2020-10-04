import React, { useEffect, useState } from 'react';
import { View, Modal, Text, FlatList, TouchableOpacity, TextInput, Image, StyleSheet, Alert, AsyncStorage } from "react-native";
import Chat from './Chat'
export default function LogList({ navigation }) {
    const [list, setList] = useState([])
    const [addLogVisible, setAddLogVisible] = useState(false);
    const [logText, setLogText] = useState("");

    useEffect(() => {
        restoreLogsFromAsync();
      }, []);
    
    const storeLogs = logs => {
        const stringifiedLogs = JSON.stringify(list);

        AsyncStorage.setItem('@logs', stringifiedLogs).catch((err) => {
            console.warn('Error storing logs in Async');
            console.warn(err);
        })
    }

    const restoreLogsFromAsync = () => {
        AsyncStorage.getItem('@logs')
        .then(stringifiedLogs => {
            const parsedLogs = JSON.parse(stringifiedLogs);
            if (parsedLogs != null) {
                setList(parsedLogs);
            }
        })
        .catch((err) => {
            console.warn('Error retrieving logs in Async');
            console.warn(err);
        })
    }
    //TODO: truncate number of lines, open up full log by clicking on it

    function getMonthStr(month) {
        switch (month) {
            case 1: return "Jan";
            case 2: return "Feb";
            case 3: return "Mar";
            case 4: return "Apr";
            case 5: return "May";
            case 6: return "Jun";
            case 7: return "Jul";
            case 8: return "Aug";
            case 9: return "Sep";
            case 10: return "Oct";
            case 11: return "Nov";
            case 12: return "Dec";
            default: return "IDK";
        }
    }

    function getFormattedDate(timestamp) {
        var date = new Date(timestamp);
    
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
    
        month = getMonthStr(month);
        day = (day < 10 ? "0" : "") + day;
        hour = (hour < 10 ? "0" : "") + hour;
        min = (min < 10 ? "0" : "") + min;
    
        var str = month + " " + day + " " + date.getFullYear() + " " +  hour + ":" + min;
        
        return str;
    }

    return (
        <View style={styles.container}>
            <Modal 
            animationType="slide"
            transparent={false}
            visible={addLogVisible}
            onRequestClose={()=>{
                Alert.alert("Modal has been closed.");
            }}
            >
                <View style={[styles.container, {justifyContent: "flex-start"}]}>
                    <TouchableOpacity
                    style={{padding: 10, width: "90%", marginTop: 50}}
                    onPress={()=> {
                        setAddLogVisible(false);
                    }}
                    >
                        <Text style={{color: "red", width: "100%", textAlign: "right", fontFamily: "Lato-Bold", fontSize: 14}}>Close</Text>
                    </TouchableOpacity>
                    <Text style={{marginTop: 25, fontFamily: "Lato-Regular", fontSize: 18, textAlign: "left", width: "80%"}}>Describe how you're feeling</Text>
                    <View style={{width: "80%", height: 120,  backgroundColor: "white", borderRadius: 5, marginTop: 15, justifyContent: "center", alignItems: "center"}}>
                        <TextInput 
                        style={{height: "95%", width: "95%"}}
                        multiline={true}
                        placeholder={"Enter a log"}
                        value={logText}
                        onChangeText={(text) => {
                            setLogText(text)
                        }}
                        />
                    </View>

                    <TouchableOpacity 
                    style={{paddingHorizontal: 25, paddingVertical: 7.5, backgroundColor: "#8F00FF", borderRadius: 7.5,marginTop: 15}}
                    onPress={()=> {
                        var curr = list;
                        curr.push({
                            log: logText,
                            date: Date.now()
                        })
                        setList(curr);
                        setLogText("");
                        storeLogs(curr);
                        setAddLogVisible(false);
                    }}>
                        <Text style={{ color: "#fff", fontFamily: "Lato-Bold", fontSize: 16}}>Add</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <FlatList 
            style={{width: "100%"}}
                data={list}
                keyExtractor={(item) => item.log}
                renderItem={({ item }) => {
                    return (
                        <View style={{width: "100%", paddingVertical: 10, justifyContent: "center", alignItems: "center"}}>
                            <View style={{width: "85%", paddingVertical: 20, paddingHorizontal: 15, backgroundColor: "white", borderRadius: 10, justifyContent: "center", alignItems: "flex-start"}}>
                                <Text numberOfLines={-1} style={{fontFamily: "Lato-Regular", fontSize: 16}}>{item.log}</Text>
                                {item.date != null ? <Text style={{color: "#AAA", fontFamily: "Lato-Regular", fontSize: 14}}>{getFormattedDate(item.date)}</Text> : null}
                            </View>
                        </View>
                    )
                }}
            />
            <TouchableOpacity 
            onPress={() => {
                setAddLogVisible(true);
            }}
            style={styles.logButton}>
                <Image style={styles.penImage} source={require('./assets/pen.png')}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logButton: {
        height: 64,
        width: 64,
        borderRadius: 75/2,
        backgroundColor: "#8F00FF",
        position: "absolute",
        bottom: 65,
        right: 25,
        justifyContent: "center",
        alignItems: "center"
    },
    penImage: {
        height: 32,
        width: 32,
    }
})