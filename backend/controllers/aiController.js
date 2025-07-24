// controllers/aiController.js
const axios = require('axios');

exports.categorizeTask = async (req, res) => {
  const { task } = req.body;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          {
            role: 'system',
            content: 'You are a smart assistant. Categorize tasks into one of: Work, Health, Finance, Education, Personal, Misc.'
          },
          {
            role: 'user',
            content: `Task: ${task}`
          }
        ],
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',  // or your deployed frontend URL
          'X-Title': 'MERN AI Task Assistant'
        }
      }
    );

    const category = response.data.choices[0].message.content.trim();
    res.json({ category });

  } catch (error) {
    console.error('OpenRouter error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get AI response from OpenRouter' });
  }
};

exports.getTaskSuggestions = async (req, res) => {
  const prompt = req.body.prompt || 'Give me 3 productivity-related tasks I can complete today.';

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          {
            role: 'system',
            content: 'You are a productivity coach assistant.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'MERN AI Task Assistant'
        }
      }
    );

    const suggestions = response.data.choices[0].message.content.trim();
    res.json({ suggestions });

  } catch (error) {
    console.error('AI suggestion error:', error.response?.data || error.message);
    res.status(500).json({ error: 'AI task suggestion failed' });
  }
};

