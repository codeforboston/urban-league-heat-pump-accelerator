# frozen_string_literal: true

class ExporterPolicy < ApplicationPolicy
  def export?
    user&.admin?
  end
end
