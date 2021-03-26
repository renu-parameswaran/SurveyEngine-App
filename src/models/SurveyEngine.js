import _isEmpty from "lodash/isEmpty";
import { CONFIG_JSON_KEYS as fields } from "../constants/config-fields.js";
import SurveyWelcome from "./SurveyWelcome.js";
import SurveyQuestion from "./SurveyQuestion.js";
import filterFunction from "../helpers/filterFunction.js";
import eventListenerHelper from "../helpers/eventListenerHelper.js";
import sleep from "../helpers/waitHelper.js";
import SurveyThankyou from "./SurveyThankyou.js";
import SurveyAnswers from "./SurveyAnswers.js";

// declaring object variables
let surveyWelcomeObj,
  surveyQuestionObj,
  surveyThankyouObj,
  SurveyAnswersObj = "";

export default class SurveyEngine {
  constructor(config) {
    this.config = config;
    this.welcomeSection = "";
    this.questionsSection = "";
    this.outputlogs = {};
  }

  init() {
    // form the welcome screen or question screen based
    // on the config JSON provided.

    this.welcomeSection = filterFunction(
      this.config[fields["SECTIONS"]],
      "WELCOME"
    );

    this.questionsSection = filterFunction(
      this.config[fields["SECTIONS"]],
      "QUESTIONS"
    );

    // initializing class instances
    surveyWelcomeObj = new SurveyWelcome(this.welcomeSection);
    surveyQuestionObj = new SurveyQuestion(this.questionsSection);
    surveyThankyouObj = new SurveyThankyou(this.outputlogs);
    SurveyAnswersObj = new SurveyAnswers(this.outputlogs);

    _isEmpty(this.welcomeSection)
      ? surveyQuestionObj.showQuestionsPage("", this.displayThankyouPage)
      : surveyWelcomeObj.showWelcomePage();

    // on click of start survey button from welcome page
    document.getElementById("elem").onclick = function () {
      _isEmpty(this.questionsSection)
        ? surveyQuestionObj.showQuestionsPage("", this.displayThankyouPage)
        : surveyQuestionObj.showQuestionsPage();
    }.bind(this);

    eventListenerHelper(this.getNextQuestion, this.questionsSection);
  }

  async getNextQuestion(nextQuestionId) {
    await sleep(400);
    //0.4 seconds later...
    // to get question id and option id from the event
    let output_ids = localStorage.getItem("event").split(",");
    // calling collectAnswers to store and finally display all the id's selected
    SurveyAnswersObj.collectAnswers(output_ids[0], output_ids[1]);
    // to hide and remove previous node
    let elemt = document.getElementById("containerdiv");
    elemt.parentNode.removeChild(elemt);

    if (nextQuestionId == -1) {
      surveyThankyouObj.dispThankyouPage();
    } else {
      surveyQuestionObj.showQuestionsPage(nextQuestionId);
    }
  }

  displayThankyouPage() {
    surveyThankyouObj.dispThankyouPage();
  }
}
