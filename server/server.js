const express = require('express');
const app = express();
const pg = require('pg');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
// const router = require('./routes/toDoList.router')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// ROUTES
// app.use('/toDoList', router)

const Pool = pg.Pool;
const pool = new Pool({
    database: 'toDoList', 
    host: 'localhost', 
    port: 5432, 
    max: 10, 
    idleTimeoutMillis: 30000 
});
// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});

app.post('/tododata', (req,res) => {
    console.log(req.body);
    const newTask = req.body;
        const queryText = `INSERT INTO toDoList ("task", "date", "complete", "notes");
        VALUES ($1, $2, $3, $4);`;
    pool.query(queryText,[newArtist.artist, newArtist.birthdate])
        .then(result => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(`Error making query`, err);
            res.sendStatus(500);
        });
});

