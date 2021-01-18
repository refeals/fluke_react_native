import React, {useEffect, useState} from 'react';
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format, parse} from 'date-fns';
import {api} from '../api';

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
    <ScrollView style={styles.container}>
      <Button onPress={onStartButtonPressed} title="Change start date" />
      <Button onPress={onEndButtonPressed} title="Change end date" />
      <Text>{JSON.stringify(data, null, 4)}</Text>

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
});

export default History;
