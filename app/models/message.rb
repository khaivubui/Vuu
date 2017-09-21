# == Schema Information
#
# Table name: messages
#
#  id           :integer          not null, primary key
#  user_id      :integer          not null
#  context_type :string
#  context_id   :integer
#  body         :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Message < ApplicationRecord
  validates :body, presence: true
  after_commit { MessageRelayJob.perform_later(self, self.context) }

  belongs_to :user

  belongs_to :context,
             polymorphic: true
end
