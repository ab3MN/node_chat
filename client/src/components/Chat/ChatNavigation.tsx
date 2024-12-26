import { ChatContext } from '@/context/ChatContext';
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
`;

export const ChatNavigation = () => {
  const { chats } = useContext(ChatContext);

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
          <ListItem key={id} style={{ padding: 0 }}>
            <NavLink to={`/chat/${id}`} className={({ isActive }) => (isActive ? 'current' : '')}>
              {name}
            </NavLink>
          </ListItem>
        ))}
        <ListItem style={{ padding: 0 }}>
          <NavLink to='/chat/create' className={({ isActive }) => (isActive ? 'current' : '')}>
            Create Chat
          </NavLink>
        </ListItem>
      </NavList>
    </Box>
  );
};
