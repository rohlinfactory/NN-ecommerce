export function newsletterWelcomeEmail({ shopUrl }: { shopUrl: string }): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f5f5f5">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px">
<tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden">
    <tr><td style="background:#000;padding:32px;text-align:center">
      <h1 style="margin:0;color:#fff;font-size:24px;font-weight:600;letter-spacing:0.05em">NAKEDNATIVE</h1>
    </td></tr>
    <tr><td style="padding:40px 32px">
      <h2 style="margin:0 0 8px;font-size:20px;font-weight:600">Welcome to the tribe</h2>
      <p style="margin:0 0 24px;color:#666;line-height:1.6">
        You're in. Expect new drops, surf stories, and community news — no spam, ever.
      </p>
      <div style="margin:32px 0 0;text-align:center">
        <a href="${shopUrl}" style="display:inline-block;background:#000;color:#fff;padding:12px 32px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:500">Browse the shop</a>
      </div>
    </td></tr>
    <tr><td style="padding:24px 32px;border-top:1px solid #eee;text-align:center;color:#999;font-size:12px">
      NakedNative &mdash; Surf, clothing, community.
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`
}
