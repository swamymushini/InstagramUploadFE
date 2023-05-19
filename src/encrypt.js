const encodedText = 'SGVsbG8sIHdvcmxkIQ==';
const decodedText = Buffer.from(encodedText, 'base64').toString('utf8');
console.log(decodedText); 
