import axios from 'axios';
import { useEffect } from 'react';

const API_URL = 'http://127.0.0.1:5000/messages';

export function ShortPollingLoader({ onData }) {
  function loadData() {
    axios.get(API_URL)
      .then(res => {
        onData(res.data);
      });
  }

  useEffect(() => {
    loadData();

    const timerId = setInterval(loadData, 5000);

    return () => {
      clearImmediate(timerId);
    };
  }, []);

  return <h1 className="title">Short polling</h1>;
}
