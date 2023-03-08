"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const discord_js_1 = require("discord.js");
const commands_1 = __importDefault(require("./commands"));
const games_1 = __importDefault(require("./games"));
const db_1 = __importDefault(require("./db"));
// Ensure all environment variables exist
const missing = ["DISCORD_TOKEN", "GUILD_ID", "CLIENT_ID"].filter((env) => !process.env[env]);
if (missing.length) {
    console.error("[ERROR] Missing environment variables:", missing.join(", "));
    process.exit(1);
}
// Create a new client instance
const { Guilds, GuildMessages, MessageContent } = discord_js_1.GatewayIntentBits;
/**
 * NOTE: If something is returning blank when it's not supposed to, you're
 *       probably missing something from the permissions list below
 */
const PERMISSIONS = [
    Guilds,
    GuildMessages,
    MessageContent,
];
const client = new discord_js_1.Client({ intents: PERMISSIONS });
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = new db_1.default();
    yield (0, commands_1.default)(client);
    yield (0, games_1.default)(client);
    // When the client is ready, run this code only once
    client.once(discord_js_1.Events.ClientReady, c => {
        console.log(`Ready! Logged in as ${c.user.tag}`);
    });
    // Log into discord with the client token
    yield client.login(process.env.DISCORD_TOKEN);
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield main();
}))();
