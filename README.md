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

