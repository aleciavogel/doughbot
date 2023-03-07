import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

export const data =
  new SlashCommandBuilder()
    .setName("server")
    .setDescription("Provides information about the server");

export const execute = async (interaction: ChatInputCommandInteraction<"cached">) => {
  await interaction.reply(`This server is ${interaction.guild?.name} and has ${interaction.guild?.memberCount} members.`);
}