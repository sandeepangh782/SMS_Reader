This is a [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

Here’s a README file based on your technical setup, guiding users on how to clone, configure, and run the project.

---

# ExpenseTrackerApp

A standalone React Native app that reads SMS messages on a device to extract and categorize expense-related information, providing a simple and organized interface for tracking personal finances.

---

## Table of Contents
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Project Setup](#project-setup)
- [Running the Application](#running-the-application)
- [Core Dependencies](#core-dependencies)
- [License](#license)

---

## Getting Started

This project uses React Native CLI instead of Expo due to its compatibility with native device features such as SMS reading. Follow the instructions below to set up and run the project on a local Android device.

---

## Installation

### Prerequisites

- **Node.js**: Ensure that Node.js is installed (preferably the latest stable version).
- **Android Studio**: Install Android Studio along with the necessary CLI tools.
- **Git**: Ensure Git is installed to clone the repository.

---

## Project Setup

1. **Clone the Repository**

   ```bash
   git clone <your-repo-url>
   cd ExpenseTrackerApp
   ```

2. **Install Node Modules**

   Install all necessary dependencies using npm:

   ```bash
   npm install
   ```

3. **Android Studio CLI Configuration**

   To enable Android Studio CLI tools to work with this project, configure the environment variables for the Android SDK:

   Add the following lines to your shell configuration file (e.g., `~/.bashrc` or `~/.zshrc`):

   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

   Then, refresh your terminal session:

   ```bash
   source ~/.bashrc  # or source ~/.zshrc
   ```

4. **Enable USB Debugging**

   - On your Android device, enable Developer Options and enable **USB Debugging**.
   - Connect your device via USB.

5. **Verify Device Connection**

   To confirm your device is connected and recognized by ADB, run:

   ```bash
   adb devices
   ```

   You should see an output similar to:

   ```bash
   List of devices attached
   1234567abcdef device
   ```

---

## Running the Application

After completing the setup, build and run the app on your physical device:

```bash
npm run android
```

This command will build and deploy the app on the connected Android device.

---

## Core Dependencies

The project uses several libraries to implement its core functionality. Here’s how to install the main dependencies:

1. **React and React Native**:

   ```bash
   npm install react react-native
   ```

2. **Project-Specific Libraries**:

   ```bash
   npm install @google/generative-ai \
     @react-native-masked-view/masked-view \
     @react-navigation/native \
     @react-navigation/stack \
     date-fns \
     react-native-gesture-handler \
     react-native-get-sms-android \
     react-native-logs \
     react-native-safe-area-context \
     react-native-screens \
     react-native-vector-icons
   ```

   These libraries enable features such as navigation, SMS reading, logging, date management, and enhanced UI components.

---


# SMS_Reader
