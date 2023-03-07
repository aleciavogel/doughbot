import {SlashCommandBuilder, ChatInputCommandInteraction} from "discord.js";

export const data: SlashCommandBuilder = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong");

export const execute = async (interaction: ChatInputCommandInteraction<"cached">) => {
  await interaction.reply("Pong!")
}