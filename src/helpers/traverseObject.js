import { CONFIG_JSON_KEYS as fields } from "../constants/config-fields.js";
import _forIn from "lodash/forIn";
import _isObject from "lodash/isObject";
import _isEmpty from "lodash/isEmpty";

export default function traverseObject(obj, field) {
  let resultsArray = "";
  _forIn(obj, function (val, key1) {
    if (_isObject(val)) {
      _forIn(val, function (el, key2) {
        if (_isObject(el)) {
          if (
            key2 === field &&
            (key2 === fields.QUESTIONS || key2 === fields.CONDITIONS)
          ) {
            resultsArray = el;
          }
          traverseObject(el, field);
        }
      });
    }
    if (_isObject(key1)) {
      traverseObject(obj[key1]);
    }
  });
  return resultsArray;
}
