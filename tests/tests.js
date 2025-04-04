const request = require('supertest');
const express = require('express');
const routes = require("../routes");
const app = express();
const db_players = require("../prisma_queries/players");

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
 
  // get player from session id
  app.use("/players/:session_id", routes.player);
  const player = {
    id: 'un-id-para-borrar-luego',
    playername: 'ANONIMOUS',
    sessionId: 'qRECfqN7xKS9oRTWWKdgxZYIaE3XoCRP'
  }
  /*  VER LUEGO COMO HACER TEST CUANDO HAY PARAMETROS
  request (app)
  .get('/players/qRECfqN7xKS9oRTWWKdgxZYIaE3XoCRP')
  .expect('Content-Type', /json/)
  .expect( async function (req,res) {
    let { session_id } = req.params;
    let player = await db_players.getFromSessionId(session_id);
    res.body = {player:player};
  })
  .expect(200, { player: player })
  .end(function(err, res) {
    if (err) throw err;
  }); */