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
  validates :channelname,
            presence: true,
            uniqueness: true,
            format: {
              with: /\A[a-z0-9_]+\Z/,
              message: "can only have lowercase alphanumeric characters"
            }

  has_many :channel_memberships

  has_many :users,
           through: :channel_memberships

  def self.search(query)
    self.where("channelname ILIKE ?", "%#{query}%")
  end

  def add_admin(user)
    self.channel_memberships.create user_id: user.id,
                                    admin: true
  end

  def admins
    self.users.where(channel_memberships: {admin: true})
  end

  def admin_ids
    self.admins.map do |admin|
      admin.id
    end
  end
end
