// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { toast } from 'react-toastify';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAaLq4KCs7BnkO1eHPPOZa0yMOl1z8EbVs',
  authDomain: 'fir-course-84efc.firebaseapp.com',
  projectId: 'fir-course-84efc',
  storageBucket: 'fir-course-84efc.firebasestorage.app',
  messagingSenderId: '1094107289310',
  appId: '1:1094107289310:web:1590b29f862d07ae3f544f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const register = async (name, email, password) => {
  try {
    // Исправлено: передаём только email и password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email, // Первый параметр - email
      password // Второй параметр - password
    );

    const currentUser = userCredential.user;

    // Добавляем дополнительную информацию в Firestore
    await addDoc(collection(db, 'users'), {
      // Лучше использовать 'users' вместо 'user'
      uid: currentUser.uid,
      name,
      email,
      authProvider: 'local',
      createdAt: new Date(), // Добавляем дату создания
    });
  } catch (error) {
    console.error('Ошибка регистрации:', error.message);
    toast.error(error.code.split('/')[1].split('-').join(' '));
    throw error; // Пробрасываем ошибку для обработки в компоненте
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

const logout = async () => {
  await signOut(auth);
};

export { auth, db, register, login, logout };
