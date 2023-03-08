import {Client} from "discord.js";

import registerJeopardy from "./overwatch-jeopardy";


const registerGames = async (client: Client) => {
  await registerJeopardy(client);
}

export default registerGames;