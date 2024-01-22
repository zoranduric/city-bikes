FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g ts-node typescript

RUN npm install

COPY . .

EXPOSE 5000

CMD ["ts-node", "src/main.ts"]
