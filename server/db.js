const Pool = require("pg").Pool
const pool = new Pool({
    user: "postgres",
    password: "Fire728",
    port: 5432,
    database: "authe_autho"
})
console.log("db connected")
module.exports = pool;