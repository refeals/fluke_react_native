import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {format, parse} from 'date-fns';

const HistoryItem = ({item}) => {
  const parsedDate = parse(item.date, 'yyyy-MM-dd', new Date(item.date));
  const formattedDate = format(parsedDate, 'dd/MM/yyyy');

  if (item.empty) {
    return <View style={[styles.container, styles.empty]} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formattedDate}</Text>
      <View style={styles.line} />
      <Text style={styles.strong}>Tempo de consumo</Text>
      <Text style={styles.text}>{item.voice} s</Text>
      <Text style={styles.strong}>Dados consumidos</Text>
      <Text style={styles.text}>{item.data} bytes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 8,
    marginHorizontal: 4,
    paddingBottom: 12,
    flexBasis: 0,
    flexGrow: 1,
    alignItems: 'center',
  },
  empty: {
    borderWidth: 0,
  },
  line: {
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderTopWidth: 1,
    width: '100%',
    marginBottom: 12,
  },
  date: {
    fontWeight: '700',
    fontSize: 16,
    marginVertical: 12,
  },
  strong: {
    fontWeight: '700',
  },
});

export default HistoryItem;
