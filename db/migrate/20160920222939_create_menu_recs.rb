class CreateMenuRecs < ActiveRecord::Migration[5.0]
  def change
    create_table :menu_recs do |t|
      t.string :day
      t.belongs_to :recipe
      t.belongs_to :menu

      t.timestamps
    end
  end
end
