# == Schema Information
#
# Table name: room_memberships
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  room_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class RoomMembership < ApplicationRecord
  validates :user_id, :room_id, presence: true
  validates :user, uniqueness: { scope: :room,
    message: "%{value} is already in this channel" }

  belongs_to :user

  belongs_to :room
end
