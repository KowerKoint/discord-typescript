import { ApplicationCommandData, Client, CommandInteraction } from "discord.js";
import { Command } from "../interfaces";

export class Dice implements Command {
    public data: ApplicationCommandData = {
        name: "dice",
        description: "roll dice of given faces",
        options: [
            {
                type: "INTEGER",
                name: "faces",
                required: true,
                description: "面の数"
            }
        ]
    };

    async execute(_client: Client, interaction: CommandInteraction) {
        const faces = interaction.options.getInteger("faces", true);
        await interaction.reply((Math.floor(Math.random() * faces) + 1).toString());
    }
}
