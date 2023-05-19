import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const encryptedKey = process.env.ENCRYPTED_KEY;
const passphrase = 'mysalt123'; // Use the same passphrase/secret key used during encryption

const decipher = crypto.createDecipher('aes-256-cbc', passphrase);
let decryptedKey = decipher.update(encryptedKey, 'hex', 'utf8');
decryptedKey += decipher.final('utf8');

console.log(decryptedKey);
