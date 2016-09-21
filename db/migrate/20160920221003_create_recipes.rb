class CreateRecipes < ActiveRecord::Migration[5.0]
  def change
    create_table :recipes do |t|
      t.string :name
      t.text :description
      t.text :directions
      t.string :type
      t.belongs_to :user

      t.timestamps
    end
  end
end
