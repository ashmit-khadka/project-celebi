const express = require('express');
const router = express.Router();

const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');


const User = require('../models/User') // require the User model here
const Group = require('../models/Group')


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



router.get('/find', async (req, res) => {
  const { name } = req.query;

  try {
    const groups = await Group.find({ name: { $regex: name, $options: 'i' } });
    res.send(groups);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/create', upload.single('file'), async (req, res) => {
  const { userId } = req.query;

  const params = {
    Bucket: "celebi-kcl",
    Key: req.file.originalname,
    Body: req.file.buffer,
    ACL: 'public-read' // Make file publicly readable

  };

  //const user = await User.findOne(); // This gets the first user in the collection

  s3.upload(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error uploading file');
    }

    if (data) {
      console.log("Upload Success", data.Location);


      // data.Location is the URL of the uploaded file
      Group.create({
        image: data.Location,
        name: req.body.name,
        description: req.body.description,
        users: [userId],
        interval: req.body.interval,
        owner: userId,
        timestamp: new Date(),
      });
      res.send('File uploaded successfully');

    }


  });
});

router.get('/leave', async (req, res) => {
  const { group, user } = req.query;

  await Group.updateOne(
    { _id: group },
    { $pull: { users: user } }
  );

  res.send('User removed from group');

});


router.get('/join', async (req, res) => {
  const { group, user } = req.query;

  await Group.updateOne(
    { _id: group },
    { $push: { users: user } }
  );
  res.send('User joined group');

});

router.get('/delete', async (req, res) => {
  const { group } = req.query;

  //Todo: delete all posts in the group
  //Todo: delete if user is admin

  await Group.deleteOne({
    _id: group
  });
  res.send('Group deleted');

});

router.get('/get', async (req, res) => {
  const { userId } = req.query;

  const groups = await Group.find({
    users: { $in: [userId] }
  });


  res.send(groups);

});


router.get('/shortcut', async (req, res) => {
  const { userId } = req.query;

  try {
      const group = await Group.find({ users: { $in: [userId] } })
      .sort({ createdAt: -1 }) // Sort in descending order by createdAt
      .limit(1); // Limit to 1 document

    if (!group.length) return res.status(404).send('Group not found');
    res.send(group[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});



module.exports = router;