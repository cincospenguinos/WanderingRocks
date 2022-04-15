class Find < ApplicationRecord
	def nokia
		return nil if self.nokia_location.empty?
		self.nokia_location
	end

	def self.current_game
		if Find.last.nil? || !Find.last.created_at.today?
			Find.create!
		end

		Find.last
	end
end
