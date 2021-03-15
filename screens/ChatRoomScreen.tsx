import React, { useEffect, useState } from 'react';
import { Text, FlatList, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
//import { FlatList } from 'react-native-gesture-handler';
import BG from '../assets/images/BG.png';

import ChatMessage from '../components/ChatMessage';
import InputBox from '../components/InputBox';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { messagesByChatRoom } from '../src/graphql/queries';

const ChatRoomScreen = () => {
    const [messages, setMessages] = useState([]);
    const [myId, setMyId] = useState(null);

    const route = useRoute();
    useEffect(() => {
        const fetchMessages = async () => {
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
        fetchMessages();

    }, [])
    useEffect(() => {
        const getMyId = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();
            setMyId(userInfo.attributes.sub);
        }
        getMyId();

    }, []);
    return(
        <ImageBackground style={{width: '100%', height: '100%'}} source={BG}>
            <FlatList 
        data = {messages}
        renderItem = {({ item }) =>  <ChatMessage myId = {myId} message = {item} />}
        inverted
        />

        <InputBox chatRoomID = {route.params.id}/>
        
        </ImageBackground>
    );
}

export default ChatRoomScreen;