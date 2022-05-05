import { BotRunner } from "./botrunner"
import { Intents } from "discord.js"
import { Ping } from './commands/ping';
import { Question } from './commands/question';
import { QuestionButton } from './buttons/question_button';
import { Matsuya } from "./commands/matsuya";
import { Reacter } from "./message_listeners/reacter";
import { Saize } from "./commands/saize";

require('dotenv').config();

if(process.env.TEST_TOKEN == undefined) {
    console.log("TEST_TOKEN not found");
} else {
    new BotRunner({
        name: "Test",
        token: process.env.TEST_TOKEN,
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
        ],
        commands: [
            new Ping,
            new Question,
            new Matsuya,
            new Saize
        ],
        buttons: [
            new QuestionButton
        ],
        messageListeners: [
            new Reacter
        ]
    }).awake();
}

if(process.env.QUESTIONNAIRE_BOT_TOKEN == undefined) {
    console.log("QUESTIONNAIRE_BOT_TOKEN not found");
} else {
    new BotRunner({
        name: "Questionnaire Bot",
        token: process.env.QUESTIONNAIRE_BOT_TOKEN,
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
        ],
        commands: [
            new Question,
        ],
        buttons: [
            new QuestionButton
        ]
    }).awake();
}

if(process.env.YAROWA_BOT_TOKEN == undefined) {
    console.log("YAROWA_BOT_TOKEN not found");
} else {
    new BotRunner({
        name: "Yarowa Bot",
        token: process.env.YAROWA_BOT_TOKEN,
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
        ],
        commands: [
            new Matsuya,
            new Saize
        ],
        messageListeners: [
            new Reacter
        ]
    }).awake();
}
