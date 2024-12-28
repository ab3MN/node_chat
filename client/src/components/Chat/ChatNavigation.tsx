import { ChatContext } from '@/context/ChatContext';
import { UserContext } from '@/context/UserContext';
import { Box, ListItem } from '@mui/material';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavList = styled.ul`
  a {
    text-decoration: none;
    color: rgb(56, 64, 229, 0.8);
  }
  .current {
    color: rgb(244, 8, 169);
  }

  li {
    padding: 0;
  }
`;

export const ChatNavigation = () => {
  const { chats } = useContext(ChatContext);
  const { handleLogOut } = useContext(UserContext);

  return (
    <Box>
      <NavList
        style={{
          width: '100%',
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          rowGap: '1rem',
        }}
      >
        {chats.map(({ name, id }) => (
          <ListItem key={id}>
            <NavLink to={`/chat/${id}`} className={({ isActive }) => (isActive ? 'current' : '')}>
              {name}
            </NavLink>
          </ListItem>
        ))}

        <ListItem>
          <NavLink to='/chat/create' className={({ isActive }) => (isActive ? 'current' : '')}>
            Create Chat
          </NavLink>
        </ListItem>

        <ListItem style={{ color: 'red', fontWeight: 'bold', cursor: 'pointer' }} onClick={handleLogOut}>
          Log Out
        </ListItem>
      </NavList>
    </Box>
  );
};
