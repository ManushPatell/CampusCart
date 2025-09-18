FROM node:20-slim as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY --from=build /app/dist ./dist

CMD ["npm", "run", "start"]

