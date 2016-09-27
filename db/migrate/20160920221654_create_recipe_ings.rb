class CreateRecipeIngs < ActiveRecord::Migration[5.0]
  def change
    create_table :recipe_ings do |t|
      t.string :amount, null: false
      t.string :unit, null: false
      t.text :metaInformation, array: true
      t.belongs_to :ingredient
      t.belongs_to :recipe

      t.timestamps
    end
  end
end
