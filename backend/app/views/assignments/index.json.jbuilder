# frozen_string_literal: true

json.array! @assignments, partial: 'assignments/assignment', as: :assignment
