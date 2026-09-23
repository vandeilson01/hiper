export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') return res.status(405).end()
  const payload = req.body || {}
  console.log(JSON.stringify({ source: 'mercadopago', type: payload.type || req.query?.type, data: payload.data || req.query?.data, receivedAt: new Date().toISOString() }))
  return res.status(200).json({ received: true })
}
