import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {format, parse} from 'date-fns';

const HistoryItem = ({item}) => {
  const parsedDate = parse(item.date, 'yyyy-MM-dd', new Date(item.date));
  const formattedDate = format(parsedDate, 'dd/MM/yyyy');

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formattedDate}</Text>
      <Text style={styles.text}>Tempo de consumo: {item.voice} s</Text>
      <Text style={styles.text}>Dados consumidos: {item.data} bytes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 8,
    marginHorizontal: 12,
    padding: 12,
    // width: '50%',
  },
  date: {
    fontWeight: '700',
    marginBottom: 4,
  },
});

export default HistoryItem;
