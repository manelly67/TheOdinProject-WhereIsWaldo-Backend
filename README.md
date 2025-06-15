# TheOdinProject-WhereIsWaldo-Backend

This project follows the specifications within the curriculum of The Odin Project 
https://www.theodinproject.com/lessons/nodejs-where-s-waldo-a-photo-tagging-app


Node.js Express API with Prisma ORM
-----------------------------------

A backend was developed using Node.js, with the Express framework for handling HTTP requests and responses, and Prisma as the ORM for managing database interactions.

Suggestion
----------
Due to the size of the images it is recommended to implement it for medium and large screens.
<br>
As this is a study project, a free server mode is used, so you have to wait 1 minute for the server to wake up.


Functionality
-------------
The app includes the following core functionality:

### No authorization required ###

### Database ###
The database contains the url images and stores the location of the coordinates of the different characters within each image.

### Validation of coordinates ###
Receives coordinates from the frontend and validates them with the information in the database to send the response according to the result.

### Player ###
The player's controller assigns a player to the session, the session has a duration of one day. During that day no new players are generated for that session.

### Game ###
Game controller allows each player to play each game only once.
<br>
The game score is calculated by comparing the start and end dates/times of the game.
<br>
The start date/time is taken when each image is first displayed.
<br>
The end date/time is taken when all the characters in each image have been found.

### High scores table ###
There are routes created to obtain the Top 5 and the Top 10

### Access ###

This server is accessed through HTTP requests made from a frontend designed in React.<br>
The url frontend address is https://whereisthegame.netlify.app

### Repositories ###
Backend: https://github.com/manelly67/TheOdinProject-WhereIsWaldo-Backend <br>
Frontend: https://github.com/manelly67/TheOdinProject-WhereIsWaldo-Frontend

#### Credits: ####
The image are hosted in Cloudinary.com
<br>
The server is hosted in render.com
<br>
The url for the server is https://top-whereis-backend.onrender.com
<br>
The database is hosted in neon.tech
<br>
- The image of Waldo hidden in a galactic city is part of the "Where's Waldo?" series of Martin Handford. Courage the Cowardly Dog and R2D2 invited themselves to be part of the drawing.
<br>
- The image four leaf clover optical ilusion is part of the article "Only 1% Visually Powerful Can Find The Four Leaf Clover in 5 Seconds" by Roopashree Sharma published in  the web https://www.jagranjosh.com 









