import { hideFirstPageDiv } from "../helpers/hideFirstPageDiv.js";
import { traverseObject } from "../helpers/traverseObject.js";
import { buildOneQuestionElement } from "../helpers/buildOneQuestion.js";
import { sleep } from "../helpers/waitHelper.js";
import { _forIn } from "lodash/forIn";
import { _isEmpty } from "lodash/isEmpty";
import { CONFIG_JSON_KEYS as fields } from "../constants/config-fields.js";

export let QId,
  OptionId,
  filtered_questions,
  filtered_options,
  questionsArray,
  idArray = "";

let answers = {};
let output = [];

export default class SurveyQuestion {
  constructor(questionsSection) {
    this.questionsSection = questionsSection;
  }

  showQuestionsPage() {
    // on click of start survey -> renders question page
    hideFirstPageDiv();
    questionsArray = traverseObject(this.questionsSection, fields.QUESTIONS);
    _.isEmpty(questionsArray)
      ? this.dispThankyouPage()
      : buildOneQuestionElement(_.first(questionsArray), this.questionsSection);
  }

  async getNextQuestion(question_id, option_id, questionsSection2) {
    await sleep(400);
    //0.4 seconds later...

    // storing in output array to finally display all the id's selected
    output.push(this.collectAnswers(question_id, option_id, answers).newObject);

    let conditionsSection = traverseObject(
      questionsSection2,
      fields.CONDITIONS
    );

    let elemt = document.getElementById("containerdiv");
    elemt.parentNode.removeChild(elemt);

    let nextQuestionId = -1;
    let filtered_array = _.filter(conditionsSection, function (cond) {
      if (
        cond.questionId === question_id &&
        cond.optionId === option_id &&
        cond.nextQuestion !== "-1"
      ) {
        return cond;
      }
    });

    nextQuestionId = _.isEmpty(filtered_array[0])
      ? -1
      : filtered_array[0].nextQuestion;

    if (nextQuestionId == -1) {
      this.dispThankyouPage();
    } else {
      _.forIn(questionsArray, function (value, key) {
        if (value.questionId === nextQuestionId) {
          buildOneQuestionElement(value, questionsSection2);
        }
      });
    }
  }

  dispThankyouPage() {
    questionsPage.style.display = "none";
    thankYouPage.style.display = "block";
    console.log("Logging selected options here:\n");
    console.log(JSON.stringify(output));
  }

  collectAnswers(question_id, option_id, answers) {
    const newObject = { ...answers };
    newObject[question_id] = option_id;
    return { newObject };
  }
}
