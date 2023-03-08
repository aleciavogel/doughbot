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
exports.execute = exports.data = void 0;
const discord_js_1 = require("discord.js");
const getMessage = (channelId) => {
    switch (channelId) {
        case process.env.JEOPARDY_ID:
            // TODO: format prettier and add more info
            return "Help will go here";
        default:
            return "Have fun chatting! This is an ordinary text channel!";
    }
};
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName("help")
    .setDescription("Provides contextual information about certain channels");
const execute = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isChatInputCommand())
        return;
    yield interaction.reply({
        content: getMessage(interaction.channelId),
        ephemeral: true,
    });
});
exports.execute = execute;
