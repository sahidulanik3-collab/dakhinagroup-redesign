# Institutional Security Checklist & Hardening Guide (SECURITY_CHECKLIST.md)

This checklist covers both the client-side protections implemented in this repository and the server-side infrastructure requirements for Dakhina Group's production deployment.

---

## 1. Client-Side Protections Implemented in This Build

- [x] **Strict Content-Security-Policy (CSP):** Meta tag in `index.html` and header definitions in `public/_headers` and `docs/NGINX_HEADERS.conf`.
  - Disallows unsafe eval.
  - Limits script execution strictly to self.
  - Limits frame embedding (`frame-ancestors 'none'`).
- [x] **Zero Plaintext Secrets:** No API keys, passwords, or personal credentials stored in the codebase. `.env.example` provided.
- [x] **Anti-Clickjacking:** `X-Frame-Options: DENY` declared to prevent framing by malicious third-party portals.
- [x] **MIME Sniffing Prevention:** `X-Content-Type-Options: nosniff` enforced.
- [x] **Referrer Policy:** `strict-origin-when-cross-origin` to prevent URL leakages when clicking external outbound links.
- [x] **Permissions Policy:** Restricts access to camera, microphone, geolocation, and payment APIs unless explicitly authorized.
- [x] **Form Abuse Prevention:**
  - **Honeypot Trap:** Hidden field (`_hp_company_field`) invisible to human visitors; bots filling it trigger instant silent rejection.
  - **Time-Trap:** Prevents automated bot submissions completed in < 2.5 seconds.
  - **Client-Side Rate Limiter:** Prevents repeated spam clicks within 60 seconds per session.
  - **Sanitization:** Input trimming and XSS evasion on all user inputs.
- [x] **External Link Safety:** All external links configured with `rel="noopener noreferrer"`.
- [x] **RFC 9116 Vulnerability Disclosure:** Published under `public/.well-known/security.txt`.
- [x] **Privacy First:** Analytics scripts disabled by default; explicit user consent mechanism.

---

## 2. Server-Side Production Hardening Checklist (For Hosting Provider)

When moving this build to a custom production domain (e.g. `https://dakhinagroup.com/`):

1. **HTTPS & TLS 1.3:**
   - Enforce HTTP to HTTPS automatic 301 redirection.
   - Configure HSTS (`Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`).
   - Use TLS 1.3 / 1.2 with strong modern cipher suites.
2. **Web Application Firewall (WAF):**
   - Enable Cloudflare or AWS CloudFront WAF with DDoS mitigation, bot challenge, and IP reputation filters.
3. **Form Submission Hardening:**
   - Route `VITE_FORM_ENDPOINT` to an encrypted serverless webhook (e.g. AWS Lambda / Cloudflare Worker / secure API) with server-side rate-limiting and reCAPTCHA v3 verification.
   - Transmit customer inquiry leads directly to internal CRM with TLS encrypted mail delivery.
4. **Regular Dependency Audits:**
   - Maintain automated GitHub Dependabot alerts and CodeQL static application security testing (workflow included in `.github/workflows/codeql.yml`).
