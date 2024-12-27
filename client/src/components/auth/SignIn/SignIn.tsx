import { ChangeEvent, FormEvent, ReactNode, useState } from 'react';

import { TextField } from '@mui/material';
import useLocaLStorage from '@/hooks/useLocaLStorage';
import { signIn } from '@/api/users.api';
import notification from '@/utils/notification';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitButton } from '@/UI/SubmitButton';
import { FormContainer } from '@/UI/FormContainer';

const SignIn = (): ReactNode => {
  const [name, setName] = useState('');
  const { setItem } = useLocaLStorage('user');
  const navigate = useNavigate();

  console.log('aa');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    signIn(name)
      .then((user) => {
        setItem(user);
        navigate('/chat');
      })
      .catch((err) => {
        notification('error', err);
      });
  };

  return (
    <FormContainer handleSubmit={handleSubmit}>
      <TextField
        label='Name'
        name='name'
        autoFocus
        size='medium'
        type='text'
        required
        fullWidth
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setName(e.target.value);
        }}
      />
      <SubmitButton title='Sign In' />
      <p style={{ margin: '0' }}>OR</p>

      <Link
        to='/signup'
        style={{ textDecoration: 'none', color: '#1976d2', textTransform: 'uppercase', fontWeight: 'bold' }}
      >
        Sign Up
      </Link>
    </FormContainer>
  );
};

export default SignIn;
