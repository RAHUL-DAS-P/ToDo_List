const Pool = require("pg").Pool;

const pool = new Pool({
    user : "postgres",
    password : "7838210812",
    host : "localhost",
    port  : 5432,
    database : "todolist",
});

module.exports = pool;