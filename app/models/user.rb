# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  displayname     :string
#  img_url         :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :username, :session_token, uniqueness: true
  validates :username,
            format: {
              with: /\A[a-z0-9_]+\Z/,
              message: "can only have lowercase alphanumeric characters"
            },
            length: { maximum: 16 }
  validates :displayname, length: { maximum: 24 }

  attr_reader :password
  after_initialize :ensure_session_token

  has_many :channel_memberships,
           dependent: :destroy

  has_many :channels,
           through: :channel_memberships

  has_many :room_memberships,
           dependent: :destroy

  has_many :rooms,
           through: :room_memberships

  has_many :messages

  def self.search(query)
    self.where("username ILIKE ? OR displayname ILIKE ?",
               "%#{query}%",
               "%#{query}%")
  end

  # ---------- Auth stuff ----------

  def self.find_by_credentials(user_params)
    user = User.find_by(username: user_params[:username])
    return nil unless user
    user.valid_password?(user_params[:password]) ? user : nil
  end

  def self.new_unique_token
    new_token = SecureRandom.urlsafe_base64
    while User.find_by(session_token: new_token)
      new_token = SecureRandom.urlsafe_base64
    end
    new_token
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session_token
    self.session_token ||= User.new_unique_token
  end

  def reset_session_token!
    self.update(session_token: User.new_unique_token)
    self.session_token
  end

  # ---------- Channel stuff ----------

  def become_admin(channel)
    self.channel_memberships.create channel_id: channel.id,
                                    admin: true
  end

  def admined_channels
    self.channels.where(channel_memberships: {admin: true})
  end

  # ---------- Room stuff ----------

  def direct_message_rooms
    self.rooms.select { |room| room.users.length == 2 }
  end

  def dm_user_ids
    self.direct_message_rooms.map do |dmr|
      dmr.user_ids.reject { |id| id == self.id }[0]
    end
  end
end
