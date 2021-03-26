import { CONFIG_JSON_KEYS as fields } from "../constants/config-fields.js";
import _isEmpty from "lodash/isEmpty";

export default function filterFunction(obj1, obj2, q_id, o_id) {
  let output = "";
  if (!_isEmpty(q_id) && !_isEmpty(o_id) && obj2 === "CONDITIONS")
    output = obj1.filter(
      (ob1) =>
        ob1.questionId === q_id &&
        ob1.optionId === o_id &&
        ob1.nextQuestion !== "-1"
    );
  else
    output = obj1.filter(
      (ob) => ob[fields.SECTION_TYPE].toUpperCase() === obj2
    );

  return output;
}
