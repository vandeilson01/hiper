import crypto from 'node:crypto'
const cookieName = 'hiper_admin_session'
const secret = () => process.env.ADMIN_SESSION_SECRET || process.env.MERCADOPAGO_ACCESS_TOKEN || 'change-this-secret'
const sign = value => crypto.createHmac('sha256', secret()).update(value).digest('hex')
const sessionValue = email => Buffer.from(JSON.stringify({ email, exp: Date.now() + 1000 * 60 * 60 * 8 })).toString('base64url')
export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' })
  const { email, password } = req.body || {}; const adminEmail = process.env.ADMIN_EMAIL; const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminEmail || !adminPassword) return res.status(503).json({ error: 'Configure ADMIN_EMAIL e ADMIN_PASSWORD na Vercel antes de acessar o painel.' })
  if (email !== adminEmail || password !== adminPassword) return res.status(401).json({ error: 'E-mail ou senha inválidos.' })
  const value = sessionValue(email); const token = `${value}.${sign(value)}`
  res.setHeader('Set-Cookie', `${cookieName}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=28800`)
  return res.status(200).json({ authenticated: true, email })
}
