class SongPlay < ApplicationRecord
  ALL_EFFECTS = {
    delay: {
      feedback: { min: 0, max: 1, step: 0.01, value: 0.5 },
      time: { min: 0, max: 1, step: 0.01, value: 0.3 },
      mix: { min: 0, max: 1, step: 0.01, value: 0.2 },
    },
    compressor: {
      attack: { min: 0, max: 1, step: 0.01, value: 0.5 },
      knee: { min: 0, max: 40, step: 1, value: 10 },
      ratio: { min: 1, max: 20, step: 0.1, value: 2 },
      release: { min: 0, max: 1, step: 0.01, value: 0.5 },
      threshold: { min: -100, max: 0, step: 1, value: 0 },
    },
    distortion: {
      gain: { min: 0, max: 1, step: 0.01, value: 0.0 },
    },
    dubDelay: {
      feedback: { min: 0, max: 1, step: 0.01, value: 0.5 },
      time: { min: 0, max: 1, step: 0.01, value: 0.5 },
      mix: { min: 0, max: 1, step: 0.01, value: 0.2 },
      cutoff: { min: 0, max: 4000, step: 10, value: 20 },
    },
    flanger: {
      time: { min: 0, max: 1, step: 0.01, value: 0.5 },
      speed: { min: 0, max: 1, step: 0.01, value: 0.5 },
      depth: { min: 0, max: 1, step: 0.01, value: 0.5 },
      feedback: { min: 0, max: 1, step: 0.01, value: 0.5 },
      mix: { min: 0, max: 1, step: 0.01, value: 0.2 },
    },
    pingPong: {
      feedback: { min: 0, max: 1, step: 0.01, value: 0.5 },
      time: { min: 0, max: 1, step: 0.01, value: 0.5 },
      mix: { min: 0, max: 1, step: 0.01, value: 0.2 },
    },
    quadrafuzz: {
      lowGain: { min: 0, max: 1, step: 0.01, value: 0.5 },
      midLowGain: { min: 0, max: 1, step: 0.01, value: 0.5 },
      midHighGain: { min: 0, max: 1, step: 0.01, value: 0.5 },
      highGain: { min: 0, max: 1, step: 0.01, value: 0.5 },
    },
    reverb: {
      time: { min: 0.0001, max: 10, step: 0.01, value: 1 },
      decay: { min: 0.0001, max: 10, step: 0.01, value: 1 },
      mix: { min: 0, max: 1, step: 0.01, value: 0.2 },
    },
    ringModulator: {
      speed: { min: 0, max: 2000, step: 1, value: 4 },
      distortion: { min: 0.2, max: 50, step: 0.1, value: 0.2 },
      mix: { min: 0, max: 0.5, step: 0.01, value: 0.2 },
    },
    tremolo: {
      speed: { min: 0, max: 20, step: 0.1, value: 20 },
      depth: { min: 0, max: 1, step: 0.01, value: 0.5 },
      mix: { min: 0, max: 1, step: 0.01, value: 0.2 },
    },
  }

  SAMPLER = ["delay-feedback", "delay-time", "delay-mix", "compressor-attack", "compressor-knee", "compressor-ratio", "compressor-release", "compressor-threshold", "distortion-gain", "dubDelay-feedback", "dubDelay-time", "dubDelay-mix", "dubDelay-cutoff", "flanger-time", "flanger-speed", "flanger-depth", "flanger-feedback", "flanger-mix", "pingPong-feedback", "pingPong-time", "pingPong-mix", "quadrafuzz-lowGain", "quadrafuzz-midLowGain", "quadrafuzz-midHighGain", "quadrafuzz-highGain", "reverb-time", "reverb-decay", "reverb-mix", "ringModulator-speed", "ringModulator-distortion", "ringModulator-mix", "tremolo-speed", "tremolo-depth", "tremolo-mix"]

  SONG_DURATION_IN_SECONDS = 110.0

  def time_left
    (self.created_at + SONG_DURATION_IN_SECONDS.seconds - DateTime.now).seconds
  end

  def self.is_playing?
    return false unless SongPlay.count > 0
    SongPlay.last.time_left > 0
  end

  def self.sample_effects
    SAMPLER.sample(4)
  end

  def self.effect_id_for(effect, property)
    "#{effect}-#{property}"
  end
end
