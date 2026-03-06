import { useState } from 'react'
import usePageMeta from '../hooks/usePageMeta'
import './CoveragePicker.css'

const TIERS = [
  { label: 'Basic', icon: '💡', amount: 25000, multiplier: '1x salary', monthly: 12, desc: 'Covers final expenses' },
  { label: 'Popular', icon: '⭐', amount: 50000, multiplier: '2x salary', monthly: 22, desc: '1 year income replacement', popular: true },
  { label: 'Premium', icon: '🛡️', amount: 100000, multiplier: '4x salary', monthly: 41, desc: '2 years + mortgage buffer' },
  { label: 'Elite', icon: '🏆', amount: 250000, multiplier: '10x salary', monthly: 95, desc: 'Full family protection' },
]

const PILL_OPTIONS = [25000, 50000, 75000, 100000, 150000, 250000, 500000]

const STEPPER_AMOUNTS = [10000, 25000, 50000, 75000, 100000, 150000, 200000, 250000, 300000, 400000, 500000]

const DROPDOWN_OPTIONS = [
  { amount: 25000, context: 'Covers final expenses' },
  { amount: 50000, context: '1 year of income replacement' },
  { amount: 100000, context: '2 years of income + mortgage buffer' },
  { amount: 250000, context: 'Full family protection (recommended)' },
  { amount: 500000, context: 'Comprehensive estate coverage' },
]

const SCALE_STOPS = [
  { amount: 25000, label: '$25K', tip: 'Covers final expenses and outstanding debts' },
  { amount: 50000, label: '$50K', tip: 'Covers 1 year of lost income' },
  { amount: 100000, label: '$100K', tip: 'Covers 2 years income + mortgage buffer' },
  { amount: 250000, label: '$250K', tip: 'Full family protection for 5+ years' },
  { amount: 500000, label: '$500K', tip: 'Comprehensive estate and education coverage' },
]

function fmt(n) {
  return '$' + n.toLocaleString()
}

// Option 1: Tier Cards
function TierCards({ value, onChange }) {
  const [custom, setCustom] = useState(false)
  const [customVal, setCustomVal] = useState('')

  return (
    <div className="cp-tier-section">
      <div className="cp-tier-grid">
        {TIERS.map(t => (
          <button
            key={t.amount}
            className={`cp-tier-card ${value === t.amount && !custom ? 'selected' : ''} ${t.popular ? 'popular' : ''}`}
            onClick={() => { setCustom(false); onChange(t.amount) }}
          >
            {t.popular && <span className="cp-tier-badge">Most Popular</span>}
            <span className="cp-tier-icon">{t.icon}</span>
            <span className="cp-tier-label">{t.label}</span>
            <span className="cp-tier-amount">{fmt(t.amount)}</span>
            <span className="cp-tier-multi">{t.multiplier}</span>
            <span className="cp-tier-monthly">{fmt(t.monthly)}/mo</span>
            <span className="cp-tier-desc">{t.desc}</span>
          </button>
        ))}
      </div>
      <div className="cp-tier-custom">
        {!custom ? (
          <button className="cp-custom-link" onClick={() => setCustom(true)}>
            Need a different amount? Enter custom →
          </button>
        ) : (
          <div className="cp-custom-input-row">
            <span>$</span>
            <input
              type="number"
              placeholder="Enter amount"
              value={customVal}
              onChange={e => { setCustomVal(e.target.value); onChange(Number(e.target.value) || 0) }}
              min="10000"
              max="1000000"
              step="5000"
              autoFocus
            />
            <button className="cp-custom-cancel" onClick={() => { setCustom(false); setCustomVal('') }}>✕</button>
          </div>
        )}
      </div>
    </div>
  )
}

// Option 2: Stepper
function Stepper({ value, onChange }) {
  const idx = STEPPER_AMOUNTS.indexOf(value)
  const canDec = idx > 0
  const canInc = idx < STEPPER_AMOUNTS.length - 1

  const step = (dir) => {
    const newIdx = Math.max(0, Math.min(STEPPER_AMOUNTS.length - 1, idx + dir))
    onChange(STEPPER_AMOUNTS[newIdx])
  }

  return (
    <div className="cp-stepper">
      <button className="cp-step-btn" onClick={() => step(-1)} disabled={!canDec}>
        <span>−</span>
      </button>
      <div className="cp-step-display">
        <span className="cp-step-amount">{fmt(value)}</span>
        <span className="cp-step-hint">
          {value <= 25000 ? 'Minimum coverage' : value >= 500000 ? 'Maximum coverage' : `≈ ${Math.round(value / 50000)} years income replacement`}
        </span>
      </div>
      <button className="cp-step-btn" onClick={() => step(1)} disabled={!canInc}>
        <span>+</span>
      </button>
    </div>
  )
}

// Option 3: Pill Selector
function PillSelector({ value, onChange }) {
  return (
    <div className="cp-pills">
      {PILL_OPTIONS.map(amt => (
        <button
          key={amt}
          className={`cp-pill ${value === amt ? 'selected' : ''}`}
          onClick={() => onChange(amt)}
        >
          {fmt(amt)}
        </button>
      ))}
    </div>
  )
}

// Option 4: Smart Dropdown
function SmartDropdown({ value, onChange }) {
  return (
    <div className="cp-dropdown-wrap">
      <select
        className="cp-dropdown"
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      >
        <option value="" disabled>Select coverage amount</option>
        {DROPDOWN_OPTIONS.map(o => (
          <option key={o.amount} value={o.amount}>
            {fmt(o.amount)} — {o.context}
          </option>
        ))}
      </select>
      {value > 0 && (
        <div className="cp-dropdown-detail">
          Selected: <strong>{fmt(value)}</strong> — {DROPDOWN_OPTIONS.find(o => o.amount === value)?.context}
        </div>
      )}
    </div>
  )
}

// Option 5: Guided Calculator
function GuidedCalculator({ onChange }) {
  const [income, setIncome] = useState(75000)
  const [mortgage, setMortgage] = useState(200000)
  const [years, setYears] = useState(10)
  const recommended = Math.round((income * years + mortgage) / 25000) * 25000

  return (
    <div className="cp-calc">
      <div className="cp-calc-field">
        <label>Annual household income</label>
        <div className="cp-calc-input">
          <span>$</span>
          <input type="number" value={income} onChange={e => setIncome(Number(e.target.value) || 0)} step="5000" />
        </div>
      </div>
      <div className="cp-calc-field">
        <label>Outstanding mortgage / debts</label>
        <div className="cp-calc-input">
          <span>$</span>
          <input type="number" value={mortgage} onChange={e => setMortgage(Number(e.target.value) || 0)} step="10000" />
        </div>
      </div>
      <div className="cp-calc-field">
        <label>Years of protection</label>
        <div className="cp-calc-input">
          <input type="number" value={years} onChange={e => setYears(Number(e.target.value) || 0)} min="1" max="30" />
          <span className="cp-calc-suffix">years</span>
        </div>
      </div>
      <div className="cp-calc-result">
        <div className="cp-calc-label">Recommended coverage</div>
        <div className="cp-calc-amount">{fmt(recommended)}</div>
        <div className="cp-calc-breakdown">
          {fmt(income)} × {years} years + {fmt(mortgage)} mortgage
        </div>
        <button className="cp-calc-btn" onClick={() => onChange(recommended)}>
          Use this amount
        </button>
      </div>
    </div>
  )
}

// Option 6: Visual Scale
function VisualScale({ value, onChange }) {
  const idx = SCALE_STOPS.findIndex(s => s.amount === value)
  const pct = idx >= 0 ? (idx / (SCALE_STOPS.length - 1)) * 100 : 0
  const activeTip = SCALE_STOPS.find(s => s.amount === value)?.tip || ''

  return (
    <div className="cp-scale">
      <div className="cp-scale-track">
        <div className="cp-scale-fill" style={{ width: `${pct}%` }} />
        {SCALE_STOPS.map((stop, i) => {
          const pos = (i / (SCALE_STOPS.length - 1)) * 100
          const isActive = stop.amount === value
          return (
            <button
              key={stop.amount}
              className={`cp-scale-dot ${isActive ? 'active' : ''} ${stop.amount <= value ? 'filled' : ''}`}
              style={{ left: `${pos}%` }}
              onClick={() => onChange(stop.amount)}
            >
              <span className="cp-scale-label">{stop.label}</span>
            </button>
          )
        })}
      </div>
      {activeTip && (
        <div className="cp-scale-tip">{activeTip}</div>
      )}
    </div>
  )
}

export default function CoveragePicker() {
  usePageMeta('Coverage Amount Picker', 'POC: Multiple UI patterns for selecting insurance coverage amounts')

  const [selected, setSelected] = useState({ 1: 50000, 2: 50000, 3: 50000, 4: 50000, 5: 0, 6: 50000 })

  const update = (option, val) => setSelected(prev => ({ ...prev, [option]: val }))

  const options = [
    { num: 1, title: 'Preset Tier Cards', desc: 'Visual cards with pricing context. Best for: quick decisions, most users.', component: <TierCards value={selected[1]} onChange={v => update(1, v)} /> },
    { num: 2, title: 'Stepper Buttons', desc: 'Increment/decrement through standard amounts. Best for: precision without typing.', component: <Stepper value={selected[2]} onChange={v => update(2, v)} /> },
    { num: 3, title: 'Segmented Pills', desc: 'All options visible, one tap. Best for: limited options, mobile.', component: <PillSelector value={selected[3]} onChange={v => update(3, v)} /> },
    { num: 4, title: 'Smart Dropdown', desc: 'Each option includes educational context. Best for: users who need guidance.', component: <SmartDropdown value={selected[4]} onChange={v => update(4, v)} /> },
    { num: 5, title: 'Guided Calculator', desc: 'Answer 3 questions → get a recommendation. Best for: first-time buyers.', component: <GuidedCalculator onChange={v => update(5, v)} /> },
    { num: 6, title: 'Visual Scale', desc: 'Interactive track with labeled milestones. Best for: visual learners.', component: <VisualScale value={selected[6]} onChange={v => update(6, v)} /> },
  ]

  return (
    <div className="cp-page">
      <div className="cp-header">
        <h1>Coverage Amount Picker</h1>
        <p>Six approaches to replacing the basic slider. Each solves a different UX problem.</p>
      </div>

      <div className="cp-options">
        {options.map(opt => (
          <section key={opt.num} className="cp-option">
            <div className="cp-option-header">
              <span className="cp-option-num">Option {opt.num}</span>
              <h2>{opt.title}</h2>
              <p>{opt.desc}</p>
            </div>
            <div className="cp-option-demo">
              {opt.component}
            </div>
            {selected[opt.num] > 0 && (
              <div className="cp-option-result">
                Selected: <strong>{fmt(selected[opt.num])}</strong>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}
