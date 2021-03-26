export default class SurveyAnswers {
  constructor(outputlogs) {
    this.outputlogs = outputlogs;
  }
  collectAnswers(question_id, option_id) {
    this.outputlogs[question_id] = option_id;
    return this.outputlogs;
  }
}
