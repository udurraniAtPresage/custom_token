import hashlib
from firebase_admin import auth

# Mock database
user_db = {}

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def register_user(username, password):
    if username in user_db:
        raise ValueError("Username already exists")
    hashed_password = hash_password(password)
    user_db[username] = hashed_password
    print(f"User {username} registered successfully")

def authenticate_user(username, password):
    hashed_password = hash_password(password)
    stored_password = user_db.get(username)
    if stored_password and stored_password == hashed_password:
        return True
    return False

def generate_custom_token(uid):
    custom_token = auth.create_custom_token(uid)
    return custom_token
