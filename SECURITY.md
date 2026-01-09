# Security Policy

## Security Improvements Implemented

This repository has been audited and the following security improvements have been implemented:

### 1. **Password Security**
- ✅ Passwords are now hashed using bcrypt before storing in the database
- ✅ Passwords are never displayed on the frontend
- ✅ Minimum password length requirement (8 characters)

### 2. **DDoS Protection**
- ✅ Rate limiting implemented on HTTP API endpoints (10 requests/second per IP)
- ✅ Rate limiting on WebSocket connections (5 connections/second per IP)
- ✅ Maximum connections per IP limit on WebSocket server (10 concurrent connections)
- ✅ Nginx rate limiting configured for all services
- ✅ Connection limits enforced at the proxy level

### 3. **Input Validation**
- ✅ All user inputs are validated before processing
- ✅ Type checking for username and password fields
- ✅ Length restrictions on input fields
- ✅ Proper error handling with try-catch blocks

### 4. **Security Headers**
- ✅ X-Frame-Options: DENY/SAMEORIGIN (prevents clickjacking)
- ✅ X-Content-Type-Options: nosniff (prevents MIME type sniffing)
- ✅ X-XSS-Protection: enabled (provides XSS protection)
- ✅ Server tokens hidden in nginx (prevents version disclosure)

### 5. **Infrastructure Security**
- ✅ Removed hardcoded IP addresses from GitHub workflows
- ✅ Moved sensitive configuration to GitHub Secrets
- ✅ Fixed GitHub Actions workflow syntax errors
- ✅ Proper SSH key handling (created/deleted during deployment)
- ✅ StrictHostKeyChecking disabled for automated deployments

### 6. **WebSocket Security**
- ✅ Maximum payload size limit (100KB)
- ✅ Connection tracking per IP address
- ✅ Automatic cleanup on disconnect
- ✅ Removed automatic user creation on connection (security risk)

### 7. **Nginx Configuration**
- ✅ Buffer overflow protection with size limits
- ✅ Request body size limits
- ✅ Proper proxy headers configuration
- ✅ WebSocket timeout settings

## Required GitHub Secrets

To use the deployment workflows, configure the following secrets in your GitHub repository:

### Development Environment
- `SSH_KEY` - SSH private key for development server
- `DEV_SERVER_USER` - Username for development server (avoid using 'root')
- `DEV_SERVER_IP` - IP address of development server

### Production Environment
- `SSH_KEY_PROD` - SSH private key for production server
- `PROD_SERVER_USER` - Username for production server (avoid using 'root')
- `PROD_SERVER_IP` - IP address of production server

## Security Best Practices

### For Production Deployment:
1. **Never use root user** - Create a dedicated deployment user with limited privileges
2. **Use SSH key authentication** - Never use password-based SSH authentication
3. **Enable HTTPS** - Configure SSL/TLS certificates (Let's Encrypt recommended)
4. **Set up a firewall** - Use UFW or iptables to restrict access
5. **Regular updates** - Keep all dependencies and system packages up to date
6. **Monitor logs** - Set up logging and monitoring for suspicious activity
7. **Database backups** - Implement regular automated backups
8. **Environment variables** - Store DATABASE_URL and other secrets in environment variables

### Additional Recommendations:
- Implement proper authentication (JWT or sessions)
- Add CORS configuration for cross-origin requests
- Set up CSP (Content Security Policy) headers
- Enable HTTPS-only connections
- Implement request logging and monitoring
- Add API versioning
- Set up automated security scanning in CI/CD

## Reporting Security Issues

If you discover a security vulnerability, please email the repository owner directly instead of creating a public issue.

## Known Limitations

- Currently no authentication/authorization system implemented
- Database passwords stored with bcrypt (consider argon2 for enhanced security)
- No CSRF protection implemented
- No session management
- WebSocket connections not authenticated
- No audit logging for sensitive operations

These should be addressed in future updates for a production-ready application.
