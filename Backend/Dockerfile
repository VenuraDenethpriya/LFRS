FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 8000

RUN chmod +x node_modules/.bin/tsc

RUN npm run build

CMD [ "npm", "start" ]
