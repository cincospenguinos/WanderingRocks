class DublinerChannel < ApplicationCable::Channel
  def subscribed
    stream_from "june16th"
  end

  def effect_modified(data)
    ActionCable.server.broadcast('june16th', data)
  end

  def currentTime
    SongPlay.create! unless SongPlay.is_playing?
    ActionCable.server.broadcast('june16th', {
      seconds: SongPlay::SONG_DURATION_IN_SECONDS - SongPlay.last.time_left,
      effects: SongPlay.sample_effects
    })
  end

  def unsubscribed; end
end
