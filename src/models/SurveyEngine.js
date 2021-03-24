import { _isEmpty } from "lodash/isEmpty";
import { _filter } from "lodash/filter";
import { _upperCase } from "lodash/upperCase";
import { CONFIG_JSON_KEYS as fields } from "../constants/config-fields.js";
import SurveyWelcome from "./SurveyWelcome.js";
import SurveyQuestion from "./SurveyQuestion.js";

export default class SurveyEngine {
  constructor(config) {
    this.config = config;
  }

  init() {
    // form the welcome screen or question screen based
    // on the config JSON provided.

    let welcomeSection = _.filter(
      this.config[fields["SECTIONS"]],
      function (obj1) {
        return _.upperCase(obj1[fields.SECTION_TYPE]) === "WELCOME";
      }
    );
    let questionsSection = _.filter(
      this.config[fields["SECTIONS"]],
      function (obj2) {
        return _.upperCase(obj2[fields.SECTION_TYPE]) === "QUESTIONS";
      }
    );

    const surveyWelcomeObj = new SurveyWelcome(welcomeSection);
    const surveyQuestionObj = new SurveyQuestion(questionsSection);

    _.isEmpty(welcomeSection)
      ? surveyQuestionObj.showQuestionsPage()
      : surveyWelcomeObj.showWelcomePage();

    // on click of start survey button from welcome page
    document.getElementById("elem").onclick = function () {
      surveyQuestionObj.showQuestionsPage();
    };
  }
}
