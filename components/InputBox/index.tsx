import { Entypo, 
        FontAwesome5, 
        Fontisto, 
        MaterialCommunityIcons, 
        MaterialIcons
    } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import styles from './styles';


const InputBox = () => {

    const [message, setMessage] = useState('');
    const onMicrophonePress = () => {
        console.warn('Microphone');
    }

    const onSendPress = () => {
        console.warn(`Sending: ${message}`);

        //sending message to backend

        setMessage('');
    }

    const onPress = () => {
        if(!message) {
            onMicrophonePress();
        }
        else{
            onSendPress();
        }
    }
    return(
        <View style = {styles.container}>
            <View style = {styles.mainContainer}>
                <FontAwesome5 name="laugh-beam" size ={24} color= "grey" style={styles.icon}/>
                <TextInput 
                placeholder={"Type a message"}
                style={styles.textInput}
                multiline
                value = {message}
                onChangeText = {setMessage}
                />
                <Entypo name="attachment" size ={24} color="grey" style={styles.icon}/>
                {!message && <Fontisto name="camera" size ={24} color="grey" style={styles.icon}/>}

            </View>
            <TouchableOpacity onPress = {onPress}>
            <View style= {styles.buttonContainer}>
                {
                    !message 
                    ? <MaterialCommunityIcons name="microphone" size={24} color="white"/>
                    : <MaterialIcons name="send" size ={24} color="white"/>
                }
            </View>
            </TouchableOpacity>
            
        </View>
    )
}

export default InputBox;