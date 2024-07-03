const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');


const User = require('../models/User') // require the User model here
const Group = require('../models/Group')
const Challenge = require('../models/Challenge')
const Post = require('../models/Post');
const { default: mongoose } = require('mongoose');

const jwt = require('jsonwebtoken');

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: "eu-north-1"
});




const s3 = new AWS.S3();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file size to 5MB

  },
});


router.post('/login', upload.single('file'), async (req, res) => {
  const { email, password } = req.body;

  //Todo: unique email

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ message: 'Invalid username or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).send({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ _id: user._id }, 'your_jwt_secret');
    res.send({ token, user });


  } catch (err) {
    res.status(500)
  } 
  });

router.post('/register', async (req, res) => {
  const { name, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    level: 0,
    image: "",
    password: hashedPassword,
    type: "registered",
    image: "stub",
  });
  await user.save();

  res.status(201).send({ message: 'User registered successfully' });
});


router.get('/profile', async (req, res) => {
  const { userId } = req.query;

  const posts = await Post.find({ user: userId }).sort({ timestamp: -1 });
  const user = await User.findById(userId);
  res.send({ posts, user });
});


module.exports = router;