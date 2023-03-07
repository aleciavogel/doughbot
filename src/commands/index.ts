import {Interaction, Client, Collection, Events, REST, Routes} from "discord.js";

import {SlashCommand} from "../types";

// All available commands
import * as pingCommand from "./ping";
import * as serverCommand from "./server";
import * as userCommand from "./user";

export const COMMANDS: SlashCommand[] = [
  pingCommand,
  serverCommand,
  userCommand
];

const CommandCollection = new Collection<string, SlashCommand>();

for (const command of COMMANDS) {
  CommandCollection.set(command.data?.name, command);
}

/**
 * Listen for commands from the Discord Server
 * @param client - the target Discord Client
 */
const addListener = (client: Client) => {
  // Add the command listener
  client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const interactionCommand = interaction.client.commands.get(interaction.commandName);

    if (!interactionCommand) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await interactionCommand.execute(interaction);
    } catch (error: unknown) {
      console.error(error);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: "There was an error while executing this command!", ephemeral: true});
      } else {
        await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true});
      }
    }
  });
}

/**
 * Deploy the commands to the Discord Server
 * @param client - the target Discord Client
 */
const sendToDiscord = async () => {
  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN ?? "");

  try {
    console.log(`Started refreshing ${COMMANDS.length} application (/) commands.`);

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID ?? "", process.env.GUILD_ID ?? ""),
      {
        body: COMMANDS.map(command => command.data.toJSON())
      }
    );

    console.log(`Successfully reloaded application (/) commands.`);
  } catch (error: unknown) {
    console.error(error);
  }
}

/**
 * Register all commands
 * @param client - the target Discord Server
 */
const registerCommands = async (client: Client) => {
  client.commands = CommandCollection;

  await addListener(client);
  await sendToDiscord();
}

export default registerCommands;