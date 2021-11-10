FROM node:14.17.6-alpine as build-step
EXPOSE 4200
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod