import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

declare global {
  interface Window {
    firebase?: {
      app?: FirebaseApp;
      auth?: Auth;
      firestore?: Firestore;
    };
  }
}