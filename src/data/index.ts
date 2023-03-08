import {Connection, createConnection} from "mysql";

const connectToDB: () => Connection = () => {
  // Prepare the mysql connection
  let con = createConnection({
    host: process.env.DB_HOST,
    user: "root",
    password: "my_password",
    database: "discord_dev",
  });

// Then we are going to connect to our MySQL database and we will test this on errors
  con.connect((err: unknown) => {
    // Console log if there is an error
    if (err) {
      console.log(err);
      return process.exit(1);
    }

    // No error found?
    console.log(`MySQL has been connected!`);
  });

  return con;
}

export default connectToDB;
