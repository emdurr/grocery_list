class CreateMenus < ActiveRecord::Migration[5.0]
  def change
    create_table :menus do |t|
      t.string :name
      t.belongs_to :user

      t.timestamps
    end
  end
end
