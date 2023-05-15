const Heap = require('../lib/heapStructure');
const MAX_CACHE_SIZE = 250;
const cacheBoard = new Heap(MAX_CACHE_SIZE);

// Define a function to retrieve data from the cache
exports.getFromCache = (key) => {
    const node = cacheBoard.search(key);
    if (node) {
        return node.value;
    }
    return null;
};

// Define a function to store data in the cache
exports.storeInCache = (key, value) => {
    cacheBoard.deleteIfGreater();
    cacheBoard.deleteByKey(key); //Delete the old value again
    cacheBoard.insert(key,value); // Insert the new value into the cache
    return true;
};

//For logging the cache data
exports.showCacheData = () => {
    return cacheBoard.showHeap();
}

//For deleting data from the cache data
exports.deleteItem = (key) => {
    return cacheBoard.deleteByKey(key);
}

//For searching data inside cache memory
exports.findData = (key) => {
    return cacheBoard.search(key);
}