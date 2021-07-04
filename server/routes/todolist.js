const pool = require('../modules/pool');
const express = require('express');
const router = express.Router();

router.post('/', (req,res) => {
    console.log(`What's coming in from the client?`,req.body);
    const newTask = req.body;
        const queryText = `INSERT INTO "todolist" ("task", "date", "complete", "notes")
        VALUES ($1, $2, $3, $4);`;
    pool.query(queryText,[newTask.task, newTask.date, newTask.complete, newTask.notes])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(`Error making query`, err);
            res.sendStatus(500);
        });
});

router.get('/', (req,res) => {
        let queryText = 'SELECT * FROM todolist;';
    pool.query(queryText)
        .then((result) => {
        res.send(result.rows);
        console.log(`In /todolist GET`);
        })
        .catch((err) => {
            console.log(`Error making query`, err);
            res.sendStatus(500);
        });
});


router.put('/:id', (req, res) => {
    // get id from url (which is from html)
    const taskId = req.params.id;
    
    let putQuery = `UPDATE task SET "complete"=true WHERE id=$1;`;

    pool.query(putQuery, [taskId])
    .then(dbResponse => {
        console.log('Updated task with PUT', dbResponse);
        res.sendStatus(202);
    })
    .catch(err => {
        console.log('There was an error updating transfer', error);
        res.sendStatus(500);
    })
});


module.exports = router;