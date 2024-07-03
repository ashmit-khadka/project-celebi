const express = require('express');
const router = express.Router();


const Challenge = require('../models/Challenge')

router.get('/list', async (req, res) => {
    const { id } = req.query;

    try {
      const challenge = await Challenge.findById(id);
      if (!challenge) return res.status(404).send('Challenge not found');
      res.send(challenge);
    } catch (err) {
      res.status(500).send(err);
    }
  });


router.get('/delete', async (req, res) => {
    const { id } = req.query;

    try {
      const challenge = await Challenge.findByIdAndDelete(id);
      if (!challenge) return res.status(404).send('Challenge not found');
      res.send(challenge);
    } catch (err) {
      res.status(500).send(err);
    }
});

router.get('/shortcut', async (req, res) => {
  const { userId } = req.query;

  try {
    const challenge = await Challenge.find({ user: userId })
      .sort({ created: -1 }) // Sort in descending order by createdAt
      .limit(1); // Limit to 1 document

    if (!challenge.length) return res.status(404).send('Challenge not found');
    res.send(challenge[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/create', async (req, res) => {
  const { title, description, image, user, impact } = req.body;

  try {
    const challenge = new Challenge({
      title,
      description,
      image,
      user,
      impact,
    });

    await challenge.save();
    res.send(challenge);
  } catch (err) {
    res.status(500).send(err);
  }
});



module.exports = router;