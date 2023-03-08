import {Question} from "../types";

export const INIT_PLAYERS_TABLE = `
  CREATE TABLE IF NOT EXISTS jowpardy_players(
    id BIGINT NOT NULL UNIQUE,
    score INT NOT NULL DEFAULT 0
  )
`;

export const CREATE_PLAYER = (memberId: string) => `
  INSERT INTO jowpardy_players(id) 
  VALUES(${memberId})
`;

export const UPDATE_PLAYER = (memberId: string, score: number) => `
  UPDATE jowpardy_players
    SET score=${score}
    WHERE id=${memberId}
`;

export const FETCH_PLAYER = (memberId: string) => `
    SELECT * FROM jowpardy_players
      WHERE id=${memberId}
      ORDER BY id
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
    member_id BIGINT NOT NULL,
    game_id MEDIUMINT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

export const CREATE_ANSWER = (memberId: string, gameId: number, correct: boolean) => `
  INSERT INTO jowpardy_answers(member_id,game_id,is_correct) 
  VALUES(${memberId},${gameId},${correct})
`;

export const FETCH_PREVIOUS_ANSWER = (memberId: string, gameId: number) => `
  SELECT * FROM jowpardy_answers
    WHERE member_id=${memberId} AND game_id=${gameId}
    ORDER BY id
`

export const CREATE_GAME = ({ category, content, answer, value }: Question) => `
  INSERT INTO jowpardy_games(category,question,answer,value) 
  VALUES("${category}","${content}","${answer}",${value})
`;

// Update game to indicate that it is closed
export const UPDATE_GAME = (isClosed: boolean, gameId: number) => `
  UPDATE jowpardy_games
    SET is_closed=${isClosed}
    WHERE id=${gameId}
`;

export const FETCH_LAST_GAME = `
  SELECT * FROM jowpardy_games
    WHERE created_at=(SELECT MAX(created_at) FROM jowpardy_games) 
    ORDER BY id
`;