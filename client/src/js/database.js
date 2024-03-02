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
  console.log('Put request to the database', content);

  // Create a connection to the database and version
  const jateDB = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privleges
  const tx = jateDB.transaction('jate', 'readwrite');

  // Open the desired object store
  const store = tx.objectStore('jate');

  // Use the .put() method to update the data in the database
  const request = store.put(content);

  // Confirmation of the request
  const result = await request;
  console.log('Data updated to the database', result);
};
//console.error('putDb not implemented');

// Gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database and version
  const jateDB = await openDB('jate', 1);

  // Create a new transcation and specify the database and data privileges
  const tx = jateDB.transaction('jate', 'readonly');

  // Open up the desired object store
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database
  const request = store.getAll();

  // Confirmation of the request
  const result = await request;
  console.log('result.value', result);
  return result;
  // console.error('getDb not implemented');
};

initdb();
