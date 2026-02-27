import { useState } from 'react'
import usePageMeta from '../hooks/usePageMeta'
import LoginSimulator from './forgerock/LoginSimulator'
import ConceptsTab from './forgerock/ConceptsTab'
import './ForgeRockDemo.css'

export default function ForgeRockDemo() {
  usePageMeta('IAM Demo', 'Interactive Identity & Access Management tutorial with ForgeRock authentication chain simulations')
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
