import process from "process";
import { BotRunner} from "../interfaces"
import { ApplicationCommandData, Client, Intents, Interaction, Message } from "discord.js";

require('dotenv').config();

export class QuestionnaireBot implements BotRunner {
    private token = process.env.QUESTIONNAIRE_BOT_TOKEN;
    private client: Client | null = null;

    awake() {
        console.log('awaked');
        this.client = new Client({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
            ]
        });
        
        this.client.once('ready', this.on_ready);
        this.client.on('messageCreate', this.on_message);
        this.client.on("interactionCreate", this.on_interaction);

        this.client.login(this.token);
    }
    
    async on_interaction(interaction: Interaction) {
        console.log(interaction);
        if(interaction.isCommand()) {
            if(interaction.commandName === 'ping') {
                await interaction.reply('Pong!');
            }
        }
    }
    
    async on_message(message: Message) {
        if(message.author.bot) return;
        if(message.content === 'ping') {
            message.channel.send('pong');
        }
    }
    
    async on_ready() {
        const data: ApplicationCommandData[] = [
            {
                name: "ping",
                description: "Replies with Pong!"
            }
        ];
        this.client?.application?.commands.set(data, '695951623964590090').then(c => {
            console.log(c);
        })
        console.log('QuestionnaireBot is ready!');
    }
}
