import Database from "../../db";
import * as Jowpardy from "./db/queries";
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

  async updateGameState(isClosed: boolean, gameId: number) {
    return this.exec(Jowpardy.UPDATE_GAME(isClosed, gameId))
  }

  async createAnswer(memberId: string, gameId: number, correct: boolean) {
    return this.insert(Jowpardy.CREATE_ANSWER(memberId, gameId, correct));
  }

  async fetchPreviousAnswers(memberId: string, gameId: number) {
    return this.find(Jowpardy.FETCH_PREVIOUS_ANSWER(memberId, gameId));
  }

  async fetchPlayer(memberId: string) {
    return this.find(Jowpardy.FETCH_PLAYER(memberId));
  }

  async createPlayer(memberId: string) {
    return this.insert(Jowpardy.CREATE_PLAYER(memberId));
  }

  async updatePlayerScore(memberId: string, score: number) {
    return this.exec(Jowpardy.UPDATE_PLAYER(memberId, score));
  }
}

export default JowpardyDB;