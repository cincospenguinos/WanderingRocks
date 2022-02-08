class DublinController < ApplicationController
  def index
    session[:valid_ids] = [] unless session[:valid_ids]

    @user_id = SecureRandom.uuid
    @all_opts = SongPlay::ALL_EFFECTS
    session[:valid_ids] << @user_id
  end
end
