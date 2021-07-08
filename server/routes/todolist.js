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
    const taskId = req.params.id;
    let updateTask = req.body;

    let putQuery = `
    UPDATE "todolist" 
    SET complete = $1
    WHERE id=$2;`;

  pool.query(putQuery, [updateTask.complete, taskId])
    .then(dbResponse => {
        console.log('Updated task with PUT', dbResponse);
        res.sendStatus(202);
    })
    .catch(error => {
        console.log('There was an error updating transfer', error);
        res.sendStatus(500);
    })
});

router.put('/:id', (req, res) => {
    const treatsId = req.params.id;
    const editTreat = req.body;

    let putQuery = `
    UPDATE treats 
    SET task = $1, date = $2, complete = $3, notes = $4
    WHERE id=$5;`;
//need to figure out how to update description.
    pool.query(putQuery, [editTreat.name, editTreat.description, editTreat.pic, treatsId])
    .then(dbResponse => {
        console.log('Updated treats with PUT', dbResponse);
        res.sendStatus(202);
    })
    .catch(err => {
        console.log('There was an error updating transfer', err);
        res.sendStatus(500);
    })
});

router.delete('/:id', (req,res) => {
    const taskId = req.params.id;
    console.log(`Task id is...${taskId}`);
    const queryText = `
    DELETE FROM todolist WHERE id = $1;`;

  pool.query(queryText, [taskId])
    .then(dbResponse => {
      console.log(`Did we delete just one row? ${dbResponse.rowCount === 1}`);
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(`Could not delete task with id ${taskId}.`, error);
      res.sendStatus(500);
    });
});


module.exports = router;