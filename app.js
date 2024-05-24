// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: ",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


async function registerUser(username, password) {
    try {
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.message);
        } else {
            const error = await response.json();
            throw new Error(error.error);
        }
    } catch (error) {
        console.error("Registration failed: ", error.message);
    }
}

async function getCustomToken(username, password) {
    const response = await fetch('http://localhost:5000/get_custom_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        const data = await response.json();
        return data.token;
    } else {
        const error = await response.json();
        throw new Error(error.error);
    }
}

async function authenticate(username, password) {
    try {
        await registerUser(username, password); // Register the user first
        const customToken = await getCustomToken(username, password);
        await signInWithCustomToken(customToken);
    } catch (error) {
        console.error("Authentication failed: ", error.message);
    }
}

async function signInWithCustomToken(customToken) {
    try {
        const userCredential = await firebase.auth().signInWithCustomToken(customToken);
        console.log("User signed in: ", userCredential.user);
        // You can now use the authenticated user information
    } catch (error) {
        console.error("Error signing in: ", error.code, error.message);
    }
}

// Example usage
const username = "user1";
const password = "password123";
authenticate(username, password);
