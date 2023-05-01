module.exports = [
  {
    text: null, // type: text
    response_type: null, // type: integer
    response_options: null, // type: string, array: true
    survey_id: null, // type: bigint, null: false
    created_at: null, // type: datetime, null: false
    updated_at: null, // type: datetime, null: false
    display_order: null, // type: integer, default: 0, null: false
    [this["response_options"]]: null, // type: index, name: "index_survey_questions_on_response_options", using: :gin
    [this[("survey_id", "display_order")]]: null, // type: index, name: "index_survey_questions_on_survey_id_and_display_order", unique: true
    [this["survey_id"]]: null, // type: index, name: "index_survey_questions_on_survey_id"
  },
];
