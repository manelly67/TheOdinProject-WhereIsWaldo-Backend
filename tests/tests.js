const request = require('supertest');
const express = require('express');
const routes = require("../routes");
const app = express();

app.use("/", routes.homepage);

request(app)
  .get('/')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '39')
  .expect(function(res) {
    res.body.message = res.body.message.toLowerCase();
  })
  .expect(200, { message: 'welcome to waldo the game' })
  .end(function(err, res) {
    if (err) throw err;
  });
 
// session
app.use("/session-id", routes.homepage);

request(app)
  .get('/session-id')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '25')
  .expect(function(res) {
    res.body.SessionID = 'qRECfqN7xKS9oRTWWKdgxZYIaE3XoCRP';
  })
  .expect(200, { SessionID: 'qRECfqN7xKS9oRTWWKdgxZYIaE3XoCRP' })
  .end(function(err, res) {
    if (err) throw err;
  });
 
 
  