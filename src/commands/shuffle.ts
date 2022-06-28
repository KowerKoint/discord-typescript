import { ApplicationCommandData, Client, CommandInteraction } from "discord.js";
import { Command } from "../interfaces";

export class Shuffle implements Command {
    public data: ApplicationCommandData = {
        name: "shuffle",
        description: "shuffle args",
        options: [
            {
                type: "STRING",
                name: "args",
                required: true,
                description: "対象（空白区切り）"
            }
        ]
    };

    async execute(_client: Client, interaction: CommandInteraction) {
        const args = interaction.options.getString("args", true);
        const arg_list = args.split(' ');
        arg_list.sort(() => Math.random() - 0.5);
        await interaction.reply(`${arg_list.join(' ')}`);
    }
}
