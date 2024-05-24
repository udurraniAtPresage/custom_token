const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // You can choose any port number


const serviceAccount = require('./myJSONfile.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://myPROJECT.firebaseio.com' // Replace with your Firebase database URL
});


// Use body-parser to parse JSON request bodies
app.use(bodyParser.json());

// Authentication route
app.post('/authenticate', async (req, res) => {
  const { username, password } = req.body;

  // For testing purposes, accept any username/password combination
  // Replace this with your actual validation logic
  if (username && password) {
    try {
      // Generate a custom token using the Firebase Admin SDK
      const customToken = await admin.auth().createCustomToken(username);
      res.json({ customToken });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

