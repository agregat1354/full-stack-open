require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = 4000;
const SECRET = process.env.SECRET;
module.exports = { MONGODB_URI, PORT, SECRET };
