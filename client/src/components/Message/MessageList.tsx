import { getMessages } from '@/api/messages.api';
import { Message } from '@/types/Message';
import notification from '@/utils/notification';
import { List, ListItem } from '@mui/material';
import { useEffect, useState } from 'react';

export const MessageList = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5700');

    ws.onopen = () => {
      ws.send('Hello Monkey D Luffy!');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((state) => [...state, message]);
    };

    ws.onerror = () => {
      notification('error', 'Contection is lost');
    };
  }, []);

  useEffect(() => {
    getMessages('dae0833c-c39b-4b75-a3f6-cb8c72d6a92d')
      .then(setMessages)
      .catch((err) => notification('error', err));
  }, []);

  return (
    <List>
      {messages.map((message) => (
        <ListItem key={message.id}>{message.text}</ListItem>
      ))}
    </List>
  );
};
