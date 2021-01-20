import React from 'react';
import {StyleSheet, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Loading = () => {
  return (
    <View style={styles.loading}>
      <AntDesign name="loading1" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
