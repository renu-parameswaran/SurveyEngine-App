import filterFunction from "./filterFunction.js";
import traverseObject from "../helpers/traverseObject.js";
import { CONFIG_JSON_KEYS as fields } from "../constants/config-fields.js";
import _isEmpty from "lodash/isEmpty";

export default function getNextQuestionIdHelper(qid, oid, questionsSection) {
  let conditionsSection = traverseObject(questionsSection, fields.CONDITIONS);
  let nextQuestionId = -1;
  let filtered_array = filterFunction(
    conditionsSection,
    "CONDITIONS",
    qid,
    oid
  );
  nextQuestionId = _isEmpty(filtered_array[0])
    ? -1
    : filtered_array[0].nextQuestion;
  return nextQuestionId;
}
