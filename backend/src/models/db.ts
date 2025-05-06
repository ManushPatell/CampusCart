const postgres = require("postgres");

const sql = postgres({
    host: "localhost",
    port: 5432,
    username: 'username',
    password: 'mypassword',
    database: 'db'
})

export default sql