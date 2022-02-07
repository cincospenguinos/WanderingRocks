class DublinController < ApplicationController
  ALL_OPTS = {
    delay: {
      feedback: { min: 0, max: 1, step: 0.01, value: 0.5 },
      time: { min: 0, max: 1, step: 0.01, value: 0.3 },
      mix: { min: 0, max: 1, step: 0.01, value: 0.0 },
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
      mix: { min: 0, max: 1, step: 0.01, value: 0.0 },
      cutoff: { min: 0, max: 4000, step: 10, value: 20 },
    },
    flanger: {
      time: { min: 0, max: 1, step: 0.01, value: 0.5 },
      speed: { min: 0, max: 1, step: 0.01, value: 0.5 },
      depth: { min: 0, max: 1, step: 0.01, value: 0.5 },
      feedback: { min: 0, max: 1, step: 0.01, value: 0.5 },
      mix: { min: 0, max: 1, step: 0.01, value: 0.0 },
    },
    # highPassFilter: {
    #   frequency: { min: 10, max: 22050, step: 10, value: 10 },
    #   peak: { min: 0.0001, max: 1000, step: 0.01, value: 1 },
    # },
    pingPong: {
      feedback: { min: 0, max: 1, step: 0.01, value: 0.5 },
      time: { min: 0, max: 1, step: 0.01, value: 0.5 },
      mix: { min: 0, max: 1, step: 0.01, value: 0.0 },
    },
    # lowPassFilter: {
    #   frequency: { min: 10, max: 22050, step: 10, value: 10 },
    #   peak: { min: 0.0001, max: 1000, step: 0.01, value: 2 },
    # },
    quadrafuzz: {
      lowGain: { min: 0, max: 1, step: 0.01, value: 0.5 },
      midLowGain: { min: 0, max: 1, step: 0.01, value: 0.5 },
      midHighGain: { min: 0, max: 1, step: 0.01, value: 0.5 },
      highGain: { min: 0, max: 1, step: 0.01, value: 0.5 },
    },
    reverb: {
      time: { min: 0.0001, max: 10, step: 0.01, value: 1 },
      decay: { min: 0.0001, max: 10, step: 0.01, value: 1 },
      mix: { min: 0, max: 1, step: 0.01, value: 0.0 },
    },
    # ringModulator: {
    #   speed: { min: 0, max: 2000, step: 1, value: 4 },
    #   distortion: { min: 0.2, max: 50, step: 0.1, value: 0.2 },
    #   mix: { min: 0, max: 1, step: 0.01, value: 0.0 },
    # },
    tremolo: {
      speed: { min: 0, max: 20, step: 0.1, value: 20 },
      depth: { min: 0, max: 1, step: 0.01, value: 0.5 },
      mix: { min: 0, max: 1, step: 0.01, value: 0.0 },
    },
  }

  def index
    @all_opts = ALL_OPTS
  end
end
