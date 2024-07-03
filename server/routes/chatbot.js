const express = require('express');
const router = express.Router();
const { chat, challangeMe }  = require('../utils/reggie');

// Endpoint to start a conversation
router.post('/start', async (req, res) => {
  const { message, conversation } = req.body;

  try {
    const response = await chat(message, conversation)

    res.json({ message: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// Endpoint to start a conversation
router.post('/challenge', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await challangeMe(prompt)

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});



module.exports = router;