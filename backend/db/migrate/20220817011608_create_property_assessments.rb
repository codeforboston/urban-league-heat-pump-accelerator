class CreatePropertyAssessments < ActiveRecord::Migration[7.0]
  def change
    create_table :property_assessments do |t|

        t.timestamps
        t.string:BDRM_COND
        t.string:BTHRM_STYLE1
        t.string:BTHRM_STYLE2
        t.string:BTHRM_STYLE3
        t.string:KITCHEN_TYPE
        t.string:KITCHEN_STYLE1
        t.string:KITCHEN_STYLE2
        t.string:KITCHEN_STYLE3
    end
  end
end
