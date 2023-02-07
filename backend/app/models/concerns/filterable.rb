# https://gist.github.com/justinweiss/9065666
# Call scopes directly from your URL params:
#
#     @products = Product.filter(params.slice(:status, :location, :starts_with))
module Filterable
    extend ActiveSupport::Concern
  
    module ClassMethods
      
      # Call the class methods with names based on the keys in <tt>filtering_params</tt>
      # with their associated values. For example, "{ status: 'delayed' }" would call 
      # `filter_by_status('delayed')`. Most useful for calling named scopes from 
      # URL params. Make sure you don't pass stuff directly from the web without 
      # whitelisting only the params you care about first!
      def filter(filtering_params)
        results = self.where(nil) # create an anonymous scope
        filtering_params.each do |key, value|
          results = results.public_send("filter_by_#{key}", value) if value.present?
        end
        results
      end
    end
  end