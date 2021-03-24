import { _isEmpty } from "lodash/isEmpty";
import { _filter } from "lodash/filter";
import { CONFIG_JSON_KEYS as fields } from "../constants/config-fields.js";

let { text1, text2 } = "";

export default class SurveyWelcome {
  constructor(welcomeSection) {
    this.welcomeSection = welcomeSection;
  }

  showWelcomePage() {
    text1 = _.isEmpty(this.welcomeSection[0][fields["WELCOME_TEXT"]])
      ? ""
      : this.welcomeSection[0][fields["WELCOME_TEXT"]];
    text2 = _.isEmpty(this.welcomeSection[0][fields["START_TEXT"]])
      ? "START"
      : this.welcomeSection[0][fields["START_TEXT"]];

    !_.isEmpty(text1)
      ? (document.getElementById("welcometext").innerHTML = text1)
      : "";
    !_.isEmpty(text2)
      ? (document.getElementById("buttontext").innerHTML = text2)
      : "";
  }
}
