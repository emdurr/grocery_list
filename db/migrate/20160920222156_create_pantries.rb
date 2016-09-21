class CreatePantries < ActiveRecord::Migration[5.0]
  def change
    create_table :pantries do |t|
      t.integer :qty
      t.string :specifications
      t.integer :ingredient_id
      t.belongs_to :user

      t.timestamps
    end
  end
end
