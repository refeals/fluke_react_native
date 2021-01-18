import React, {useEffect, useState} from 'react';
import {Button, Platform, StyleSheet, Text, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
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
    setShowDatepicker(Platform.OS === 'ios');

    if (which === 'start') {
      setStartDate(currentDate);
    } else if (which === 'end') {
      setEndDate(currentDate);
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

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button onPress={onStartButtonPressed} title="Change start date" />
      <Button onPress={onEndButtonPressed} title="Change end date" />
      <Text>{JSON.stringify(data, null, 4)}</Text>

      {showDatepicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
});

export default History;
