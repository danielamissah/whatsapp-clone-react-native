import React from 'react';
import { Text, FlatList, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
//import { FlatList } from 'react-native-gesture-handler';
import BG from '../assets/images/BG.png';

import chatRoomData from '../data/Chats';
import ChatMessage from '../components/ChatMessage';

const ChatRoomScreen = () => {

    const route = useRoute();
    return(
        <ImageBackground style={{width: '100%', height: '100%'}} source={BG}>
            <FlatList 
        data = {chatRoomData.messages}
        renderItem = {({ item }) =>  <ChatMessage message = {item} />}
        inverted
        />
        </ImageBackground>
    );
}

export default ChatRoomScreen;