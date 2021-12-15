import { BotRunner, Command} from "../interfaces"
import { Client, Intents, Interaction } from "discord.js";
import { Ping } from "../commands/ping";
import { Question } from "../commands/question";

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

    async awake() {
        this.client.once('ready', () => { this.on_ready(); });
        this.client.on('interactionCreate', (interaction) => { this.on_interaction(interaction); });

        const token = process.env.QUESTIONNAIRE_BOT_TOKEN;
        this.client.login(token);
    }
    
    async on_interaction(interaction: Interaction) {
        if(interaction.isButton()) {
            const message = interaction.message;
            const embed = message.embeds[0];
            const button = interaction.component;
            if(message.type != "APPLICATION_COMMAND") return;
            if(button?.type !== "BUTTON") return;
            if(embed.fields == undefined) return;
            const label = button.label;
            const mention = "<@!" + interaction.user.id + ">";
            var cleared = false;
            embed.fields.map((field) => {
                const words = field.value.split(' ');
                if(field.name === label) {
                    if(words.indexOf(mention) >= 0) {
                        cleared = true;
                        field.value = words
                            .filter((word) => word !== mention)
                            .join(' ');
                    } else {
                        field.value += ' ' + mention;
                    }
                }
                return field;
            });
            await message.edit({
                embeds: [ embed ],
            }).then(async () => {
                console.log("button pushed");
                if(cleared) {
                    await interaction.reply({
                        content: "回答を撤回しました",
                        ephemeral: true
                    });
                } else {
                    await interaction.reply({
                        content: "回答しました",
                        ephemeral: true
                    });
                }
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
