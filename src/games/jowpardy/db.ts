import Database from "../../db";
import {Jowpardy} from "../../db/queries";
import {Question} from "./types";

class JowpardyDB extends Database {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.exec(Jowpardy.INIT_PLAYERS_TABLE);
    this.exec(Jowpardy.INIT_GAMES_TABLE);
    this.exec(Jowpardy.INIT_ANSWERS_TABLE);
  }

  async createGame(question: Question) {
    return this.insert(Jowpardy.CREATE_GAME(question));
  }

  async fetchLastGame() {
    return this.find(Jowpardy.FETCH_LAST_GAME);
  }
}

export default JowpardyDB;