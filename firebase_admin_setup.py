import firebase_admin
from firebase_admin import credentials

def initialize_firebase_admin():
  # Path to your service account key file
  cred = credentials.Certificate('myJSONfile.json')
  firebase_admin.initialize_app(cred)
