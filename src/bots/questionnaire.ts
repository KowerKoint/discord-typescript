import process from "process";
import { BotRunner, Command} from "../interfaces"
import { Client, Intents, Interaction } from "discord.js";
import { Ping } from "../commands/ping";

require('dotenv').config();

export class QuestionnaireBot implements BotRunner {
    async awake() {
        const client = new Client({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
            ]
        });
        const commands: Command[] = [
            new Ping
        ];
        
        client.once('ready', () => { this.on_ready(client, commands); });
        client.on('interactionCreate', (interaction) => { this.on_interaction(client, commands, interaction); });

        const token = process.env.QUESTIONNAIRE_BOT_TOKEN;
        client.login(token);
        
    }
    
    async on_interaction(client: Client, commands: Command[], interaction: Interaction) {
        if(interaction.isCommand()) {
            commands.forEach(async (command) => {
                if(interaction.commandName === command.data.name) {
                    await command.execute(client, interaction);
                }
            })
        }
    }
    
    async on_ready(client: Client, commands: Command[]) {
        commands.forEach(command => {
            client.application?.commands.set([command.data]);
        })
        console.log('QuestionnaireBot is ready!');
    }
}
