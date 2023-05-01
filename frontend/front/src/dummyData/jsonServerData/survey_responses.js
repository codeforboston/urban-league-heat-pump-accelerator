module.exports = [
  {
    survey_id: null, // t.bigint, null: false
    survey_visit_id: null, // t.bigint, null: false
    created_at: null, // t.datetime, null: false
    updated_at: null, // t.datetime, null: false
    [this["survey_id"]]: null, // type: index, name: "index_survey_responses_on_survey_id"
    [this["survey_visit_id"]]: null, // type: index, name: "index_survey_responses_on_survey_visit_id"
  },
];
