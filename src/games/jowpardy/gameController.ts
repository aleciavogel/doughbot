import { Message } from "discord.js";

export class JowpardyMessageHandler {
  message: Message;

  constructor(message: Message) {
    this.message = message;
    this.parseMessage();
  }

  private initGame() {
    // Create a new row in the jowpardy_games table

  }

  private showLeaderboard() {
    console.log("The leaderboard will be shown here");
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