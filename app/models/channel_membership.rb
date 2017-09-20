# == Schema Information
#
# Table name: channel_memberships
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  channel_id :integer          not null
#  admin      :boolean          default(FALSE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ChannelMembership < ApplicationRecord
  validates :user_id, :channel_id, presence: true
  validates_inclusion_of :admin, in: [true, false]
  validates :user, uniqueness: { scope: :channel,
    message: "%{value} is already in this channel" }

  belongs_to :user

  belongs_to :channel
end
