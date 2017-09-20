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

  def add_admin(user)
    self.channel_memberships.create user_id: user.id,
                                    admin: true
  end

  def admins
    self.users.where(channel_memberships: {admin: true})
  end
end
