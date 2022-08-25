class PropertyAssessment < ActiveRecord::Base
    enum :condition, not_set: 0, poor: 1, fair: 2, average: 3, good: 4, excellent: 5
end
