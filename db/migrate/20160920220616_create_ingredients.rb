class CreateIngredients < ActiveRecord::Migration[5.0]
  def change
    create_table :ingredients do |t|
      t.string :name, null: false
      t.integer :recipe_ings_count, default: 0

      t.timestamps
    end
  end
end
