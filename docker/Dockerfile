# Dockerfile cho ứng dụng NestJS
FROM node:16

# Thiết lập thư mục làm việc
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt phụ thuộc
RUN npm install

# Sao chép mã nguồn vào container
COPY . .

# Biên dịch ứng dụng
RUN npm run build

# Mở cổng ứng dụng
EXPOSE 3000

# Chạy ứng dụng
CMD ["npm", "run", "start:prod"]
