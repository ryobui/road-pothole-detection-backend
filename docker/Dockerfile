# Sử dụng image Node.js chính thức làm base image
FROM node:18

# Thiết lập thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

RUN la -al
# Biên dịch mã nguồn TypeScript sang JavaScript
RUN npm run build

# Expose port mà ứng dụng sẽ chạy (thay đổi nếu cần)
EXPOSE 3000

# Chạy ứng dụng
CMD ["npm", "run", "start:prod"]
