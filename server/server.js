/**
 * Lightweight Node.js / Express contact-form backend
 * Matches the security practices described in the internship report:
 * - Input validation & sanitization
 * - Rate limiting
 * - Security headers (Helmet)
 * - Honeypot bot protection
 * - No secrets in client code
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3001;

// ---------- Security middleware ----------
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
      scriptSrc: ["'self'", "https://cdn.tailwindcss.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"]
    }
  },
  frameguard: { action: 'deny' }, // X-Frame-Options
  hsts: { maxAge: 31536000, includeSubDomains: true }
}));

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
  methods: ['POST', 'GET', 'OPTIONS']
}));

app.use(express.json({ limit: '10kb' }));

// Rate limit: 5 submissions per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, error: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

// ---------- Helpers ----------
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .trim()
    .slice(0, 2000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ---------- Routes ----------
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'portfolio-contact-api' });
});

app.post('/api/contact', contactLimiter, (req, res) => {
  try {
    const { name, email, subject, message, website } = req.body || {};

    // Honeypot — bots often fill hidden fields
    if (website) {
      return res.status(200).json({ success: true }); // silent success for bots
    }

    // Validation
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Name is required (min 2 characters).' });
    }
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ success: false, error: 'Valid email is required.' });
    }
    if (!message || message.trim().length < 10) {
      return res.status(400).json({ success: false, error: 'Message must be at least 10 characters.' });
    }

    const payload = {
      name: sanitize(name).slice(0, 100),
      email: sanitize(email).slice(0, 150),
      subject: sanitize(subject || 'Portfolio Contact').slice(0, 150),
      message: sanitize(message).slice(0, 2000),
      receivedAt: new Date().toISOString(),
      ip: req.ip
    };

    // In production: forward to email service (Nodemailer, Resend, etc.)
    // using credentials stored in environment variables only.
    console.log('[Contact Form]', JSON.stringify(payload, null, 2));

    // Example Nodemailer integration (uncomment + install nodemailer when ready):
    // const transporter = nodemailer.createTransport({ ... process.env ... });
    // await transporter.sendMail({ from, to, subject, text });

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been received.'
    });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Contact API running on http://localhost:${PORT}`);
});
