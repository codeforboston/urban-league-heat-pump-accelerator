class ExportController < ApplicationController
  # this can show all exports?
  # def index
  # end
  #
  # /export
  def index
    # code to generate export can be here for now
    # to start just export all of it

    # Aiming to return something like:
    # House address, assignment id, ..., surveyor id, surveyor_name, question 1 answer, 
    # 1 Main St, 1,   surveyor 1, Bob, <ans to quest 1>, <ans to quest2>, ,,, <ans to quest 6>
    
    # Get survey (id = 1) and all child survey_questions
    questions = Survey.joins(:survey_questions).find(1)
    # build lookup of question_id -> question text
    # use this to build headers

    # Build lookup of surveyor id -> surveyor name
    surveyors = Surveyor.all.map { |s| [s.id, "#{s.firstname} #{s.lastname}"] }.to_h

    # Get survey_responses (for survey id = 1) and get all their survey_answers
    # Go back via survey_visit to home, and to surveyor
    answers = SurveyVisit.joins(survey_response: [:survey_answers])
    
    # For each line in answers, write line to CSV

    # SurveyReponse base
    # Then the Home object.
    # Time SurveyVisit happened, the location, 
    # Homes.all.

    

#    User.joins(posts: [:comments])
# SELECT "users".*
# FROM "users"
# INNER JOIN "posts" ON "posts"."user_id" = "users"."id"
# INNER JOIN "comments" ON "comments"."post_id" = "posts"."id"

  end
end
