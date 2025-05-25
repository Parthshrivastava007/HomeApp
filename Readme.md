🏠 A simple real estate listing mobile application built using React Native (Expo) with Expo Router, React Query, and AsyncStorage.
Users can sign up, log in (via username or email), view homes, and see details about each property.

📦 Features
-> Login with username or email
-> Sign-up with inline email validation
-> Store user credentials securely using AsyncStorage
-> React Query v5 for efficient API data fetching
-> Home list fetched from public mock API
-> Location and distance randomly assigned to each home
-> Navigation with Expo Router
-> Form input validation and clean UI

🚀 Tech Stack
-> Expo
-> React Native
-> Expo Router
-> React Query (TanStack)
-> AsyncStorage
-> Mock API

🛠 Setup Instructions

1. Clone the Repository

   -> git clone https://github.com/Parthshrivastava007/HomeApp.git
   ->  cd HomeApp

2. Install Dependencies

   npm install

3. Install Required Packages

   -> npx expo install expo-router
   -> npm install @tanstack/react-query
   -> npx expo install @react-native-async-storage/async-storage
   -> npx expo install @expo/vector-icons

4. Running the App

   npx expo start

   Then open the app in one of the following:
   * 📱 Physical device: Install Expo Go from the Play Store, scan the QR code shown in terminal or browser
   * 💻 Android emulator: Use Android Studio to launch a virtual device

   ⚠️ Important:
   * Make sure your physical device or Android emulator is connected to the same Wi-Fi network as your laptop/PC.
   * Expo uses local network connection to stream the app — it will not work across different networks or mobile hotspots.

📡 API Used
https://678f678849875e5a1a91b27f.mockapi.io/houses
