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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMANDS = void 0;
const discord_js_1 = require("discord.js");
// All available commands
const pingCommand = __importStar(require("./ping"));
const serverCommand = __importStar(require("./server"));
const userCommand = __importStar(require("./user"));
const helpCommand = __importStar(require("./help"));
exports.COMMANDS = [
    pingCommand,
    serverCommand,
    userCommand,
    helpCommand,
];
const CommandCollection = new discord_js_1.Collection();
for (const command of exports.COMMANDS) {
    CommandCollection.set((_a = command.data) === null || _a === void 0 ? void 0 : _a.name, command);
}
/**
 * Listen for commands from the Discord Server
 * @param client - the target Discord Client
 */
const addListener = (client) => {
    // Add the command listener
    client.on(discord_js_1.Events.InteractionCreate, (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        if (!interaction.isChatInputCommand())
            return;
        const interactionCommand = interaction.client.commands.get(interaction.commandName);
        if (!interactionCommand) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
        try {
            yield interactionCommand.execute(interaction);
        }
        catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                yield interaction.followUp({ content: "There was an error while executing this command!", ephemeral: true });
            }
            else {
                yield interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
            }
        }
    }));
};
/**
 * Deploy the commands to the Discord Server
 * @param client - the target Discord Client
 */
const sendToDiscord = () => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    const rest = new discord_js_1.REST({ version: "10" }).setToken((_b = process.env.DISCORD_TOKEN) !== null && _b !== void 0 ? _b : "");
    try {
        console.log(`Started refreshing ${exports.COMMANDS.length} application (/) commands.`);
        yield rest.put(discord_js_1.Routes.applicationGuildCommands((_c = process.env.CLIENT_ID) !== null && _c !== void 0 ? _c : "", (_d = process.env.GUILD_ID) !== null && _d !== void 0 ? _d : ""), {
            body: exports.COMMANDS.map(command => command.data.toJSON())
        });
        console.log(`Successfully reloaded application (/) commands.`);
    }
    catch (error) {
        console.error(error);
    }
});
/**
 * Register all commands
 * @param client - the target Discord Server
 */
const registerCommands = (client) => __awaiter(void 0, void 0, void 0, function* () {
    client.commands = CommandCollection;
    yield addListener(client);
    yield sendToDiscord();
});
exports.default = registerCommands;
