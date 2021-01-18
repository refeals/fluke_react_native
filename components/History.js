import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {api} from '../api';

const History = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('2020-08-01');
  const [endDate, setEndDate] = useState('2020-08-03');

  useEffect(() => {
    api
      .get(`/usage/records/?startDate=${startDate}&endDate=${endDate}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      });
  }, [startDate, endDate]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return <Text>{JSON.stringify(data, null, 4)}</Text>;
};

export default History;
