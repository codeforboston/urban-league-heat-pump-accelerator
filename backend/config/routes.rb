# frozen_string_literal: true

Rails.application.routes.draw do
  resources :surveyors
  resources :survey_visits
  resources :survey_answers
  resources :survey_responses
  resources :survey_questions
  resources :surveys

  devise_for :users
  resources :property_assessments, only: [:index]
  root 'property_assessments#index'
end
