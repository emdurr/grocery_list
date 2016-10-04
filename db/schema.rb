# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160927160345) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "favorites", force: :cascade do |t|
    t.integer  "recipe_id"
    t.text     "comment"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_favorites_on_user_id", using: :btree
  end

  create_table "ingredients", force: :cascade do |t|
    t.string   "name",                          null: false
    t.integer  "recipe_ings_count", default: 0
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  create_table "list_ings", force: :cascade do |t|
    t.string   "specifications"
    t.integer  "qty_to_buy"
    t.integer  "list_id"
    t.integer  "ingredient_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["ingredient_id"], name: "index_list_ings_on_ingredient_id", using: :btree
    t.index ["list_id"], name: "index_list_ings_on_list_id", using: :btree
  end

  create_table "lists", force: :cascade do |t|
    t.string   "name",        null: false
    t.text     "description"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["user_id"], name: "index_lists_on_user_id", using: :btree
  end

  create_table "menu_recs", force: :cascade do |t|
    t.string   "day"
    t.integer  "recipe_id"
    t.integer  "menu_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["menu_id"], name: "index_menu_recs_on_menu_id", using: :btree
    t.index ["recipe_id"], name: "index_menu_recs_on_recipe_id", using: :btree
  end

  create_table "menus", force: :cascade do |t|
    t.string   "name",       null: false
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_menus_on_user_id", using: :btree
  end

  create_table "pantries", force: :cascade do |t|
    t.string   "name"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_pantries_on_user_id", using: :btree
  end

  create_table "pantry_ingredients", force: :cascade do |t|
    t.integer  "qty"
    t.integer  "pantry_id"
    t.integer  "ingredient_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["ingredient_id"], name: "index_pantry_ingredients_on_ingredient_id", using: :btree
    t.index ["pantry_id"], name: "index_pantry_ingredients_on_pantry_id", using: :btree
  end

  create_table "recipe_ings", force: :cascade do |t|
    t.string   "amount",          null: false
    t.string   "unit",            null: false
    t.text     "metaInformation",              array: true
    t.integer  "ingredient_id"
    t.integer  "recipe_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["ingredient_id"], name: "index_recipe_ings_on_ingredient_id", using: :btree
    t.index ["recipe_id"], name: "index_recipe_ings_on_recipe_id", using: :btree
  end

  create_table "recipes", force: :cascade do |t|
    t.string   "title",                         null: false
    t.integer  "readyInMinutes"
    t.string   "image"
    t.integer  "servings"
    t.string   "creditText"
    t.string   "type"
    t.integer  "recipe_ings_count", default: 0
    t.integer  "user_id"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.index ["user_id"], name: "index_recipes_on_user_id", using: :btree
  end

  create_table "steps", force: :cascade do |t|
    t.integer  "number",     null: false
    t.text     "step_text"
    t.integer  "recipe_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["recipe_id"], name: "index_steps_on_recipe_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "first_name",                          null: false
    t.string   "last_name",                           null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "provider"
    t.string   "uid"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

end
