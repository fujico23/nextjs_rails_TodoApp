class CreateTodos < ActiveRecord::Migration[7.1]
  def change
    create_table :todos do |t|
      t.string :title, comment: 'タイトル'
      t.text :content, comment: '内容'

      t.timestamps
    end
  end
end
