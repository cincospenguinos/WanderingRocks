class AddNokiaLocationToFinds < ActiveRecord::Migration[6.1]
  def change
    add_column :finds, :nokia_location, :string, default: {x: 22, y: 22}.to_json
  end
end
