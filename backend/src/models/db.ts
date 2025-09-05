import postgres from "postgres";

const sql = postgres({
  host: "host.docker.internal",
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: "postgres",
  debug: true,
});

export default sql;
