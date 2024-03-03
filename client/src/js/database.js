import { openDB } from 'idb';

const initdb = async () =>
  // Creating a new database named 'jate' that will be using version 1 of the database
  openDB('jate', 1, {
    // Add database schema if it has not already been initialized
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create a new object store for the data and give it a key name of 'id' that needs to increment automatically
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
  
// Accepts content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Create a connection to the database and version
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privleges
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open the desired object store
  const store = tx.objectStore('jate');

  // Use the .put() method to update the data in the database
  const request = store.put({ id: 1, value: content });

  // Confirmation of the request
  const result = await request;
  console.log('Data saved to the database', result.value);
};

// Get all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database and version
  const jateDb = await openDB('jate', 1);

  // Create a new transcation and specify the database and data privileges
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store
  const store = tx.objectStore('jate');

  // Use the .get() method to get all data in the database
  const request = store.get(1);

  // Confirmation of the request
  const result = await request;
  result
    ? console.log('Data retrieved from the database', result.value)
    : console.log('Data not found in the database');
  return result?.value;
};

initdb();
