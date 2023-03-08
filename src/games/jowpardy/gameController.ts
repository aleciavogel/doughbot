import { Message } from "discord.js";

import questions from "./questions";
import JowpardyDB from "./db";
import {isQuestion, normalizeText} from "../../utils";

export class JowpardyMessageHandler {
  message: Message;
  countdown?: NodeJS.Timeout;

  constructor(message: Message) {
    this.message = message;
    this.parseMessage();
  }

  private async initGame() {
    const ongoingGame: any = await this.checkGameState();

    if (ongoingGame && !ongoingGame.is_closed) {
      await this.message.reply("Just a moment! There's still an active trivia question. Maybe give someone else a chance to answer...");
      return;
    }

    const question = this.randomQuestion();
    const db = new JowpardyDB();
    await db.createGame(question);

    this.message.reply(
      `The category is **${question.category}** for **$${question.value}**: \n\`\`\`${question.content}\`\`\``
    ).then((msg: Message) => {
      this.countdown = setTimeout(async () => {
        const game: any = await this.checkGameState();

        if (!game.is_closed) {
          await msg.reply(`Time is up! The answer was \`${question.answer}\`!`);
          await this.endGame(game.id);
        }
      }, 30000)
    });
  }

  static randomQuestion() {
    return questions[Math.floor(Math.random()*questions.length)];
  }

  static showLeaderboard() {
    console.log("The leaderboard will be shown here");
  }

  private async checkAnswer() {
    if (this.message.member === null) {
      await this.message.reply("@kwithpy something has gone horrifically wrong.");
      return;
    }

    const game: any = await this.checkGameState();

    if (!game) return;

    if (game.is_closed) return;

    // Check if the player already has submitted a response
    let newPlayer = await this.checkAnswerState(this.message.member.id, game.id);

    if (!newPlayer) {
      await this.message.reply("You've already had a chance at answering this one, sorry!");
      return;
    }

    if (!isQuestion(this.message.content)) {
      await this.message.reply("Please answer in the form of a question!");
      return;
    }

    const db = new JowpardyDB();

    let isCorrect: boolean = normalizeText(game.answer) === normalizeText(this.message.content);
    const serverMember = this.message.member;
    await db.createAnswer(serverMember.id, game.id, isCorrect);

    // Calculate new score
    let multiplier = isCorrect ? 1 : -1;
    const player: any = await this.retrievePlayer(serverMember.id);
    const newScore = player.score + (game.value * multiplier);

    if (isCorrect) {
      await this.message.reply(`That is the correct answer, ${serverMember.displayName}! Your total score is **$${newScore}**.`);
      await this.endGame(game.id);
    } else {
      await this.message.reply(`Sorry, but that's incorrect. Your total score is now **$${newScore}**.`);
    }

    await this.updatePlayerScore(serverMember.id, newScore);
  }

  async checkGameState() {
    const db = new JowpardyDB();
    return await db.fetchLastGame();
  }

  async checkAnswerState(memberId: string, gameId: number) {
    const db = new JowpardyDB();
    const answers = await db.fetchPreviousAnswers(memberId, gameId);
    return answers === undefined;
  }

  async retrievePlayer(memberId: string) {
    const db = new JowpardyDB();
    const players = await db.fetchPlayer(memberId);

    if (players === undefined) {
      // Create new player
      await db.createPlayer(memberId);
      return await db.fetchPlayer(memberId);
    }

    return players;
  }

  async updatePlayerScore(memberId: string, score: number) {
    const db = new JowpardyDB();
    await db.updatePlayerScore(memberId, score);
  }

  async endGame(gameId: number) {
    const db = new JowpardyDB();
    await db.updateGameState(true, gameId);
  }

  /**
   * Determine if a user said a command, submitted an answer, or is
   * just talking/chatting in the channel.
   * @private
   */
  private async parseMessage() {
    switch(this.message.content.toLowerCase()) {
      case "try me":
      case "new game":
      case "next question":
      case "next":
        await this.initGame();
        break;

      case "leaderboard":
      case "scores":
      case "score":
      case "top 10":
      case "top ten":
      case "top10":
        this.showLeaderboard();
        break;
      default:
        // TODO: check if game is in session

        // TODO: if game in session, treat like an answer
        await this.checkAnswer();
    }
  }
}