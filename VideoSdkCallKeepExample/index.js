/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Import the library
import {register} from '@videosdk.live/react-native-sdk';

// Register the VideoSDK service
register();

// import firebase from '@react-native-firebase/app';
// // import '@react-native-firebase/auth';
// import '@react-native-firebase/firestore';

// const RNfirebaseConfig = {
//   apiKey: 'AIzaSyAHKvmsTpVqzFNXRcVLo8rnAue0Q8-szeU',
//   authDomain: 'rn-video-call-7b3be.appspot.com',
//   projectId: 'rn-video-call-7b3be',
//   storageBucket: 'rn-video-call-7b3be.appspot.com',
//   // messagingSenderId: '.....',
//   appId: 'com.videosdkcallkeepexample',
// };

// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(RNfirebaseConfig);
// } else {
//   app = firebase.app();
// }

// const db = firebase.firestore();
// const auth = firebase.auth();

AppRegistry.registerComponent(appName, () => App);
