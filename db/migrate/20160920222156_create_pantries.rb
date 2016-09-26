class CreatePantries < ActiveRecord::Migration[5.0]
  def change
    create_table :pantries do |t|
    	t.string :name
      t.belongs_to :user
      t.belongs_to :ingredient

      t.timestamps
    end
  end
end
