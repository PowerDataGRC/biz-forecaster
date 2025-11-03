// clean-env.js
const fs = require('fs');
const path = require('path');

const envFilePath = path.resolve(__dirname, '.env');
const cleanedEnvFilePath = path.resolve(__dirname, '.env.cleaned');

console.log(`🔵 Reading from: ${envFilePath}`);

try {
    // Read the file, explicitly trying to handle potential BOMs by using 'utf8'
    const content = fs.readFileSync(envFilePath, 'utf8');

    // Process the content to be extra safe
    const lines = content.split(/\r?\n/); // Split by newline, handling both Windows and Unix line endings
    const cleanedLines = lines
        .map(line => line.trim()) // Trim whitespace from start and end of each line
        .filter(line => line); // Filter out any resulting empty lines

    if (cleanedLines.length === 0) {
        console.error('🔴 ERROR: No content lines found in the .env file after trimming.');
        console.log('   Please ensure your .env file is not empty.');
        return;
    }

    const cleanedContent = cleanedLines.join('\n');

    // Write the cleaned content to a new file with guaranteed UTF-8 encoding
    fs.writeFileSync(cleanedEnvFilePath, cleanedContent, { encoding: 'utf8' });

    console.log(`✅ SUCCESS: Cleaned content has been written to .env.cleaned`);
    console.log('\nNext steps:');
    console.log('1. Rename your original `.env` file to `.env.bak` (as a backup).');
    console.log('2. Rename the new `.env.cleaned` file to just `.env`.');
    console.log('3. Run `node test-db.js` again to verify the fix.');

} catch (error) {
    console.error('🔴 FAILED: An error occurred while trying to clean the .env file.');
    console.error('   Error details:', error.message);
}
