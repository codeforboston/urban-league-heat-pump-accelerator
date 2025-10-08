# frozen_string_literal: true

require 'csv'

class WeeklySurveyorReportGenerator
  ON_TIME_INDICATOR = '✅'
  TIMEZONE = 'Eastern Time (US & Canada)'

  def initialize(start_date: nil, end_date: nil)
    @start_date = start_date || previous_week_start
    @end_date = end_date || previous_week_end
  end

  def generate
    CSV.generate(headers: true, write_headers: true, encoding: 'UTF-8') do |csv|
      csv << csv_headers

      surveyors_with_visits.each do |surveyor|
        csv << build_row_for_surveyor(surveyor)
      end
    end
  end

  private

  def previous_week_start
    # Previous Sunday
    Date.current.beginning_of_week(:sunday) - 1.week
  end

  def previous_week_end
    # Previous Saturday
    previous_week_start + 6.days
  end

  def csv_headers
    headers = ['Surveyor']
    date_range.each do |date|
      day_name = date.strftime('%A')
      headers << "#{day_name} Start"
      headers << "#{day_name} End"
    end
    headers
  end

  def date_range
    (@start_date..@end_date).to_a
  end

  def surveyors_with_visits
    surveyor_ids = SurveyVisit
                   .where(created_at: @start_date.beginning_of_day..@end_date.end_of_day)
                   .where.not(surveyor_id: nil)
                   .distinct
                   .pluck(:surveyor_id)

    Surveyor.where(id: surveyor_ids).order(:lastname, :firstname)
  end

  def build_row_for_surveyor(surveyor)
    row = [surveyor.full_name]

    date_range.each do |date|
      visits = visits_for_surveyor_on_date(surveyor, date)

      if visits.empty?
        row << '' # Empty start
        row << '' # Empty end
      else
        row << format_start_time(visits)
        row << format_end_time(surveyor, visits, date)
      end
    end

    row
  end

  def visits_for_surveyor_on_date(surveyor, date)
    @visits_cache ||= {}
    cache_key = "#{surveyor.id}_#{date}"

    @visits_cache[cache_key] ||= SurveyVisit
                                  .includes(home: :assignment)
                                  .where(surveyor_id: surveyor.id)
                                  .where(created_at: date.beginning_of_day..date.end_of_day)
                                  .order(:created_at)
                                  .to_a
  end

  def format_start_time(visits)
    earliest_visit = visits.first
    return '' if earliest_visit.nil?

    visit_time = earliest_visit.created_at.in_time_zone(TIMEZONE)

    if on_time_start?(visit_time)
      ON_TIME_INDICATOR
    else
      visit_time.strftime('%I:%M %p')
    end
  end

  def format_end_time(surveyor, visits, date)
    latest_visit = visits.last
    return '' if latest_visit.nil?

    visit_time = latest_visit.created_at.in_time_zone(TIMEZONE)

    if on_time_end?(visit_time) || all_assignment_homes_visited?(visits)
      ON_TIME_INDICATOR
    else
      visit_time.strftime('%I:%M %p')
    end
  end

  def on_time_start?(time)
    # On time if visit is before 4:24 PM Eastern
    cutoff = time.change(hour: 16, min: 24, sec: 0)
    time < cutoff
  end

  def on_time_end?(time)
    # On time if visit is after 6:40 PM Eastern
    cutoff = time.change(hour: 18, min: 40, sec: 0)
    time > cutoff
  end

  def all_assignment_homes_visited?(visits)
    # Get all unique assignments from the homes visited
    assignment_ids = visits.map { |v| v.home.assignment_id }.compact.uniq

    return false if assignment_ids.empty?

    # Get all homes in these assignments
    all_homes_in_assignments = Home.where(assignment_id: assignment_ids).pluck(:id)

    # Get all homes that have been visited (by any surveyor, at any time)
    visited_home_ids = SurveyVisit.where(home_id: all_homes_in_assignments).distinct.pluck(:home_id)

    # Check if all homes in these assignments have been visited
    (all_homes_in_assignments - visited_home_ids).empty?
  end
end
