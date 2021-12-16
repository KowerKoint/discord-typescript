"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const discord_js_1 = require("discord.js");
class Question {
    constructor() {
        this.data = {
            name: "question",
            description: "アンケートを取る",
            options: [
                {
                    type: "STRING",
                    name: "question",
                    required: true,
                    description: "質問"
                },
                {
                    type: "STRING",
                    name: "option1",
                    description: "1つ目の選択肢"
                },
                {
                    type: "STRING",
                    name: "option2",
                    description: "2つ目の選択肢"
                },
                {
                    type: "STRING",
                    name: "option3",
                    description: "3つ目の選択肢"
                },
                {
                    type: "STRING",
                    name: "option4",
                    description: "4つ目の選択肢"
                },
                {
                    type: "STRING",
                    name: "option5",
                    description: "5つ目の選択肢"
                },
                {
                    type: "STRING",
                    name: "option6",
                    description: "6つ目の選択肢"
                },
                {
                    type: "STRING",
                    name: "option7",
                    description: "7つ目の選択肢"
                },
                {
                    type: "STRING",
                    name: "option8",
                    description: "8つ目の選択肢"
                },
                {
                    type: "STRING",
                    name: "option9",
                    description: "9つ目の選択肢"
                },
                {
                    type: "STRING",
                    name: "option10",
                    description: "10個目の選択肢"
                },
            ]
        };
    }
    async execute(client, interaction) {
        const option_indexes = [
            "option1",
            "option2",
            "option3",
            "option4",
            "option5",
            "option6",
            "option7",
            "option8",
            "option9",
            "option10",
        ];
        const options = [];
        option_indexes.forEach((option_index) => {
            const option = interaction.options.getString(option_index);
            if (option !== null) {
                options.push([option_index, option]);
            }
        });
        if (options.length == 0) {
            options.push([interaction.id + "_yes", "はい"]);
            options.push([interaction.id + "_no", "いいえ"]);
        }
        const embed = {};
        embed.title = interaction.options.getString("question");
        const buttons = [];
        const fields = [];
        options.forEach((option) => {
            fields.push({
                "name": option[1],
                "value": "回答者: "
            });
            buttons.push(new discord_js_1.MessageButton()
                .setCustomId(interaction.id + "_" + option[0])
                .setStyle("PRIMARY")
                .setLabel(option[1]));
        });
        embed.fields = fields;
        console.log(options);
        await interaction.reply({
            content: "アンケートが作成されました",
            embeds: [embed],
            components: [new discord_js_1.MessageActionRow().addComponents(buttons)]
        }).then(() => {
            console.log("replied in question");
        });
    }
}
exports.Question = Question;
