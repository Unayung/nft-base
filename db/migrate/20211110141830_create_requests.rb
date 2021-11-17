class CreateRequests < ActiveRecord::Migration[6.1]
  def change
    create_table :requests do |t|
      t.string :name
      t.string :description
      t.string :mint_to_address
      t.boolean :minted
      t.timestamps
    end
  end
end
