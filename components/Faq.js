import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import data from './faqData';

const Faq = () => {
  const renderAnswer = ({item}) => <Text style={styles.answer}>{item}</Text>;

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.question}>
        {item.id}. {item.question}
      </Text>
      <FlatList
        data={item.answers}
        renderItem={renderAnswer}
        keyExtractor={(ans) => ans}
      />
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    flex: 1,
    padding: 12,
  },
  item: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 8,
  },
  answer: {
    fontSize: 14,
    marginBottom: 8,
  },
});

export default Faq;
