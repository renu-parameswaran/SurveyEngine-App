import filterFunction from "./filterFunction.js";
import traverseObject from "../helpers/traverseObject.js";
import { CONFIG_JSON_KEYS as fields } from "../constants/config-fields.js";
import _isEmpty from "lodash/isEmpty";

export default function getNextQuestionIdHelper(questionsSection) {
  let idArray = localStorage.getItem("event").split(",");
  let question_id = idArray[0];
  let option_id = idArray[1];
  let conditionsSection = traverseObject(questionsSection, fields.CONDITIONS);
  let nextQuestionId = -1;
  let filtered_array = filterFunction(
    conditionsSection,
    "CONDITIONS",
    question_id,
    option_id
  );
  nextQuestionId = _isEmpty(filtered_array[0])
    ? -1
    : filtered_array[0].nextQuestion;
  return nextQuestionId;
}
