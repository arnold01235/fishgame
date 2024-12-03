const { collection, getDocs } = require('firebase/firestore');

function generateFishCatchMessage(name, fish, value) {
    const uniqueSuffixes = [
        "whoa!",
        "nice catch!",
        "amazing!",
        "incredible!",
        "what a big one!",
        "lucky catch!",
        "wow!",
        "Holy mackerel!",
        "Holy moly!",
        ":3",
    ];

    const randomSuffix = uniqueSuffixes[Math.floor(Math.random() * uniqueSuffixes.length)];

    console.log("Random suffix:", randomSuffix);
    return `${name} caught a ${fish} worth ${value} coins! ${randomSuffix}`;
}

async function getRandomFish(db) {
    const querySnapshot = await getDocs(collection(db, 'fish'));

    if (querySnapshot.empty) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * querySnapshot.size);
    const randomDoc = querySnapshot.docs[randomIndex];
    return randomDoc.data();
}


let cachedEnchantments = null;

async function fetchAndCacheEnchantments(db) {
    const querySnapshot = await getDocs(collection(db, 'enchantments'));
    const enchantments = querySnapshot.docs.map(doc => doc.data());

    cachedEnchantments = enchantments;
    console.log("Enchantments cached:", enchantments);
}

async function getCachedEnchantments(db) {
    if (!cachedEnchantments) {
        await fetchAndCacheEnchantments(db);
    }
    
    console.log("Enchantments returned:", cachedEnchantments);
    return cachedEnchantments;
}


let cachedFish = null;

async function fetchAndCacheFish(db) {
    const querySnapshot = await getDocs(collection(db, 'fish'));
    const fish = querySnapshot.docs.map(doc => doc.data());

    cachedFish = fish;
    console.log("Fish cached:", fish);
}

async function getCachedFish(db) {
    if (!cachedFish) {
        await fetchAndCacheFish(db);
    }

    console.log("Fish returned:", cachedFish);
    return cachedFish;
}

async function fish(db) {
    fishList = await getCachedFish(db);
    console.log("Fish list:", fishList);
    const randomFish = fishList[Math.floor(Math.random() * fishList.length)];
    
    console.log("Random fish:", randomFish);
    const message = generateFishCatchMessage("Player", randomFish.name, randomFish.basePrice);
    return message;
}

module.exports = { fish };