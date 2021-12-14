import { Client, CommandInteraction } from "discord.js";
import { Command } from "../interfaces"

export class Ping implements Command {
    public data = {
        name: "ping",
        description: "Replies with Pong!"
    };

    async execute(client: Client, interaction: CommandInteraction) {
        interaction.reply("pong");
    }
}
