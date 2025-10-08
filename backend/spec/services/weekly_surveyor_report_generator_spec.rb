# frozen_string_literal: true

require 'rails_helper'

RSpec.describe WeeklySurveyorReportGenerator, type: :service do
  describe '#generate' do
    let(:start_date) { Date.new(2025, 10, 5) } # Sunday
    let(:end_date) { Date.new(2025, 10, 11) }   # Saturday

    before do
      create_test_data
    end

    it 'generates a CSV with correct headers' do
      generator = WeeklySurveyorReportGenerator.new(start_date: start_date, end_date: end_date)
      csv_data = generator.generate
      lines = csv_data.lines

      expected_header = 'Surveyor,Sunday Start,Sunday End,Monday Start,Monday End,Tuesday Start,Tuesday End,' \
                        'Wednesday Start,Wednesday End,Thursday Start,Thursday End,Friday Start,Friday End,' \
                        'Saturday Start,Saturday End'

      expect(lines.first.strip).to eq(expected_header)
    end

    it 'includes all surveyors with visits in the date range' do
      generator = WeeklySurveyorReportGenerator.new(start_date: start_date, end_date: end_date)
      csv_data = generator.generate
      lines = csv_data.lines

      expect(lines.size).to eq(3) # Header + 2 surveyors
      expect(csv_data).to include('Alice Johnson')
      expect(csv_data).to include('Bob Smith')
    end

    it 'shows ✅ for on-time start (before 4:24 PM)' do
      generator = WeeklySurveyorReportGenerator.new(start_date: start_date, end_date: end_date)
      csv_data = generator.generate

      # Alice's Monday start at 14:00 (2:00 PM) should be on time
      expect(csv_data).to match(/Alice Johnson,.*,.*,✅/)
    end

    it 'shows timestamp for late start (after 4:24 PM)' do
      generator = WeeklySurveyorReportGenerator.new(start_date: start_date, end_date: end_date)
      csv_data = generator.generate

      # Bob's Tuesday start at 17:00 (5:00 PM) should show timestamp
      expect(csv_data).to match(/Bob Smith,.*,.*,.*,.*,05:00 PM/)
    end

    it 'shows ✅ for on-time end (after 6:40 PM)' do
      generator = WeeklySurveyorReportGenerator.new(start_date: start_date, end_date: end_date)
      csv_data = generator.generate

      # Alice's Monday end at 19:00 (7:00 PM) should be on time
      expect(csv_data).to match(/Alice Johnson,.*,.*,.*,✅/)
    end

    it 'shows ✅ when all assignment homes are visited even if end time is early' do
      generator = WeeklySurveyorReportGenerator.new(start_date: start_date, end_date: end_date)
      csv_data = generator.generate

      # Bob's Tuesday end should be ✅ because all homes in the assignment were visited
      expect(csv_data).to match(/Bob Smith,.*,.*,.*,.*,.*,✅/)
    end

    it 'shows timestamp for early end when assignment is not complete' do
      # Create an additional home in assignment2 that hasn't been visited
      create(:home, assignment: @assignment2, visit_order: 2)

      generator = WeeklySurveyorReportGenerator.new(start_date: start_date, end_date: end_date)
      csv_data = generator.generate

      # Alice's Wednesday end at 17:30 should show timestamp (assignment not complete)
      expect(csv_data).to match(/Alice Johnson,.*,.*,.*,.*,.*,.*,.*,05:30 PM/)
    end

    it 'shows empty cells for days with no visits' do
      generator = WeeklySurveyorReportGenerator.new(start_date: start_date, end_date: end_date)
      csv_data = generator.generate
      lines = csv_data.lines

      # Bob's Monday should be empty (using CSV quoted empty strings)
      bob_line = lines.find { |line| line.include?('Bob Smith') }
      expect(bob_line).to match(/Bob Smith,"","","",""/)
    end

    it 'orders surveyors by last name, then first name' do
      generator = WeeklySurveyorReportGenerator.new(start_date: start_date, end_date: end_date)
      csv_data = generator.generate
      lines = csv_data.lines

      expect(lines[1]).to include('Alice Johnson')
      expect(lines[2]).to include('Bob Smith')
    end

    it 'excludes surveyors with no visits in the date range' do
      # Create a surveyor with no visits
      create(:surveyor, firstname: 'Charlie', lastname: 'Brown')

      generator = WeeklySurveyorReportGenerator.new(start_date: start_date, end_date: end_date)
      csv_data = generator.generate

      expect(csv_data).not_to include('Charlie Brown')
    end

    def create_test_data
      # Create assignments
      @assignment1 = create(:assignment)
      @assignment2 = create(:assignment)

      # Create homes
      @home1 = create(:home, assignment: @assignment1, visit_order: 1)
      @home2 = create(:home, assignment: @assignment1, visit_order: 2)
      @home3 = create(:home, assignment: @assignment2, visit_order: 1)

      # Create surveyors
      @alice = create(:surveyor, firstname: 'Alice', lastname: 'Johnson')
      @bob = create(:surveyor, firstname: 'Bob', lastname: 'Smith')

      # Alice's visits - Monday
      monday = start_date + 1.day
      Timecop.freeze(Time.zone.local(2025, 10, 6, 14, 0, 0)) do # 2:00 PM - on time start
        create(:survey_visit, surveyor: @alice, home: @home1)
      end
      Timecop.freeze(Time.zone.local(2025, 10, 6, 19, 0, 0)) do # 7:00 PM - on time end
        create(:survey_visit, surveyor: @alice, home: @home2)
      end

      # Alice's visits - Wednesday (early end, will be incomplete if we add another home to assignment2)
      Timecop.freeze(Time.zone.local(2025, 10, 8, 15, 0, 0)) do # 3:00 PM - on time start
        create(:survey_visit, surveyor: @alice, home: @home3)
      end
      # Create a second visit for the end time
      home4 = create(:home, assignment: @assignment2, visit_order: 3)
      Timecop.freeze(Time.zone.local(2025, 10, 8, 17, 30, 0)) do # 5:30 PM - early end
        create(:survey_visit, surveyor: @alice, home: home4)
      end

      # Bob's visits - Tuesday
      Timecop.freeze(Time.zone.local(2025, 10, 7, 17, 0, 0)) do # 5:00 PM - late start
        create(:survey_visit, surveyor: @bob, home: @home1)
      end
      Timecop.freeze(Time.zone.local(2025, 10, 7, 18, 0, 0)) do # 6:00 PM - early end but complete
        create(:survey_visit, surveyor: @bob, home: @home2)
      end
      # All homes in assignment1 have been visited (by Alice and Bob combined)
    end
  end
end
