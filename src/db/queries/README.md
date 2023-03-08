# Tables

## Jowpardy

### `jowpardy_players`

| column | datatype | description             |
|--------|----------|-------------------------|
| id     | int      | id of the server member |
| score  | int      | current score           |

### `jowpardy_games`

| column     | datatype  | description                                             |
|------------|-----------|---------------------------------------------------------|
| id         | int       | game ID (unique)                                        |
| category   | string    | question category                                       |
| question   | string    | the content of the question                             |
| answer     | string    | the correct answer                                      |
| value      | int       | number of points associated with answering the question |
| is_closed  | boolean   | whether the game has expired                            |
| created_at | date_time | time that the game began                                |
| updated_at | date_time | time that the game state was last updated               |


### `jowpardy_answers`

| column     | datatype  | description                           |
|------------|-----------|---------------------------------------|
| id         | int       | id of the answer                      |
| member_id  | int       | id of the server member who guessed   |
| game_id    | int       | id of the game associated with answer |
| is_correct | boolean   | whether the answerer was correct      |
| created_at | date_time | time that the answer was submitted    |

