import { execSync } from "child_process";
import { ApplicationCommandData, Client, CommandInteraction } from "discord.js";
import translate from "google-translate-api";
import { Command } from "../interfaces"

export class Translate implements Command {
    public data : ApplicationCommandData = {
        name: "translate",
        description: "traslate message by DeepL",
        options: [
            {
                type: "STRING",
                name: "message",
                required: true,
                description: "翻訳したい文章"
            },
            {
                type: "STRING",
                name: "lang-to",
                required: true,
                description: "翻訳先言語"
            },
            {
                type: "STRING",
                name: "lang-from",
                description: "翻訳元言語(指定がない場合は自動推定)"
            }
        ]
    };

    async execute(client: Client, interaction: CommandInteraction) {
        const message = interaction.options.getString("message");
        const lang_to = interaction.options.getString("lang-to");
        const lang_from = interaction.options.getString("lang-from");
        if (lang_from == null){
            if (message == null || lang_to == null) return;
            /* translate(message, {to: lang_to}).then(async res => {
                console.log(res.text);
                //=> I speak English
                console.log(res.from.language.iso);
                //=> nl
                await interaction.reply(res.text);
            }).catch(err => {
                console.error(err);
            }); */
            translate('Ik spreek Engels', {to: 'en'}).then(async res => {
                console.log(res.text);
                //=> I speak English
                console.log(res.from.language.iso);
                //=> nl
                await interaction.reply(res.text);
            }).catch(err => {
                console.error(err);
            });
        }else{
            if (message == null || lang_to == null) return;
            translate(message, {to: lang_to, from:lang_from}).then(async res => {
                console.log(res.text);
                //=> I speak English
                console.log(res.from.language.iso);
                //=> nl
                await interaction.reply(res.text);
            }).catch(err => {
                console.error(err);
            });
        }
    }


}