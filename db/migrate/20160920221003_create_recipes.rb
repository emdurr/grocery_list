class CreateRecipes < ActiveRecord::Migration[5.0]
  def change
    create_table :recipes do |t|
      t.string :title, null: false
      t.integer :ready_in_minutes
      t.string :image
      t.integer :servings
      t.string :credit_text
      t.string :type
      t.belongs_to :user

      t.timestamps
    end
  end
end
