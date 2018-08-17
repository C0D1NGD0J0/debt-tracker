import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import { createStore, combineReducers, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBFjnxZHSgbHh3AKQ4-6-f4d7EgEA3csME",
  authDomain: "react-debt-tracker.firebaseapp.com",
  databaseURL: "https://react-debt-tracker.firebaseio.com",
  projectId: "react-debt-tracker",
  storageBucket: "react-debt-tracker.appspot.com",
  messagingSenderId: "201644478875"
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);
// initialize firestore
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer 
});

// Create store with reducers and initial state
const initialState = {};
const store = createStoreWithFirebase(rootReducer, initialState, composeWithDevTools(
	reactReduxFirebase(firebase)
));

export default store;