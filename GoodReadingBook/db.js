const Pool =require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "GoodReadingBook",
    password: "Rafth2003.",
    post: 5432,
});

module.exports = pool;