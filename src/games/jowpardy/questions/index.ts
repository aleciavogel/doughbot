import {QuestionBank} from "../types";

import AbilitiesQuestions from "./abilities";
import BehindTheScenesQuestions from "./behindTheScenes";
import CollectiblesQuestions from "./collectibles";
import CountersQuestions from "./counters";
import FamousStreamersQuestions from "./famousStreamers";
import LoreQuestions from "./lore";
import MapsQuestions from "./maps";
import NerfsQuestions from "./nerfs";
import OverwatchLeagueQuestions from "./overwatchLeague";
import PlatChatQuestions from "./platChat";
import VoiceActorsQuestions from "./voiceActors";
import VoiceLinesQuestions from "./voiceLines";

const Questions: QuestionBank = [
  ...AbilitiesQuestions,
  ...BehindTheScenesQuestions,
  ...CollectiblesQuestions,
  ...CountersQuestions,
  ...FamousStreamersQuestions,
  ...LoreQuestions,
  ...MapsQuestions,
  ...NerfsQuestions,
  ...OverwatchLeagueQuestions,
  ...PlatChatQuestions,
  ...VoiceActorsQuestions,
  ...VoiceLinesQuestions
]

export default Questions;