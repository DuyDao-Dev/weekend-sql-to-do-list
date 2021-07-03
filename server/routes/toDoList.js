const pool = require('../modules/pool');
const express = require('express');
const router = express.Router();

router.post('/', (req,res) => {
    console.log(`What's coming in from the client?`,req.body);
    const newTask = req.body;
        const queryText = `INSERT INTO "toDoList" ("task", "date", "completed", "notes");
        VALUES ($1, $2, $3, $4);`;
    pool.query(queryText,[newTask.task, newTask.date, newTask.completed, newTask.notes])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(`Error making query`, err);
            res.sendStatus(500);
        });
});

router.get('/', (req,res) => {
        let queryText = 'SELECT * FROM "toDoList";';
    pool.query(queryText)
        .then((result) => {
        res.send(result.rows);
        console.log(`In /toDoList GET`);
        })
        .catch((err) => {
            console.log(`Error making query`, err);
            res.sendStatus(500);
        });
});

module.exports = router;