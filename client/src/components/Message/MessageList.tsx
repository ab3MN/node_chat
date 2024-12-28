import { getMessages } from '@/api/messages.api';
import { Message } from '@/types/Message';
import notification from '@/utils/notification';
import { List } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { MessageItem } from './MessageItem';

interface Props {
  roomId: string;
}

export const MessageList: FC<Props> = ({ roomId }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5700');

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.roomId === roomId) {
        setMessages((state) => [...state, message]);
      }
    };

    ws.onerror = () => {
      notification('error', 'Connection is lost');
    };

    return () => {
      ws.close();
    };
  }, [roomId]);

  useEffect(() => {
    getMessages(roomId)
      .then(setMessages)
      .catch((err) => notification('error', err));
  }, [roomId]);

  return (
    <List style={{ display: 'flex', flexDirection: 'column' }}>
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </List>
  );
};
