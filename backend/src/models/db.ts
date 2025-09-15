import postgres from "postgres";

const sql = postgres({
  host: process.env.POSTGRES_HOST!,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.POSTGRES_DB!,
  debug: process.env.NODE_ENV === "production",
});

export default sql;
