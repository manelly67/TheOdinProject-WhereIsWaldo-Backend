const { v4: uuidv4 } = require("uuid");
const { isPast } = require("date-fns");
const { intervalToDuration } = require("date-fns");
const _ = require("lodash");

const db_games = require("../prisma_queries/game");
const db_pictures = require("../prisma_queries/pictures");
const db_sessions = require("../prisma_queries/session");

async function newGameGet(req, res) {
  // if player has active game - return the active game
  const { img_id, player_id } = req.params;
  console.log(img_id);
  const [game] = await db_games.getActiveByImgAndPlayer(img_id, player_id);
  if (game === undefined || game === null) {
    return res.status(200).json({
      player_id: player_id,
    });
  } else {
    const activeGameObject = await createGameObject(game.id);
    return res.status(200).json({
      game: activeGameObject,
    });
  }
}

async function newGamePost(req, res) {
  // create a new game only if player has no active game for the picture
  const { img_id, player_id } = req.params;
  const [game] = await db_games.getActiveByImgAndPlayer(img_id, player_id);
  if (game === undefined || game === null) {
    const id = uuidv4();
    const targets = await createArrayTargets(img_id);
    await db_games.createNewGame(id, player_id, img_id, targets, req, res);
    const newGameObject = await createGameObject(id);
    return res.status(200).json({
      game: newGameObject,
    });
  } else {
    const activeGameObject = await createGameObject(game.id);
    return res.status(200).json({
      game: activeGameObject,
    });
  }
}

async function roundResult(req, res) {
  const { game_id } = req.params;
  const { player_obj, char_obj, normalize_x, normalize_y } = req.body;
  // check if the game is active
  let game = {};
  const gameActive = await isGameActive(game_id); // true - false
  switch (gameActive) {
    case false:
      return res.status(400).json({
        round_answer: "incorrect",
        message: "This is not an active game",
      });
    case true:
      {
        // check if the session player is expired
        const sessionExpired = await isSessionExpired(player_obj);
        switch (sessionExpired) {
          case true:
            game = await db_games.getById(game_id);
            await db_games.updateGameStatus(game, "ABORTED", req, res);
            return res.status(400).json({
              round_answer: "incorrect",
              message: "Session expired, game was aborted",
            });

          case false:
            game = await db_games.getById(game_id);
            break;
        }
      }
      break;
  }
  // start playing the round - received coords
  const result = await checkCoords(char_obj, normalize_x, normalize_y);
  console.log(`result is ${result}`);
  switch (result) {
    case false:
      return res.status(400).json({
        round_answer: "incorrect",
        message: "wrong coords",
      });
    default:
      {
        await updateGameTargets(game, result, req, res);
        game = await db_games.getById(game_id);
        console.log(game);
        const stillTobefound = stillCharTobefound(game);
        console.log(`still is ${stillTobefound}`);
        switch (stillTobefound) {
          case true: {
            const gameObject = await createGameObject(game.id);
            return res.status(200).json({
              round_answer: "correct",
              message: `${char_obj.name} was found`,
              game: gameObject,
            });
          }
          case false: {
            const scoreObject = getScore(game);
            await db_games.finishTheGame(game, scoreObject, "ENDED", req, res);
            const gameObject = await createGameObject(game.id);
            return res.status(200).json({
              round_answer: "correct",
              message: `${char_obj.name} was found and the game ended`,
              game: gameObject,
              score: scoreObject.score,
            });
          }
        }
      }
      break;
  }
}

// auxiliary functions
async function createGameObject(id) {
  const data = await db_games.getById(id);
  const obj = {
    game_id: data["id"],
    startedAt: data["startedAt"],
    picture: {
      id_image: data["picture"]["id"],
      src_image: data["picture"]["src_image"],
      characters: data["targets"],
    },
    player: {
      id_player: data["player"]["id"],
      name_player: data["player"]["playername"],
      session_player: data["player"]["sessionId"],
      session_expired: data["player"]["session"]["expiresAt"],
    },
    status: data["status"],
  };
  console.log(obj);
  return obj;
}

async function createArrayTargets(img_id) {
  const array = await db_pictures.getCharacters(img_id);
  const zero = 0;
  const defOpt = false;
  let temp = [];
  array.forEach((e) => {
    temp.push(
      {"id": e.id, "name":e.name, "found":defOpt, "x":zero, "y":zero }
    );
  });
  console.log(temp);
  return temp;
}

async function isSessionExpired(player_obj) {
  const temp = await db_sessions.getFromId(player_obj.sessionId);
  let result = true;
  if (temp) {
    result = isPast(new Date(temp.expiresAt));
  }
  return result;
}

async function isGameActive(id) {
  const temp = await db_games.getById(id);
  let check = false;
  if(temp){
    check = temp.status === "GAMING" ? true : false;
  }
  return check;
}

async function checkCoords(char_obj, normalize_x, normalize_y) {
  const charDetails = await db_pictures.getCharDetailsById(char_obj.id);
  let x = Number(normalize_x);
  let y = Number(normalize_y);
  let validationArray = [];
  validationArray.push(_.inRange(x, charDetails.leftX, charDetails.rightX));
  validationArray.push(_.inRange(y, charDetails.topY, charDetails.bottomY));
  const result = validationArray.includes(false)
    ? false
    : {
        id: charDetails.id,
        name: charDetails.name,
        found: true,
        x: charDetails.x,
        y: charDetails.y,
      };
  return result;
}

async function updateGameTargets(game, result) {
  const arrayTargets = game.targets;
  const newArray = updateTargetsArray(arrayTargets, result);
  console.log(newArray);
  await db_games.updateGameTargets(game, newArray);
  const gameUpdated = await db_games.getById(game.id);
  return gameUpdated;
}

function updateTargetsArray(arrayTargets, resultObject) {
  arrayTargets.forEach((e) => {
    if (e.id === resultObject.id) {
      e.found = resultObject.found;
      e.x = resultObject.x;
      e.y = resultObject.y;
    }
  });
  return arrayTargets;
}

function stillCharTobefound(game) {
  const array = game.targets;
  let foundedArray = [];
  array.forEach((e) => {
    const received = e.found;
    const str = received.toString();
    const bool = str.toLowerCase() === "true";
    foundedArray.push(bool);
  });
  console.log(foundedArray);
  let result = foundedArray.includes(false) ? true : false;
  return result;
}

function getScore(game) {
  const start = game.startedAt;
  const end = new Date();
  const n = intervalToDuration({
    start: new Date(start),
    end: new Date(end),
  });
  return { start: start, end: end, score: n };
}

module.exports = { newGameGet, newGamePost, roundResult };
