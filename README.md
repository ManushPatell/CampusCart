# Development

To run CampusCart locally, make sure you have Docker installed.

Run 
```bash
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up
```

You might have to run
```bash
docker compose -f docker-compose.dev.yml build
docker compose -f docker-compose.dev.yml up
```

depending on how you installed docker compose I think.

The frontend and backend should run based on the config you provide it in your `.env` file.
Make a copy, and modify the `.env.example` if you have not already.