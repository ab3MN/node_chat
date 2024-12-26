import { getRoomById } from '@/api/rooms.api';
import { Chat } from '@/components/Chat/Chat';
import { ChatNavigation } from '@/components/Chat/ChatNavigation';
import { ChatProvider } from '@/providers/ChatProvider';
import { Room } from '@/types/Room';
import notification from '@/utils/notification';
import Grid from '@mui/material/Grid';
import { useLayoutEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

const ChatPage = () => {
  const { chatid } = useParams();
  const [chat, setChat] = useState<Room | null>(null);

  useLayoutEffect(() => {
    if (chatid) {
      getRoomById(chatid)
        .then(setChat)
        .catch((err) => notification('error', err));
    } else {
      setChat(null);
    }
  }, [chatid]);

  return (
    <Grid container spacing={3}>
      <ChatProvider>
        <Grid item xs={2}>
          <ChatNavigation />
        </Grid>

        <Grid item xs={10}>
          {chat ? <Chat chat={chat} /> : <Outlet />}
        </Grid>
      </ChatProvider>
    </Grid>
  );
};

export default ChatPage;
