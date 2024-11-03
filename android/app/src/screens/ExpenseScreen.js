import React, { useState } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import ExpenseItem from '../components/ExpenseItem';
import { requestSMSPermission } from '../services/Permissions';
import { fetchExpenseSMS } from '../services/SmsReader';
import { format } from 'date-fns';

const ExpenseScreen = ({ navigation }) => {
  const [expenses, setExpenses] = useState([]);

  const handleFetchExpenses = async () => {
    const hasPermission = await requestSMSPermission();
    if (hasPermission) {
      fetchExpenseSMS((newExpenses) => {
        const expensesWithTags = newExpenses.map((expense) => ({
          ...expense,
          tag: 'Personal', // default tag
        }));
        setExpenses(expensesWithTags);
      });
    } else {
      alert('SMS permission is required to access expenses.');
    }
  };

  const handleUpdateTag = (id, newTag) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === id ? { ...expense, tag: newTag } : expense
      )
    );
  };

  const groupExpensesByMonth = (expenses) => {
    const grouped = {};

    expenses.forEach((expense) => {
      const monthYear = format(new Date(expense.date), 'MMMM yyyy');
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      grouped[monthYear].push(expense);
    });

    return Object.entries(grouped).map(([monthYear, items]) => ({
      title: monthYear,
      data: items,
      count: items.length,
    }));
  };

  const groupedExpenses = groupExpensesByMonth(expenses);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container_header}>
        <Text style={styles.headerText}>Transactions</Text>
        <TouchableOpacity onPress={handleFetchExpenses} style={styles.refreshButton}>
        <Image
            source={require('../assests/refresh.png')} 
            style={styles.iconImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.belowTransactionContainer}>
        <FlatList
          data={groupedExpenses}
          renderItem={({ item }) => (
            <View>
              <View style={styles.monthHeader}>
                <Text style={styles.monthHeading}>{item.title}</Text>
                <View style={styles.transactionCount}>
                  <Text style={styles.countText}>{item.count}</Text>
                </View>
                <Text style={styles.countTransactionsText}>transactions</Text>
              </View>
              <View style={styles.divider} />
              {item.data.map((expense) => (
                <ExpenseItem
                  key={expense.id}
                  amount={expense.amount}
                  description={expense.description}
                  date={expense.date}
                  bank={expense.bank}
                  tag={expense.tag}
                  onTagChange={(newTag) => handleUpdateTag(expense.id, newTag)}
                  onPress={() => {
                    console.log(
                      'Navigating to TransactionDetailScreen with expense:',
                      expense
                    );
                    navigation.navigate('TransactionDetail', {
                      transaction: expense,
                    });
                  }}
                />
              ))}
            </View>
          )}
          keyExtractor={(item) => item.title}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000000',
    padding: 0,
  },
  container_header: {
    backgroundColor: '#000000',
    paddingTop: 40,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  belowTransactionContainer: {
    padding: 20,
    flex: 1,
  },
  headerText: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 5,
  },
  monthHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B7B7B7',
    flex: 1,
  },
  transactionCount: {
    backgroundColor: '#00000',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  countText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  countTransactionsText: {
    fontSize: 12,
    color: '#ffffff',
    marginLeft: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#ffffff',
    marginTop: 5,
    marginBottom: 10,
  },
  refreshButton: {
    backgroundColor: '#555555',
    padding: 10,
    height:50,
    width: 50, 
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    marginRight:6,
    padding:15,
    width: 24, 
    height: 24,
    tintColor: '#ffffff', 
  },
});

export default ExpenseScreen;
