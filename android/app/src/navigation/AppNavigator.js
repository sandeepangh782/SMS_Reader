import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExpenseScreen from '../screens/ExpenseScreen';
import TransactionDetailScreen from '../screens/TransactionDetailScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Expense" component={ExpenseScreen}
            options={{ headerShown: false }} />
            <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} 
                 options={{
    headerShown: true, 
    title: 'Transaction Detail', 
    headerStyle: {
      backgroundColor: '#000000', 
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold', 
    },
  }} 
            />
        </Stack.Navigator>
        </NavigationContainer>
    );
}