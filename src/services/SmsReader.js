// src/services/smsReader.js
import SmsAndroid from 'react-native-get-sms-android';

export const fetchExpenseSMS = (callback) => {
  const filter = {
    box: 'inbox',
    indexFrom: 0,
    maxCount: 50,
  };

  SmsAndroid.list(
    JSON.stringify(filter),
    (fail) => {
      console.log("Failed with this error: " + fail);
    },
    (count, smsList) => {
      const messages = JSON.parse(smsList);
      const expenses = messages
        .filter(message => isExpenseMessage(message.body))
        .map(message => parseExpenseMessage(message.body, message.date));

      callback(expenses);
    }
  );
};

const isExpenseMessage = (text) => {
  const expenseKeywords = ["spent", "debited", "purchase", "transaction"];
  return expenseKeywords.some(keyword => text.toLowerCase().includes(keyword));
};

const parseExpenseMessage = (text, date) => {
  const amountMatch = text.match(/\b\d+(\.\d{1,2})?\b/);
  const descriptionMatch = text.match(/at\s+(\w+)/i);

  const amount = amountMatch ? `$${amountMatch[0]}` : "N/A";
  const description = descriptionMatch ? descriptionMatch[1] : "Unknown Merchant";
  const parsedDate = new Date(date).toISOString().split('T')[0];

  return {
    id: date.toString(),
    amount,
    description,
    date: parsedDate,
  };
};
