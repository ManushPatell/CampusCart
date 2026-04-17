# Status

Sadly, the AWS costs were too high to keep CampusCart running. Thank you for your support!

---

# Development

To run CampusCart locally, make sure you have Docker installed. From the root folder:

Run

```bash
npm run dev
```

The frontend and backend should run based on the config you provide it in your `.env` file.
Make a copy, and modify the `.env.example` if you have not already.

# Deployment

__CAUTION: To delete all volumes and reset dockers cache__

```bash
# Be CAREFUL with this one
docker system prune -a --volumes -f
```

```bash
npm run prod
```

## HTTPS Renewal

Cron job to run the certbot image every night at 3AM.

```bash
0 3 * * * docker-compose run --rm certbot renew && docker-compose kill -s SIGHUP nginx
```

## Getting into the db

While the db is running:

```bash
docker-compose exec -it db psql -U <username> -d <database>
```

### Deleting the db

```bash
docker volume rm campuscart_db-data
```

If it says "npm ci" failed to work. It's likely because the disk storage is full on the ec2. To fix this, clear all docker cached images and containers not in use. Make sure __NOT__ to clear volumes.

You can also clean npm cache with

```bash
npm cache clean --force
```
