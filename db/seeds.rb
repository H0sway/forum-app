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
    title: "Welcome New Users!"
  },
  {
    title: "Technology"
  },
  {
    title: "Sportsball"
  },
  {
    title: "Video Games"
  },
  {
    title: "Canada Things"
  },
  {
    title: "Off Topic"
  },
])

Post.destroy_all
Post.create([
  {
    title: "Read Before Posting!",
    topic_id: 1
  },
  {
    title: "Which is better, windows or apple?",
    topic_id: 2
  }
])

