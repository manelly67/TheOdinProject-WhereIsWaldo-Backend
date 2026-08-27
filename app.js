const myObject = {};
require("dotenv").config({ processEnv: myObject });
const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// --- función de espera ---
async function waitForDatabase (retries, delayMs){
  for (let i = 0; i < retries; i++) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      console.log("Conexión a la base de datos lista.");
      return true;
    } catch (error) {
      console.log(`Intento ${i + 1} de ${retries}: base de datos no lista aún, reintentando en ${delayMs / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  console.error("No se pudo conectar a la base de datos tras varios intentos.");
  return false;
};

// --- arranque del servidor ---

const startServer = async () => {

const dbReady = await waitForDatabase(15, 4000); // 15 intentos x 4 segundos = 60 segundos de margen

if (!dbReady) {
  console.error("Advertencia: la base de datos no respondió, arrancando de todas formas.");
}

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');
const routes = require("./routes");

const secret_key = process.env.SECRET_KEY || myObject.SECRET_KEY;

const app = express();
// Enable All CORS Requests
app.use(
  cors({
    origin: "https://whereisthegame.netlify.app",
    allowedHeaders: ["Content-Type", "Connection"],
    credentials:true,
  })
);

const prismaSessionStore = new PrismaSessionStore(new PrismaClient(), {
  checkPeriod: 2 * 60 * 1000, //ms
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined,
});


app.use(
  session({
    cookie: {
      SameSite: "None",
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day - 24hrs/1day - 60min/1hrs - 60seg/1min - 1000ms/1seg
    },
    secret: secret_key,
    resave: true,
    saveUninitialized: true,
    store: prismaSessionStore,
  })
);


//si no se utiliza esta middleware el post object resulta undefined
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", routes.homepage);
app.use("/players", routes.player);
app.use("/games", routes.game);

app.use((req, res) => {
  res.status(404).json({
    message: "Oops, Page Not Found :) ",
    title: "Error Page",
  });
});


app.listen(port, host, () => {
    console.log(`Server is running on ${host}:${port}`);
  });

}

startServer();


