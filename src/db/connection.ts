import {createConnection} from "mysql";

const connection = createConnection({
  host: process.env.DB_HOST,
  user: "root",
  password: "my_password",
  database: "discord_dev",
});

export default connection;