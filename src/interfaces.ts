import { ApplicationCommandData, ButtonInteraction, Client, CommandInteraction } from "discord.js";

export interface Command {
    data: ApplicationCommandData,
    execute(client: Client, interaction: CommandInteraction): Promise<void>;
}

export interface Button {
    pushed(interaction: ButtonInteraction): Promise<void>
}

export interface BotInfo {
    name: string,
    token: string,
    intents: number[],
    commands: Command[],
    buttons: Button[]
}
