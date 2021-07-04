const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const todolistRouter = require('./routes/todolist')


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('server/public'));



// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});

// ROUTES
app.use('/todolist', todolistRouter)
