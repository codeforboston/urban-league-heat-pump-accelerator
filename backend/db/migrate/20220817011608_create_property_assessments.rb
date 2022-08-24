class CreatePropertyAssessments < ActiveRecord::Migration[7.0]
  def change
    create_table :property_assessments do |t|

    t.timestamps
    t.string:bdrm_cond
    t.string:bthrm_style1
    t.string:bthrm_style2
    t.string:bthrm_style3
    t.string:kitchen_type
    t.string:kitchen_style1
    t.string:kitchen_style2
    t.string:kitchen_style3
    end
  end
end
