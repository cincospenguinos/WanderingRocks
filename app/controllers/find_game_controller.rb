class FindGameController < ApplicationController
  def index
    @game = Find.current_game
  end
end
