import * as dotenv from 'dotenv';
dotenv.config()

import {Client, Events, GatewayIntentBits} from "discord.js";

import RegisterCommands from "./commands";

// Ensure all environment variables exist
const missing = ["DISCORD_TOKEN", "GUILD_ID", "CLIENT_ID"].filter((env) => !process.env[env]);

if (missing.length) {
  console.error("[ERROR] Missing environment variables:", missing.join(", "));
  process.exit(1);
}

// Create a new client instance
const { Guilds } = GatewayIntentBits;
const client = new Client<true>({ intents: [Guilds]});

const main = async () => {
  await RegisterCommands(client);

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