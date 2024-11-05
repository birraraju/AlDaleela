const createEmailBody = ({ username, link, message }) => `
  <html>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
      <div style="background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
          <h2 style="color: #333;">Hello ${username},</h2>
          <p style="color: #555;">${message}</p>
          <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; border-radius: 5px; text-decoration: none;">
            Click Here
          </a>
          <p style="color: #999; margin-top: 20px; font-size: 12px;">If you did not request this email, please ignore it.</p>
        </div>
      </div>
    </body>
  </html>
`;

export default createEmailBody;