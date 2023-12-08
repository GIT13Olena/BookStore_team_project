// Initialize Firebase

import { initializeApp } from 'firebase/app';
import {
  auth,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBoGwLhspISnegPJuqB0wKYzxjoZ720S2Y',
  authDomain: 'modaluser-96792.firebaseapp.com',
  projectId: 'modaluser-96792',
  storageBucket: 'modaluser-96792.appspot.com',
  messagingSenderId: '997260471203',
  appId: '1:997260471203:web:acbdf87b6a5523964c4816',
};

const app = initializeApp(firebaseConfig);

// // Get elements
const txtEmail = document.querySelector('input[placeholder="EMAIL"]');
const txtPassword = document.querySelector('input[placeholder="PASSWORD"]');
const btnSignUp = document.querySelector('.form_link_sign_up');
const btnLogout = document.querySelector('.header-button-span-text');

// Add sign up event
btnSignUp.addEventListener('click', e => {
  // Get email and password
  const email = txtEmail.value;
  const password = txtPassword.value;
  // Sign in
  const promise = createUserWithEmailAndPassword(auth, email, password);
  promise.catch(e => console.log(e.message));
});

// Add logout event
btnLogout.addEventListener('click', e => {
  signOut(auth);
});

// Add a realtime listener
onAuthStateChanged(auth, firebaseUser => {
  if (firebaseUser) {
    btnSignUp.textContent = firebaseUser.displayName;
    btnLogout.classList.remove('hide');
  } else {
    btnSignUp.textContent = 'SIGN UP';
    btnLogout.classList.add('hide');
  }
});

//  Make sure you replace 'YOUR_API_KEY', 'YOUR_AUTH_DOMAIN', 'YOUR_PROJECT_ID',
// 'YOUR_STORAGE_BUCKET', 'YOUR_MESSAGING_SENDER_ID', and 'YOUR_APP_ID'
// with your actual Firebase project configuration
