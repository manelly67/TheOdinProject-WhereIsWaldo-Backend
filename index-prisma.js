const { PrismaClient } = require('@prisma/client');

const { isPast } = require("date-fns");
const { intervalToDuration } = require("date-fns");
const _ = require('lodash');
const db_sessions = require("./prisma_queries/session");
const db_games = require("./prisma_queries/game");
const db_players = require("./prisma_queries/players");
const db_pictures = require("./prisma_queries/pictures");

const prisma = new PrismaClient();

 async function main() {

 
/*  

const createMany1 = await prisma.picture.createMany({
  data: [
    { id: 'img-1', title: 'Waldo In The Galactic City', src_image: 'https://res.cloudinary.com/dwlqplcgt/image/upload/v1743608952/find_the_charaters_in_the_galactic_city_pcuwu3.png' },
    { id: 'img-2', title: 'Oh! Waldo is not here', src_image: 'https://res.cloudinary.com/dwlqplcgt/image/upload/v1743608911/find_the_lucky_clover_mqkdmu.png' },
  ],
}); 

const createMany2 = await prisma.character.createMany({
  data: [
    { 
      id: "char-1",
      name: "Wally",
      imageAboutId: 'img-1',
      x: -0.1906976744,
      y: 0.2805755396,
      leftX: -0.2023255814,
      topY: 0.2517985612,
      rightX: -0.1860465116,
      bottomY: 0.309352518,
     },
     { 
      id: "char-2",
      name: "R2D2",
      imageAboutId: 'img-1',
      x: 0.6558139535,
      y: 0.0503597122,
      leftX: 0.6279069767,
      topY: -0.0107913669,
      rightX: 0.6744186047,
      bottomY: 0.1079136691,
     },
     { 
      id: "char-3",
      name: "Courage the Cowardly Dog",
      imageAboutId: 'img-1',
      x: 0.5046511628,
      y: -0.3129496403,
      leftX: 0.4813953488,
      topY: -0.3525179856,
      rightX: 0.523255814,
      bottomY: -0.2805755396,
     },
     { 
      id: "char-4",
      name: "Four Leaf Clover",
      imageAboutId: 'img-2',
      x: -0.4768310912,
      y: 0.6714285714,
      leftX: -0.5396113602,
      topY: 0.5964285714,
      rightX: -0.4200298954,
      bottomY: 0.7464285714,
    },
  ],
});

const all1 = await prisma.picture.findMany();
console.log(all1);

const all2 = await prisma.character.findMany();
console.log(all2); 

const all3 = await prisma.session.findMany();
console.log(all3);

 

const create1 = await prisma.player.create({
  data: 
    { 
      id: 'un-id-para-borrar-luego', 
      sessionId: 'qRECfqN7xKS9oRTWWKdgxZYIaE3XoCRP', 
     },
 
}); 

const deleteOne = await prisma.player.delete({
  where: {
    id: 'un-id-para-borrar-luego',
  },
});

const all4 = await prisma.player.findMany();
console.log(all4);




const targets = [
  { id: "char-1", name: "Wally", found: false, x: 0, y: 0 },
  { id: "char-2", name: "R2D2", found: false, x: 0, y: 0 },
  {
    id: "char-3",
    name: "Courage the Cowardly Dog",
    found: false,
    x: 0,
    y: 0,
  },
];

await prisma.game.create({
  data: {
    id: 'un-id-para-borrar-luego',
    playerId: 'd969deb2-2ea4-4558-8fb2-eb947ef5297f',
    pictureId: 'img-1',
    targets: targets,
  },
})
.then(
  async () => {
    await prisma.$disconnect();
  }
)
.catch(async (err) => {
  if(err){
    return res.status(400).json({
      err_code: err.code,
      err_meta: err.meta,
    });
  }else{
    await prisma.$disconnect();
    process.exit(1);
  }
});

const getById = await prisma.game.findUnique({
    where:{
      id: 'un-id-para-borrar-luego',
    },
    select:{
      id: true,
      startedAt: true,
      finishedAt: true,
      timeRecord: true,
      player: {
        select: {
          id: true,
          playername: true,
          sessionId: true,
          session: {
            select: {
              expiresAt: true,
            },
          },
        },
      },
      picture:{
        select: {
          id: true,
          title: true,
          src_image: true,
        },
      },
      targets: true,
      status: true,
    },
  });

const all3 = await prisma.session.findMany();
console.log(all3);

const all4 = await prisma.player.findMany();
console.log(all4);

const all5 = await prisma.game.findMany();
console.log(all5);

let start = "";
let end = new Date();
const n = intervalToDuration({
  start: new Date(start),
  end: new Date(end)
});

const game = await prisma.game.update(
  { where:{
    id:"5c787093-0c92-4722-a634-5d3d10cc73de"
    },
    data: {
      status: "GAMING",
    },
  },
);

*/
let img = 'img-1';
let player = '09856e83-11e0-4a31-981a-dd21f7555d70';

/* const g = await db_games.getActiveOrEndByImgAndPlayer(img,player); */
const g = await db_games.getActiveByImgAndPlayer(img,player);
console.log(g);

    };

    main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });