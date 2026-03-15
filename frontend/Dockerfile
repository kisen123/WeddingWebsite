FROM node:22-alpine

WORKDIR /frontend_server

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
