class CreateListIngs < ActiveRecord::Migration[5.0]
  def change
    create_table :list_ings do |t|
      t.string :specifications
      t.integer :qty_to_buy
      t.belongs_to :list
      t.belongs_to :ingredient

      t.timestamps
    end
  end
end
