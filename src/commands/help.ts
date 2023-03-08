import {
  ChatInputCommandInteraction,
  SlashCommandBuilder, Snowflake,
} from "discord.js";

const getMessage = (channelId: Snowflake) => {
  switch (channelId) {
    case process.env.JEOPARDY_ID:
      // TODO: format prettier and add more info
      return "Help will go here";
    default:
      return "Have fun chatting! This is an ordinary text channel!";
  }
}

export const data =
  new SlashCommandBuilder()
    .setName("help")
    .setDescription("Provides contextual information about certain channels");

export const execute = async (interaction: ChatInputCommandInteraction<"cached">) => {
  if (!interaction.isChatInputCommand()) return;

  await interaction.reply({
    content: getMessage(interaction.channelId),
    ephemeral: true,
  });
}