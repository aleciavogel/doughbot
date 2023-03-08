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