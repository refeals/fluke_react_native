import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
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
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(history, null, 4)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
});

export default Consumption;
