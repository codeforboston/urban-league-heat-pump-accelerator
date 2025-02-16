# frozen_string_literal: true

require 'rails_helper'
require_relative '../../db/seed_importer'

RSpec.describe SeedImporter, type: :model do
  describe '.import_seed_data' do
    before do
      SeedImporter.import_seed_data('spec/support/seeds/', 'spec/support/seeds/test_homes.csv')
    end

    it 'creates a survey' do
      expect(Survey.count).to eq(1)
      survey = Survey.last
      expect(survey.title).to eq('Foobar')
    end

    it 'creates survey questions' do
      survey_questions = Survey.last.survey_questions
      expect(survey_questions.count).to eq(2)

      q1 = survey_questions.find { |q| q.display_order == 1 }
      q2 = survey_questions.find { |q| q.display_order == 2 }

      expect(q1.response_type).to eq('radio')
      expect(q2.response_type).to eq('text')

      q1_localized = q1.localized_survey_questions.first
      expect(q1_localized.language_code).to eq('en-US')
      expect(q1_localized.text).to eq('What is your favorite color?')
      expect(q1_localized.response_options).to match_array(%w[Red Yellow Blue])

      q2_localized = q2.localized_survey_questions.first
      expect(q2_localized.language_code).to eq('en-US')
      expect(q2_localized.text).to eq('Explain why')
      expect(q2_localized.response_options).to eq([])
    end

    it 'creates users and surveyors' do
      expect(User.count).to eq(2)
      expect(Surveyor.count).to eq(2)

      admin_user = User.find_by(email: 'maisy@example.com')
      expect(admin_user.role).to eq('admin')
      expect(admin_user.surveyor).to be_present

      surveyor_user = User.find_by(email: 'peppa.pig@example.com')
      expect(surveyor_user.role).to eq('surveyor')

      surveyor = surveyor_user.surveyor
      expect(surveyor.firstname).to eq('Peppa')
      expect(surveyor.lastname).to eq('Pig')
      expect(surveyor.email).to eq('peppa.pig@example.com')
      expect(surveyor.phone).to eq('(111) 555-5555')
      expect(surveyor.street_address).to eq('1 Boylston Street')
      expect(surveyor.city).to eq('Boston')
      expect(surveyor.state).to eq('MA')
      expect(surveyor.zipcode).to eq('02116')
    end

    it 'creates assignments' do
      expect(Assignment.count).to eq(2)
      assignment = Assignment.find_by(cluster_id: 2)

      expect(assignment.latitude).to eq('42.32625609')
      expect(assignment.longitude).to eq('-71.07912228')
      expect(assignment.region_code).to eq(1)
    end

    it 'creates homes' do
      home = Home.find_by(street_name: 'WELLES AV')

      # Expect address to be correct
      expect(home.street_number).to eq('104')
      expect(home.unit_number).to be_nil
      expect(home.city).to eq('DORCHESTER')
      expect(home.state).to eq('MA')
      expect(home.zip_code).to eq('02124')

      # Expect geocoded data to be correct
      expect(home.latitude).to eq('42.28959877')
      expect(home.longitude).to eq('-71.0658393')
      expect(home.geometry).to eq('POLYGON ((-71.0657087479038 42.289512747307, -71.0658636363523 ' \
        '42.2894706700587, -71.0659701022978 42.2896847918144, -71.0658147256036 42.2897270960379, ' \
        '-71.0657087479038 42.289512747307))')

      # Expect metadata to be correct
      expect(home.building_type).to eq('THREE-FAM DWELLING')
      expect(home.visit_order).to eq(34)
      expect(home.bedroom_score).to eq(1)
      expect(home.floor_score).to eq(2)
      expect(home.heat_type_score).to eq(20)
      expect(home.living_space_frag_score).to eq(1)
      expect(home.living_space_fragmentation).to eq(253.6)
      expect(home.map_par_id).to eq(1_601_415_000)
      expect(home.space_between_houses).to eq(2358)
      expect(home.total_score_x).to eq(59)
      expect(home.yr_built_category).to eq('Prior to 1950')
      expect(home.yr_built_score).to eq(5)

      # Expect user added to be false
      expect(home.user_added).to eq(false)
    end

    it 'associates homes and assignments correctly' do
      home = Home.find_by(street_name: 'WELLES AV')
      expect(home.assignment.cluster_id).to eq(212)
    end

    it 'skips blank street number entries' do
      expect(Home.all.count).to eq(3)
    end
  end
end
