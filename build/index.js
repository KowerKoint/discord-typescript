"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const questionnaire_1 = require("./bots/questionnaire");
require('dotenv').config();
const bots = [new questionnaire_1.QuestionnaireBot];
bots.forEach(bot => {
    bot.awake();
});
