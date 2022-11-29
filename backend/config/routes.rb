# frozen_string_literal: true

Rails.application.routes.draw do
  resources :surveyors
  devise_for :users
  resources :property_assessments, only: [:index]
  root 'property_assessments#index'
end
