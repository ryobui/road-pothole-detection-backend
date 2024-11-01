FROM node:slim as builder
WORKDIR /app
COPY package*.json ./
RUN pwd
RUN npm install
COPY . .
RUN npm run build

FROM node:slim
WORKDIR /app
RUN pwd
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/main.js"]
