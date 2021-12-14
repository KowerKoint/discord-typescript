import { BotRunner } from './interfaces';
import { QuestionnaireBot } from './bots/questionnaire'

require('dotenv').config();

const bots: BotRunner[] = [ new QuestionnaireBot ];
bots.forEach(bot => {
    bot.awake();
});
