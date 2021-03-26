export default class SurveyThankyou {
  constructor(outputArray) {
    this.outputArray = outputArray;
  }
  dispThankyouPage() {
    questionsPage.style.display = "none";
    thankYouPage.style.display = "block";
    console.log("Logging selected options here:\n");
    console.log(JSON.stringify(this.outputArray));
  }
}
