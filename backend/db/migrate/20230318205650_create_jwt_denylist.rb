class CreateJwtDenylist < ActiveRecord::Migration[7.0]
  def change
    create_table :jwt_denylists do |t|
      t.string :jti
      t.datetime :expired_at

      t.timestamps
    end
    add_index :jwt_denylists, :jti
  end
end
