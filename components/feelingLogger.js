import React, { useState } from 'react';
import { Slider, StyleSheet, Image, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity , FlatList } from 'react-native';

const getRGB = (min, max, val) => {
    let ratio = (val-min) / (max-min);
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

export default function FeelingLogger(props) {
    const [sliderColor, setSliderColor] = useState("#AAA");
    const [sliderVal, setSliderVal] = useState(5);

    return (
    <View style={{width: "90%", borderRadius: 10, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", paddingVertical: 25}}>
        <Text style={textStyles.header}>How are you feeling?</Text>
        <Text style={[textStyles.subheader, { marginTop: 15 }]}>{feelingString(sliderVal)}</Text>
        <View style={{height: 40, width: "100%", alignItems: "center"}}>
            <Slider
                style={{width: "90%", height: 40}}
                minimumValue={0}
                maximumValue={10}
                value={sliderVal}
                minimumTrackTintColor={sliderColor}
                maximumTrackTintColor={sliderColor}
                onValueChange={(val) => {
                    var rgb = getRGB(0,10,val);
                    let newValue = rgbToHex(rgb.r, rgb.g, rgb.b);
                    setSliderColor(newValue);
                    setSliderVal(val);
                    props.setFeeling(val);
                }}
            />
        </View>
    </View>
    )
}

const textStyles = StyleSheet.create({
    header: {
        fontFamily: "Lato-Regular",
        fontSize: 18
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