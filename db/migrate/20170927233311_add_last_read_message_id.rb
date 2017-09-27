class AddLastReadMessageId < ActiveRecord::Migration[5.1]
  def change
    add_column :channel_memberships, :last_read_message_id, :integer
    add_column :room_memberships, :last_read_message_id, :integer
  end
end
