import React, { useEffect, useState } from 'react';
import { Text, FlatList, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
//import { FlatList } from 'react-native-gesture-handler';
import BG from '../assets/images/BG.png';

import ChatMessage from '../components/ChatMessage';
import InputBox from '../components/InputBox';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { messagesByChatRoom } from '../src/graphql/queries';
import { onCreateMessage } from '../src/graphql/subscriptions';
import styles from '../components/ChatListItem/style';

const ChatRoomScreen = () => {
    const [messages, setMessages] = useState([]);
    const [myId, setMyId] = useState(null);
    const route = useRoute();

    const fetchMesssages = async () => {
        const messagesData = await API.graphql(
            graphqlOperation(
                messagesByChatRoom, {
                    chatRoomID: route.params.id,
                    sortDirection: "DESC",
                }
            )
        )
        setMessages(messagesData.data.messagesByChatRoom.items);
    }

    useEffect(() => {
        fetchMesssages();
    }, [])

    useEffect(() => {
        const getMyId = async () => {
            const userInfo = await API.Auth.currentAuthenticatedUser();
            setMyId(userInfo.attributes.sub);
        }
        getMyId();
    }, [])

    useEffect(() => {
        const subscription = API.graphql(
            graphqlOperation(onCreateMessage)).subscribe({
                next: (data) => {
                    const newMessage = data.value.data.onCreateMessage;
                    if(newMessage.chatRoomID !== route.params.id){
                        console.log("Message belongs to another room")
                        return;
                    }
                    fetchMesssages();
                }
            });

            return () => subscription.unsubscribe();
    }, [])
    console.log(`messages in state: ${messages.length}`);
    return(
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding": "height"} 
        style={{width: '100%', height: '100%'}}>
             <ImageBackground style={{width: '100%', height: '100%'}} source={BG}>
            <FlatList
                data = {messages}
                renderItem = {({ item }) => <ChatMessage myId = {myId} message={item}/>}
                inverted
            />
            <InputBox chatRoomID = {route.params.id}/>
        </ImageBackground>
        </KeyboardAvoidingView>

    );

}

export default ChatRoomScreen;