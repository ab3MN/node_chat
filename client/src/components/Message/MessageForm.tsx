import { sendMessage } from '@/api/messages.api';
import { SubmitButton } from '@/UI/SubmitButton';
import { Box, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';

export const MessageForm = () => {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = {
      userName: 'Monkey D Luffy',
      text: 'I am Luffy',
      userId: 'f48449bf-014c-42f9-b747-435b302c290a',
      roomId: 'dae0833c-c39b-4b75-a3f6-cb8c72d6a92d',
    };

    sendMessage(message);

    setText('');
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      style={{ display: 'flex', maxWidth: '100%', columnGap: '1rem', margin: 'auto 0 2rem' }}
    >
      <TextField
        name='message'
        style={{ flexBasis: '300%' }}
        autoFocus
        size='small'
        type='text'
        // required
        value={text}
        fullWidth
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setText(e.target.value);
        }}
      />
      <SubmitButton title='Send ' />
    </Box>
  );
};
