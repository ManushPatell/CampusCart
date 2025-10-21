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

# Deployment

__CAUTION: To delete all volumes and reset dockers cache__

'''bash
# Be CAREFUL with this one
docker system prune -a --volumes -f
'''

'''bash
docker-compose build
docker-compose up
'''

## HTTPS Renewal

Cron job to run the certbot image every night at 3AM.

'''bash
0 3 * * * docker-compose run --rm certbot renew && docker-compose kill -s SIGHUP nginx
'''

## Getting into the db

While the db is running:

'''bash
docker-compose exec -it db psql -U <username> -d <database>
'''

### Deleting the db

'''bash
docker volume rm campuscart_db-data
'''