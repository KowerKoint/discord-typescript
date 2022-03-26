import { execSync } from "child_process";
import { Client, CommandInteraction } from "discord.js";
import { Command } from "../interfaces"

export class Saize implements Command {
    public data = {
        name: "saize",
        description: "generate menu that seems to exist in saizeriya"
    };

    async execute(client: Client, interaction: CommandInteraction) {
        const stdout = execSync('saize');
        await interaction.reply(stdout.toString());
    }
}