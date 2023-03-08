"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
/**
 * Class that connects to the database and handles various business logic
 * @example
 *  const db = new DatabaseConnection();
 *  db.fetchScores();
 */
class DatabaseConnection {
    constructor() {
        // Prepare the mysql connection
        this.conn = (0, mysql_1.createConnection)({
            host: process.env.DB_HOST,
            user: "root",
            password: "my_password",
            database: "discord_dev",
        });
        this.init();
    }
    init() {
        console.log("mysql is connected yay");
    }
}
exports.default = DatabaseConnection;
