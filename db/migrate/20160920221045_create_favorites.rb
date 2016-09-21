class CreateFavorites < ActiveRecord::Migration[5.0]
  def change
    create_table :favorites do |t|
      t.integer :recipe_id
      t.text :comment
      t.belongs_to :user
      
      t.timestamps
    end
  end
end
