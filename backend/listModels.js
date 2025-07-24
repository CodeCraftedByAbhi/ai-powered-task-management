// listModels.js
const axios = require('axios');
require('dotenv').config();

const listModels = async () => {
  try {
    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );
    console.log(response.data);
  } catch (err) {
    console.error('Error listing models:', err.response?.data || err.message);
  }
};

listModels();
