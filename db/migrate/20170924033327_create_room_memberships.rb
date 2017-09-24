class CreateRoomMemberships < ActiveRecord::Migration[5.1]
  def change
    create_table :room_memberships do |t|
      t.integer :user_id, index: true
      t.integer :room_id, index: true
      t.timestamps
    end

    add_index :room_memberships, [:room_id, :user_id], unique: true
  end
end
