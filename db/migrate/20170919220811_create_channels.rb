class CreateChannels < ActiveRecord::Migration[5.1]
  def change
    create_table :channels do |t|
      t.string :channelname, null: false
      t.string :displayname
      t.timestamps
    end

    add_index :channels, :channelname, unique: true
  end
end
