# frozen_string_literal: true

require 'geocoder'

class CsvExportHelper
  SURVEY_LANG = 'en-US'
  EASTERN_TIMEZONE = 'Eastern Time (US & Canada)'
  CSV_STATIC_HEADERS = {
    survey_visit_id: 'Survey Visit ID',
    home_id: 'Home ID',
    successful_export: 'Successful Export',
    public_survey: 'Public Survey',
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
    surveyor_name: 'Surveyor Name',
    survey_distance_miles: 'Survey Distance'
  }.freeze

  def self.home_hash(home)
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

  def self.survey_visit_hash(survey_visit)
    survey_visit_hash = survey_visit_metadata_hash(survey_visit).merge(home_hash(survey_visit.home))

    survey_visit.survey_response.survey_answers.each do |survey_answer|
      key = csv_question_header_key(survey_answer.survey_question_id)
      value = survey_answer.answers.join(';')
      survey_visit_hash[key] = value
    end

    survey_visit_hash
  end

  def self.csv_headers(survey)
    CSV_STATIC_HEADERS.merge(survey_question_headers(survey))
  end

  def self.home_assignment_hash(home)
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
  private_class_method :home_assignment_hash

  def self.survey_visit_metadata_hash(survey_visit)
    distance_miles = Geocoder::Calculations.distance_between(
      [survey_visit.home.latitude, survey_visit.home.longitude],
      [survey_visit.latitude, survey_visit.longitude]
    )
    {
      survey_visit_id: survey_visit.id,
      public_survey: survey_visit.public_survey? ? 'Yes' : 'No',
      survey_visit_latitude: survey_visit.latitude,
      survey_visit_longitude: survey_visit.longitude,
      survey_visit_time: survey_visit.created_at.in_time_zone(EASTERN_TIMEZONE),
      surveyor_id: survey_visit.surveyor_id,
      surveyor_name: survey_visit.surveyor&.full_name,
      survey_distance_miles: distance_miles
    }
  end
  private_class_method :survey_visit_metadata_hash

  def self.survey_question_headers(survey)
    survey_question_headers = {}

    survey.survey_questions.each do |survey_question|
      key = csv_question_header_key(survey_question.id)
      value = survey_question.localized_survey_questions.find_by(language_code: SURVEY_LANG).text
      survey_question_headers[key] = "\"#{survey_question.display_order}. #{value}\""
    end

    survey_question_headers
  end
  private_class_method :survey_question_headers

  def self.csv_question_header_key(question_id)
    "question_#{question_id}".to_sym
  end
  private_class_method :csv_question_header_key
end
