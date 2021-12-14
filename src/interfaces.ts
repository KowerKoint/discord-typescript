import { ApplicationCommandData, Client, CommandInteraction } from "discord.js";

export interface BotRunner {
    awake(): Promise<void>;
}

export interface Command {
    data: ApplicationCommandData,
    execute(client: Client, interaction: CommandInteraction): Promise<void>;
}
