require "test_helper"

class SongPlayTest < ActiveSupport::TestCase
  def setup
    SongPlay.destroy_all
  end

  test '.is_playing? is false when no song is playing' do
    assert_equal 0, SongPlay.count
    refute SongPlay.is_playing?
  end

  test '.is_playing? is true when song is playing' do
    SongPlay.create!
    assert SongPlay.is_playing?
  end

  test '.is_playing? is false when song is over' do
    play = SongPlay.create!
    play.update!(created_at: DateTime.now - 1.day)
    refute SongPlay.is_playing?
  end
end
