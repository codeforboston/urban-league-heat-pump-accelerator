# frozen_string_literal: true

class CsvExporterPolicy < ApplicationPolicy
  def export?
    user&.admin?
  end
end
