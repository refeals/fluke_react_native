import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Loading = () => {
  return (
    <View style={styles.loading}>
      <Text>Loading...</Text>
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
