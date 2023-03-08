import {Connection, OkPacket} from "mysql";

import dbConnection from "./connection";

class Database {
  conn?: Connection;

  constructor() {
   this.conn = dbConnection;
  }

  async find(sql: string) {
    return new Promise((resolve, reject) => {
      this.conn?.query(sql, (err, res) => {
        if (err) {
          reject(err.message);
        }
        resolve(res["0"]);
      });
    })

  }

  async insert(sql: string) {
    return new Promise((resolve, reject) => {
      this.conn?.query(sql, (err, res: OkPacket) => {
        if (err) {
          reject(err.message);
        }
        resolve(res.insertId);
      });
    });

  }

  exec(sql: string) {
    this.conn?.query(sql, (err, _res: OkPacket) => {
      if (err) {
        console.error("[ERROR]:", err.message);
        return;
      }
    });
  }
}


export default Database;