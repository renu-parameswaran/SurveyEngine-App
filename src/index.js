import styles from "./styles/style.css";
import config_json from "./input.json";
import { FIELD_IDS as fields } from "./config-fields.js";
import questions from "./questions";
const _ = require("lodash");

var text1 = "";
var text2 = "";
let result = _.filter(config_json.sections, { sectionType: "WELCOME" });

_.isEmpty(result) ? showquestionPage() : showWelcomePage();

document.getElementById("elem").onclick = function () {
  hidden.style.display = "none";
  questionsPage.style.display = "block";
  questions();
};

function showquestionPage() {
  hidden.style.display = "none";
  questionsPage.style.display = "block";
  questions();
}

function showWelcomePage() {
  text1 += _.isEmpty(result[0].welcomeText)
    ? "" + "<br>"
    : result[0].welcomeText;
  text2 += _.isEmpty(result[0].startText) ? "START" : result[0].startText;

  document.getElementById("welcometext").innerHTML = text1;
  document.getElementById("buttontext").innerHTML = text2;
}
