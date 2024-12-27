import { ChatContext } from '@/context/ChatContext';
import { Room } from '@/types/Room';
import { Box, Button, Typography } from '@mui/material';
import { FC, useContext } from 'react';
import { MessageForm } from '../Message/MessageForm';
import { MessageList } from '../Message/MessageList';

interface Props {
  chat: Room;
}

export const Chat: FC<Props> = ({ chat }) => {
  const { removeChat } = useContext(ChatContext);

  return (
    <Box style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Typography component='h2' style={{ textAlign: 'center', margin: '1rem' }}>
        {chat.name}
      </Typography>
      <MessageList />
      <MessageForm />
      <Button
        type='button'
        variant='contained'
        onClick={() => {
          removeChat(chat.id);
        }}
        style={{ display: 'block', margin: '0 auto 2rem ' }}
      >
        Delete Chat
      </Button>
    </Box>
  );
};
