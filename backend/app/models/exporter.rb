# frozen_string_literal: true

class Exporter
  SURVEY_LANG = 'en-US'
  EASTERN_TIMEZONE = 'Eastern Time (US & Canada)'
  CSV_STATIC_HEADERS = {
    id: 'Survey Visit ID',
    public_survey: 'Public Survey',
    home_id: 'Home ID',
    assignment_id: 'Assignment ID',
    assignment_surveyor_ids: 'Assignment Surveyor IDs',
    assignment_surveyor_names: 'Assignment Surveyor Names',
    home_street_number: 'Street Number',
    home_street_name: 'Street Name',
    home_unit_number: 'Unit Number',
    home_city: 'City',
    home_state: 'State',
    home_zip_code: 'ZIP Code',
    home_latitude: 'Home Latitude',
    home_longitude: 'Home Longitude',
    survey_visit_latitude: 'Survey Visit Latitude',
    survey_visit_longitude: 'Survey Visit Longitude',
    survey_visit_time: 'Survey Visit Time',
    surveyor_id: 'Surveyor ID',
    surveyor_name: 'Surveyor Name'
  }.freeze

  def initialize(survey:)
    @survey = survey
  end

  def run(file_path)
    csv_options = { map_headers: CSV_STATIC_HEADERS.merge(survey_question_headers) }

    SmarterCSV.generate(file_path, csv_options) do |writer|
      included_relations = [:surveyor, { home: [{ assignment: [:surveyors] }], survey_response: [:survey_answers] }]

      SurveyVisit.includes(included_relations).find_in_batches do |batch|
        batch.each do |survey_visit|
          writer << survey_visit_hash(survey_visit)
        end
      end

      Home.includes(assignment: [:surveyors]).where.not(id: SurveyVisit.pluck(:home_id)).find_in_batches do |batch|
        batch.each do |home|
          writer << home_hash(home)
        end
      end
    end
  end

  private

  def home_hash(home)
    {
      home_id: home.id,
      home_street_number: home.street_number,
      home_street_name: home.street_name,
      home_unit_number: home.unit_number,
      home_city: home.city,
      home_state: home.state,
      home_zip_code: home.zip_code,
      home_latitude: home.latitude,
      home_longitude: home.longitude
    }.merge(home_assignment_hash(home))
  end

  def home_assignment_hash(home)
    if home.assignment.present?
      {
        assignment_id: home.assignment.id,
        assignment_surveyor_ids: home.assignment.surveyor_ids.join(','),
        assignment_surveyor_names: home.assignment.surveyors.map(&:full_name).join(',')
      }
    else
      {}
    end
  end

  def survey_visit_metadata_hash(survey_visit)
    {
      id: survey_visit.id,
      public_survey: survey_visit.public_survey? ? 'Yes' : 'No',
      survey_visit_latitude: survey_visit.latitude,
      survey_visit_longitude: survey_visit.longitude,
      survey_visit_time: survey_visit.created_at.in_time_zone(EASTERN_TIMEZONE),
      surveyor_id: survey_visit.surveyor_id,
      surveyor_name: survey_visit.surveyor&.full_name
    }
  end

  def survey_visit_hash(survey_visit)
    survey_visit_hash = survey_visit_metadata_hash(survey_visit).merge(home_hash(survey_visit.home))

    survey_visit.survey_response.survey_answers.each do |survey_answer|
      key = csv_question_header_key(survey_answer.survey_question_id)
      value = survey_answer.answer
      # We do not yet support multiple answers
      # value = survey_answer.answers.join(';')
      survey_visit_hash[key] = value
    end

    survey_visit_hash
  end

  def survey_question_headers
    survey_question_headers = {}

    @survey.survey_questions.each do |survey_question|
      key = csv_question_header_key(survey_question.id)
      value = survey_question.localized_survey_questions.find_by(language_code: SURVEY_LANG).text
      survey_question_headers[key] = "\"#{survey_question.display_order}. #{value}\""
    end

    survey_question_headers
  end

  def csv_question_header_key(question_id)
    "question_#{question_id}".to_sym
  end
end
