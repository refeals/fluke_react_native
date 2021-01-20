import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {api} from '../api';
import Loading from './Loading';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.strong}>
          Dados contratados no início do ciclo atual
        </Text>
        <Ionicons name="analytics-outline" style={styles.icon} />
        <Text style={styles.text}>{history.subscription} MB</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.strong}>
          Dados adicionais contratados durante o ciclo atual
        </Text>
        <Ionicons name="analytics-outline" style={styles.icon} />
        <Text style={styles.text}>{history.topup} MB</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.strong}>Bônus recebidos durante o ciclo atual</Text>
        <Ionicons name="analytics-outline" style={styles.icon} />
        <Text style={styles.text}>{history.bonus} MB</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.strong}>Dados disponíveis para consumo</Text>
        <Ionicons name="analytics-outline" style={styles.icon} />
        <Text style={styles.text}>{history.available} MB</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingHorizontal: 12,
    paddingBottom: 4,
    flex: 1,
    justifyContent: 'space-between',
  },
  card: {
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderWidth: 1,
    flex: 1,
    padding: 8,
    marginVertical: 4,
    justifyContent: 'space-between',
  },
  strong: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
  text: {
    textAlign: 'center',
  },
  icon: {
    textAlign: 'center',
    fontSize: 24,
  },
});

export default Consumption;
