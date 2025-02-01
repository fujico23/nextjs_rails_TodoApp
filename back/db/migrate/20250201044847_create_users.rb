class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :name, comment: '名前', null: false, limit: 50
      t.numeric :tel, comment: '電話番号', null: false, limit: 11
      t.timestamps
    end
  end
end
