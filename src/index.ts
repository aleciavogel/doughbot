import * as dotenv from 'dotenv';
dotenv.config()

import {Client, Events, GatewayIntentBits} from "discord.js";

import registerCommands from "./commands";
import registerGames from "./games";
import Database from "./db";

// Ensure all environment variables exist
const missing = ["DISCORD_TOKEN", "GUILD_ID", "CLIENT_ID"].filter((env) => !process.env[env]);

if (missing.length) {
  console.error("[ERROR] Missing environment variables:", missing.join(", "));
  process.exit(1);
}

// Create a new client instance
const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;

/**
 * NOTE: If something is returning blank when it's not supposed to, you're
 *       probably missing something from the permissions list below
 */
const PERMISSIONS = [
  Guilds,
  GuildMessages,
  MessageContent,
]

const client = new Client<true>({ intents: PERMISSIONS });

const main = async () => {
  const db = new Database();
  await registerCommands(client);
  await registerGames(client);


  // When the client is ready, run this code only once
  client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
  });

  // Log into discord with the client token
  await client.login(process.env.DISCORD_TOKEN);
}


(async () => {
  await main();
})();