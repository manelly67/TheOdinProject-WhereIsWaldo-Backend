const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');
const routes = require("./routes");

const myObject = {};
require("dotenv").config({ processEnv: myObject });
const secret_key = process.env.SECRET_KEY || myObject.SECRET_KEY;

const app = express();
// Enable All CORS Requests
app.use(cors());

app.use(
  session({
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day - 24hrs/1day - 60min/1hrs - 60seg/1min - 1000ms/1seg
    },
    secret: secret_key,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      new PrismaClient(),
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  })
);

//si no se utiliza esta middleware el post object resulta undefined
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes.homepage);

app.listen(port, host, () => {
    console.log(`Server is running on ${host}:${port}`);
  });