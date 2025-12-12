FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production

COPY . .
EXPOSE 9080
CMD ["node", "app.js"]

