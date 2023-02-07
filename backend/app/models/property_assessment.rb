# frozen_string_literal: true

class PropertyAssessment < ApplicationRecord
  include Filterable

  enum :condition, { cond_not_set: 0, cond_poor: 1, cond_fair: 2, cond_average: 3, cond_good: 4, cond_excellent: 5 }
end
