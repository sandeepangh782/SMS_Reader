// src/components/ExpenseItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExpenseItem = ({ amount, description, date }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>Amount: {amount}</Text>
      <Text style={styles.text}>Description: {description}</Text>
      <Text style={styles.text}>Date: {date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default ExpenseItem;
