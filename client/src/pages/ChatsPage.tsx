import { ChatNavigation } from '@/components/Chat/ChatNavigation';
import { ChatProvider } from '@/providers/ChatProvider';
import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';

const ChatsPage = () => (
  <Grid container spacing={3}>
    <ChatProvider>
      <Grid item xs={4}>
        <ChatNavigation />
      </Grid>

      <Grid item xs={8}>
        <Outlet />
      </Grid>
    </ChatProvider>
  </Grid>
);

export default ChatsPage;
