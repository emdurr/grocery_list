class CreatePantryIngredients < ActiveRecord::Migration[5.0]
  def change
    create_table :pantry_ingredients do |t|
    	t.integer :qty
      t.belongs_to :pantry
      t.belongs_to :ingredient


      t.timestamps
    end
  end
end
