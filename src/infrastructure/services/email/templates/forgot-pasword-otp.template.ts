export default (code: string) => {
    return `
          <!doctype html>
            <html lang="vi">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
                        }

                        .app-name {
                            font-size: 20px;
                            font-weight: 600;
                            color: #000000;
                            margin-bottom: 54px;
                        }

                        .header h1 {
                            color: #000000;
                            margin-bottom: 32px;
                            size: 40px;
                        }
                        .code {
                            font-size: 36px; /* Tăng kích thước mã */
                            font-weight: bold;
                            color: #000000;
                            border-radius: 5px;
                            display: inline-block;
                            margin: 14px 0; /* Thêm khoảng cách trên và dưới */
                        }
                        .sub-text {
                            font-size: 12px;
                        }
                        .footer {
                            margin-top: 64px;
                            font-size: 14px; /* Tăng kích thước font cho footer */
                        }

                        .footer .bold {
                            font-weight: bold;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <p class="app-name">Road Pothole</p>
                        <div class="header">
                            <h1>Verification code</h1>
                        </div>
                        <p class="sub-text">Enter the following verification code when prompted:</p>
                        <div class="code">${code}</div>
                        <p class="sub-text">To protect your account, do not share this code.</p>
                        <div class="footer">
                            <p class="bold">Didn't request this?</p>
                            <span>
                                This code was requested from
                                <span class="bold">
                                    2405:4802:90b8:a920:2826:1c70:5383:682e, Ho Chi Minh City, VN at 12 November
                                    2024, 17:11 UTC.
                                </span>
                                If you didn't make this request, you can safely ignore this email.
                            </span>
                        </div>
                    </div>
                </body>
            </html>

      `;
};
