import {Connection} from "mysql";

import dbConnection from "./connection";
import { Jowpardy } from "./queries";

class Database {
  conn?: Connection;

  constructor() {
    this.conn = dbConnection;
    this.init();
  }

  init() {
    if (!this.conn) return;

    const main = this;
    const db = this.conn;

    db.connect(function(err) {
      if (err) {
        return console.error('[ERROR]: ' + err.message);
      }

      main.transaction(Jowpardy.INIT_PLAYERS_TABLE);
      main.transaction(Jowpardy.INIT_GAMES_TABLE);
      main.transaction(Jowpardy.INIT_ANSWERS_TABLE);

      db.end(function (err) {
        if (err) {
          return console.log(err.message);
        }
      });
    });
  }

  private transaction(sql: string) {
    this.conn?.query(sql, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
  }
}

export default Database;