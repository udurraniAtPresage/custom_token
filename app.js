// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Function to authenticate with the server and sign in with Firebase
async function signInWithUsernameAndPassword(username, password) {
  try {
    // Send the username and password to your server to get a custom token
    const response = await fetch('http://localhost:3000/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      // Sign in with the custom token
      const userCredential = await auth.signInWithCustomToken(data.customToken);
      const user = userCredential.user;
      console.log('User signed in:', user);
    } else {
      console.error('Error:', data.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('authForm');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = form.username.value;
    const password = form.password.value;

    signInWithUsernameAndPassword(username, password);
  });
});
