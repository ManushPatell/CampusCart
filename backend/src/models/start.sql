
CREATE TYPE "year" AS ENUM ('1', '2', '3', '4');

CREATE TYPE "condition" AS ENUM ('Used', 'New');

CREATE TYPE "house_type" as ENUM ('Apartment', 'House', 'Bedroom', 'Basement', 'Condo');

CREATE TYPE "role" as ENUM ('user', 'admin', 'banned');

CREATE TYPE "listing_type" as ENUM ('Selling', 'Wanting');

CREATE TABLE "users" ("id" UUID PRIMARY KEY DEFAULT gen_random_uuid(), "first_name" VARCHAR(255) NOT NULL, "last_name" VARCHAR(255) NOT NULL, "email" VARCHAR(255) UNIQUE NOT NULL, "password" TEXT NOT NULL, "phone_number" VARCHAR(255) UNIQUE NOT NULL, "role" role NOT NULL DEFAULT "user");

CREATE TABLE "textbooks" ("id" UUID PRIMARY KEY DEFAULT gen_random_uuid(), "book_title" varchar(255) not null, "author" varchar(255), "edition" varchar(255), "seller" UUID REFERENCES users(id) ON DELETE CASCADE,"date_posted" DATE DEFAULT CURRENT_DATE, "year" year, "faculty" varchar(255), "price" INT not null);

CREATE TABLE "rentals" ("id" UUID PRIMARY KEY DEFAULT gen_random_uuid(), "seller" UUID REFERENCES users(id) ON DELETE CASCADE, "address" TEXT NOT NULL, "post_date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP, "date_available" DATE NOT NULL, "description" TEXT NOT NULL, "house_type" house_type NOT NULL, "cost" INT NOT NULL, "num_beds" INT NOT NULL DEFAULT 1, "is_cost_per_room" BOOLEAN NOT NULL, "is_utilities_included" BOOLEAN NOT NULL, "is_sublet" BOOLEAN NOT NULL, "has_laundry" BOOLEAN NOT NULL, "has_cooking" BOOLEAN NOT NULL, "has_parking" BOOLEAN NOT NULL, "no_smoking" BOOLEAN NOT NULL, "is_shared" BOOLEAN NOT NULL);

CREATE TABLE "misc" ("id" UUID PRIMARY KEY DEFAULT gen_random_uuid(), "title" varchar(255), "description" TEXT, "price" INT not null, "seller" UUID REFERENCES users(id) ON DELETE CASCADE, "date_posted" DATE DEFAULT CURRENT_DATE, "photos" TEXT[] not null, "listing_type" listing_type NOT NULL DEFAULT 'Selling');

CREATE TABLE "refresh_tokens" ("token" TEXT PRIMARY KEY NOT NULL, "user_id" UUID REFERENCES users(id) ON DELETE CASCADE); 