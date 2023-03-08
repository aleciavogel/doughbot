import { Message } from "discord.js";

import Database from "../../db";
import questions from "./questions";
import JowpardyDB from "./db";
import {titleCase} from "../../utils";

export class JowpardyMessageHandler {
  message: Message;
  countdown?: NodeJS.Timeout;

  constructor(message: Message) {
    this.message = message;
    this.parseMessage();
  }

  private async initGame() {
    // Create a new row in the jowpardy_games table
    const question = this.randomQuestion();

    const db = new JowpardyDB();

    await db.createGame(question);

    this.message.reply(
      `The category is **${question.category}** for **$${question.value}**: \n\`\`\`${question.content}\`\`\``
    ).then((msg: Message) => {
      this.countdown = setTimeout(async () => {
        const game: any = await this.checkGameState();

        if (!game.is_closed) {
          console.log("The game is still open", game)
          await msg.reply(`Time is up! The answer was \`${question.answer}\`!`);
        }
      }, 30000)
    });
  }

  private randomQuestion() {
    return questions[Math.floor(Math.random()*questions.length)];
  }

  private showLeaderboard() {
    console.log("The leaderboard will be shown here");
  }

  private checkAnswer() {
    console.log("Answer has been submitted...");
  }

  async checkGameState() {
    const db = new JowpardyDB();
    return await db.fetchLastGame();
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
        this.checkAnswer();
    }
  }
}