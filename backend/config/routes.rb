# frozen_string_literal: true

Rails.application.routes.draw do
  resources :assignments
  resources :homes
  resources :surveyors
  resources :survey_visits
  resources :survey_answers
  resources :survey_responses, except: [:edit]
  resources :survey_questions
  resources :surveys
  resource :assignments_surveyors

  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }, defaults: { format: :json }
  resources :property_assessments, only: [:index]
  root 'property_assessments#index'
end
