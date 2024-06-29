const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');


const port = 5000;

const Challenge = require('./models/Challenge')
const Group = require('./models/Group')
const Post = require('./models/Post')
const User = require('./models/User')

const setupRoutes = require('./routes/setup');
const postRoutes = require('./routes/post');
const groupRoutes = require('./routes/group');
const userRoutes = require('./routes/user');
const challengeRoutes = require('./routes/challenge');

mongoose.connect('mongodb://localhost/celebi', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/challanges', async (req, res) => {
    const challenge = new Challenge({
      title: 'req.body.title',
      description: 'req.body.description',
    });
  
    try {
      await challenge.save();
      res.send(challenge);
    } catch (err) {
      res.status(500).send(err);
    }
});

app.get('/challenges', async (req, res) => {
    try {
      const challenges = await Challenge.find();
      res.send(challenges);
    } catch (err) {
      res.status(500).send(err);
    }
  });



  const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

  
  
  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: "celebi-kcl",
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
  });

  app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded to S3');
  });
  

  app.get('/groups', async (req, res) => {
    try {
      const groups = await Group.find();
      res.send(groups);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.get('/group/posts', async (req, res) => {
      const group = await Group.findById(req.query.id);
      const posts = await Post.find({ groups: req.query.id }).populate('user').sort({ timestamp: -1 });
      res.send({info: group, posts});

  });

  app.get('/group/users', async (req, res) => {
    if (!group) {
      return res.status(404).send({ message: 'Group not found' });
    }
    
    const usersWithLikes = await Promise.all(group.users.map(async (user) => {
      const totalLikes = await Post.aggregate([
        { $match: { user: user._id } },
        { $group: { _id: null, total: { $sum: '$likes' } } },
      ]);
    
      return {
        ...user._doc,
        totalLikes: totalLikes.length > 0 ? totalLikes[0].total : 0,
      };
    }));
    
    res.send(usersWithLikes);
  });

  app.get('/posts', async (req, res) => {
    try {
      const posts = await Post.find();
      res.send(posts);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // app.post('/post/like', async (req, res) => {
  //   try {
  //     const post = await Post.findOneAndUpdate(
  //       { _id: req.query.id },
  //       { $inc: { likes: 1 } },
  //       { new: true }
  //     );
  //     if (!post) {
  //       return res.status(404).send({ message: 'Post not found' });
  //     }
  //     res.send(post);
  //   } catch (err) {
  //     res.status(500).send(err);
  //   }
  // });

app.get('/getUserMock', async (req, res) => {
  try {
    const user = await User.findOne(); // This gets the first user in the collection
    if (!user) {
      return res.status(404).send({ message: 'No users found' });
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});


app.use('/setup', setupRoutes);
app.use('/post', postRoutes);
app.use('/group', groupRoutes);
app.use('/user', userRoutes);
app.use('/challenge', challengeRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://192.168.0.31:${port}`);
});