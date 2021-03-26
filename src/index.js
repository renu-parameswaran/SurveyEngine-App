import "./styles/style.css";
import SurveyEngine from "./models/SurveyEngine.js";
import config_json from "./input.json";

window.onload = getSurveyConfig(config_json);

function getSurveyConfig(config_json) {
  const surveyEngine = new SurveyEngine(config_json);
  surveyEngine.init();
}
