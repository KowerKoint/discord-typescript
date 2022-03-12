import { BotInfo, Button, Command, MessageListener} from "./interfaces"
import { Client, Interaction, Message } from "discord.js";

export class BotRunner {
    private name: string;
    private token: string;
    private client: Client;
    private commands: Command[] = [];
    private buttons: Button[] = [];
    private messageListeners: MessageListener[] = [];
    
    constructor(info: BotInfo) {
        this.name = info.name;
        this.token = info.token;
        this.client = new Client({intents: info.intents});
        if(info.commands != undefined) {
            this.commands = info.commands;
        }
        if(info.buttons != undefined) {
            this.buttons = info.buttons;
        }
        if(info.messageListeners != undefined) {
            this.messageListeners = info.messageListeners;
        }
    }

    async awake() {
        this.client.once('ready', () => { this.on_ready(); });
        this.client.on('interactionCreate', (interaction) => { this.on_interaction(interaction); });
        this.client.on('messageCreate', (message) => { this.on_message(message); });
        this.client.login(this.token);
    }

    async on_interaction(interaction: Interaction) {
        const guild = interaction.guild;
        if(guild !== null) {
            await guild.fetch();
        }
        await interaction.user.fetch();
        if(interaction.isButton()) {
            await Promise.all(this.buttons.map(async (button) => {
                await button.pushed(interaction);
            }));
        }
        if(interaction.isCommand()) {
            await Promise.all(this.commands.map(async (command) => {
                if(interaction.commandName === command.data.name) {
                    await command.execute(this.client, interaction);
                }
            }));
        }
    }
    
    async on_message(message: Message) {
        await Promise.all(this.messageListeners.map(async (messageListener) => {
            await messageListener.listen(message);
        }));
    }

    async on_ready() {
        await this.client.application?.commands
            .set(this.commands.map((com) => com.data))
            .then(() => { console.log("commands added"); });
        console.log(this.name + ' is ready!');
    }
}
