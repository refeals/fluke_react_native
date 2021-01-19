import React from 'react';
import {Text} from 'react-native';

const HistoryItem = ({item}) => {
  return <Text>{JSON.stringify(item, null, 4)}</Text>;
};

export default HistoryItem;
