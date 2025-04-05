const { v4: uuidv4 } = require("uuid");
const db_players = require("../prisma_queries/players");
const db_games = require("../prisma_queries/game");
const db_pictures = require("../prisma_queries/pictures");

// LUEGO BUSCAR UNA OPCION PARA QUE LOS JUEGOS NO FINALIZADOS DE SESIONES EXPIRADAS 
// PASEN A STATUS ABORTED

async function newGameGet(req, res) {
 // if player has active game - return the active game
 const { img_id, player_id } = req.params;
 console.log(img_id);
 const [game] = await db_games.getActiveByImgAndPlayer(img_id,player_id);
 if (game === undefined || game === null) { 
    return res.status(200).json({
        player_id: player_id,
      });
 }else {
    const activeGameObject = await createGameObject(game.id);
    return res.status(200).json({
        game: activeGameObject,
      });
 }
}

async function newGamePost(req, res) {
// create a new game only if player has no active game for the picture
const { img_id, player_id } = req.params;
const [game] = await db_games.getActiveByImgAndPlayer(img_id,player_id);
if (game === undefined || game === null) {
    const id = uuidv4();
    const targets = await createArrayTargets(img_id);
    await db_games.createNewGame(id,player_id,img_id,targets);
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

async function createGameObject(id){
    const data = await db_games.getById(id);
    const obj = {
        game_id: data['id'],
        startedAt: data['startedAt'],
        picture: {
          id_image: data['picture']['id'],
          src_image: data['picture']['src_image'],
          characters: data['targets'],
        },
        player: {
            id_player: data['player']['id'],
            name_player: data['player']['playername'],
            session_player: data['player']['sessionId'],
            session_expired: data['player']['session']['expiresAt'],
          },
        status: data['status'],
      };
    console.log(obj);
    return obj;
}

async function createArrayTargets(img_id){
    const array = await db_pictures.getCharacters(img_id);
    const zero = 0;
    const defOpt = false;
    let temp = [];
    array.forEach((e)=>{
        temp.push(`{id: ${e.id}, name: ${e.name}, found: ${defOpt}, x: ${zero}, y: ${zero} }`);
    });
    console.log(temp);
    return temp;
}


module.exports = { newGameGet, newGamePost };
