import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format, parse} from 'date-fns';
import {api} from '../api';
import HistoryItem from './HistoryItem';

const History = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('2020-08-01');
  const [endDate, setEndDate] = useState('2020-08-03');
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [which, setWhich] = useState('start');

  useEffect(() => {
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

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={onStartButtonPressed}
          style={styles.button}
          activeOpacity={0.7}>
          <Text style={styles.buttonText}>Change start date</Text>
          <Text style={styles.buttonText}>{startDate}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onEndButtonPressed}
          style={styles.button}
          activeOpacity={0.7}>
          <Text style={styles.buttonText}>Change end date</Text>
          <Text style={styles.buttonText}>{endDate}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        renderItem={({item}) => <HistoryItem item={item} />}
        keyExtractor={(item) => item.date}
      />

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
    padding: 12,
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonText: {
    textAlign: 'center',
  },
});

export default History;
