export const  generateObjectId = () => {
    const timestamp = Math.floor(Date.now() / 1000).toString(16); // 4-byte timestamp
    const randomBytes = [...Array(5)].map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(''); // 5-byte random value
    const counter = (Math.floor(Math.random() * 16777215)).toString(16).padStart(6, '0'); // 3-byte incrementing counter
  
    return timestamp + randomBytes + counter; // Concatenate parts
}