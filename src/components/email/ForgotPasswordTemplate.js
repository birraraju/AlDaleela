const createForgotPasswordEmailBody = ({ username, code, message }) => `
  <html>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
      <div style="background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
          <h2 style="color: #333;">Hello ${username},</h2>
          <p style="color: #555;">${message}</p>
          <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 5px; text-align: center;">
            <h3 style="color: #007bff; font-size: 24px; margin: 0;">${code}</h3>
          </div>
          <p style="color: #555;">Enter this code on the password reset page to reset your password.</p>
          <p style="color: #999; margin-top: 20px; font-size: 12px;">
            If you did not request this email, please ignore it. This code will expire in 15 minutes.
          </p>
        </div>
      </div>
    </body>
  </html>
`;

export default createForgotPasswordEmailBody;
