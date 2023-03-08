import {Client, Events, Message} from "discord.js";
import { JeopardyMessageHandler } from "./gameController";

const addListener = (client: Client) => {
  // Listen for messages in the #overwatch-jeopardy Discord channel
  client.on(Events.MessageCreate, async (message?: Message<boolean>) => {

    if (!message) return;

    if (message?.author.bot) return;

    if (message?.channelId === process.env.JEOPARDY_ID) {
      new JeopardyMessageHandler(message);
    }
  });
}

const registerJeopardy = async (client: Client) => {
  await addListener(client);
  console.log("Registered Overwatch Jeopardy");
}

export default registerJeopardy;