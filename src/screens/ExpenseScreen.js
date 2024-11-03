// src/screens/ExpenseScreen.js
import React, { useState } from 'react';
import { View, Button, FlatList, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import ExpenseItem from '../components/ExpenseItem';
import { requestSMSPermission } from '../services/Permissions';
import { fetchExpenseSMS } from '../services/SmsReader';

const ExpenseScreen = () => {
  const [expenses, setExpenses] = useState([]);

  const handleFetchExpenses = async () => {
    const hasPermission = await requestSMSPermission();
    if (hasPermission) {
      fetchExpenseSMS(setExpenses);
    } else {
      alert("SMS permission is required to access expenses.");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Fetch Expenses from SMS" onPress={handleFetchExpenses} />
      <FlatList
        data={expenses}
        renderItem={({ item }) => (
          <ExpenseItem amount={item.amount} description={item.description} date={item.date} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
});

export default ExpenseScreen;
