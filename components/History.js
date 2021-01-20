import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format, parse} from 'date-fns';
import {api} from '../api';
import HistoryItem from './HistoryItem';
import Loading from './Loading';

const History = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('2020-08-01');
  const [endDate, setEndDate] = useState('2020-08-07');
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [which, setWhich] = useState('start');

  const columns = 2; // flat list columns

  useEffect(() => {
    setLoading(true);
    api
      .get(`/usage/records/?startDate=${startDate}&endDate=${endDate}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      });
  }, [startDate, endDate]);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    setShowDatepicker(Platform.OS === 'ios');

    if (selectedDate) {
      if (which === 'start') {
        setStartDate(formattedDate);
      } else if (which === 'end') {
        setEndDate(formattedDate);
      }
    }
  };

  const onStartButtonPressed = () => {
    setWhich('start');
    setShowDatepicker(true);
  };

  const onEndButtonPressed = () => {
    setWhich('end');
    setShowDatepicker(true);
  };

  const setDatepickerInitialValue = () => {
    if (which === 'start') {
      return parse(startDate, 'yyyy-MM-dd', new Date());
    } else if (which === 'end') {
      return parse(endDate, 'yyyy-MM-dd', new Date());
    }
    return new Date();
  };

  const createRows = (dataArr, numColumns) => {
    const rows = Math.floor(dataArr.length / numColumns);
    let lastRowElements = dataArr.length - rows * numColumns;
    while (lastRowElements !== numColumns) {
      dataArr.push({
        ...dataArr[lastRowElements],
        empty: true,
      });
      lastRowElements += 1;
    }
    return dataArr;
  };

  const formatButtonDate = (dateStr) => {
    const parsedDate = parse(dateStr, 'yyyy-MM-dd', new Date(dateStr));
    return format(parsedDate, 'dd/MM/yyyy');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={onStartButtonPressed}
          style={loading ? styles.buttonDisabled : styles.button}
          activeOpacity={0.7}
          disabled={loading}>
          <Text style={styles.buttonText}>Data de Início</Text>
          <Text style={styles.buttonText}>{formatButtonDate(startDate)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onEndButtonPressed}
          style={loading ? styles.buttonDisabled : styles.button}
          activeOpacity={0.7}
          disabled={loading}>
          <Text style={styles.buttonText}>Data Final</Text>
          <Text style={styles.buttonText}>{formatButtonDate(endDate)}</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Loading />
        </View>
      ) : (
        <FlatList
          data={createRows(data, columns)}
          renderItem={({item}) => <HistoryItem item={item} />}
          keyExtractor={(item) => item.date}
          numColumns={2}
        />
      )}

      {showDatepicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={setDatepickerInitialValue()}
          mode={'date'}
          display="default"
          onChange={onDateChange}
          minimumDate={parse('2020-02-28', 'yyyy-MM-dd', new Date())}
          maximumDate={parse('2020-08-21', 'yyyy-MM-dd', new Date())}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 12,
  },
  button: {
    borderColor: 'green',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: 'lightgreen',
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  buttonDisabled: {
    borderColor: 'green',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: 'lightgreen',
    paddingHorizontal: 24,
    paddingVertical: 10,
    opacity: 0.2,
  },
  buttonText: {
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
  },
});

export default History;
