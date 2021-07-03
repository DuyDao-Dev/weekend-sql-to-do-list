const pg = require('pg');
const Pool = pg.Pool;

const pool = new Pool({
    database: 'weekend-to-do-list', 
    host: 'localhost', 
    port: 5432, 
    max: 10, 
    idleTimeoutMillis: 30000 
});


pool.on('connect', (client) => {
  console.log('PostgeSQL connected');
});

// the pool with emit an error on behalf of any idle clients
// it contains if a back end error or network partition happens
pool.on('error', (err, client) => {
  console.log('Unexpected error on idle client', err);
});

module.exports = pool;