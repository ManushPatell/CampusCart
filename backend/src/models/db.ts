import postgres from 'postgres';

const sql = postgres({
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'mysecretpassword',
    database: 'postgres',
    debug: true,
});

export default sql;
