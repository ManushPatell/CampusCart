FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001

ENV FRONTEND_ORIGIN=http://client:80
ENV DB_PORT=5432
ENV POSTGRES_HOST=host.docker.internal

# Use docker secrets
ENV DB_PASSWORD=mysecretpassword
ENV DB_USERNAME=postgres
ENV ACCESS_TOKEN_SECRET=ASJKHFBA!IASKDJFBAS
ENV REFRESH_TOKEN_SECRET=ASJKHFB@21234314!asdsdaffasIASKDJFBAS


CMD ["npm", "run", "start"]

