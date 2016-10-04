class CreateRecipes < ActiveRecord::Migration[5.0]
  def change
    create_table :recipes do |t|
      t.string :title, null: false
      t.integer :readyInMinutes
      t.string :image
      t.integer :servings
      t.string :creditText
      t.string :type
      t.integer :recipe_ings_count, default: 0
      t.belongs_to :user

      t.timestamps
    end
  end
end
