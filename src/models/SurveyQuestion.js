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
    this.data = new WeakMap();
    this.data.set(this, {
      questionsArray: {},
    });
  }

  showQuestionsPage(nextQId, callback) {
    // on click of start survey -> renders question page
    const data = this.data.get(this);
    let questionsArray = data.questionsArray;
    hideFirstPageDiv();
    questionsArray = traverseObject(this.questionsSection, fields.QUESTIONS);

    if (!_isEmpty(questionsArray))
      this.populateFirstQuestionOrNextQuestion(questionsArray, nextQId);
    else callback();
  }

  populateFirstQuestionOrNextQuestion(arrayObj, nextQID) {
    _isEmpty(nextQID)
      ? buildOneQuestionElement(_first(arrayObj))
      : _forIn(arrayObj, function (value, key) {
          if (_isEmpty(nextQID)) buildOneQuestionElement(_first(arrayObj));
          if (value.questionId === nextQID) {
            buildOneQuestionElement(value);
          }
        });
  }
}
