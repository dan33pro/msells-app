FROM node:16.20.2

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
CMD ["npm", "start"]