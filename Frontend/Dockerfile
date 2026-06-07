FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN ci

COPY . .

RUN npm run build


FROM nginx:alpine

COPY --from=build /app/dist /user/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]