# Fishgame
A simple fishgame API using Node.js and Firebase.

## Firebase Collection
The Fishgame uses a Firebase Firestore collection named `fish` to store information about each type of fish. Below are the details of the structure of this collection.

### `fish` Collection Structure
Each document in the `fish` collection represents a type of fish and has the following fields:

| Field          | Type               | Description                                                                |
|----------------|--------------------|----------------------------------------------------------------------------|
| `name`         | string             | The name of the fish, e.g., "Salmon".                                      |
| `basePrice`    | number             | The base price of the fish, which represents its value in the game.        |
| `emoji`        | string             | An emoji that represents the fish visually, e.g., "🐟" for a blue fish.    |

#### Example Document
```json
{
  "name": "Blue Gill",
  "basePrice": 50,
  "emoji": "🐟"
}
```

You can add new fish by creating documents with these fields in the `fish` collection using Firebase Firestore.

### `enchantments` Collection Structure
The Fishgame also uses a Firebase Firestore collection named `enchantments` to store information about each type of enchantment. Below are the details of the structure of this collection.

| Field          | Type               | Description                                                                |
|----------------|--------------------|----------------------------------------------------------------------------|
| `name`         | string             | The name of the enchantment, e.g., "Sparkling".                            |
| `multiplier`   | number             | A multiplier that affects the value of the fish when the enchantment is applied. |

#### Example Document
```json
{
  "name": "Sparkling",
  "multiplier": 1.5
}
```

You can add new enchantments by creating documents with these fields in the `enchantments` collection using Firebase Firestore.

## Installation
To set up the Fishgame API locally, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/fishgame.git
   cd fishgame
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed. Then run the following command to install all the necessary dependencies:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create an `.env` file in the root directory of your project with the following variables:
   ```env
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   FIREBASE_APP_ID=your_firebase_app_id
   ```
   Replace the values with your Firebase project credentials.

4. **Start the Application**
   To start the Node.js application, run:
   ```bash
   npm start
   ```

   The server should now be running, and you can interact with the Fishgame API.


