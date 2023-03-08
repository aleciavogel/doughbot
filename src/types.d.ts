import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";

interface SlashCommand {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction<"cached">) => any;
}

// export interface SlashCommand {
//   command: SlashCommandBuilder | any,
//   execute: (interaction : CommandInteraction) => void,
//   autocomplete?: (interaction: AutocompleteInteraction) => void,
//   cooldown?: number // in seconds
// }

declare module "discord.js" {
  export interface Client {
    slashCommands: Collection<string, SlashCommand>
    commands: Collection<string, Command>,
    cooldowns: Collection<string, number>
  }
}