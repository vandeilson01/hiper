export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' })
  if (!process.env.MERCADOPAGO_ACCESS_TOKEN) return res.status(503).json({ error: 'Mercado Pago ainda não configurado. Adicione MERCADOPAGO_ACCESS_TOKEN na Vercel.' })
  const { items = [], buyer = {}, shipping = 0 } = req.body || {}
  if (!items.length) return res.status(400).json({ error: 'O carrinho está vazio.' })
  const origin = req.headers.origin || process.env.PUBLIC_APP_URL || 'http://localhost:5173'
  const preference = {
    items: items.map(item => ({ id: String(item.id), title: item.title, quantity: Number(item.quantity || 1), currency_id: 'BRL', unit_price: Number(item.price) })),
    shipments: { cost: Number(shipping || 0), mode: 'not_specified' },
    payer: { name: buyer.name, email: buyer.email },
    back_urls: { success: `${origin}/?pagamento=sucesso`, failure: `${origin}/?pagamento=falhou`, pending: `${origin}/?pagamento=pendente` },
    auto_return: 'approved',
    notification_url: `${origin}/api/mercadopago/webhook`,
    external_reference: `hiper-${Date.now()}`,
    statement_descriptor: 'HIPER STOK'
  }
  const response = await fetch('https://api.mercadopago.com/checkout/preferences', { method: 'POST', headers: { Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`, 'Content-Type': 'application/json' }, body: JSON.stringify(preference) })
  const data = await response.json()
  if (!response.ok) return res.status(response.status).json({ error: data.message || 'Não foi possível criar o pagamento.', details: data })
  return res.status(200).json({ id: data.id, initPoint: data.init_point, sandboxInitPoint: data.sandbox_init_point })
}
