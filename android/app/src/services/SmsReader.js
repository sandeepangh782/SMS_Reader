// import SmsAndroid from 'react-native-get-sms-android';

// export const fetchExpenseSMS = (callback) => {
//   const filter = {
//     box: 'inbox',
//     indexFrom: 0,
//     maxCount: 100,
//   };

//   SmsAndroid.list(
//     JSON.stringify(filter),
//     (fail) => {
//       console.log("Failed with this error: " + fail);
//     },
//     (count, smsList) => {
//       const messages = JSON.parse(smsList);
//       const expenses = messages
//         .filter(message => isExpenseMessage(message.body))
//         .map(message => parseExpenseMessage(message.body, message.date));

//       callback(expenses);
//     }
//   );
// };

// const isExpenseMessage = (text) => {
//   // More specific expense keywords and patterns
//   const expensePatterns = [
//     /\b(?:spent|purchase|transaction|payment of|charged|debited)\b/i,
//     /\b(?:credited)\b/i
//   ];

//   return expensePatterns.some(pattern => pattern.test(text));
// };

// const parseExpenseMessage = (text, date) => {
//   // Improved regex for amounts
//   const amountMatch = text.match(/(?:Rs\.?|INR\s?)\s?(\d{1,5}(?:,\d{3})*(?:\.\d{1,2})?)/i);
//   const descriptionMatch = text.match(/at\s+([\w\s]+)/i);

//   const amount = amountMatch ? `Rs. ${amountMatch[1]}` : "N/A";
//   const description = descriptionMatch ? descriptionMatch[1].trim() : "Unknown Merchant";
//   const parsedDate = new Date(date).toISOString().split('T')[0];

//   return {
//     id: date.toString(),
//     amount,
//     description,
//     date: parsedDate,
//   };
// };





// import SmsAndroid from 'react-native-get-sms-android';
// import axios from 'axios';

// export const fetchExpenseSMS = (callback) => {
//   const filter = {
//     box: 'inbox',
//     indexFrom: 0,
//     maxCount: 100,
//   };

//   SmsAndroid.list(
//     JSON.stringify(filter),
//     (fail) => {
//       console.log("Failed with this error: " + fail);
//     },
//     async (count, smsList) => {
//       const messages = JSON.parse(smsList);

//       // Fetch details for each expense message
//       const expenseDetailsPromises = messages
//         .filter(message => isExpenseMessage(message.body))
//         .map(async (message) => {
//           const details = await getExpenseDetails(message.body);
//           return {
//             ...details,
//             id: message.date.toString(),
//           };
//         });

//       const expenses = await Promise.all(expenseDetailsPromises);
//       callback(expenses);
//     }
//   );
// };

// const isExpenseMessage = (text) => {
//   const expenseKeywords = ["spent", "purchase", "transaction", "payment", "charged", "debited"];
//   return expenseKeywords.some(keyword => text.toLowerCase().includes(keyword));
// };

// const getExpenseDetails = async (text) => {
//   try {
//     const response = await axios.post('http://localhost:5000/extract', { text });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching expense details:', error);
//     return {
//       amount: "N/A",
//       description: "Unknown Merchant",
//       date: "N/A",
//       bank: "N/A"
//     };
//   }
// };

import SmsAndroid from 'react-native-get-sms-android';
import { logger } from "react-native-logs";

export const fetchExpenseSMS = (callback) => {
  const filter = {
    box: 'inbox',
    indexFrom: 0,
    maxCount: 20,
  };

  SmsAndroid.list(
    JSON.stringify(filter),
    (fail) => {
      console.log("Failed with this error: " + fail);
    },
    async (count, smsList) => {
      const messages = JSON.parse(smsList);
      const expenses = await Promise.all(
        messages
          .filter(message => isExpenseMessage(message.body))
          .map(async (message) => await parseExpenseMessage(message.body, message.date))
      );

      callback(expenses);
    }
  );
};

const isExpenseMessage = (text) => {
  const expensePatterns = [
    /\b(?:spent|purchase|transaction|payment of|charged|debited)\b/i,
    /\b(?:credited)\b/i
  ];

  return expensePatterns.some(pattern => pattern.test(text));
};

const parseExpenseMessage = async (text, date) => {
  try{
    console.log(text)
    const { GoogleGenerativeAI } = require("@google/generative-ai");

    var log = logger.createLogger();

    log.debug("This is a Debug log");
    const genAI = new GoogleGenerativeAI("API_KEY");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Extract the following details from this list of SMS messages. Return each message as a JSON object with this schema:

    MessageSchema = {
      "amount": String,  // Format: "+ ₹500.00" for credit, "- ₹500.00" for debit
      "description": String,  // Name of merchant/payer/receiver
      "date": String,  // Format: "YYYY-MM-DD"
      "bank": String   // Bank name involved in the transaction
    }

    Rules for extraction:
    1. Amount:
       - For debited/spent amount, prefix with "-"
       - For credited/received amount, prefix with "+"
       - Always include the ₹ symbol
       - Maintain 2 decimal places
       
    2. Description:
       - Extract only the merchant/person name
       - Remove UPI IDs, reference numbers, and other technical details
       
    3. Date:
       - Convert all dates to YYYY-MM-DD format
       
    4. Bank:
       - Extract the bank name from transaction details
       - For UPI, use the last bank code (e.g., HDFC, SBI, ICICI)
       - For direct transfers, mention both sender and receiver banks if available

    Example Input Messages:
    "UPI/DR/430763282641/RAJENDRA KUMAR/HDFC/Rs.7,200.00 debited on 02-11-2024"
    "IMPS/CR/RAHUL SHARMA/ICICI/Rs.1,500.00 credited to your account on 02-11-2024"

    Example Response:
    [
      {
        "amount": "-₹7,200.00",
        "description": "RAJENDRA KUMAR",
        "date": "2024-11-02",
        "bank": "HDFC"
      },
      {
        "amount": "+₹1,500.00",
        "description": "RAHUL SHARMA",
        "date": "2024-11-02",
        "bank": "ICICI"
      }
    ]

    Return: Array<MessageSchema>
    
    Messages: 
    ${text}
    
    Response:`;
    
    const result = await model.generateContent(prompt);
    const result1 = result.response.text();
    const cleanedResponse = result1.replace(/```json\n?|\n?```/g, '');
    // console.log(cleanedResponse)
    const parsedJson = JSON.parse(cleanedResponse.trim());
    // console.log(parsedJson)
    return {
      id: date.toString(),
      amount: parsedJson[0].amount || "N/A",
      description: parsedJson[0].description || "Unknown Merchant",
      date: parsedJson[0].date || new Date(date).toISOString().split('T')[0],
      bank: parsedJson[0].bank || "Home",
    };

  } catch (error) {
    console.log("Error parsing message with Gemini:", error);
    return {
      id: date.toString(),
      amount: "N/A",
      description: "Unknown Merchant",
      date: new Date(date).toISOString().split('T')[0],
    };
  }
};

// import SmsAndroid from 'react-native-get-sms-android';

// // Constants for message classification
// const BANK_KEYWORDS = [
//   'HDFC', 'SBI', 'ICICI', 'AXIS', 'PNB', 'BOB', 'KOTAK', 'YES BANK',
//   'STANDARD CHARTERED', 'CITI'
// ];

// // Regular expressions for different message patterns
// const PATTERNS = {
//   amount: /(?:INR|Rs\.?)\s*([0-9,]+\.?\d*)/i,
//   merchant: /(?:at|to|in)\s+([A-Za-z0-9\s&'+\-.,()]+?)(?:\s+on|info|Ltd|Pvt|limited|vs|\.|$)/i,
//   debit: /(?:debited|spent|paid|withdrew|withdrawal|purchase)/i,
//   credit: /(?:credited|received|refund|cashback)/i
// };

// export const fetchExpenseSMS = (callback) => {
//   const filter = {
//     box: 'inbox',
//     indexFrom: 0,
//     maxCount: 100,
//   };

//   SmsAndroid.list(
//     JSON.stringify(filter),
//     (fail) => {
//       console.log("Failed with this error: " + fail);
//     },
//     (count, smsList) => {
//       const messages = JSON.parse(smsList);
//       const expenses = messages
//         .filter(message => isExpenseMessage(message.body))
//         .map(message => parseExpenseMessage(message.body, message.date));

//       callback(expenses);
//     }
//   );
// };

// const isExpenseMessage = (text) => {
//   // Check if the message is from a bank
//   const isBankSender = BANK_KEYWORDS.some(bank => 
//     text.toUpperCase().includes(bank)
//   );

//   // Check if it's a transaction message
//   const isTransaction = PATTERNS.debit.test(text) || PATTERNS.credit.test(text);

//   // Additional transaction indicators
//   const hasTransactionIndicators = [
//     /(?:UPI|NEFT|IMPS|RTGS)/i,
//     /(?:account|a\/c)/i,
//     /(?:card\s+ending|card\s+\w+\s+\d{4})/i,
//     /(?:balance|bal)/i
//   ].some(pattern => pattern.test(text));

//   return isBankSender && (isTransaction || hasTransactionIndicators);
// };

// const parseExpenseMessage = (text, date) => {
//   // Amount extraction with improved pattern matching
//   const amountMatch = text.match(PATTERNS.amount);
//   let amount = "N/A";
//   if (amountMatch) {
//     const amountValue = amountMatch[1].replace(/,/g, '');
//     amount = `Rs. ${amountValue}`;
//   }

//   // Description/merchant extraction with improved cleaning
//   let description = "Unknown Merchant";
//   const merchantMatch = text.match(PATTERNS.merchant);
//   if (merchantMatch) {
//     description = merchantMatch[1]
//       .replace(/\s+/g, ' ')  // normalize spaces
//       .trim()
//       .replace(/[^\w\s&'+\-.,()]/g, '')  // remove invalid characters
//       .replace(/(?:info|Ltd|Pvt|limited)$/i, '')  // remove common suffixes
//       .trim();
//   }

//   // If no merchant match found, try to extract meaningful description from transaction
//   if (description === "Unknown Merchant") {
//     // Look for UPI transaction details
//     const upiMatch = text.match(/UPI-(?:Ref\s*No|txn)?\s*([A-Z0-9]+)/i);
//     if (upiMatch) {
//       description = `UPI Transaction ${upiMatch[1]}`;
//     }
//     // Look for card transaction details
//     const cardMatch = text.match(/(?:card\s*(?:no)?\.?\s*(?:xx+|\*+)([0-9]{4}))/i);
//     if (cardMatch) {
//       description = `Card Transaction ending ${cardMatch[1]}`;
//     }
//   }

//   // Format date consistently
//   const parsedDate = new Date(date).toISOString().split('T')[0];

//   // Return object in the same format as original code
//   return {
//     id: date.toString(),
//     amount,
//     description,
//     date: parsedDate,
//   };
// };

// export default {
//   fetchExpenseSMS
// };
