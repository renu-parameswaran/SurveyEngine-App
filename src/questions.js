import "./styles/style.css";
import config_json from "./input.json";
import { FIELD_IDS as fields } from "./config-fields.js";
const _ = require("lodash");
import { sleep } from "./waitHelper";

export default function questions() {
  var questions_json,
    results_2,
    results_3 = "";
  var conditionArray = "";

  traverse(config_json);

  var objectArray = {};

  // to traverse object input array using loadash

  function traverse(obj, QId, OptionId) {
    _.forIn(obj, function (val, key) {
      if (_.isArray(val)) {
        val.forEach(function (el) {
          if (_.isObject(el)) {
            if (key === fields.CONDITIONS) {
              conditionArray = val;
            }
            traverse(el, QId, OptionId);
          }
        });
      }
      if (_.isObject(key)) {
        traverse(obj[key]);
      }

      if (key === fields.QUESTIONS) {
        questions_json = val;

        QId == undefined && OptionId == undefined
          ? buildOnequestion(_.first(questions_json))
          : buildSecondquestion(questions_json, QId, OptionId);
      }
    });
  }

  function buildSecondquestion(jsondata, q1, q2) {
    var nextQuestionId = -1;
    let filtered_array = _.filter(conditionArray, function (cond) {
      if (
        cond.questionId === q1 &&
        cond.optionId === q2 &&
        cond.nextQuestion !== "-1"
      ) {
        return cond;
      }
    });

    nextQuestionId = _.isEmpty(filtered_array[0])
      ? -1
      : filtered_array[0].nextQuestion;

    if (nextQuestionId == -1) {
      questionsPage.style.display = "none";
      thankYouPage.style.display = "block";
      console.log("Logging selected options here:\n");

      console.log(JSON.stringify(objectArray));
    } else {
      _.forEach(jsondata, function (value, key) {
        if (value.questionId == nextQuestionId) {
          buildOnequestion(value);
        }
      });
    }
  }

  function buildOnequestion(questionsArray) {
    var element = document.getElementById("cardelement");

    // Create an unordered list
    var list = document.createElement("ul");

    // Create a fragment
    var fragment = document.createDocumentFragment();

    var div_el = document.createElement("div");
    div_el.classList.add("container");
    div_el.setAttribute("id", "containerdiv");

    // Create a list item for each question
    // and append it to the fragment
    var p_element = document.createElement("p");
    p_element.classList.add("boxcontainer");
    p_element.setAttribute("id", "pelement");

    p_element.textContent = questionsArray[fields.QUESTION];

    fragment.appendChild(p_element);

    var counter = 1;
    questionsArray.options.forEach(function (options_list) {
      var li = document.createElement("li");

      li.classList.add("list-items");
      li.setAttribute("id", "list" + counter);
      var ops = document.createElement("input");
      ops.classList.add("input-elm", "input-radio");
      ops.setAttribute("type", "radio");
      ops.setAttribute("name", "options");
      ops.setAttribute(
        "value",
        questionsArray[fields.QUESTION_ID] +
          "," +
          options_list[fields.OPTION_ID]
      );
      ops.setAttribute("id", "radio-" + counter);

      var label_tag = document.createElement("label");

      label_tag.setAttribute("for", "radio-" + counter);
      label_tag.textContent = options_list[fields.TEXT];

      li.appendChild(ops);
      li.appendChild(label_tag);

      fragment.appendChild(li);

      counter++;
    });
    // }

    // Append the fragement to the list
    list.appendChild(fragment);
    div_el.appendChild(list);
    element.appendChild(div_el);

    // Inject into the DOM
    var app = document.querySelector("#survey-form");
    app.appendChild(element);

    document.querySelectorAll("input[name='options']").forEach((input) => {
      input.addEventListener("change", handleClick);
    });
  }

  function handleClick(event) {
    var idArray = event.target.value.split(",");

    results_2 = _.filter(questions_json, { questionId: idArray[0] });

    results_3 = _.filter(results_2[0].options, { optionId: idArray[1] });

    objectArray[results_2[0].question] = results_3[0].text;

    var x = document.querySelector("input[type=radio][name=options]:checked");

    getNextQuestion(idArray[0], idArray[1]);
  }

  async function getNextQuestion(question_id, option_id) {
    await sleep(400);
    //0.4 seconds later...

    traverse(config_json, question_id, option_id);

    var elemt = document.getElementById("containerdiv");
    elemt.parentNode.removeChild(elemt);
  }
}
