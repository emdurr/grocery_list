namespace :remove_dups do
	desc "Scan all recipes, remove duplicate titles"
	task remove: :environment do

		duplicates = Recipe.select('lower(title), user_id, count(*)').group('lower(title)').having('count(*) > 1').pluck('lower(title)')

		puts duplicates
		puts "The above (or none) have been removed."

		duplicates.each do |title|
			Recipe.where("lower(title) LIKE ?", title.downcase)[1..-1].map(&:destroy)
		end
	end
end