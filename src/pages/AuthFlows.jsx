import './AuthFlows.css'

export default function AuthFlows() {
  return (
    <div className="content auth-flows-page">
      <h1 className="page-title">🔑 Auth Flows Best Practices</h1>
      <p className="subtitle">Registration, Forgot Password &amp; Account Recovery — with ForgeRock implementation notes</p>

      <h2>1. Registration Flow</h2>

      <h3>Recommended Flow</h3>
      <div className="flow">
        <div className="flow-step">User clicks "Sign Up"</div>
        <div className="flow-arrow">&rarr;</div>
        <div className="flow-step">Collect email + password<span className="flow-label">minimal fields</span></div>
        <div className="flow-arrow">&rarr;</div>
        <div className="flow-step alt">Email verification<span className="flow-label">magic link or OTP</span></div>
        <div className="flow-arrow">&rarr;</div>
        <div className="flow-step">Profile enrichment<span className="flow-label">progressive profiling</span></div>
        <div className="flow-arrow">&rarr;</div>
        <div className="flow-step success">Account created ✓</div>
      </div>

      <h3>Best Practices</h3>
      <ul>
        <li><strong>Minimize initial fields</strong> — collect only email and password (or go passwordless). Ask for name, phone, preferences later via progressive profiling.</li>
        <li><strong>Real-time validation</strong> — show password strength, email format, and username availability inline as the user types.</li>
        <li><strong>Social / federated sign-up</strong> — offer Google, Apple, or enterprise IdP options to reduce friction.</li>
        <li><strong>Verify email before granting full access</strong> — send a magic link or 6-digit OTP. Don't rely solely on "click this link in 24 hours."</li>
        <li><strong>Progressive profiling</strong> — gather additional attributes (phone, MFA setup, preferences) across subsequent logins, not all at once.</li>
        <li><strong>Passwordless option</strong> — consider WebAuthn / passkeys as the primary credential, falling back to email OTP.</li>
        <li><strong>Bot protection</strong> — use CAPTCHA or risk scoring (e.g., reCAPTCHA Enterprise) on the registration page.</li>
        <li><strong>Comply with NIST 800-63B</strong> — don't enforce arbitrary complexity rules; check against breached-password lists instead; require minimum 8 characters.</li>
      </ul>

      <div className="nist">
        <strong>📋 NIST 800-63B:</strong> Verifiers SHALL require passwords ≥ 8 characters, SHOULD allow up to 64+, and SHALL compare against known-breached corpora. Composition rules (uppercase + symbol) are NOT recommended.
      </div>

      <div className="impl">
        <strong>ForgeRock Implementation:</strong> Build a <code>Registration</code> journey in PingOne AIC (or AM). Use the <strong>Page Node</strong> to combine Attribute Collector + Password Collector on one screen. Add a <strong>Create Object</strong> node → <strong>Email Suspend Node</strong> (sends verification link) → on resume, <strong>Patch Object</strong> to set <code>emailVerified=true</code>. For progressive profiling, create a separate <code>Progressive Profile</code> journey triggered by an inner-tree evaluator on subsequent logins that checks if attributes like <code>telephoneNumber</code> are missing. Use the <strong>HaveIBeenPwned</strong> integration node to check breached passwords at registration time.
      </div>

      <h2>2. Forgot Password Flow</h2>

      <h3>Recommended Flow</h3>
      <div className="flow">
        <div className="flow-step">User clicks "Forgot Password"</div>
        <div className="flow-arrow">&rarr;</div>
        <div className="flow-step">Enter email address</div>
        <div className="flow-arrow">&rarr;</div>
        <div className="flow-step alt">Send reset link / OTP<span className="flow-label">time-limited token</span></div>
        <div className="flow-arrow">&rarr;</div>
        <div className="flow-step">User verifies identity<span className="flow-label">clicks link or enters code</span></div>
        <div className="flow-arrow">&rarr;</div>
        <div className="flow-step">Set new password</div>
        <div className="flow-arrow">&rarr;</div>
        <div className="flow-step success">Password updated ✓<span className="flow-label">invalidate old sessions</span></div>
      </div>

      <h3>Best Practices</h3>
      <ul>
        <li><strong>Generic response</strong> — always say "If an account exists, we sent a reset link." Never reveal whether an email is registered (prevents user enumeration).</li>
        <li><strong>Short-lived tokens</strong> — reset links should expire in 15–60 minutes. One-time use only.</li>
        <li><strong>Rate limit</strong> — throttle reset requests per email and per IP to prevent abuse.</li>
        <li><strong>Invalidate existing sessions</strong> — after a successful password reset, revoke all active sessions and refresh tokens for that user.</li>
        <li><strong>Notify the user</strong> — send an email confirming the password was changed (to the old and/or new email).</li>
        <li><strong>Don't use security questions</strong> — they're easily guessable. Use email/SMS OTP or passkey verification instead.</li>
        <li><strong>Step-up if available</strong> — if the user has MFA enrolled, require the second factor during reset for higher assurance.</li>
      </ul>

      <div className="nist">
        <strong>📋 NIST 800-63B §5.1.1.2:</strong> Memorized secret verifiers SHALL implement a rate-limiting mechanism that limits the number of failed authentication attempts. Look-up secrets (reset tokens) SHALL be single-use and expire after a defined period.
      </div>

      <div className="impl">
        <strong>ForgeRock Implementation:</strong> Use the built-in <code>Forgot Password</code> journey template or build custom: <strong>Page Node</strong> (username collector) → <strong>Identify Existing User</strong> → <strong>Email Suspend Node</strong> with a reset link containing a one-time token. On resume: <strong>Attribute Collector</strong> (new password) → <strong>Patch Object</strong> to update password → <strong>Session Invalidation Node</strong> (or scripted node calling <code>/sessions?_action=logoutByUser</code>). Add a <strong>Message Node</strong> for the generic "check your email" response regardless of user existence. Set token TTL in the Email Suspend Node config (default 300s — increase to 3600s for production).
      </div>

      <h2>3. Account Recovery Flow</h2>

      <h3>Recommended Flow</h3>
      <div className="flow">
        <div className="flow-step">User cannot access account<span className="flow-label">locked out / lost MFA</span></div>
        <div className="flow-arrow">&rarr;</div>
        <div className="flow-step">Select recovery method<span className="flow-label">email, SMS, backup codes</span></div>
        <div className="flow-arrow">&rarr;</div>
        <div className="flow-step alt">Verify identity<span className="flow-label">multi-channel proof</span></div>
        <div className="flow-arrow">&rarr;</div>
        <div className="flow-step alt">Step-up verification<span className="flow-label">if risk is elevated</span></div>
        <div className="flow-arrow">&rarr;</div>
        <div className="flow-step">Re-enroll credentials<span className="flow-label">new MFA / password</span></div>
        <div className="flow-arrow">&rarr;</div>
        <div className="flow-step success">Access restored ✓</div>
      </div>

      <h3>Scenario Comparison</h3>
      <table>
        <thead>
          <tr><th>Scenario</th><th>Recovery Method</th><th>Risk Level</th></tr>
        </thead>
        <tbody>
          <tr><td>Lost password (has MFA)</td><td>Email reset + MFA verify</td><td>Low</td></tr>
          <tr><td>Lost MFA device</td><td>Backup codes → re-enroll MFA</td><td>Medium</td></tr>
          <tr><td>Lost password + MFA</td><td>Email + SMS + identity proofing</td><td>High</td></tr>
          <tr><td>Compromised account</td><td>Admin-assisted + full re-enrollment</td><td>Critical</td></tr>
        </tbody>
      </table>

      <h3>Best Practices</h3>
      <ul>
        <li><strong>Provide backup codes at MFA enrollment</strong> — generate 8–10 single-use recovery codes and prompt the user to save them. This is the #1 way to reduce support tickets.</li>
        <li><strong>Multiple recovery channels</strong> — let users register a recovery email AND phone. If one is compromised, the other acts as a fallback.</li>
        <li><strong>Adaptive risk assessment</strong> — if the recovery request comes from a new device/location, require additional verification (e.g., government ID scan or video selfie).</li>
        <li><strong>Escalation path</strong> — for high-risk scenarios (lost all factors), provide a clear path to human-assisted recovery with identity proofing.</li>
        <li><strong>Audit logging</strong> — log every recovery attempt, successful or not, for compliance and fraud detection.</li>
        <li><strong>Cooldown periods</strong> — after account recovery, restrict sensitive actions (password change, email change) for 24–48 hours to limit damage from social engineering.</li>
        <li><strong>Re-enroll, don't just restore</strong> — after recovery, force MFA re-enrollment rather than restoring the old configuration.</li>
      </ul>

      <div className="nist">
        <strong>📋 NIST 800-63B §6.1.2.3:</strong> Recovery of an authenticator requires proof of the same or higher AAL as the authenticator being replaced. Recovery SHALL NOT downgrade the assurance level. Backup authenticators (recovery codes) should be issued at enrollment time.
      </div>

      <div className="impl">
        <strong>ForgeRock Implementation:</strong> Build an <code>Account Recovery</code> journey with branching logic: <strong>Choice Collector</strong> (recovery method selection) → branch to Email Suspend, SMS OTP, or Backup Code verification. Use a <strong>Scripted Decision Node</strong> to check which recovery factors the user has enrolled. For backup codes, use <code>fr-attr: recovery-codes</code> in the user profile and a scripted node to validate + consume codes. After verification, route to an <strong>MFA Registration</strong> inner journey to re-enroll. Use the <strong>Account Lockout Node</strong> or scripted <code>inetUserStatus</code> check for locked accounts. For high-risk recovery, integrate <strong>Onfido</strong> or <strong>Jumio</strong> via marketplace connectors for document verification. Enable <strong>Audit Logging</strong> at the journey level — all events write to <code>am-authentication</code> topic.
      </div>

      <h2>Summary: Key Principles</h2>
      <ul>
        <li><strong>Minimize friction at every step</strong> — only ask for what you need, when you need it.</li>
        <li><strong>Never reveal account existence</strong> — generic messages prevent enumeration attacks.</li>
        <li><strong>Defense in depth</strong> — layer email + OTP + risk signals; no single point of failure.</li>
        <li><strong>Follow NIST 800-63B</strong> — it's the gold standard for digital identity. No security questions, no arbitrary password rules.</li>
        <li><strong>Plan for loss</strong> — every enrolled credential must have a recovery path planned upfront.</li>
        <li><strong>Log everything</strong> — authentication and recovery events are critical for security and compliance.</li>
        <li><strong>ForgeRock journeys are composable</strong> — use inner trees for reusable sub-flows (MFA enrollment, email verification) shared across registration, login, and recovery.</li>
      </ul>
    </div>
  )
}
