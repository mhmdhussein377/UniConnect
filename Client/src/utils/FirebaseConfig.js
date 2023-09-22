import {initializeApp} from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDesggNBgm_ElL05FHFIAGHzQGXl5Nrdvg",
    authDomain: "uniconnect-28324.firebaseapp.com",
    projectId: "uniconnect-28324",
    storageBucket: "uniconnect-28324.appspot.com",
    messagingSenderId: "866764983171",
    appId: "1:866764983171:web:179a66d8c1b5442f2304b6"
};

const app = initializeApp(firebaseConfig);

export const imageDB = getStorage(app)