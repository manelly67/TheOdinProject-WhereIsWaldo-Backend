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

await prisma.game.deleteMany({
  where:{
    AND:{
      player:{
        playername:{
          equals: 'ANONIMOUS',
        },
      },
      status:{
        equals: 'ENDED',
      },
    }
  },
});

const search = await prisma.game.findMany({
  where:{
    AND:{
      player:{
        playername:{
          equals: 'ANONIMOUS',
        },
      },
      status:{
        equals: 'ENDED',
      },
    }
  },
});


*/



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