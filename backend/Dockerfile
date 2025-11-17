FROM node:22-alpine

WORKDIR /Agaya

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5000

CMD ["npm", "start"]


