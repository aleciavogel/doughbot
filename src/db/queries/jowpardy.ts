import {Question} from "../../games/jowpardy/types";

export const INIT_PLAYERS_TABLE = `
  CREATE TABLE IF NOT EXISTS jowpardy_players(
    id MEDIUMINT NOT NULL,
    score INT NOT NULL DEFAULT 0
  )
`;

export const INIT_GAMES_TABLE = `
  CREATE TABLE IF NOT EXISTS jowpardy_games(
    id MEDIUMINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    category VARCHAR(255) NOT NULL,
    question VARCHAR(255) NOT NULL,
    answer VARCHAR(255) NOT NULL,
    value INT NOT NULL,
    is_closed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`;

export const INIT_ANSWERS_TABLE = `
  CREATE TABLE IF NOT EXISTS jowpardy_answers(
    id MEDIUMINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    member_id MEDIUMINT NOT NULL,
    game_id MEDIUMINT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

export const CREATE_PLAYER = `

`;

export const CREATE_GAME = ({ category, content, answer, value }: Question) => `
  INSERT INTO jowpardy_games(category,question,answer,value) 
  VALUES("${category}","${content}","${answer}",${value})
`;

// Update game to indicate that it is closed
export const EXPIRE_GAME = `

`;