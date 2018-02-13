class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.string :name
      t.string :comment_text
      t.integer :post_id, index: true

      t.timestamps
    end
  end
end
