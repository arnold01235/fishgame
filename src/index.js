const express = require('express');
const firebaseConfig = require('./config/firebaseConfig');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());


app.get('/fish', async (req, res) => {
    res.send("hello world");
});

// Health check endpoint that checks Firestore connection
app.get('/healthdb', (req, res) => {
    if (db) {
        res.status(200).json({ status: 'OK', message: 'Firestore is connected' });
    } else {
        res.status(500).json({ error: "Failed to connect to Firestore" });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Service is running' });
});

// Test endpoint to fetch data from Firestore
app.get('/test', async (req, res) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'test')); 
        let data = [];
        querySnapshot.forEach(doc => {
            data.push(doc.data());
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
