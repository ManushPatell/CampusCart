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

# In postgres container

\d <table_name> # shows table and columns

# To build the backend image

docker build -f Dockerfile.dev -t backend .
