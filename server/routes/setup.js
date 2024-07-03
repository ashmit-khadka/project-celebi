const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/User') // require the User model here
const Group = require('../models/Group')
const Challenge = require('../models/Challenge')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const Notification = require('../models/Notification')

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const posts = [
    {
        title: 'One Month, Zero Plastic: How I Did It!',
        image: 'https://picsum.photos/200/300',
        challenge: 'Avoid using single-use plastics for a month',
    },
    {
        title: 'Lights Out: Living With Solar Power Only',
        image: 'https://picsum.photos/200/300',
        challenge: 'Use only solar-generated electricity for a week',
    },
    {
        title: 'From Lawn to Lunch: My Backyard Garden Success',
        image: 'https://picsum.photos/200/300',
        challenge: 'Convert a portion of your yard into a vegetable garden',
    },
    {
        title: '100 Miles Biked: Cutting Carbon, Boosting Health',
        image: 'https://picsum.photos/200/300',
        challenge: 'Bike 100 miles in one month instead of driving',
    },
    {
        title: 'The Water-Saving Challenge: 30 Days, 30 Ways',
        image: 'https://picsum.photos/200/300',
        challenge: 'Implement a new water-saving technique each day for a month',
    },
    {
        title: 'Going Paperless: My Month Without Waste',
        image: 'https://picsum.photos/200/300',
        challenge: 'Eliminate the use of paper products for a month',
    },
    {
        title: 'Localvore for a Month: Eating Within 100 Miles',
        image: 'https://picsum.photos/200/300',
        challenge: 'Eat only food sourced within 100 miles of your home for a month',
    },
    {
        title: 'Upcycle It! Turning Trash into Treasure',
        image: 'https://picsum.photos/200/300',
        challenge: 'Create five useful items from materials you would have thrown away',
    },
    {
        title: 'Compost Queen: My Journey to Zero Food Waste',
        image: 'https://picsum.photos/200/300',
        challenge: 'Set up and maintain a compost system for all food waste',
    },
    {
        title: 'Walk the Talk: 500,000 Steps for Sustainability',
        image: 'https://picsum.photos/200/300',
        challenge: 'Walk 500,000 steps in a month to reduce reliance on vehicular transport',
    },
    {
        title: 'Sustainable Fashion Challenge: Thrift and Tell',
        image: 'https://picsum.photos/200/300',
        challenge: 'Purchase only second-hand clothes for a season',
    },
    {
        title: 'Digital Detox: Reducing Electronic Waste',
        image: 'https://picsum.photos/200/300',
        challenge: 'An image of a person reading a book in a garden, with electronic devices turned off and stashed away',
    },
    {
        title: 'Plant-Powered Week: Discovering Vegan Living"',
        image: 'https://picsum.photos/200/300',
        challenge: 'Eat a completely plant-based diet for a week',
    },
    {
        title: 'Sustainable Transport Rally: Carpool Champion',
        image: 'https://picsum.photos/200/300',
        challenge: 'Organize a carpool system in your workplace or community',
    },
    {
        title: 'Eco-Friendly Cleaning: Natural Solutions Only',
        image: 'https://picsum.photos/200/300',
        challenge: 'Use only homemade or natural cleaning products for a month',
    },
    {
        title: 'Renewable Day: Powered by the Sun',
        image: 'https://picsum.photos/200/300',
        challenge: 'Power your home using only renewable energy for a day',
    },
    {
        title: 'Building Bird Sanctuaries: Biodiversity in My Backyard',
        image: 'https://picsum.photos/200/300',
        challenge: 'Create habitats for wildlife in your yard',
    },
    {
        title: 'Unplugged: 24 Hours Off the Grid',
        image: 'https://picsum.photos/200/300',
        challenge: 'Spend 24 hours without using any electricity',
    },
    {
        title: 'Green Reads: Educating Myself on Environmental Issues',
        image: 'https://picsum.photos/200/300',
        challenge: 'Read one book or watch one documentary about sustainability each week for a month',
    },
    {
        title: 'Zero Waste Hero: One Month Challenge',
        image: 'https://picsum.photos/200/300',
        challenge: 'Produce less than one jar of non-recyclable waste in a month',
    }
]

router.get('/create', async (req, res) => {

    //clear data
    await User.deleteMany({});
    await Challenge.deleteMany({});
    await Group.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    await Notification.deleteMany({});

    //create users
    const user_1 = new User({
        name: 'Ashmit Khadka',
        level: 14,
        image: "https://celebi-kcl.s3.eu-north-1.amazonaws.com/users/mocks/user_5.png",
        email: "ashmit.khadka@mail.com",
        password: await bcrypt.hash("1234", 10),
        type: "registered",
        bio: "I am a sustainability enthusiast and a student at King's College London. I am passionate about making a positive impact on the planet and inspiring others to do the same. Let's work together to create a greener, healthier future!",
    });

    const user_2 = new User({
        name: 'John Doe',
        level: 10,
        image: "https://celebi-kcl.s3.eu-north-1.amazonaws.com/users/mocks/user_2.png",
        email: "john.doe@mail.com",
        password: await bcrypt.hash("1234", 10),
        type: "registered",
        bio: "I am a sustainability enthusiast and a student at King's College London. I am passionate about making a positive impact on the planet and inspiring others to do the same. Let's work together to create a greener, healthier future!",
    });

    const user_3 = new User({
        name: 'Jane Doe',
        level: 7,
        image: "https://celebi-kcl.s3.eu-north-1.amazonaws.com/users/mocks/user_3.png",
        email: "jane.doe@mail.com",
        password: await bcrypt.hash("1234", 10),
        type: "registered",
        bio: "I am a sustainability enthusiast and a student at King's College London. I am passionate about making a positive impact on the planet and inspiring others to do the same. Let's work together to create a greener, healthier future!",
    });

    const user_4 = new User({
        name: 'Alice Doe',
        level: 5,
        image: "https://celebi-kcl.s3.eu-north-1.amazonaws.com/users/mocks/user_4.png",
        email: "alice.doe@mail.com",
        password: await bcrypt.hash("1234", 10),
        type: "registered",
        bio: "I am a sustainability enthusiast and a student at King's College London. I am passionate about making a positive impact on the planet and inspiring others to do the same. Let's work together to create a greener, healthier future!",
    });

    const user_5 = new User({
        name: 'Netelia Doe',
        level: 3,
        image: "https://celebi-kcl.s3.eu-north-1.amazonaws.com/users/mocks/user_1.png",
        email: "natelia.doe@mail.com",
        password: await bcrypt.hash("1234", 10),
        type: "registered",
        bio: "I am a sustainability enthusiast and a student at King's College London. I am passionate about making a positive impact on the planet and inspiring others to do the same. Let's work together to create a greener, healthier future!",
    });


    const { _id: user_1_id } = await user_1.save();
    const { _id: user_2_id } = await user_2.save();
    const { _id: user_3_id } = await user_3.save();
    const { _id: user_4_id } = await user_4.save();
    const { _id: user_5_id } = await user_5.save();

    //create challenges

    const challenge_1 = new Challenge({
        title: "Reduce Paper Waste",
        description: "Cut down on paper usage by taking digital notes, printing only when necessary, and recycling paper to support SDG 12.",
        image: "https://celebi-kcl.s3.eu-north-1.amazonaws.com/challenges/mocks/challenge_1.png",
        user: user_1_id,
        points: 20,
        created: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        impact: "Reducing energy consumption in a challenge promotes sustainability, lowers costs, reduces carbon footprint, and fosters eco-conscious behavior globally",
    });

    const challenge_2 = new Challenge({
        title: "Promote Biodiversity",
        description: "Contribute to biodiversity conservation by planting native plants, creating green spaces, and supporting wildlife habitats for SDG 15.",
        image: "https://celebi-kcl.s3.eu-north-1.amazonaws.com/challenges/mocks/challenge_2.png",
        user: user_1_id,
        points: 40,
        created: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        impact: "Promoting biodiversity helps maintain ecosystems, supports food security, and protects endangered species and habitats"
    });

    const challenge_3 = new Challenge({
        title: "Reduce Water Consumption",
        description: "Save water by using it wisely, fixing leaks, and opting for water-efficient appliances to help achieve SDG 6.",
        image: "https://celebi-kcl.s3.eu-north-1.amazonaws.com/challenges/mocks/challenge_3.png",
        user: user_2_id,
        points: 25,
        created: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        impact: "Reducing water consumption conserves natural resources, lowers utility bills, and protects water quality for future generations"
    });

    const challenge_4 = new Challenge({
        title: "Encourage Sustainable Eating",
        description: "Support sustainable food choices like plant-based meals, local produce, and reducing food waste to advance SDG 2.",
        image: "https://celebi-kcl.s3.eu-north-1.amazonaws.com/challenges/mocks/challenge_4.png",
        user: user_2_id,
        points: 20,
        created: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        impact: "Promoting sustainable eating habits helps reduce greenhouse gas emissions, conserve natural resources, and improve public health"
    });


    const { _id: challenge_1_id } = await challenge_1.save();
    const { _id: challenge_2_id } = await challenge_2.save();
    const { _id: challenge_3_id } = await challenge_3.save();
    const { _id: challenge_4_id } = await challenge_4.save();


    //create groups
    const group_1 = new Group({
        name: "King's College London",
        users: [user_1_id, user_2_id, user_3_id, user_4_id, user_5_id],
        image: "https://celebi-kcl.s3.eu-north-1.amazonaws.com/groups/mocks/group_1.png",
        description: "A group for students and staff at King's College London to share sustainability tips and challenges.",
        owner: user_1_id,
        interval: 7,
        created: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    });

    const group_2 = new Group({
        name: "Google",
        users: [user_1_id, user_2_id, user_3_id, user_4_id, user_5_id],
        image: "https://celebi-kcl.s3.eu-north-1.amazonaws.com/groups/mocks/group_2.png",
        description: "A group for Google employees to collaborate on sustainability initiatives and challenges.",
        owner: user_2_id,
        interval: 7,
        created: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    });

    const group_3 = new Group({
        name: 'Eco Squad',
        users: [user_1_id, user_2_id, user_3_id, user_4_id, user_5_id],
        image: "https://celebi-kcl.s3.eu-north-1.amazonaws.com/groups/mocks/group_3.png",
        description: "A group of eco-conscious individuals working together to make a positive impact on the planet.",
        owner: user_3_id,
        interval: 7,
        created: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    });

    const { _id: group_1_id } = await group_1.save();
    const { _id: group_2_id } = await group_2.save();
    const { _id: group_3_id } = await group_3.save();



    res.send({ message: 'Data created successfully' });


    //create posts
    const userIds = [user_1_id, user_2_id, user_3_id, user_4_id, user_5_id]
    // Create 20 posts
    for (let i = 1; i < 20; i++) {
        const post = new Post({
            title: posts[i].title,
            likes: [],
            groups: [group_1_id, group_2_id],
            user: userIds[i % userIds.length], // Cycle through the user IDs
            challenge: challenge_1_id, // Replace with actual logic for assigning challenges
            image: `https://celebi-kcl.s3.eu-north-1.amazonaws.com/posts/mocks/pattern.svg`,
            timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
            comments: [],
        });

        await post.save();
    }

});



module.exports = router;