"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ping = void 0;
class Ping {
    constructor() {
        this.data = {
            name: "ping",
            description: "Replies with Pong!"
        };
    }
    async execute(client, interaction) {
        await interaction.reply("pong");
    }
}
exports.Ping = Ping;
