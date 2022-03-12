import { Message } from "discord.js";
import { MessageListener } from "../interfaces";

export class Reacter implements MessageListener {
    async listen(message: Message): Promise<void> {
        await Promise.all(["うお", "魚"].map(async (str) => {
            if(message.content.indexOf(str) >= 0) {
                await message.react('🐟');
            }
        }));
        await Promise.all(["かー", "car", "車"].map(async (str) => {
            if(message.content.indexOf(str) >= 0) {
                await message.react('🚙');
            }
        }));
    }
}