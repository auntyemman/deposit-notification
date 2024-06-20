export function insufficientFundsEmail(
  userName: string,
  amount: number,
  topUpLink: string,
): string {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Automated Deposit Failed - [Your App Name]</title>
    <style>
      body {
        font-family: sans-serif;
        margin: 0;
        padding: 20px;
      }
      h1 {
        font-size: 20px;
        margin-bottom: 10px;
      }
      p {
        line-height: 1.5;
      }
      a {
        color: #007bff;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <h1>Hi ${userName},</h1>
    <p>We're writing to inform you that your recent automated deposit of ${amount} failed due to insufficient funds in your wallet.</p>
    <p>To ensure your account remains active and avoid future deposit failures, please top up your wallet. You can do so by following these steps:</p>
    <ul>
      <li>Log in to your Stackivy account.</li>
      <li>Navigate to the "Wallet" section.</li>
      <li>Choose your preferred top-up method and follow the instructions.</li>
    </ul>
    <p>For your convenience, you can also top up your wallet directly by clicking this link: <a href="${topUpLink}">Top Up Now</a></p>
    <p>If you have any questions or require assistance, please don't hesitate to contact our support team at Stackivy@test.com or +23480203844.</p>
    <p>Thank you for using stackivy!</p>
    <p>Sincerely,</p>
    <p>The Stackivy Team</p>
  </body>
  </html>
    `;
}
