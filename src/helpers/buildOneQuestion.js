import { CONFIG_JSON_KEYS as fields } from "../constants/config-fields.js";
import SurveyQuestion from "../models/SurveyQuestion.js";

export function buildOneQuestionElement(questionsArray, questionSection) {
  let element = document.getElementById("cardelement");

  // Create an unordered list
  let list = document.createElement("ul");

  // Create a fragment
  let fragment = document.createDocumentFragment();

  let div_el = document.createElement("div");
  div_el.classList.add("container");
  div_el.setAttribute("id", "containerdiv");

  // Create a list item for each question
  // and append it to the fragment
  let p_element = document.createElement("p");
  p_element.classList.add("boxcontainer");
  p_element.setAttribute("id", "pelement");

  p_element.textContent = questionsArray[fields.QUESTION];

  fragment.appendChild(p_element);

  let counter = 1;
  questionsArray.options.forEach(function (options_list) {
    var li = document.createElement("li");

    li.classList.add("list-items");
    li.setAttribute("id", "list" + counter);
    let ops = document.createElement("input");
    ops.classList.add("input-elm", "input-radio");
    ops.setAttribute("type", "radio");
    ops.setAttribute("name", "options");
    ops.setAttribute(
      "value",
      questionsArray[fields.QUESTION_ID] + "," + options_list[fields.OPTION_ID]
    );
    ops.setAttribute("id", "radio-" + counter);

    let label_tag = document.createElement("label");

    label_tag.setAttribute("for", "radio-" + counter);
    label_tag.textContent = options_list[fields.TEXT];

    li.appendChild(ops);
    li.appendChild(label_tag);

    fragment.appendChild(li);

    counter++;
  });
  // Append the fragement to the list
  list.appendChild(fragment);
  div_el.appendChild(list);
  element.appendChild(div_el);

  // Inject into the DOM
  let app = document.querySelector("#survey-form");
  app.appendChild(element);

  document.querySelectorAll("input[name='options']").forEach((input) => {
    input.addEventListener("change", handleClick);
  });

  // to handle onClick events in inout button element
  function handleClick(event) {
    let idArray = event.target.value.split(",");
    const SurveyQuestionObj = new SurveyQuestion(questionSection);
    SurveyQuestionObj.getNextQuestion(idArray[0], idArray[1], questionSection);
  }
}
