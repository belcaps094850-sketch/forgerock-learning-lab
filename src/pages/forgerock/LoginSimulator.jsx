import { useState, Fragment } from 'react'
import { authChains } from './authChains'

export default function LoginSimulator({ chain, onComplete }) {
  const [chainState, setChainState] = useState(authChains[chain].map(m => ({ ...m })))
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    smsCode: '',
    totpCode: '',
    backupCode: '',
    trustDevice: false,
    location: 'New York, US'
  })
  const [isRunning, setIsRunning] = useState(false)
  const [message, setMessage] = useState('')
  const [riskScore, setRiskScore] = useState(null)

  const calculateRiskScore = () => {
    let score = 0
    if (formData.username === 'suspicious') score += 40
    if (formData.location.includes('Unknown')) score += 30
    if (!formData.trustDevice) score += 20
    if (formData.username === 'admin') score += 30
    return Math.min(score + Math.floor(Math.random() * 20), 100)
  }

  const runAuthChain = async () => {
    setIsRunning(true)
    setMessage('Starting authentication chain...')

    for (let i = 0; i < chainState.length; i++) {
      setMessage(`Executing: ${chainState[i].name}`)

      // Update module status to active
      setChainState(prev => prev.map((m, idx) => ({
        ...m,
        status: idx === i ? 'active' : idx < i ? 'success' : 'pending'
      })))

      await new Promise(resolve => setTimeout(resolve, 1500))

      // Simulate auth logic
      let success = true
      let skipReason = ''

      // Primary authentication checks
      if (chainState[i].name.includes('Primary Auth') || chainState[i].name.includes('Username') || chainState[i].name.includes('Basic Auth') || chainState[i].name.includes('Identity Check')) {
        if (!formData.username || !formData.password) {
          success = false
        } else if (formData.password !== 'demo123') {
          success = false
        }
      }

      // SMS MFA checks
      if (chainState[i].name.includes('SMS Challenge')) {
        setMessage('\u{1F4F1} SMS code sent to your device')
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      if (chainState[i].name.includes('Code Verification')) {
        if (!formData.smsCode || formData.smsCode !== '123456') {
          success = false
        }
      }

      // TOTP MFA checks
      if (chainState[i].name.includes('TOTP Challenge')) {
        if (!formData.totpCode || formData.totpCode.length !== 6) {
          success = false
        }
      }
      if (chainState[i].name.includes('Backup Code')) {
        if (!formData.totpCode && formData.backupCode && formData.backupCode === 'backup123') {
          success = true // Allow backup code
        } else if (!formData.totpCode && !formData.backupCode) {
          success = false
        }
      }

      // Risk assessment
      if (chainState[i].name.includes('Risk')) {
        const risk = calculateRiskScore()
        setRiskScore(risk)
        setMessage(`\u{1F50D} Risk Score: ${risk}% (${risk < 30 ? 'Low' : risk < 70 ? 'Medium' : 'High'} Risk)`)
        if (risk > 80) {
          success = false
        }
      }

      // Conditional MFA based on risk
      if (chainState[i].name.includes('Conditional MFA')) {
        if (riskScore > 50) {
          if (!formData.totpCode && !formData.smsCode) {
            success = false
          }
        } else {
          success = true
          skipReason = 'Low risk - MFA skipped'
        }
      }

      // Step-up authentication
      if (chainState[i].name.includes('Step-up Trigger')) {
        if (formData.username === 'admin' || formData.username.includes('privileged')) {
          setMessage('\u{26A0}\u{FE0F} Sensitive resource detected - step-up authentication required')
        } else {
          success = true
          skipReason = 'Standard user - no step-up needed'
        }
      }

      // Geolocation checks
      if (chainState[i].name.includes('Geolocation')) {
        if (formData.location.includes('Unknown')) {
          success = false
        }
      }

      // Handle module flags
      if (!success && chainState[i].type === 'REQUIRED') {
        setChainState(prev => prev.map((m, idx) => ({
          ...m,
          status: idx === i ? 'failed' : idx < i ? 'success' : 'pending'
        })))
        setMessage(`\u274C Authentication failed at: ${chainState[i].name}`)
        setIsRunning(false)
        onComplete(false)
        return
      }

      // Handle successful modules
      const newStatus = success ? 'success' : 'failed'
      setChainState(prev => prev.map((m, idx) => ({
        ...m,
        status: idx === i ? newStatus : idx < i ? prev[idx].status : 'pending'
      })))

      if (skipReason) {
        setChainState(prev => prev.map((m, idx) => ({
          ...m,
          status: idx === i ? 'skipped' : idx < i ? prev[idx].status : 'pending'
        })))
        setMessage(`\u23ED\u{FE0F} ${skipReason}`)
        await new Promise(resolve => setTimeout(resolve, 1000))
        continue
      }

      if (success && chainState[i].type === 'SUFFICIENT') {
        setChainState(prev => prev.map((m, idx) => ({
          ...m,
          status: idx <= i ? 'success' : 'skipped'
        })))
        setMessage('\u2705 Authentication successful (SUFFICIENT module passed)')
        setIsRunning(false)
        onComplete(true)
        return
      }
    }

    setMessage('\u2705 Authentication chain completed successfully')
    setChainState(prev => prev.map(m => ({ ...m, status: 'success' })))
    setIsRunning(false)
    onComplete(true)
  }

  const getChainDescription = () => {
    switch (chain) {
      case 'basic': return 'Standard username/password authentication with policy checks'
      case 'sms_mfa': return 'Two-factor authentication using SMS verification codes'
      case 'totp_mfa': return 'Time-based OTP using authenticator apps like Google Authenticator'
      case 'adaptive': return 'Risk-based authentication that adapts based on login context'
      case 'step_up': return 'Additional authentication required for sensitive operations'
      default: return 'Authentication flow simulation'
    }
  }

  const getTips = () => {
    switch (chain) {
      case 'basic': return 'Try: username "demo" with password "demo123"'
      case 'sms_mfa': return 'Use SMS code "123456" after entering credentials'
      case 'totp_mfa': return 'Enter any 6-digit code, or use backup code "backup123"'
      case 'adaptive': return 'Try "suspicious" username or "Unknown Location" to see risk assessment'
      case 'step_up': return 'Try "admin" username to trigger step-up authentication'
      default: return ''
    }
  }

  return (
    <div>
      <div className="slds-section">
        <div className="slds-section-header">
          {'\u{1F510}'} {chain.replace('_', ' ').toUpperCase()} Authentication
        </div>
        <div className="slds-section-content">
          <p style={{ marginBottom: 16 }}>{getChainDescription()}</p>
          {getTips() && (
            <div className="status warning">
              <strong>{'\u{1F4A1}'} Tip:</strong> {getTips()}
            </div>
          )}
        </div>
      </div>

      <div className="login-form">
        <div className="input-group">
          <label htmlFor="fr-username">Username</label>
          <input
            id="fr-username"
            className="fr-input"
            type="text"
            placeholder="Try: demo, admin, suspicious"
            value={formData.username}
            onChange={e => setFormData(prev => ({ ...prev, username: e.target.value }))}
          />
        </div>
        <div className="input-group">
          <label htmlFor="fr-password">Password</label>
          <input
            id="fr-password"
            className="fr-input"
            type="password"
            placeholder="Use: demo123"
            value={formData.password}
            onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
          />
        </div>

        {chain === 'sms_mfa' && (
          <div className="input-group">
            <label htmlFor="fr-sms-code">SMS Code</label>
            <input
              id="fr-sms-code"
              className="fr-input"
              type="text"
              placeholder="Enter: 123456"
              value={formData.smsCode}
              onChange={e => setFormData(prev => ({ ...prev, smsCode: e.target.value }))}
            />
          </div>
        )}

        {chain === 'totp_mfa' && (
          <>
            <div className="input-group">
              <label htmlFor="fr-totp-code">TOTP Code (Authenticator App)</label>
              <input
                id="fr-totp-code"
                className="fr-input"
                type="text"
                placeholder="6-digit TOTP code"
                value={formData.totpCode}
                onChange={e => setFormData(prev => ({ ...prev, totpCode: e.target.value }))}
              />
            </div>
            <div className="input-group">
              <label htmlFor="fr-backup-code">Backup Recovery Code (Optional)</label>
              <input
                id="fr-backup-code"
                className="fr-input"
                type="text"
                placeholder="Use: backup123 if no TOTP"
                value={formData.backupCode}
                onChange={e => setFormData(prev => ({ ...prev, backupCode: e.target.value }))}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 0' }}>
              <input
                id="fr-trust-device-totp"
                type="checkbox"
                checked={formData.trustDevice}
                onChange={e => setFormData(prev => ({ ...prev, trustDevice: e.target.checked }))}
              />
              <label htmlFor="fr-trust-device-totp" style={{ color: 'var(--slds-text-default)', fontWeight: 500 }}>Trust this device</label>
            </div>
          </>
        )}

        {(chain === 'adaptive' || chain === 'step_up') && (
          <>
            <div className="input-group">
              <label htmlFor="fr-location">Location Context</label>
              <select
                id="fr-location"
                className="fr-input"
                value={formData.location}
                onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
              >
                <option>New York, US</option>
                <option>London, UK</option>
                <option>Unknown Location</option>
                <option>Tokyo, JP</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="fr-mfa-code">MFA Code (if required)</label>
              <input
                id="fr-mfa-code"
                className="fr-input"
                type="text"
                placeholder="6-digit code"
                value={formData.totpCode}
                onChange={e => setFormData(prev => ({ ...prev, totpCode: e.target.value }))}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 0' }}>
              <input
                id="fr-trust-device-adaptive"
                type="checkbox"
                checked={formData.trustDevice}
                onChange={e => setFormData(prev => ({ ...prev, trustDevice: e.target.checked }))}
              />
              <label htmlFor="fr-trust-device-adaptive" style={{ color: 'var(--slds-text-default)', fontWeight: 500 }}>Trusted device</label>
            </div>
          </>
        )}

        <button
          className="btn"
          onClick={runAuthChain}
          disabled={isRunning}
        >
          {isRunning ? 'Authenticating...' : 'Start Authentication'}
        </button>
      </div>

      <div className="auth-chain">
        {chainState.map((module, idx) => (
          <Fragment key={idx}>
            <div className={`auth-module ${module.status}`}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>{module.name}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.9, marginBottom: 8 }}>{module.description}</div>
              <div style={{ fontSize: '0.8rem', padding: '2px 6px', background: 'rgba(0,0,0,0.2)', borderRadius: 4, display: 'inline-block' }}>{module.type}</div>
              <div style={{ fontSize: '1.2rem', marginTop: 8 }}>
                {module.status === 'pending' && '\u23F3'}
                {module.status === 'active' && '\u{1F504}'}
                {module.status === 'success' && '\u2705'}
                {module.status === 'failed' && '\u274C'}
                {module.status === 'skipped' && '\u23ED\u{FE0F}'}
              </div>
            </div>
            {idx < chainState.length - 1 && <div className="chain-arrow">{'\u2192'}</div>}
          </Fragment>
        ))}
      </div>

      {message && (
        <div className={`status ${message.includes('\u274C') ? 'error' : message.includes('\u2705') ? 'success' : 'warning'}`}>
          {message}
        </div>
      )}
    </div>
  )
}
