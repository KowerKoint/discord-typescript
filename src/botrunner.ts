import { BotInfo, Button, Command} from "./interfaces"
import { Client, Intents, Interaction } from "discord.js";

export class BotRunner {
    private name: string;
    private token: string;
    private client: Client;
    private commands: Command[];
    private buttons: Button[];
    
    constructor(info: BotInfo) {
        this.name = info.name;
        this.token = info.token;
        this.client = new Client({intents: info.intents});
        this.commands = info.commands;
        this.buttons = info.buttons;
    }

    async awake() {
        this.client.once('ready', () => { this.on_ready(); });
        this.client.on('interactionCreate', (interaction) => { this.on_interaction(interaction); });
        this.client.login(this.token);
    }

    async on_interaction(interaction: Interaction) {
        const guild = interaction.guild;
        if(guild !== null) {
            await guild.fetch();
        }
        await interaction.user.fetch();
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
        await this.client.application?.commands
            .set(this.commands.map((com) => com.data))
            .then(() => { console.log("commands added"); });
        console.log('Bot is ready!');
    }

}