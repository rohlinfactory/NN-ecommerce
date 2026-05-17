type OrderConfirmationProps = {
  orderId: string
  customerName: string
  orderUrl: string
  items: Array<{
    title: string
    quantity: number
    price: string
  }>
  total: string
}

export function orderConfirmationEmail({
  orderId,
  customerName,
  orderUrl,
  items,
  total,
}: OrderConfirmationProps): string {
  const itemRows = items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px 0;border-bottom:1px solid #eee">${item.title}</td>
          <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:center">${item.quantity}</td>
          <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right">${item.price}</td>
        </tr>`,
    )
    .join('')

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
      <h2 style="margin:0 0 8px;font-size:20px;font-weight:600">Order confirmed</h2>
      <p style="margin:0 0 24px;color:#666">Hey ${customerName}, thanks for your order.</p>
      <p style="margin:0 0 24px;color:#666;font-size:14px">Order <strong>#${orderId}</strong></p>
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px">
        <tr style="color:#999;font-size:12px;text-transform:uppercase;letter-spacing:0.05em">
          <td style="padding:0 0 8px">Item</td>
          <td style="padding:0 0 8px;text-align:center">Qty</td>
          <td style="padding:0 0 8px;text-align:right">Price</td>
        </tr>
        ${itemRows}
        <tr>
          <td colspan="2" style="padding:12px 0;font-weight:600">Total</td>
          <td style="padding:12px 0;font-weight:600;text-align:right">${total}</td>
        </tr>
      </table>
      <div style="margin:32px 0 0;text-align:center">
        <a href="${orderUrl}" style="display:inline-block;background:#000;color:#fff;padding:12px 32px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:500">View your order</a>
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
