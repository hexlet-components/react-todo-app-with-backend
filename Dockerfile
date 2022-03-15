FROM node:16-slim

RUN apt-get update && apt-get install -yq make

WORKDIR /app

COPY . .
RUN npm ci

CMD ["npm", "start"]
