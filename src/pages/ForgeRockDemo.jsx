import { useState, Fragment } from 'react'
import './ForgeRockDemo.css'

const authChains = {
  basic: [
    { name: "Username/Password", type: "REQUIRED", status: "pending", description: "Primary authentication" },
    { name: "Account Status", type: "REQUIRED", status: "pending", description: "Check if account is active" },
    { name: "Policy Validation", type: "REQUIRED", status: "pending", description: "Apply security policies" }
  ],
  sms_mfa: [
    { name: "Primary Auth", type: "REQUIRED", status: "pending", description: "Username & password validation" },
    { name: "SMS Challenge", type: "REQUIRED", status: "pending", description: "Send SMS verification code" },
    { name: "Code Verification", type: "REQUIRED", status: "pending", description: "Validate SMS code" },
    { name: "Session Creation", type: "REQUIRED", status: "pending", description: "Create authenticated session" }
  ],
  totp_mfa: [
    { name: "Primary Auth", type: "REQUIRED", status: "pending", description: "Username & password validation" },
    { name: "TOTP Challenge", type: "REQUIRED", status: "pending", description: "Time-based OTP from authenticator app" },
    { name: "Backup Code Check", type: "OPTIONAL", status: "pending", description: "Allow backup recovery codes" },
    { name: "Device Registration", type: "OPTIONAL", status: "pending", description: "Remember trusted device" }
  ],
  adaptive: [
    { name: "Identity Check", type: "REQUIRED", status: "pending", description: "Verify user credentials" },
    { name: "Risk Assessment", type: "REQUIRED", status: "pending", description: "Analyze login context" },
    { name: "Conditional MFA", type: "CONDITIONAL", status: "pending", description: "Require MFA if high risk" },
    { name: "Device Trust", type: "OPTIONAL", status: "pending", description: "Check device reputation" },
    { name: "Geolocation", type: "OPTIONAL", status: "pending", description: "Verify login location" },
    { name: "Final Authorization", type: "REQUIRED", status: "pending", description: "Grant or deny access" }
  ],
  step_up: [
    { name: "Basic Auth", type: "REQUIRED", status: "pending", description: "Standard login" },
    { name: "Resource Request", type: "REQUIRED", status: "pending", description: "User requests sensitive resource" },
    { name: "Step-up Trigger", type: "CONDITIONAL", status: "pending", description: "Determine if additional auth needed" },
    { name: "Additional MFA", type: "REQUIRED", status: "pending", description: "Biometric or hardware token" },
    { name: "Elevated Session", type: "REQUIRED", status: "pending", description: "Create privileged session" }
  ]
}

const concepts = [
  {
    title: "Authentication Chains",
    description: "Sequence of auth modules executed in order",
    steps: [
      "User initiates login request",
      "ForgeRock AM evaluates auth chain",
      "Modules execute based on flags & conditions",
      "Success/failure determines next step",
      "Session created on successful completion"
    ]
  },
  {
    title: "Multi-Factor Authentication (MFA)",
    description: "Additional security layers beyond passwords",
    steps: [
      "Something you know (password)",
      "Something you have (phone, token)",
      "Something you are (biometrics)",
      "Contextual factors (location, device)",
      "Reduces risk of account compromise"
    ]
  },
  {
    title: "MFA Methods in ForgeRock",
    description: "Various MFA options supported",
    steps: [
      "SMS/Voice OTP - Codes sent to phone",
      "TOTP - Time-based codes (Google Auth)",
      "Push Notifications - Approve on mobile",
      "Hardware Tokens - FIDO2, YubiKey",
      "Biometrics - Fingerprint, face recognition"
    ]
  },
  {
    title: "Adaptive Authentication",
    description: "Smart auth based on risk assessment",
    steps: [
      "Analyze user behavior patterns",
      "Check device & location context",
      "Calculate risk score in real-time",
      "Adjust auth requirements dynamically",
      "Step-up auth for high-risk scenarios"
    ]
  },
  {
    title: "Step-up Authentication",
    description: "Additional auth for sensitive resources",
    steps: [
      "User accesses protected resource",
      "System evaluates resource sensitivity",
      "Triggers additional authentication",
      "User proves identity again",
      "Grants elevated session privileges"
    ]
  },
  {
    title: "Session & Token Management",
    description: "Managing authenticated sessions",
    steps: [
      "Create session tokens on auth success",
      "Store user attributes & permissions",
      "Handle session timeouts & renewal",
      "Support SSO across applications",
      "Secure logout & token cleanup"
    ]
  }
]

function LoginSimulator({ chain, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)
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
      setCurrentStep(i)
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

function ConceptsTab() {
  return (
    <div className="concept-grid">
      {concepts.map((concept, idx) => (
        <div key={idx} className="slds-section">
          <div className="slds-section-header">
            {concept.title}
          </div>
          <div className="slds-section-content">
            <p style={{ marginBottom: 16, color: 'var(--slds-text-weak)' }}>{concept.description}</p>
            <ul className="step-list">
              {concept.steps.map((step, stepIdx) => (
                <li key={stepIdx}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ForgeRockDemo() {
  const [activeTab, setActiveTab] = useState('concepts')
  const [authResult, setAuthResult] = useState(null)

  return (
    <>
      <div className="forgerock-demo">
        <div className="fr-container">
          <div className="fr-header">
            <div className="fr-logo">Bel Learning Lab</div>
            <div className="fr-subtitle">Interactive Identity & Access Management Tutorial</div>
            <div style={{ fontSize: '1rem', color: 'var(--slds-text-weak)', marginTop: '8px' }}>
              {'\u{1F510}'} Learn authentication chains, policies, and IAM concepts through hands-on simulation
            </div>
          </div>

          <div className="tabs">
            <button
              className={`tab ${activeTab === 'concepts' ? 'active' : ''}`}
              onClick={() => setActiveTab('concepts')}
              title="Learn core ForgeRock concepts"
            >
              {'\u{1F4DA}'} Concepts
            </button>
            <button
              className={`tab ${activeTab === 'basic' ? 'active' : ''}`}
              onClick={() => setActiveTab('basic')}
              title="Simple username/password authentication"
            >
              {'\u{1F511}'} Basic Auth
            </button>
            <button
              className={`tab ${activeTab === 'sms_mfa' ? 'active' : ''}`}
              onClick={() => setActiveTab('sms_mfa')}
              title="SMS-based two-factor authentication"
            >
              {'\u{1F4F1}'} SMS MFA
            </button>
            <button
              className={`tab ${activeTab === 'totp_mfa' ? 'active' : ''}`}
              onClick={() => setActiveTab('totp_mfa')}
              title="Time-based OTP with authenticator apps"
            >
              {'\u{1F510}'} TOTP MFA
            </button>
            <button
              className={`tab ${activeTab === 'adaptive' ? 'active' : ''}`}
              onClick={() => setActiveTab('adaptive')}
              title="Risk-based adaptive authentication"
            >
              {'\u{1F9E0}'} Adaptive
            </button>
            <button
              className={`tab ${activeTab === 'step_up' ? 'active' : ''}`}
              onClick={() => setActiveTab('step_up')}
              title="Additional auth for sensitive resources"
            >
              {'\u{1F53A}'} Step-up
            </button>
          </div>

          <div className="panel">
            {activeTab === 'concepts' && <ConceptsTab />}

            {['basic', 'sms_mfa', 'totp_mfa', 'adaptive', 'step_up'].includes(activeTab) && (
              <LoginSimulator
                chain={activeTab}
                onComplete={setAuthResult}
              />
            )}
          </div>

          {authResult !== null && (
            <div className={`status ${authResult ? 'success' : 'error'}`} style={{ marginTop: 20 }}>
              {authResult
                ? '\u{1F389} Access Granted! User successfully authenticated.'
                : '\u{1F6AB} Access Denied! Authentication failed.'
              }
            </div>
          )}
        </div>
      </div>
    </>
  )
}
