class CreateRecipes < ActiveRecord::Migration[5.0]
  def change
    create_table :recipes do |t|
      t.string :title, null: false
      t.integer :ready_in_minutes
      t.string :image
      t.integer :servings
      t.string :credit_text
      t.text :cuisines, array: true, default: []
      t.text :dish_types, array: true, default: []
      t.boolean :cheap
      t.boolean :very_healthy
      t.boolean :vegetarian
      t.boolean :vegan
      t.string :type
      t.integer :recipe_ings_count, default: 0
      t.belongs_to :user

      t.timestamps
    end
  end
end
