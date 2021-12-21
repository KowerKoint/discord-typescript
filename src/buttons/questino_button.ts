import { ButtonInteraction } from "discord.js";
import { Button } from "../interfaces";

export class QuestionButton implements Button {
    async pushed(interaction: ButtonInteraction) {
        console.log(interaction.customId);
        if(interaction.customId.indexOf("question") != 0) return;
        const message = interaction.message;
        const embed = message.embeds[0];
        const button = interaction.component;
        console.log("message=", message);
        console.log("message.type=", message.type);
        if(message.type != "APPLICATION_COMMAND") return;
        if(button?.type !== "BUTTON") return;
        if(embed.fields == undefined) return;
        const label = button.label;
        const mention = "<@!" + interaction.user.id + ">";
        var cleared = false;
        embed.fields.map((field) => {
            const words = field.value.split(' ');
            if(field.name === label) {
                if(words.indexOf(mention) >= 0) {
                    cleared = true;
                    field.value = words
                        .filter((word) => word !== mention)
                        .join(' ');
                } else {
                    field.value += ' ' + mention;
                }
            }
            return field;
        });
        await message.edit({
            embeds: [ embed ],
        }).then(async () => {
            console.log("button pushed");
            if(cleared) {
                await interaction.reply({
                    content: "回答を撤回しました",
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: "回答しました",
                    ephemeral: true
                });
            }
        });
    }
}
