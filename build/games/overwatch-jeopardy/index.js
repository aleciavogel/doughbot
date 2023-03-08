"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const gameController_1 = require("./gameController");
const addListener = (client) => {
    // Listen for messages in the #overwatch-jeopardy Discord channel
    client.on(discord_js_1.Events.MessageCreate, (message) => __awaiter(void 0, void 0, void 0, function* () {
        if (!message)
            return;
        if (message === null || message === void 0 ? void 0 : message.author.bot)
            return;
        if ((message === null || message === void 0 ? void 0 : message.channelId) === process.env.JEOPARDY_ID) {
            new gameController_1.JeopardyMessageHandler(message);
        }
    }));
};
const registerJeopardy = (client) => __awaiter(void 0, void 0, void 0, function* () {
    yield addListener(client);
    console.log("Registered Overwatch Jeopardy");
});
exports.default = registerJeopardy;
