# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
ApplicationRecord.transaction do
  Todo.delete_all
  User.delete_all

  Todo.create!([
    {  
      title: "Todo 1", 
      content: "Todo 1 の内容"
    },
    {
      title: "Todo 2",
      content: "Todo 2 の内容"
    },
    {
      title: "Todo 3",
      content: "Todo 3 の内容"
    }
  ])
  User.create!([
    {  
      name: "sayaka", 
      tel: "0123456789",
    },
    {
      name: "taro",
      tel: "999999999"
    },
    {
      name: "hanako",
      tel: "9876543210"
    }
  ])
end