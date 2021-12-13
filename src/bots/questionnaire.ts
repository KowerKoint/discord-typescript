import process from "process";
import { BotRunner} from "../interfaces"
import { Client, Intents, Message } from "discord.js";

require('dotenv').config();

export class QuestionnaireBot implements BotRunner {
    private token = process.env.QUESTIONNAIRE_BOT_TOKEN;

    awake() {
        console.log('awaked');
        const client = new Client({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
            ]
        });
        
        client.once('ready', this.on_ready);
        client.on('messageCreate', this.on_message);

        client.login(this.token);
    }
    
    async on_message(message: Message) {
        if(message.author.bot) return;
        if(message.content === 'ping') {
            message.channel.send('pong');
        }
    }
    
    async on_ready() {
        console.log('QuestionnaireBot is ready!');
    }
}
