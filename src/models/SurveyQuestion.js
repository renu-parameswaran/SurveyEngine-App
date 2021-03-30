import hideFirstPageDiv from "../helpers/hideFirstPageDiv.js";
import traverseObject from "../helpers/traverseObject.js";
import buildOneQuestionElement from "../helpers/buildOneQuestion.js";
import { CONFIG_JSON_KEYS as fields } from "../constants/config-fields.js";
import _isEmpty from "lodash/isEmpty";
import _first from "lodash/first";
import _forIn from "lodash/forIn";

export default class SurveyQuestion {
  constructor(questionsSection) {
    this.questionsSection = questionsSection;
    this.questionsArray = {};
  }

  showQuestionsPage(nextQId, callback) {
    // renders questions one by one on click of next options
    let questionsArray = this.questionsArray;
    hideFirstPageDiv(); // hide welcome page on click of start survey and renders questions
    questionsArray = traverseObject(this.questionsSection, fields.QUESTIONS);
    // either populate first question or set of next questions based on conditions schema or
    // display thank you page if the config doesn't have questions section
    if (!_isEmpty(questionsArray))
      this.populateFirstQuestionOrNextQuestion(questionsArray, nextQId);
    else callback();
  }

  populateFirstQuestionOrNextQuestion(arrayObj, nextQID) {
    _isEmpty(nextQID)
      ? buildOneQuestionElement(_first(arrayObj))
      : _forIn(arrayObj, function (value) {
          if (_isEmpty(nextQID)) {
            buildOneQuestionElement(_first(arrayObj));
          }
          if (value.questionId === nextQID) {
            buildOneQuestionElement(value);
          }
        });
  }
}
