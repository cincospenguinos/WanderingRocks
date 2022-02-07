class SongPlay < ApplicationRecord
  SONG_DURATION_IN_SECONDS = 110.seconds

  def time_left
    (self.created_at + SONG_DURATION_IN_SECONDS - DateTime.now).seconds
  end

  def self.is_playing?
    return false unless SongPlay.count > 0
    SongPlay.last.time_left > 0
  end
end
