import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {api} from '../api';

const Consumption = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/usage/packageInformation/').then((res) => {
      setHistory(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return <Text>{JSON.stringify(history, null, 4)}</Text>;
};

export default Consumption;
