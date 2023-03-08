import {Connection} from "mysql";

import dbConnection from "./connection";
import { Jowpardy } from "./queries";
import {Question} from "../games/jowpardy/types";

class Database {
  conn?: Connection;

  constructor() {
    this.conn = dbConnection;
  }

  init() {
    this.query(Jowpardy.INIT_PLAYERS_TABLE);
    this.query(Jowpardy.INIT_GAMES_TABLE);
    this.query(Jowpardy.INIT_ANSWERS_TABLE);
  }

  createGame(question: Question) {
    return this.query(Jowpardy.CREATE_GAME(question));
  }

  private query(sql: string) {
    return this.conn?.query(sql, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
  }
}


export default Database;