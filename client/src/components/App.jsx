// #region imports
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { MessageForm } from './MessageForm.jsx';
import { MessageList } from './MessageList.jsx';
// #endregion

const API_URL = 'ws://127.0.0.1:5000';

const DataLoader = ({ onData }) => {
  useEffect(() => {
    const socket = new WebSocket(API_URL);

    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);

      onData(message);
    });

    socket.addEventListener('open', () => {
      socket.send('Hi');
    });

    return () => {
      socket.close();
    };
  }, []);

  return <h1 className='title'>Chat application</h1>;
};

export function App() {
  const [messages, setMessages] = useState([]);

  console.log(messages);

  function saveData(message) {
    setMessages((current) => [message, ...current]);
  }

  return (
    <section className='section content'>
      <DataLoader onData={saveData} />

      <MessageForm />
      <MessageList messages={messages} />
    </section>
  );
}
