class CreateRecipeIngs < ActiveRecord::Migration[5.0]
  def change
    create_table :recipe_ings do |t|
      t.string :specifications
      t.string :prep
      t.belongs_to :ingredient
      t.belongs_to :recipe

      t.timestamps
    end
  end
end
