const { collection, getDocs } = require('firebase/firestore');

function generateFishCatchMessage(name, fish, emoji, value, enchantments) {
    const uniqueSuffixes = [
        "whoa!", "nice catch!", "amazing!", "incredible!", "what a big one!",
        "lucky catch!", "wow!", "Holy mackerel!", "Holy moly!", ":3",
        "that's a keeper!", "the fish of your dreams!"
    ];

    // Random suffix selection
    const randomSuffix = uniqueSuffixes[Math.floor(Math.random() * uniqueSuffixes.length)];

    // Build enchantments string using map and join
    const enchantmentsString = enchantments.length > 0 ? enchantments.map(e => e.name).join(" ") + " " : "";

    // Return the formatted message
    return `${name} caught a ${enchantmentsString}${fish} ${emoji} worth ${value} coins! ${randomSuffix}`;
}


async function getRandomFish(db) {
    fishList = await getCachedFish(db);
    const randomFish = fishList[Math.floor(Math.random() * fishList.length)];

    return randomFish;
}


let cachedEnchantments = null;

async function fetchAndCacheEnchantments(db) {
    const querySnapshot = await getDocs(collection(db, 'enchantments'));
    const enchantments = querySnapshot.docs.map(doc => doc.data());

    cachedEnchantments = enchantments;
}

async function getCachedEnchantments(db) {
    if (!cachedEnchantments) {
        await fetchAndCacheEnchantments(db);
    }
    return cachedEnchantments;
}


let cachedFish = null;

async function fetchAndCacheFish(db) {
    const querySnapshot = await getDocs(collection(db, 'fish'));
    const fish = querySnapshot.docs.map(doc => doc.data());

    cachedFish = fish;
}

async function getCachedFish(db) {
    if (!cachedFish) {
        await fetchAndCacheFish(db);
    }
    return cachedFish;
}

// Function for retriving a random list of enchantments
async function getRandomEnchantments(db) {
    const cachedEnchantments = await getCachedEnchantments(db);
    const randomEnchantments = cachedEnchantments.sort(() => 0.5 - Math.random()).slice(0, 3);

    const resultEnchantments = [];

    // Loop through the random enchantments and check the odds
    for (let i = 0; i < randomEnchantments.length; i++) {
        const enchant = randomEnchantments[i];
        const roll = Math.random(); // Roll a random number between 0 and 1
        // If the roll is less than or equal to the enchantment's odds, add it to the result list
        if (roll <= enchant.odds) {
            resultEnchantments.push(enchant);
        }
    }
    

    return resultEnchantments;
}

// Based on the basePrice and a list of enchantments. Calculate the total value of the fish
async function calculateFishValue(basePrice, enchantments) {
    // Calculate total value by applying each enchantment multiplier to the base price.
    const totalValue = enchantments.reduce((acc, enchantment) => {
        // Apply multiplier for each enchantment.
        return acc * enchantment.multiplier;
    }, basePrice);

    // Return the rounded total value.
    return Math.round(totalValue);
}

async function fish(db) {
    fishList = await getCachedFish(db);
    const randomFish = await getRandomFish(db)
    const enchantments = await getRandomEnchantments(db);
    const value = await calculateFishValue(randomFish.basePrice, enchantments);
    const message = generateFishCatchMessage("Player", randomFish.name, randomFish.emoji, value, enchantments);
    return message;
}

module.exports = { fish };