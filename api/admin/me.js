import crypto from 'node:crypto'
const cookieName = 'hiper_admin_session'
const secret = () => process.env.ADMIN_SESSION_SECRET || process.env.MERCADOPAGO_ACCESS_TOKEN || 'change-this-secret'
const parseCookies = header => Object.fromEntries(String(header || '').split(';').map(v => v.trim().split('=').map(decodeURIComponent)).filter(pair => pair.length === 2))
const sign = value => crypto.createHmac('sha256', secret()).update(value).digest('hex')
export default function handler(req, res) {
  try {
    const raw = parseCookies(req.headers.cookie)[cookieName]; if (!raw) return res.status(401).json({ authenticated: false })
    const parts = decodeURIComponent(raw).split('.'); if (parts.length !== 2) return res.status(401).json({ authenticated: false })
    const [payload, providedSignature] = parts; const expectedSignature = sign(payload)
    if (providedSignature.length !== expectedSignature.length || !crypto.timingSafeEqual(Buffer.from(providedSignature), Buffer.from(expectedSignature))) return res.status(401).json({ authenticated: false })
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')); if (!session.email || Number(session.exp) < Date.now()) return res.status(401).json({ authenticated: false })
    return res.status(200).json({ authenticated: true, email: session.email })
  } catch { return res.status(401).json({ authenticated: false }) }
}
