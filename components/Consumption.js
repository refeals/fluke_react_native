import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {api} from '../api';
import Loading from './Loading';

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
    return <Loading />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text>{JSON.stringify(history, null, 4)}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
  },
});

export default Consumption;
