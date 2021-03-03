import React from 'react';
import { Message } from '../../types';
import { Text } from 'react-native';


export type ChatMessageProps ={
    message: Message,

}

const ChatMessage = (props: ChatMessageProps) => {

    const { message } = props;
    return (
        <Text>{message.content}</Text>
    )

}

export default ChatMessage;