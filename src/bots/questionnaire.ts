import process from "process";
import { BotRunner, Command} from "../interfaces"
import { Client, Intents, Interaction } from "discord.js";
import { Ping } from "../commands/ping";

export class QuestionnaireBot implements BotRunner {
    private client = new Client({
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
        ]
    });
    private commands: Command[] = [
        new Ping
    ];

    async awake() {
        this.client.once('ready', () => { this.on_ready(); });
        this.client.on('interactionCreate', (interaction) => { this.on_interaction(interaction); });

        const token = process.env.QUESTIONNAIRE_BOT_TOKEN;
        this.client.login(token);
    }
    
    async on_interaction(interaction: Interaction) {
        if(interaction.isCommand()) {
            this.commands.forEach(async (command) => {
                if(interaction.commandName === command.data.name) {
                    await command.execute(this.client, interaction);
                }
            });
        }
    }
    
    async on_ready() {
        this.commands.forEach(async command => {
            await this.client.application?.commands.set([command.data]);
        })
        console.log('QuestionnaireBot is ready!');
    }
}
