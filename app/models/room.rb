# == Schema Information
#
# Table name: rooms
#
#  id          :integer          not null, primary key
#  displayname :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Room < ApplicationRecord
  has_many :room_memberships,
           dependent: :destroy

  has_many :users,
           through: :room_memberships

  has_many :messages,
           as: :context,
           dependent: :destroy
end
