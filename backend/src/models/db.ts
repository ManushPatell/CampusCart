import postgres from "postgres";

const sql: postgres.Sql = postgres({
    host: "localhost",
    port: 5432,
    username: 'username',
    password: 'mypassword',
    database: 'db'
})

export default sql