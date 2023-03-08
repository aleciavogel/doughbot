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

export enum QuestionCategory {
  Abilities = "Abilities",
  BehindTheScenes = "Behind The Scenes",
  Collectibles = "Collectibles",
  Counters = "Counters",
  FamousStreamers = "Famous Streamers",
  Lore = "Lore",
  Maps = "Maps",
  Nerfs = "Nerfs",
  OverwatchLeague = "Overwatch League (OWL)",
  PlatChat = "Plat Chat",
  VoiceActors = "Voice Actors",
  VoiceLines = "Voice Lines",
}

export interface Question {
  category: QuestionCategory;
  content: string;
  answer: string;
  value: number;
}

export type QuestionBank = Question[];