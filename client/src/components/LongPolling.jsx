import axios from 'axios';
import { useEffect } from 'react';

const API_URL = 'http://127.0.0.1:5000/messages';

export function LongPollingLoader({ onData }) {
  function loadData() {
    axios.get(API_URL)
      .then(res => {
        onData(res.data);

        loadData();
      });
  }

  useEffect(() => {
    loadData();
  }, []);

  return <h1 className="title">Long polling</h1>;
}
