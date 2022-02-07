class CreateSongPlays < ActiveRecord::Migration[6.1]
  def change
    create_table :song_plays do |t|

      t.timestamps
    end
  end
end
