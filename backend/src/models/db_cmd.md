# Start db container

docker run --name db -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres

# Connect to the container through an interactive terminal

docker exec -it db psql -U postgres

# Get a list of all tables

\dt

# Create a docker volume

docker volume create db-data

# When you reset containers you lose all data. To save data to disk use a volume

# Pass this cli arg when starting the db container

-v db-data:/var/lib/postgresql/data

# This arg maps the volume

docker run --name db -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -v db-data -d postgres

CREATE TYPE "year" AS ENUM ('1', '2', '3', '4');

CREATE TYPE condition AS ENUM ('Used', 'New');

CREATE TYPE HOUSETYPE as ENUM ('Apartment', 'House', 'Bedroom', 'Basement', 'Condo');

CREATE TYPE faculty as ENUM ('Engineering', 'Health Sciences', 'Humanities', 'Social Science', 'Business');

CREATE TYPE faculty as ENUM ('Engineering', 'Health Sciences', 'Humanities', 'Social Science', 'Business');

create table "users" (
"id" serial primary key,
"first_name" varchar(255) not null,
"last_name" varchar(255) UNIQUE not null,
"email" varchar(255) UNIQUE not null,
"phone_number" varchar(255) null default NULL,
"password" varchar(255) not null
);

create table "textbooks" (

"id" serial primary key,
"book_title" varchar(255) not null,
"author" varchar(255),
"edition" varchar(255),
"seller" serial REFERENCES users(id) ON DELETE CASCADE,
"date_posted" DATE DEFAULT CURRENT_DATE,
"photos" BYTEA[] not null,
"year" INT,
"faculty" faculty,
"price" INT not null,
"condition" condition not null,
"course_code" varchar(50) not null,
CONSTRAINT course_code_format CHECK (course_code ~ '^[A-Z]{4}\\\*[0-9]{4}$')

"id" serial primary key,
"book_title" varchar(255) not null,
"author" varchar(255),
"edition" varchar(255),
"seller" serial REFERENCES users(id) ON DELETE CASCADE,
"date_posted" DATE DEFAULT CURRENT_DATE,
"photos" BYTEA[] not null,
"year" INT,
"faculty" faculty,
"price" INT not null,
"condition" condition not null,
"course_code" varchar(50) not null,
CONSTRAINT course_code_format CHECK (course_code ~ '^[A-Z]{4}\\\*[0-9]{4}$')
);

create table "house" (
"id" serial primary key,
"seller" INT not null,
CONSTRAINT fk_seller FOREIGN KEY (seller) REFERENCES "users"("id") ON DELETE CASCADE,
"title" TEXT not null,
"contact" VARCHAR(255) not null,
"image" BYTEA[] not null,
"address" TEXT not null,
"post_date" DATE not null default CURRENT_TIMESTAMP,
"date_available" DATE not null,
"description" TEXT not null,
"house_type" HOUSETYPE not null,
"cost" INT not null,
"num_beds" INT not null default 1,
"is_cost_per_room" BOOLEAN not null,
"is_utilities_included" BOOLEAN not null,
"is_shared" BOOLEAN not nulll
);

CREATE TABLE "users" ("id" SERIAL PRIMARY KEY, "first_name" VARCHAR(255) NOT NULL, "last_name" VARCHAR(255) NOT NULL, "email" VARCHAR(255) UNIQUE NOT NULL, "phone_number" VARCHAR(255) UNIQUE NOT NULL);

CREATE TABLE "textbooks" ("id" serial primary key, "book_title" varchar(255) not null, "author" varchar(255), "edition" varchar(255), "seller" serial REFERENCES users(id) ON DELETE CASCADE,"date_posted" DATE DEFAULT CURRENT_DATE, "photos" BYTEA[] not null, "year" INT, "faculty" varchar(255), "price" INT not null);

CREATE TABLE "house" ("id" SERIAL PRIMARY KEY, "seller" INT NOT NULL, CONSTRAINT fk_seller FOREIGN KEY ("seller") REFERENCES "users"("id") ON DELETE CASCADE, "address" TEXT NOT NULL, "post_date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP, "date_available" DATE NOT NULL, "description" TEXT NOT NULL, "house_type" HOUSETYPE NOT NULL, "cost" INT NOT NULL, "num_beds" INT NOT NULL DEFAULT 1, "is_cost_per_room" BOOLEAN NOT NULL, "is_utilities_included" BOOLEAN NOT NULL, "is_sublet" BOOLEAN NOT NULL, "has_laundry" BOOLEAN NOT NULL, "has_cooking" BOOLEAN NOT NULL, "has_parking" BOOLEAN NOT NULL, "no_smoking" BOOLEAN NOT NULL, "is_shared" BOOLEAN NOT NULL);

# In postgres container

\d <table_name> # shows table and columns

# To build the backend image

docker build -f Dockerfile.dev -t backend .
