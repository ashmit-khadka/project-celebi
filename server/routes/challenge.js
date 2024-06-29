const express = require('express');
const router = express.Router();


const Challenge = require('../models/Challenge')

router.get('/get', async (req, res) => {
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


module.exports = router;