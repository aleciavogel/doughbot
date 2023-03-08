import {Client} from "discord.js";

import registerJowpardy from "./jowpardy";


const registerGames = async (client: Client) => {
  await registerJowpardy(client);
}

export default registerGames;