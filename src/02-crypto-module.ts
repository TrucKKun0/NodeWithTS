import crypto from "node:crypto";

//built-in nodejs module
//sercurity and cryptography related functionality
//creating random UUIDS,hashing data,creating tokens,to verify data changed or not,encrypting and decrypting data

const requestId = crypto.randomUUID(); //generates a random UUID
console.log(requestId);

//crypto.randomBytes() -> generates a random sequence of bytes
//secret token
//password reset token, email verification token, etc
const resetToken = crypto.randomBytes(32).toString("hex"); //generates a random sequence of bytes and converts it to a hex string


//crypto.createHash()

const text = "hello world";

const hash = crypto.createHash("sha256").update(text).digest("hex"); 
//creates a hash of the text using sha256 algorithm and converts it to a hex string
console.log(hash);  

//crypto.createHmac()
//data + secret Key -> hash

const secretKey = "my-secret-key";
const data = "hello world";

const hmac = crypto.createHmac("sha256", secretKey).update(data).digest("hex");
console.log(hmac); 
//creates a hash of the data using sha256 algorithm and secret key and converts it to a hex string

const hmacVerify = crypto.createHmac("sha256",secretKey).update(data).digest("hex");

if (hmac === hmacVerify) {
    console.log("Data is verified");
}