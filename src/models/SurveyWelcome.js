import { CONFIG_JSON_KEYS as fields } from "../constants/config-fields.js";
import _isEmpty from "lodash/isEmpty";

export default class SurveyWelcome {
  constructor(welcomeSection) {
    this.welcomeSection = welcomeSection;
    this.data = new WeakMap();
    this.data.set(this, {
      text1: "",
      text2: "",
    });
  }
  showWelcomePage() {
    const data = this.data.get(this);
    let getText1 = data.text1;
    let getText2 = data.text2;
    getText1 = _isEmpty(this.welcomeSection[0][fields["WELCOME_TEXT"]])
      ? ""
      : this.welcomeSection[0][fields["WELCOME_TEXT"]];
    getText2 = _isEmpty(this.welcomeSection[0][fields["START_TEXT"]])
      ? "START"
      : this.welcomeSection[0][fields["START_TEXT"]];
    this.data.set({ getText1, getText2 });

    !_isEmpty(getText1)
      ? (document.getElementById("welcometext").innerHTML = getText1)
      : "";
    !_isEmpty(getText2)
      ? (document.getElementById("buttontext").innerHTML = getText2)
      : "";
  }
}
