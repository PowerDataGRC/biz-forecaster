// test-db.js
const { Pool } = require('pg');
require('dotenv').config(); // Make sure to read the .env file

// Get the database URL from your .env file
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('Error: DATABASE_URL is not defined in your .env file.');
  process.exit(1);
}

console.log('Attempting to connect to the database...');
console.log('Using connection string from .env file.');

const pool = new Pool({
  connectionString: connectionString,
  // Use the exact same SSL configuration as your app
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('--- CONNECTION FAILED ---');
    console.error('An error occurred while connecting to the database:');
    console.error('Error Code:', err.code);
    console.error('Error Message:', err.message);
    console.error('\nTroubleshooting steps:');
    console.error('1. Verify the DATABASE_URL in your .env file is 100% correct (user, password, host, port, dbname).');
    console.error('2. Check your database provider (Vercel, Neon, etc.) to ensure your current IP address is whitelisted.');
    console.error('3. Ensure the database server is running and accessible.');
    pool.end();
    process.exit(1);
  }

  console.log('\n✅ --- CONNECTION SUCCESSFUL! --- ✅');
  console.log('Successfully connected to the PostgreSQL database.');
  
  // Release the client back to the pool and end the pool
  release();
  pool.end();
});
