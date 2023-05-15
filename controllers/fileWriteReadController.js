const fs = require('fs');

// Define the file path where you want to store the JSON data
const filePath = '../public/data/cacheData.json';

// Function to read data from the JSON file
function readDataFromFile() {
    try {
        // Read the file and parse the contents as JSON
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (err) {
        // If the file doesn't exist or is empty, return an empty array
        return [];
    }
}

// Function to write data to the JSON file
function writeDataToFile(data) {
    // Convert the data to a JSON string
    const json = JSON.stringify(data);
    // Write the JSON string to the file
    fs.writeFileSync(filePath, json);
}

// Function to add a new object to the array
exports.addObject = (key, value) => {
    // Read the existing data from the file
    const data = readDataFromFile();
    // Create a new object with the provided key and value
    const newObj = { key: key, value: value };
    // Add the new object to the array
    data.push(newObj);
    // Write the updated data back to the file
    writeDataToFile(data);
}

// Function to delete an object from the array by key
exports.deleteObject = (key) => {
    // Read the existing data from the file
    const data = readDataFromFile();
    // Filter out the object with the provided key
    const filteredData = data.filter(obj => obj.key !== key);
    // Write the updated data back to the file
    writeDataToFile(filteredData);
}

// Function to read an object from the array by key
exports.readObjectByKey = (key) => {
    // Read the existing data from the file
    const data = readDataFromFile();
    // Find the object with the provided key
    const obj = data.find(obj => obj.key === key);
    // Return the object's value, or null if the key wasn't found
    return obj ? obj.value : null;
}
