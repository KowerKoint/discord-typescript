import { BotRunner } from './interfaces';
import { QuestionnaireBot } from './bots/questionnaire'


const bots: BotRunner[] = [ new QuestionnaireBot ];
bots.forEach(bot => {
    bot.awake();
});
