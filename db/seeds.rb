# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Topic.destroy_all
Topic.create([
  {
    name: "Welcome New Users!"
  },
  {
    name: "Technology"
  },
  {
    name: "Sportsball"
  },
  {
    name: "Video Games"
  },
  {
    name: "Canada Things"
  },
  {
    name: "Off Topic"
  },
])
