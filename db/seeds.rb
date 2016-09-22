10.times do |x|
	List.create(name: Faker::Lorem.word, description: Faker::Lorem.paragraph(1), user_id: 1)
end
puts "Lists seeded"