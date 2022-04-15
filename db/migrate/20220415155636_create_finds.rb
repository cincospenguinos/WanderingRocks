class CreateFinds < ActiveRecord::Migration[6.1]
  def change
    create_table :finds do |t|

      t.timestamps
    end
  end
end
