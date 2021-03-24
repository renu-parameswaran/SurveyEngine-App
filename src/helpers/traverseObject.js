import { CONFIG_JSON_KEYS as fields } from "../constants/config-fields.js";
import { _forIn } from "lodash/forIn";
import { _isObject } from "lodash/isObject";

export function traverseObject(obj, field) {
  let resultsArray = "";
  _.forIn(obj, function (val, key1) {
    if (_.isObject(val)) {
      _.forIn(val, function (el, key2) {
        if (_.isObject(el)) {
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
    if (_.isObject(key1)) {
      traverseObject(obj[key1]);
    }
  });
  return resultsArray;
}
