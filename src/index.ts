import { BotRunner } from "./botrunner"
import { Intents } from "discord.js"
import { Ping } from './commands/ping';
import { Question } from './commands/question';
import { QuestionButton } from './buttons/question_button';

require('dotenv').config();

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
            new Ping,
            new Question
        ],
        buttons: [
            new QuestionButton
        ]
    }).awake();
}