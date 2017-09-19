# == Schema Information
#
# Table name: channels
#
#  id          :integer          not null, primary key
#  channelname :string           not null
#  displayname :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Channel < ApplicationRecord
  validates :channelname, presence: true, uniqueness: true

  has_many :channel_memberships

  has_many :users,
           through: :channel_memberships
end
