# Ayush Dahal — Personal Portfolio Website

Responsive, security-conscious personal portfolio website developed during an eight-week Web Development Internship at **Codelivly Security Hub Pvt. Ltd.** (15 June 2026 – 15 August 2026).

This project is submitted in partial fulfillment of the requirements for the Bachelor in Computer Application (BCA) program, Tribhuvan University.

---

## Features

- **Responsive design** — works on desktop, tablet, and mobile
- **Dark / Light mode** toggle with preference persistence
- **Sections**: Home, About, Skills, Projects, Contact
- **Data-driven Skills & Projects** rendered from JavaScript
- **Contact form** with client-side validation, sanitization, and honeypot bot protection
- **Lightweight Node.js/Express backend** for form handling (input validation, rate limiting, security headers)
- **SEO-friendly** meta tags and semantic HTML5
- Ready for deployment on **Vercel** (or any static + serverless host)

---

## Tech Stack

| Layer        | Technologies                                      |
|--------------|---------------------------------------------------|
| Frontend     | HTML5, CSS3, JavaScript (ES6+), Tailwind CSS      |
| Backend      | Node.js, Express.js                               |
| Security     | Input validation/sanitization, Helmet, rate limit, honeypot, HTTPS-ready |
| Version Ctrl | Git / GitHub                                      |
| Deployment   | Vercel (recommended)                              |

---

## Project Structure

```
ayush-portfolio/
├── index.html          # Main single-page application
├── css/
│   └── styles.css      # Custom styles
├── js/
│   └── app.js          # Theme, navigation, skills/projects data, form logic
├── server/
│   ├── package.json
│   ├── server.js       # Express contact API
│   └── .env.example
├── assets/             # Images, resume PDF, etc.
└── README.md
```

---

## Quick Start (Frontend only)

1. Open `index.html` in a browser, **or**
2. Serve locally:

```bash
# From project root
npx serve .
# or
python -m http.server 8080
```

Then visit `http://localhost:3000` (or the port shown).

---

## Contact Form Backend (optional)

```bash
cd server
npm install
cp .env.example .env   # edit ALLOWED_ORIGIN if needed
npm start
```

API runs at `http://localhost:3001`.

Update the `fetch` URL in `js/app.js` to point to `/api/contact` when the backend is live (or use a reverse proxy / Vercel serverless function).

---

## Security Practices Applied

- Client & server input validation and sanitization
- Honeypot field for basic bot/spam protection
- Rate limiting (5 requests / 15 min per IP)
- Helmet security headers (CSP, X-Frame-Options, HSTS)
- No secrets or API keys in client-side code
- HTTPS enforced at the hosting layer (Vercel / Cloudflare)

---

## Customization Checklist

1. Replace placeholder email, social links, and location in `index.html`
2. Add your real GitHub / LinkedIn URLs
3. Upload a resume PDF and link it from the Resume button
4. Update project cards and skill levels in `js/app.js`
5. Add real project screenshots in `assets/` if desired
6. Deploy frontend to Vercel and (optionally) the API as a serverless function

---

## Internship Details

| Item              | Detail                                      |
|-------------------|---------------------------------------------|
| Intern            | Ayush Dahal (Exam Roll No. 70302070)        |
| College           | G.P. Koirala Memorial (Community) College   |
| Host Organization | Codelivly Security Hub Pvt. Ltd.            |
| Mentor            | Mr. Diwakar Lamichane                       |
| Internal Supervisor | Mr. Sujan Shrestha                        |
| Duration          | 15 June 2026 – 15 August 2026               |

---

© 2026 Ayush Dahal
