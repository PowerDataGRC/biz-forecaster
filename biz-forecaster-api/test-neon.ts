import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

async function testNeonConnection() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('Error: DATABASE_URL is not defined in your .env file.');
    process.exit(1);
  }

  console.log('Attempting to connect to Neon database via HTTP...');

  try {
    const sql = neon(databaseUrl);
    const [response] = await sql`SELECT NOW()`;
    console.log('\n✅ --- NEON CONNECTION SUCCESSFUL! --- ✅');
    console.log('Server time:', response.now);
  } catch (error) {
    console.error('\n❌ --- NEON CONNECTION FAILED --- ❌');
    console.error(error);
    }
}

testNeonConnection();