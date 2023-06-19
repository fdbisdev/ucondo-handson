<h1 align="center">uCondo Challange</h1>

---

<h2 align="center">Topics 📋</h2>

   <p>
   
   - [About 📖](#about-)
   - [Preview 📱](#preview-)
   - [Layout 🎨](#layout-)
   - [Generate APK 📋](#generate-apk-)
   - [How to Use 🤔](#how-to-use-)


   </p>

---

<h2 align="center">About 📖</h2>
      
   <p align="center">
      Project developed to solve the uCondo challange.
   </p>

---

<h2 align="center">Preview 📱</h2>
<p align="center">
      <img src="https://raw.githubusercontent.com/fdbisdev/ucondo-handson/main/src/assets/screenshots/Simulator%20Screen%20Shot%20-%20iPhone%2013%20Pro%20-%202023-06-19%20at%2018.49.09.png" width="300" alt="HomePage"/>
      <img src="https://raw.githubusercontent.com/fdbisdev/ucondo-handson/main/src/assets/screenshots/Simulator%20Screen%20Shot%20-%20iPhone%2013%20Pro%20-%202023-06-19%20at%2018.49.14.png" width="300" alt="DetailsPage"/>
</p>
<p align="center">
      <img src="https://raw.githubusercontent.com/fdbisdev/ucondo-handson/main/src/assets/screenshots/Simulator%20Screen%20Shot%20-%20iPhone%2013%20Pro%20-%202023-06-19%20at%2018.53.38.png" width="300" alt="SearchAddress"/>
      <img src="https://raw.githubusercontent.com/fdbisdev/ucondo-handson/main/src/assets/screenshots/Simulator%20Screen%20Shot%20-%20iPhone%2013%20Pro%20-%202023-06-19%20at%2018.53.40.png" width="300" alt="SearchBedrooms" />
</p>

---

<h2 align="center">Layout 🎨</h2>

   <p align="center">
      The Layout was developed by uCondo
   </p>

---   

<h2 align="center">Generate APK 📋</h2>

   ```
   First of all, correctly configure the React Native development environment on your machine, see https://react-native.rocketseat.dev/
   
   - Clone this repository:
   $ git clone https://github.com/fdbisdev/ucondo-handson/ ucondo-handson
   
   - Enter in directory:
   $ cd ucondo-handson
   
   - Run:
   $ react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

   - Enter in android folder:
   $ cd android
   
   - Generate APK:
   $ ./gradlew assembleDebug
   
   Congratulations! your APK has generated in the folder: 'ucondo-handson/android/app/build/outputs/apk/debug/app-debug.apk'
   
   Enjoy!

   *OBS: Now you have the debug .apk, for generate the release app .apk you need to follow the oficial documentation step-by-step: 
https://reactnative.dev/docs/signed-apk-android

   ```
   
---

<h2 align="center">How to Use 🤔</h2>

   ```
   First of all, correctly configure the React Native development environment on your machine, see https://react-native.rocketseat.dev/
   
   - Clone this repository:
   $ git clone https://github.com/fdbisdev/ucondo-handson ucondo-handson

   - Enter in directory:
   $ cd ucondo-handson

   - For install dependencies:
   $ yarn

   - Run the app: 
   $ yarn android or yarn ios
   ```

---

   >This project was developed with ❤️ by **[@FelipeBis](https://www.linkedin.com/in/felipe-bis-3681301b7/)**.
   If it helped you, give ⭐, contribute, it will help me too 😉

---
