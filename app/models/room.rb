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
end
