import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
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
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(data, null, 4)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
});

export default History;
