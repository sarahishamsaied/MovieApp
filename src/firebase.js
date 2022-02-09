import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDFb7h3lL-qb2mYemstWfv8BLzvqHQ4XQs",
  authDomain: "movieapp-dev-cb82c.firebaseapp.com",
  projectId: "movieapp-dev-cb82c",
  storageBucket: "movieapp-dev-cb82c.appspot.com",
  messagingSenderId: "183493070353",
  appId: "1:183493070353:web:509eff136121e40afbebb0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
