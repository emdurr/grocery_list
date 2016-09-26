class CreateSteps < ActiveRecord::Migration[5.0]
  def change
    create_table :steps do |t|
      t.integer :number, null: false
      t.text :step_text, full: false
      t.belongs_to :recipe

      t.timestamps
    end
  end
end
