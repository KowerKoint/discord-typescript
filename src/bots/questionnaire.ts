import { BotRunner, Button, Command} from "../interfaces"
import { Client, Intents, Interaction } from "discord.js";
import { Ping } from "../commands/ping";
import { Question } from "../commands/question";
import { QuestionButton } from "../buttons/questino_button";

export class QuestionnaireBot implements BotRunner {
    private client = new Client({
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
        ]
    });
    private commands: Command[] = [
        new Ping,
        new Question,
    ];
    private buttons: Button[] = [
        new QuestionButton
    ];

    async awake() {
        this.client.once('ready', () => { this.on_ready(); });
        this.client.on('interactionCreate', (interaction) => { this.on_interaction(interaction); });

        const token = process.env.QUESTIONNAIRE_BOT_TOKEN;
        this.client.login(token);
    }
    
    async on_interaction(interaction: Interaction) {
        if(interaction.isButton()) {
            this.buttons.forEach(async (button) => {
                await button.pushed(interaction);
            });
        }
        if(interaction.isCommand()) {
            this.commands.forEach(async (command) => {
                if(interaction.commandName === command.data.name) {
                    await command.execute(this.client, interaction);
                }
            });
        }
    }
    
    async on_ready() {
        /*
        this.commands.forEach(async (command) => {
            await this.client.application?.commands.create(command.data);
        });
        */
        await this.client.application?.commands
            .set(this.commands.map((com) => com.data))
            .then(() => { console.log("commands added"); });
        console.log('QuestionnaireBot is ready!');
    }
}
