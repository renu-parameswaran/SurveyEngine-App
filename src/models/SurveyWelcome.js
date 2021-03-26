import { CONFIG_JSON_KEYS as fields } from "../constants/config-fields.js";
export default class SurveyWelcome {
  constructor(welcomeSection) {
    this.welcomeSection = welcomeSection;
  }
  showWelcomePage() {
    const text1 = this.welcomeSection[0][fields["WELCOME_TEXT"]] || "";
    const text2 = this.welcomeSection[0][fields["START_TEXT"]] || "";
    document.getElementById("welcometext").innerHTML = text1;
    document.getElementById("buttontext").innerHTML = text2;
  }
}
