class CreateContracts < ActiveRecord::Migration[6.1]
  def change
    create_table :contracts do |t|
      t.string :name
      t.string :address
      t.integer :current_token_id, default: 0
      t.timestamps
    end
  end
end
