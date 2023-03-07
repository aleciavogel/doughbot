import { ChatInputCommandInteraction, SlashCommandBuilder,} from "discord.js";

export const data: SlashCommandBuilder =
  new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about the user");

export const execute = async (interaction: ChatInputCommandInteraction<"cached">) => {
  await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member?.joinedAt}.`);
}