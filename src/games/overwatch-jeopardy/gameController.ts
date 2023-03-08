import { Message } from "discord.js";

export class JeopardyMessageHandler {
  message: Message;

  constructor(message: Message) {
    this.message = message;

    switch(message.content.toLowerCase()) {
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
        // TODO: retrieve the top 10 scores and show the user's current rank
        break;
      default:
      // TODO: check if game is in session

      // TODO: if game in session, treat like an answer
    }
  }

  initGame() {
    console.log("The game will be starting now");
  }

  showLeaderboard() {
    console.log("The leaderboard will be shown here");
  }

  checkAnswer() {
    console.log("Answer has been submitted...");
  }

  private checkGameState() {
    console.log("We'll check if game is in session here...");
  }
}