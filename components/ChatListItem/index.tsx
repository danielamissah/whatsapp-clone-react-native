import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChatRoom } from '../../types';
import styles from './style';
import Chats from '../../data/Chats';
import moment from 'moment';

export type ChatListItemProps ={
    chatRoom: ChatRoom;

}

const ChatListItem = (props : ChatListItemProps) => {
    const { chatRoom } = props;

    const navigation = useNavigation();

    const user = chatRoom.users[1];

    const onClick = () => {
        navigation.navigate('Chat Room', { id: chatRoom.id});

    }

    return(
        <TouchableWithoutFeedback onPress = {onClick}>
            <View style={styles.container}>
            <View style={styles.leftContainer}>

            <Image source = {{ uri: user.imageUri}} style={styles.avatar}/>
            
            <View style={styles.midContainer}>
            <Text style = {styles.username}>{user.name}</Text>
            <Text style = {styles.lastMessage}>{chatRoom.lastMessage.content}</Text>

            </View>

            </View>

            <Text style = {styles.createdAt}>
                {moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYY")}
                </Text>
           
            
        </View>

        </TouchableWithoutFeedback>
        
    )

};

export default ChatListItem;