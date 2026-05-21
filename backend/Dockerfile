FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 4141 

CMD ["npm", "run","server"]