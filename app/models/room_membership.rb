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
end
