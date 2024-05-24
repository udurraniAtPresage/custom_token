from flask import Flask, request, jsonify
from flask_cors import CORS
from firebase_admin_setup import initialize_firebase_admin
from auth_utils import authenticate_user, generate_custom_token, register_user

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
initialize_firebase_admin()

@app.route('/get_custom_token', methods=['POST'])
def get_custom_token():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    print(f"Received login attempt for user: {username}")

    if authenticate_user(username, password):
        uid = username  # Use username as uid
        token = generate_custom_token(uid)
        print(f"Generated custom token for user: {username}")
        return jsonify({'token': token})
    else:
        print("Authentication failed for user: ", username)
        return jsonify({'error': 'Authentication failed'}), 401

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    try:
        register_user(username, password)
        print(f"User {username} registered successfully")
        return jsonify({'message': 'User registered successfully'})
    except ValueError as e:
        print(e)
        return jsonify({'error': str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
