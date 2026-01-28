# Security Headers Configuration - Elternherz

This guide explains how to configure security headers for the Elternherz website on Cloudflare Pages.

## Overview

Security headers protect your website from common attacks and vulnerabilities. Cloudflare provides built-in security features, but additional configuration can enhance protection.

## Recommended Security Headers

### 1. Content Security Policy (CSP)

Controls which resources can be loaded on your website.

**Recommended Configuration:**
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cal.com https://cal.eu https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://cal.com https://cal.eu; frame-src https://cal.com https://cal.eu;
```

**Breakdown:**
- `default-src 'self'` - Only load resources from same origin by default
- `script-src` - Allow scripts from Cal.com and analytics
- `style-src 'self' 'unsafe-inline'` - Allow inline styles (needed for Astro)
- `img-src 'self' data: https:` - Allow images from same origin, data URIs, and HTTPS
- `connect-src` - Allow API calls to Cal.com
- `frame-src` - Allow iframes from Cal.com

### 2. X-Frame-Options

Prevents clickjacking by controlling if site can be embedded in frames.

**Recommended Configuration:**
```
X-Frame-Options: SAMEORIGIN
```

Allows framing only from same origin. Use `DENY` for stricter protection.

### 3. X-Content-Type-Options

Prevents MIME-type sniffing.

**Recommended Configuration:**
```
X-Content-Type-Options: nosniff
```

### 4. Referrer-Policy

Controls how much referrer information is shared.

**Recommended Configuration:**
```
Referrer-Policy: strict-origin-when-cross-origin
```

Sends full referrer for same-origin, only origin for cross-origin.

### 5. Permissions-Policy

Controls which browser features can be used.

**Recommended Configuration:**
```
Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()
```

Disables features not used by the site.

### 6. Strict-Transport-Security (HSTS)

Forces HTTPS connections.

**Recommended Configuration:**
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

- `max-age=31536000` - 1 year
- `includeSubDomains` - Apply to all subdomains
- `preload` - Submit to HSTS preload list

## Implementation on Cloudflare Pages

### Option 1: Cloudflare Workers (Recommended)

Create a `_headers` file in the `public/` directory:

```
/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()
  
# HTML pages only
/*.html
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cal.com https://cal.eu https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://cal.com https://cal.eu; frame-src https://cal.com https://cal.eu;
```

**Note**: Cloudflare Pages automatically handles HSTS when using their SSL.

### Option 2: Cloudflare Dashboard

1. Go to **Cloudflare Dashboard**
2. Select your domain
3. Navigate to **Rules** → **Transform Rules** → **Modify Response Header**
4. Create rules to add each header

### Option 3: Workers Script

For advanced control, create a Cloudflare Worker:

```javascript
export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    
    // Clone response to modify headers
    const newResponse = new Response(response.body, response);
    
    // Add security headers
    newResponse.headers.set('X-Frame-Options', 'SAMEORIGIN');
    newResponse.headers.set('X-Content-Type-Options', 'nosniff');
    newResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    newResponse.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=(), payment=()');
    
    // Add CSP for HTML pages
    if (newResponse.headers.get('Content-Type')?.includes('text/html')) {
      newResponse.headers.set(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self' 'unsafe-inline' https://cal.com https://cal.eu; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://cal.com https://cal.eu; frame-src https://cal.com https://cal.eu;"
      );
    }
    
    return newResponse;
  }
};
```

## Testing Security Headers

### 1. Browser DevTools

1. Open site in browser
2. Open DevTools (F12)
3. Go to **Network** tab
4. Reload page
5. Click on document request
6. Check **Response Headers**

### 2. Online Tools

Test your security headers:
- **Security Headers**: https://securityheaders.com/
- **Mozilla Observatory**: https://observatory.mozilla.org/
- **SSL Labs**: https://www.ssllabs.com/ssltest/

Target scores:
- Security Headers: A or A+
- Mozilla Observatory: B+ or higher
- SSL Labs: A or A+

### 3. Command Line

```bash
# Check headers
curl -I https://elternherz.de

# Check specific header
curl -I https://elternherz.de | grep -i "x-frame-options"
```

## Cloudflare-Specific Security Features

### 1. SSL/TLS Settings

**Recommended Settings:**

1. **SSL/TLS Encryption Mode**: Full (Strict)
2. **Minimum TLS Version**: TLS 1.2
3. **TLS 1.3**: Enabled
4. **Automatic HTTPS Rewrites**: Enabled
5. **Always Use HTTPS**: Enabled

### 2. Firewall Rules

Create rules to:
- Block known malicious IPs
- Rate limit excessive requests
- Protect against SQL injection
- Protect against XSS attacks

### 3. Web Application Firewall (WAF)

Enable Cloudflare's Managed Rulesets:
- **Cloudflare Managed Ruleset**
- **OWASP Core Ruleset**

### 4. DDoS Protection

- Automatically enabled for all Cloudflare customers
- Protects against layer 3, 4, and 7 attacks

### 5. Bot Management

Configure bot protection:
1. Go to **Security** → **Bots**
2. Set bot fight mode
3. Configure JavaScript detection

## Cal.com Integration Security

### Whitelist Cal.com Domains

Ensure CSP allows:
```
script-src https://cal.com https://cal.eu;
frame-src https://cal.com https://cal.eu;
connect-src https://cal.com https://cal.eu;
```

### Verify Booking Data

- All booking data sent over HTTPS
- Cal.com handles payment processing securely
- No sensitive data stored on your server

## GDPR & Privacy Compliance

### Data Processing

1. **Privacy Policy**: Link in footer and legal pages
2. **Cookie Consent**: Implement if using analytics cookies
3. **Data Minimization**: Only collect necessary data
4. **User Rights**: Provide contact for data requests

### Cal.com Privacy

- Cal.com is GDPR compliant
- Using EU servers (cal.eu) for data residency
- Privacy policy: https://cal.com/privacy

### Analytics Privacy

**Google Analytics:**
- Use GA4 with IP anonymization
- Configure data retention limits
- Implement cookie consent

**Plausible (Recommended):**
- Privacy-friendly alternative
- No cookies required
- GDPR compliant by default
- No cookie consent banner needed

## Monitoring & Alerts

### Set Up Monitoring

1. **Cloudflare Analytics**: Monitor traffic patterns
2. **Security Events**: Review in Cloudflare Dashboard
3. **Sentry**: Error monitoring and alerting
4. **Uptime Monitoring**: Use UptimeRobot or similar

### Security Alerts

Configure alerts for:
- Unusual traffic spikes
- Failed authentication attempts
- SQL injection attempts
- XSS attempts
- DDoS attacks

## Regular Security Maintenance

### Weekly

- [ ] Review Cloudflare security events
- [ ] Check for unusual traffic patterns
- [ ] Review error logs (Sentry)

### Monthly

- [ ] Run security header tests
- [ ] Check SSL certificate status
- [ ] Review and update CSP if needed
- [ ] Update dependencies: `npm audit`

### Quarterly

- [ ] Full security audit
- [ ] Penetration testing (if budget allows)
- [ ] Review and update security policies
- [ ] Train team on security best practices

## Security Incident Response

### If Site is Compromised

1. **Immediately**:
   - Enable "Under Attack Mode" in Cloudflare
   - Review recent changes in Git history
   - Check Cloudflare security logs

2. **Investigate**:
   - Identify attack vector
   - Review access logs
   - Check for malicious code

3. **Remediate**:
   - Rollback to known-good deployment
   - Patch vulnerabilities
   - Update all credentials

4. **Prevent**:
   - Implement additional security measures
   - Update security policies
   - Document incident and response

### Emergency Contacts

- **Cloudflare Support**: Via dashboard
- **Domain Registrar**: [Contact]
- **Hosting Support**: Cloudflare Pages support
- **Development Team**: [Contact]

## Security Checklist

### Before Launch

- [ ] All security headers configured
- [ ] SSL certificate active and valid
- [ ] HTTPS enforced (HTTP redirects)
- [ ] CSP configured for Cal.com
- [ ] Firewall rules active
- [ ] Bot protection enabled
- [ ] Security headers tested (A or A+ rating)
- [ ] Privacy policy accessible
- [ ] Cookie consent implemented (if needed)
- [ ] Error monitoring active (Sentry)

### After Launch

- [ ] Monitor security events daily
- [ ] Review analytics for anomalies
- [ ] Keep dependencies updated
- [ ] Regular security testing
- [ ] Respond to security advisories

## Resources

### Tools

- **Security Headers Test**: https://securityheaders.com/
- **Mozilla Observatory**: https://observatory.mozilla.org/
- **SSL Labs**: https://www.ssllabs.com/ssltest/
- **CSP Evaluator**: https://csp-evaluator.withgoogle.com/

### Documentation

- **Cloudflare Security**: https://developers.cloudflare.com/fundamentals/security/
- **OWASP**: https://owasp.org/
- **Web.dev Security**: https://web.dev/secure/

### Standards

- **OWASP Top 10**: https://owasp.org/www-project-top-ten/
- **GDPR**: https://gdpr.eu/
- **German BDSG**: https://www.gesetze-im-internet.de/bdsg_2018/

---

**Important**: Security is an ongoing process, not a one-time setup. Regular monitoring and updates are essential.

---

*Last updated: January 2026*
