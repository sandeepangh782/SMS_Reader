This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

Here’s the dependencies installation section without specifying the versions:

---

### **Dependencies Installation**

To set up the project with the required dependencies, run the following commands in the terminal. These dependencies provide navigation, UI components, SMS reading, API requests, date management, and logging functionalities.

1. **Install Core Dependencies**

   Begin by installing the primary dependencies for React Native and React:

   ```bash
   npm install react react-native
   ```

2. **Install Project-Specific Libraries**

   Next, install the additional libraries needed for specific features in the project:

   ```bash
   npm install @google/generative-ai \
     @react-native-masked-view/masked-view \
     @react-navigation/native \
     @react-navigation/stack \
     axios \
     date-fns \
     react-native-gesture-handler \
     react-native-get-sms-android \
     react-native-logs \
     react-native-safe-area-context \
     react-native-screens \
     react-native-vector-icons
   ```

   Here is a brief explanation of what each dependency does:

   - **`@google/generative-ai`**: Integrates Google’s Generative AI API for extracting expense-related information from SMS content.
   - **`@react-native-masked-view/masked-view`**: Provides masked views, enhancing UI customizability.
   - **`@react-navigation/native` and `@react-navigation/stack`**: Core libraries for implementing navigation, allowing users to move between screens in the app.
   - **`axios`**: HTTP client for making API requests.
   - **`date-fns`**: Utility library for managing and formatting dates, essential for organizing expenses by month.
   - **`react-native-gesture-handler`**: Adds gesture handling capabilities, enhancing UI interactions.
   - **`react-native-get-sms-android`**: Enables SMS reading on Android, which is critical for fetching transaction data.
   - **`react-native-logs`**: Logging library for debugging and event logging within the app.
   - **`react-native-safe-area-context`**: Ensures UI components stay within the safe area on different devices.
   - **`react-native-screens`**: Optimizes navigation performance by managing screens efficiently.
   - **`react-native-vector-icons`**: Offers a set of customizable icons for UI design.

3. **Link Native Modules** (if required)

   For React Native 0.60 and above, auto-linking should handle most cases. However, if additional steps are needed, refer to each library’s documentation.

4. **Final Setup Steps**

   After installation, reset the cache and start the app:

   ```bash
   npx react-native start --reset-cache
   npx react-native run-android
   ```

---

This setup will ensure that all necessary dependencies are correctly installed and configured for the app's features and functionality.

# SMS_Reader