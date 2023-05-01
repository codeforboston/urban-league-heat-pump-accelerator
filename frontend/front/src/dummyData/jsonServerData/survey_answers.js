module.exports = [
  {
    answer: null, // type: text
    survey_response_id: null, // type: bigint, null: false
    survey_question_id: null, // type: bigint, null: false
    created_at: null, // type: datetime, null: false
    updated_at: null, // type: datetime, null: false
    [this["survey_question_id"]]: null, // type: index, name: "index_survey_answers_on_survey_question_id"
    [this["survey_response_id"]]: null, // type: index, name: "index_survey_answers_on_survey_response_id"
  },
];
