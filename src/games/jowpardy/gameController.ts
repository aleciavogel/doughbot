import { Message, EmbedBuilder } from "discord.js";

import Database from "../../db";
import questions from "./questions";
import {Question} from "./types";

export class JowpardyMessageHandler {
  message: Message;

  constructor(message: Message) {
    this.message = message;
    this.parseMessage();
  }

  private async initGame() {
    // Create a new row in the jowpardy_games table
    const question = this.randomQuestion();

    const db = new Database();
    db.createGame(question);

    await this.message.reply(`The category is **${question.category}** for **$${question.value}**: \n\`${question.content}\``);
  }

  private randomQuestion() {
    return questions[Math.floor(Math.random()*questions.length)];
  }

  private showLeaderboard() {
    console.log("The leaderboard will be shown here");
  }

  private buildQuestionEmbed({ content, category, value }: Question) {
    return new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('jOWpardy')
      .addFields(
        { name: `The category is ${category} for $${value}:`, value: content },
      )
      .setFooter({ text: 'For rules and how to play, type `/help`' });

  }

  private checkAnswer() {
    console.log("Answer has been submitted...");
  }

  private checkGameState() {
    console.log("We'll check if game is in session here...");
  }

  /**
   * Determine if a user said a command, submitted an answer, or is
   * just talking/chatting in the channel.
   * @private
   */
  private parseMessage() {
    switch(this.message.content.toLowerCase()) {
      case "try me":
      case "new game":
      case "next question":
      case "next":
        this.initGame();
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