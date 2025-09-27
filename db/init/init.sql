CREATE TYPE "year" AS enum('1', '2', '3', '4');

CREATE TYPE "condition" AS enum('Used', 'New');

CREATE TYPE "house_type" AS enum(
   'Apartment',
   'House',
   'Bedroom',
   'Basement',
   'Condo'
);

CREATE TYPE "role" AS enum('user', 'admin', 'banned');

CREATE TYPE "listing_type" AS enum('Selling', 'Wanting');

CREATE TABLE
   "users" (
      "id" UUID PRIMARY KEY DEFAULT Gen_random_uuid (),
      "first_name" VARCHAR(255) NOT NULL,
      "last_name" VARCHAR(255) NOT NULL,
      "email" VARCHAR(255) UNIQUE NOT NULL,
      "password" TEXT NOT NULL,
      "phone_number" VARCHAR(255) NOT NULL,
      "role" ROLE NOT NULL DEFAULT 'user'
   );

CREATE TABLE
   "textbooks" (
      "id" UUID PRIMARY KEY DEFAULT Gen_random_uuid (),
      "book_title" VARCHAR(255) NOT NULL,
      "author" VARCHAR(255),
      "edition" VARCHAR(255),
      "condition" CONDITION NOT NULL,
      "seller" UUID REFERENCES users (id) ON DELETE cascade,
      "date_posted" DATE DEFAULT CURRENT_DATE,
      "year" YEAR,
      "faculty" VARCHAR(255),
      "price" INT NOT NULL,
      "photos" TEXT[] DEFAULT '{}'
   );

CREATE TABLE
   "rentals" (
      "id" UUID PRIMARY KEY DEFAULT Gen_random_uuid (),
      "title" TEXT,
      "seller" UUID REFERENCES users (id) ON DELETE cascade,
      "address" TEXT NOT NULL,
      "post_date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "date_available" DATE NOT NULL,
      "description" TEXT NOT NULL,
      "house_type" HOUSE_TYPE NOT NULL,
      "cost" INT NOT NULL,
      "num_beds" INT NOT NULL DEFAULT 1,
      "is_cost_per_room" BOOLEAN NOT NULL,
      "is_utilities_included" BOOLEAN NOT NULL,
      "is_sublet" BOOLEAN NOT NULL,
      "has_laundry" BOOLEAN NOT NULL,
      "has_cooking" BOOLEAN NOT NULL,
      "has_parking" BOOLEAN NOT NULL,
      "no_smoking" BOOLEAN NOT NULL,
      "is_shared" BOOLEAN NOT NULL,
      "photos" TEXT[] DEFAULT '{}'
   );

CREATE TABLE
   "misc" (
      "id" UUID PRIMARY KEY DEFAULT Gen_random_uuid (),
      "title" VARCHAR(255),
      "description" TEXT,
      "price" INT NOT NULL,
      "seller" UUID REFERENCES users (id) ON DELETE cascade,
      "date_posted" DATE DEFAULT CURRENT_DATE,
      "photos" TEXT[] default '{}',
      "listing_type" LISTING_TYPE NOT NULL DEFAULT 'Selling'
   );

CREATE TABLE
   "refresh_tokens" (
      "token" TEXT PRIMARY KEY NOT NULL,
      "user_id" UUID REFERENCES users (id) ON DELETE cascade
   );