import { execSync } from "child_process";
import { Client, CommandInteraction } from "discord.js";
import { Command } from "../interfaces"

export class Matsuya implements Command {
    public data = {
        name: "matsuya",
        description: "generate menu that seems to exist in matsuya"
    };

    async execute(client: Client, interaction: CommandInteraction) {
        const stdout = execSync('matsuya');
        await interaction.reply(stdout.toString());
    }
}