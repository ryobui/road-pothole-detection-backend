export default (otpCode: string) => {
    return `
        <!DOCTYPE html>
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    padding: 20px;
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                .container {
                    max-width: 600px;
                    background: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    margin: auto;
                    text-align: center; /* Căn giữa nội dung */
                }
                .header h1 {
                    color: #333333;
                    margin-bottom: 10px; /* Giảm khoảng cách giữa tiêu đề và nội dung */
                }
                .otp-code {
                    font-size: 36px; /* Tăng kích thước mã OTP */
                    font-weight: bold;
                    color: #4CAF50;
                    text-align: center;
                    padding: 15px;
                    border: 2px solid #4CAF50;
                    border-radius: 5px;
                    display: inline-block;
                    margin: 20px 0; /* Thêm khoảng cách trên và dưới */
                }
                .footer {
                    margin-top: 20px;
                    font-size: 14px; /* Tăng kích thước font cho footer */
                    color: #777777;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Xác thực tài khoản của bạn</h1>
                </div>
                <p>Xin chào,</p>
                <p>Để xác thực tài khoản của bạn, vui lòng nhập mã OTP bên dưới:</p>
                <div class="otp-code">${otpCode}</div>
                <p>Mã này sẽ hết hạn trong 10 phút.</p>
                <div class="footer">
                    <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
                </div>
            </div>
        </body>
        </html>
    `;
};
