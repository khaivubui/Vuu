class AddDefaultToLastRead < ActiveRecord::Migration[5.1]
  def change
    change_column :channel_memberships, :last_read_message_id, :integer, default: 1
    change_column :room_memberships, :last_read_message_id, :integer, default: 1
  end
end
