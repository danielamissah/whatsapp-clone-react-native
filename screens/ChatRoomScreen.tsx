import React from 'react';
import { Text, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
//import { FlatList } from 'react-native-gesture-handler';

import chatRoomData from '../data/Chats';
import ChatMessage from '../components/ChatMessage';

const ChatRoomScreen = () => {

    const route = useRoute();
    return(
        <FlatList 
        data = {chatRoomData.messages}
        renderItem = {({ item }) =>  <ChatMessage message = {item} />}
        />
    );
}

export default ChatRoomScreen;