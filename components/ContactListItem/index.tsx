import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { User } from '../../types';
import styles from './style';
import Chats from '../../data/Chats';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createChatRoom, createChatRoomUser } from '../../src/graphql/mutations';
import ChatRooms from '../../data/ChatRooms';

export type ContactListItemProps ={
    user: User;

}

const ContactListItem = (props : ContactListItemProps) => {
    const { user } = props;

    const navigation = useNavigation();

    const onClick = async () => {
        try {
            //1. Create a new chat room
            const newChatRoomData = await API.graphql(
                graphqlOperation(
                    createChatRoom, {
                        input: { }
                    }
                )
            )

            if(!newChatRoomData.data){
                return;
            }

            const newChatRoom = newChatRoomData.data.createChatRoom;

            //2. Add 'user' to chat room
            await API.graphql(
                graphqlOperation(
                    createChatRoomUser, {
                        input:{
                            userID: user.id,
                        chatRoomID: newChatRoom.id,
                    }
                        }                        
                )
            )
            //3. Add Authenticated user to the chat room
            const userInfo = await Auth.currentAuthenticatedUser();
            await API.graphql(
                graphqlOperation(
                    createChatRoomUser, {
                        input:{
                            userID: userInfo.attributes.sub,
                            chatRoomID: newChatRoom.id,
                        }
                        
                    }
                )
            )
            navigation.navigate('ChatRoom', {
                id: newChatRoom.id,
                name: "Hard coded name"
            })
        } catch (e) {
            
        }

    }

    return(
        <TouchableWithoutFeedback onPress = {onClick}>
            <View style={styles.container}>
            <View style={styles.leftContainer}>

            <Image source = {{ uri: user.imageUri}} style={styles.avatar}/>
            
            <View style={styles.midContainer}>
            <Text style = {styles.username}>{user.name}</Text>
            <Text numberOfLines={2} style={styles.status}>{user.status}</Text>
           
            </View>

            </View>

          
           
            
        </View>

        </TouchableWithoutFeedback>
        
    )

};

export default ContactListItem;