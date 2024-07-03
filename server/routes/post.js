const express = require('express');
const router = express.Router();

const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');


const User = require('../models/User') // require the User model here
const Group = require('../models/Group')
const Challenge = require('../models/Challenge')
const Post = require('../models/Post');
const { default: mongoose } = require('mongoose');
const Comment = require('../models/Comment');
const Like = require('../models/Like');
const Notification = require('../models/Notification');
require('dotenv').config();

AWS.config.update({
  accessKeyId: "AKIAW3MEF3D347A2YX7N",
  secretAccessKey: "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",
  region: "eu-north-1"
});



const s3 = new AWS.S3();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file size to 5MB

  },
});


router.post('/upload', upload.single('file'), async (req, res) => {
  const params = {
    Bucket: "celebi-kcl",
    Key: req.file.originalname,
    Body: req.file.buffer,
    ACL: 'public-read' // Make file publicly readable

  };

  const user = await User.findOne(); // This gets the first user in the collection
  const groups = await Group.find(); // This gets all groups in the collection

  s3.upload(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error uploading file');
    }

    if (data) {
      console.log("Upload Success", data.Location);


      // data.Location is the URL of the uploaded file
      Post.create({
        image: data.Location,
        title: req.body.title,
        description: req.body.description,
        likes: [],
        comments: [],
        user: user._id,
        challenge: new mongoose.Types.ObjectId("6675bf0bc69192b7de20f0dd"),
        groups: groups.map(group => group._id), // Use the _id of each group
        timestamp: new Date(),
      });
      res.send('File uploaded successfully');

    }


  });
});


router.get('/get', async (req, res) => {
  const { id } = req.query;

    const post = await Post.findById(id)
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          model: User
        }
      })
      .populate('likes');
    res.send(post);


});


router.post('/comment', async (req, res) => {
  const { postId, text, userId } = req.body;


  const comment = await Comment.create({
    text,
    user: userId,
    post: postId,
    timestamp: new Date(),
  });

  const post = await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } }, { new: true })
    .populate({ path: 'comments', options: { sort: { 'timestamp': -1 } }, populate: {
      path: 'user',
      model: User
    } })


  res.send(post);

})

router.get('/comments', async (req, res) => {
  const { postId } = req.query;

  const post = await Post.findById(postId).populate({
    path: 'comments',
    populate: {
      path: 'user',
      model: User
    }
  });


  res.send(post);

})

router.post('/like', async (req, res) => {
  const { postId, userId } = req.body;

  const like = await Like.findOne({ user: userId, post: postId });


  if (like) {
    // If the like object exists, remove it from the likes array of the post
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: like._id } },
      { new: true }
    );

    // Delete the like object
    await Like.findByIdAndDelete(like._id);
    res.send(updatedPost);

  }
  else {
    // create a new like object and add it to the likes array of the post
    const like = await Like.create({
      user: userId,
      post: postId,
      timestamp: new Date(),
    });

    const updatedPost = await Post.findByIdAndUpdate(postId, { $push: { likes: like._id } }, { new: true })
      .populate({ path: 'likes', options: { sort: { 'timestamp': -1 } } })

    // Create a notification
    const user = await User.findById(userId);

    const notification = await Notification.create({
      title: 'Someone liked your post!',
      text: `${user.name} liked your post ${updatedPost.title}`,
      action: {
        type: 'post',
        id: postId
      },
      user: user._id,
      timestamp: new Date(),
    });

    res.send(updatedPost);
  }

  

  router.post('/copy-challenge', async (req, res) => {

    const { challengeId, userId } = req.body;
  
    const challenge = await Challenge.findById(challengeId);

    const newChallenge = await Challenge.create({
      title: challenge.title,
      description: challenge.description,
      image: challenge.image,
      points: challenge.points,
      user: userId,
    });

    res.send(newChallenge);

  });



});

module.exports = router;