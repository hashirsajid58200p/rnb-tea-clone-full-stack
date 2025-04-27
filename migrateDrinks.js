import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import drinksData from './src/components/menu/drinksDataForMigration.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const firebaseConfig = {
  apiKey: "AIzaSyDY9o467LFW_x073OT9Ao9vaEQ4SIWpYpQ",
  authDomain: "tea-project-3a349.firebaseapp.com",
  projectId: "tea-project-3a349",
  storageBucket: "tea-project-3a349.firebasestorage.app",
  messagingSenderId: "750483220898",
  appId: "1:750483220898:web:fed7d86306a011edbb6afb"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

const migrateDrinks = async () => {
  try {
    for (const drink of drinksData) {
      const imageName = drink.image;
      const localImagePath = path.join(__dirname, 'src/assets/drinksMenu', imageName);
      
      // Construct the relative path to the image
      const imageRelativePath = `/src/assets/drinksMenu/${imageName}`;

      await db.collection('products').doc(drink.id).set({
        id: drink.id,
        name: drink.name,
        category: drink.category,
        image: imageRelativePath, // Store the local path instead of a Firebase Storage URL
        price: drink.price,
        description: drink.description,
      });
      console.log(`Added ${drink.name} to Firestore with local image path: ${imageRelativePath}`);
    }
    console.log('Migration complete!');
  } catch (error) {
    console.error('Error migrating drinks:', error);
  }
};

migrateDrinks();