// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const mongoose = require('mongoose');
const url = require('url');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: '/notifications' });
const  NotificationModel = require('../models/Notification');

wss.on('open', () => {
  console.log('Connected to WebSocket server');
});

wss.on('error', (error) => {
  console.error('WebSocket error:', error);
});

mongoose.connect('mongodb://localhost/celebi', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    const notificationSchema = new mongoose.Schema({}, { strict: false });
    //const Notification = mongoose.model('Notification', notificationSchema);

    wss.on('connection', (ws, req) => {
      const userId = url.parse(req.url, true).query.userId;


      const changeStream = NotificationModel.watch();

      changeStream.on('change', (change) => {
        // if (change.fullDocument.user.toString() !== userId) {
        //   return;
        // }
        if (ws.readyState === WebSocket.OPEN) {
          const notifications = NotificationModel.find({ user: userId });
          console.log('change..', notifications);
  
          ws.send(notifications);
        }
      });
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

server.listen(8080);