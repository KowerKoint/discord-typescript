"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionnaireBot = void 0;
const discord_js_1 = require("discord.js");
const ping_1 = require("../commands/ping");
const question_1 = require("../commands/question");
class QuestionnaireBot {
    client = new discord_js_1.Client({
        intents: [
            discord_js_1.Intents.FLAGS.GUILDS,
            discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        ]
    });
    commands = [
        new ping_1.Ping,
        new question_1.Question,
    ];
    async awake() {
        this.client.once('ready', () => { this.on_ready(); });
        this.client.on('interactionCreate', (interaction) => { this.on_interaction(interaction); });
        const token = process.env.QUESTIONNAIRE_BOT_TOKEN;
        this.client.login(token);
    }
    async on_interaction(interaction) {
        if (interaction.isButton()) {
            const message = interaction.message;
            const embed = message.embeds[0];
            const button = interaction.component;
            if (message.type != "APPLICATION_COMMAND")
                return;
            if (button?.type !== "BUTTON")
                return;
            if (embed.fields == undefined)
                return;
            const label = button.label;
            const mention = "<@!" + interaction.user.id + ">";
            var cleared = false;
            embed.fields.map((field) => {
                const words = field.value.split(' ');
                if (field.name === label) {
                    if (words.indexOf(mention) >= 0) {
                        cleared = true;
                        field.value = words
                            .filter((word) => word !== mention)
                            .join(' ');
                    }
                    else {
                        field.value += ' ' + mention;
                    }
                }
                return field;
            });
            await message.edit({
                embeds: [embed],
            }).then(async () => {
                console.log("button pushed");
                if (cleared) {
                    await interaction.reply({
                        content: "回答を撤回しました",
                        ephemeral: true
                    });
                }
                else {
                    await interaction.reply({
                        content: "回答しました",
                        ephemeral: true
                    });
                }
            });
        }
        if (interaction.isCommand()) {
            this.commands.forEach(async (command) => {
                if (interaction.commandName === command.data.name) {
                    await command.execute(this.client, interaction);
                }
            });
        }
    }
    async on_ready() {
        await this.client.application?.commands
            .set(this.commands.map((com) => com.data))
            .then(() => { console.log("commands added"); });
        console.log('QuestionnaireBot is ready!');
    }
}
exports.QuestionnaireBot = QuestionnaireBot;
