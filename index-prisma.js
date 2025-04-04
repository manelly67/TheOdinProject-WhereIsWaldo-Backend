const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

 async function main() {

 
/*  const createMany1 = await prisma.picture.createMany({
    data: [
      { id: 'img-1', title: 'Waldo In The Galactic City', src_image: '"https://res.cloudinary.com/dwlqplcgt/image/upload/v1743608952/find_the_charaters_in_the_galactic_city_pcuwu3.png' },
      { id: 'img-2', title: 'Oh! Waldo is not here', src_image: 'https://res.cloudinary.com/dwlqplcgt/image/upload/v1743608911/find_the_lucky_clover_mqkdmu.png' },
    ],
  }); 
 

  const createMany2 = await prisma.character.createMany({
    data: [
      { 
        id: "char-1",
        name: "Wally",
        found: false,
        imageAboutId: 'img-1',
        x: -0.2084883721,
        y: 0.2356115108,
        leftX: -0.2154651163,
        leftY: 0.2356115108,
        topX: -0.2084883721,
        topY: 0.2068345324,
        rightX: -0.2015116279,
        rightY: 0.2356115108,
        bottomX: -0.2084883721,
        bottomY: 0.2500000000,
       },
       { 
        id: "char-2",
        name: "R2D2",
        found: false,
        imageAboutId: 'img-1',
        x: 0.6262790698,
        y: 0.0113309353,
        leftX: 0.6076744186,
        leftY: 0.0113309353,
        topX: 0.6262790698,
        topY: -0.039028777,
        rightX: 0.6448837209,
        rightY: 0.0113309353,
        bottomX: 0.6262790698,
        bottomY: 0.0724820144,
       },
       { 
        id: "char-3",
        name: "Courage the Cowardly Dog",
        found: false,
        imageAboutId: 'img-1',
        x: 0.4794883721,
        y: -0.3697841727,
        leftX: 0.4608604651,
        leftY: -0.3697841727,
        topX: 0.4794883721,
        topY: -0.3985611511,
        rightX: 0.4934186047,
        rightY: -0.3697841727,
        bottomX: 0.4794883721,
        bottomY: -0.3302158273,
       },
       { 
        id: "char-4",
        name: "Four Leaf Clover",
        found: false,
        imageAboutId: 'img-2',
        x: -0.4963826607,
        y: 0.6964285714,
        leftX: -0.5515695067,
        leftY: 0.6964285714,
        topX: -0.4977578475,
        topY: 0.6357142857,
        rightX: -0.446935725,
        rightY: 0.6964285714,
        bottomX: -0.4977578475,
        bottomY: 0.7678571429,
       },
    ],
  });

const all1 = await prisma.picture.findMany();
console.log(all1);

const all2 = await prisma.character.findMany();
console.log(all2); 

 */



const all3 = await prisma.session.findMany();
console.log(all3);
  

  // To write queries

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