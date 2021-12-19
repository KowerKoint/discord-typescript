import { ApplicationCommandData, Client, CommandInteraction, DiscordAPIError, EmbedFieldData, MessageActionRow, MessageButton, MessageEmbed, MessageEmbedOptions } from "discord.js";
import { Command } from "../interfaces"

export class Question implements Command {
    public data: ApplicationCommandData = {
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
        ]
    };

    async execute(client: Client, interaction: CommandInteraction) {
        const option_indexes = [
            "option1",
            "option2",
            "option3",
            "option4",
            "option5",
        ];
        const options: string[][] = [];
        option_indexes.forEach((option_index) => {
            const option = interaction.options.getString(option_index);
            if(option !== null) {
                options.push([option_index, option]);
            }
        });
        if(options.length == 0) {
            options.push(["yes", "はい"]);
            options.push(["no", "いいえ"]);
        }
        const embed: MessageEmbedOptions = {};
        embed.title = interaction.options.getString("question")!;
        const buttons: MessageButton[] = [];
        const fields: EmbedFieldData[] = [];
        options.forEach((option) => {
            fields.push({
                "name": option[1],
                "value": "回答者: "
            });
            buttons.push(new MessageButton()
                .setCustomId("question" + "_" + interaction.id + "_" + option[0])
                .setStyle("PRIMARY")
                .setLabel(option[1])
                );
        });
        embed.fields = fields;
        console.log(options);
        try {
            await interaction.reply({
                content: "アンケートが作成されました",
                embeds: [ embed ],
                components: [ new MessageActionRow().addComponents(buttons) ]
            }).then(() => {
                console.log("replied in question");
            });
        } catch (e) {
            await interaction.reply("エラーが発生しました:\n" + e);
            console.log(e);
        }
    }
}
