class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.integer :user_id, null: false, index: true
      t.references :context, polymorphic: true, index: true
      t.string :body, null: false
      t.timestamps
    end
  end
end
