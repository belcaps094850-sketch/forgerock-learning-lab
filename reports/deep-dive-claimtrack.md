# ClaimTrack — The Package Tracker for Insurance Claims

## Deep-Dive Business Case Report

**Prepared:** March 2026
**Classification:** Internal — Strategic Analysis
**Author:** ForgeRock Learning / Business Analysis Unit

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Market Opportunity](#3-market-opportunity)
4. [Competitive Landscape](#4-competitive-landscape)
5. [Solution Design](#5-solution-design)
6. [Revenue Model](#6-revenue-model)
7. [Go-to-Market Strategy](#7-go-to-market-strategy)
8. [Build Plan](#8-build-plan)
9. [Risks & Mitigations](#9-risks--mitigations)
10. [Recommendation](#10-recommendation)

---

## 1. Executive Summary

**ClaimTrack** is a real-time insurance claim status tracking platform that gives employees and HR departments full visibility into their group insurance claims — across carriers, across benefit lines, and across the entire claim lifecycle. Think Domino's Pizza Tracker, but for insurance claims.

The core insight: **People aren't angry about claim denials. They're angry about not knowing what's happening.** Reddit threads, BBB complaints, and NAIC consumer data all tell the same story — claimants are stuck in a black box with no status updates, no accountability, and no recourse when carriers miss their own SLAs.

ClaimTrack solves this with:
- **Unified claim dashboard** across all carriers (life, disability, health, dental, vision)
- **Real-time status tracking** with stage-by-stage progress visualization
- **Proactive notifications** when action is needed or milestones are hit
- **ETA predictions** based on historical claim data and carrier performance
- **Auto-escalation engine** that generates formal complaints to state insurance commissioners when carrier SLAs are violated

**The killer feature** — the auto-escalation button — isn't just a convenience. It's a market-forcing mechanism. Carriers who know their claimants have one-click access to regulatory complaints will process claims faster. The mere existence of the button changes behavior.

**Financial Summary:**
- **Total Addressable Market (TAM):** $4.2B (all US employers with group insurance)
- **Serviceable Addressable Market (SAM):** $890M (SMBs with 50–500 employees)
- **Serviceable Obtainable Market (SOM):** $22M by Year 3
- **MVP Build Cost:** $1.8M over 9 months
- **Break-even:** Month 18–22
- **Year 3 ARR Target:** $22M at ~4,400 employer accounts

**Recommendation: Conditional GO.** The problem is massive, real, and emotionally charged. The regulatory escalation feature is a genuine moat. However, execution depends heavily on solving the carrier integration challenge — which requires a creative technical approach (not just APIs). We recommend proceeding with a phased MVP that starts with manual + screen-scraping integrations for the top 5 group carriers, then layers on direct API partnerships as leverage grows.

---

## 2. Problem Statement

### 2.1 The Black Box of Insurance Claims

When an employee files a group insurance claim — disability, life, health, dental — it enters a void. The claimant gets a confirmation number and then... silence. Days turn into weeks. Weeks turn into months. The claim sits somewhere in a carrier's internal workflow, and the only way to get a status update is to call a 1-800 number and navigate a phone tree to reach an overworked claims specialist who may or may not call you back.

This is not an edge case. It's the **default experience**.

### 2.2 Real Stories from the Front Lines

These aren't hypotheticals — they're from Reddit, BBB filings, and consumer complaint databases:

| Carrier | Situation | What Went Wrong |
|---------|-----------|-----------------|
| **Unum** | Patient recovering from open heart surgery | Claims specialist wouldn't return calls. Paperwork was "lost" repeatedly. Claimant had to re-submit documentation 3+ times while recovering from surgery. |
| **MetLife** | Beneficiary waiting for life insurance payout | 3 months of waiting. Portal status perpetually shows "Pending." No explanation, no timeline, no next steps. |
| **Prudential** | Beneficiary waiting for $10K check | 28 days and counting. Described customer service as a "three ring circus." Transferred between departments. No one owns the claim. |
| **Multiple carriers** | Common thread across hundreds of complaints | People explicitly say they could accept a denial — what they can't accept is **not knowing what's happening**. |

### 2.3 The Structural Problem

The claims opacity problem exists because of misaligned incentives:

1. **Carriers benefit from friction.** Every claim that gets abandoned due to frustration is money saved. There is no financial incentive for carriers to make claims tracking transparent.
2. **Employers are blind.** HR departments select and pay for group insurance but have zero visibility into how their employees' claims are being handled. They can't hold carriers accountable because they don't have data.
3. **Employees are powerless.** Individual claimants have no leverage. They don't know their rights, don't know SLA requirements, and don't know how to escalate to regulators.
4. **Regulators are reactive.** State insurance departments only act on complaints — and most claimants don't know how to file one, or even that they can.

### 2.4 The Cost of Claims Friction

Claims friction isn't just an annoyance — it has measurable business costs:

| Impact Area | Estimated Annual Cost |
|-------------|----------------------|
| **HR time spent on claims follow-up** | 12–20 hours/month per HR generalist at mid-size firms (source: SHRM benefits administration surveys) |
| **Employee productivity loss** | 3.2 hours per open claim per week spent on hold, re-submitting docs, following up (Accenture 2023 insurance consumer survey) |
| **Employee turnover from benefits dissatisfaction** | 31% of employees who had a bad claims experience considered leaving their employer (MetLife Annual Benefits Trends Study, 2024) |
| **Employer switching costs** | Average cost to switch group carriers: $15K–$50K for a 200-person company (broker estimates) |

**The bottom line:** Employers are paying for insurance that actively frustrates their employees, and they have no tools to measure or manage that experience.

---

## 3. Market Opportunity

### 3.1 Market Sizing

#### Total Addressable Market (TAM) — $4.2B

The TAM encompasses all US employers offering group insurance benefits who would pay for claims visibility tooling.

| Metric | Value | Source |
|--------|-------|--------|
| US employers offering group benefits | ~620,000 (50+ employees) | BLS / Kaiser Family Foundation, 2024 |
| Average group insurance claims per employer per year | 45–120 (varies by size and benefit mix) | LIMRA Workplace Benefits data |
| Total group insurance claims per year (all lines) | ~75 million | Industry aggregate (see breakdown below) |
| Estimated willingness-to-pay for claims tracking (PEPM) | $2–$8/employee/month | Comparable benefits admin SaaS pricing |
| TAM at $4/PEPM avg × 88M covered employees | **$4.2B annually** | Calculated |

**Claims Volume Breakdown (Annual, US Group Insurance):**

| Line of Coverage | Estimated Annual Claims | Notes |
|-----------------|------------------------|-------|
| Group Health (medical) | ~50M | Includes ~160M employer-covered lives; ~1 in 3 file a claim annually requiring adjudication beyond auto-processing |
| Group Dental | ~12M | High frequency, low complexity; fast processing but still opaque |
| Group Disability (STD + LTD) | ~5.5M | STD: ~5M claims/year; LTD: ~500K new claims/year (LIMRA) |
| Group Life / AD&D | ~2.5M | ~2M death claims + 500K AD&D; these are the most emotionally charged |
| Group Vision | ~5M | High volume, low friction — less applicable to ClaimTrack's value prop |
| **Total** | **~75M** | |

#### Serviceable Addressable Market (SAM) — $890M

ClaimTrack's sweet spot is **SMBs with 50–500 employees** — large enough to have HR departments managing benefits, small enough that they lack dedicated benefits analysts or carrier management teams.

| Metric | Value |
|--------|-------|
| US employers with 50–500 employees | ~185,000 |
| Average employees per firm | 120 |
| Covered employees in segment | ~22M |
| ClaimTrack PEPM in segment | $3.50 avg (lower for smaller, higher for larger) |
| **SAM** | **$890M annually** |

Why SMBs? Because:
- Large enterprises (500+) often have dedicated benefits teams, carrier SLAs with teeth, and direct carrier account reps
- Micro-businesses (<50) often don't offer group insurance or use very simple plans
- SMBs are stuck in the middle: they have benefits but no tools to manage the experience

#### Serviceable Obtainable Market (SOM) — $22M by Year 3

| Year | Target Employer Accounts | Avg Employees/Account | PEPM | ARR |
|------|--------------------------|----------------------|------|-----|
| Year 1 | 400 | 110 | $3.00 | $1.6M |
| Year 2 | 1,800 | 115 | $3.25 | $8.1M |
| Year 3 | 4,400 | 120 | $3.50 | $22.2M |

### 3.2 Market Tailwinds

Several macro trends favor ClaimTrack's timing:

1. **Benefits transparency regulation.** The No Surprises Act (2022) and subsequent state-level transparency mandates are shifting expectations. Employees increasingly expect visibility into their benefits.

2. **Rise of benefits experience platforms.** Companies like Nava Benefits, Justworks, and Rippling are investing heavily in benefits experience — but none track claims post-submission.

3. **State insurance department modernization.** Multiple states (CA, NY, TX, CO, CT) have modernized their complaint filing systems, making API-driven escalation technically feasible.

4. **HR tech consolidation.** The HR/benefits tech stack is consolidating around platforms like Rippling, Gusto, and BambooHR — all of which would benefit from a claims tracking integration.

5. **AI-powered claims analysis.** LLMs can now parse EOBs, denial letters, and carrier correspondence to extract status, next steps, and compliance violations — enabling automation that wasn't possible 3 years ago.

---

## 4. Competitive Landscape

### 4.1 Direct Competitors

**There is no direct competitor doing exactly what ClaimTrack proposes.** This is both an opportunity and a signal worth investigating.

### 4.2 Adjacent Players

| Category | Players | What They Do | Gap ClaimTrack Fills |
|----------|---------|--------------|---------------------|
| **Carrier Portals** | Unum, MetLife, Prudential, Guardian, Lincoln Financial portals | Basic claim status for their own policies only | Single-carrier only; minimal status detail; no SLA tracking; no escalation |
| **Benefits Administration** | Rippling, Gusto, BambooHR, Namely, Paylocity | Enrollment, eligibility, deductions | Stop at enrollment — zero post-claim visibility |
| **Claims Management Software (carrier-side)** | Guidewire, Duck Creek, Majesco, OneShield | Internal carrier tools for adjudication workflow | Carrier-facing, not claimant-facing; actually part of the problem (opaque) |
| **Patient Advocacy / Navigation** | Accolade, Rightway, Transcarent, Included Health | Health navigation, care coordination, some claims help | Primarily health/medical; concierge model (expensive); don't cover disability/life |
| **Insurance Complaint Tools** | State DOI websites, NAIC complaint portal | File complaints manually | Manual, intimidating, no integration with claim status |
| **Legal / Advocacy** | ERISA attorneys, public adjusters | Litigation-oriented | Expensive, adversarial, last resort |
| **Consumer Apps** | Claimable (UK), PolicyBazaar (India) | Insurance comparison and basic claim tracking | Not US-focused; not group/employer-oriented |

### 4.3 Competitive Analysis Matrix

| Capability | Carrier Portals | Benefits Admin (Rippling etc.) | Patient Advocacy (Accolade etc.) | **ClaimTrack** |
|-----------|----------------|-------------------------------|--------------------------------|---------------|
| Multi-carrier dashboard | ❌ | ❌ | Partial (health only) | ✅ |
| Real-time claim status | Basic | ❌ | Phone-based | ✅ |
| All benefit lines (life, disability, health, dental) | Own line only | ❌ | Health only | ✅ |
| SLA tracking | ❌ | ❌ | ❌ | ✅ |
| Auto-escalation to regulators | ❌ | ❌ | ❌ | ✅ |
| HR analytics dashboard | ❌ | Enrollment only | ❌ | ✅ |
| ETA predictions | ❌ | ❌ | ❌ | ✅ |
| Price (PEPM) | Included | $6–$15 (full platform) | $8–$15 | $3–$5 |

### 4.4 Why Doesn't This Exist Yet?

Three reasons:

1. **Carrier integration is genuinely hard.** There's no standard API for claim status across carriers. This is the primary technical moat — and the primary reason no one has built it.
2. **Carriers don't want it.** Transparency is against carriers' financial interest. They won't build it, and they'll resist anyone who does.
3. **The buyer (employer) hasn't demanded it — yet.** HR departments don't know they should expect this capability. No one has shown them what's possible.

This is a **market creation** opportunity, not a market-entry play.

---

## 5. Solution Design

### 5.1 Product Overview

ClaimTrack is a **multi-carrier claim status tracking platform** with three user interfaces:

1. **Employee App** (mobile + web) — personal claim dashboard, status timeline, document upload, escalation tools
2. **HR Portal** (web) — aggregated claim analytics, carrier performance scorecards, escalation management
3. **Broker Dashboard** (web) — cross-client carrier benchmarking, renewal intelligence

### 5.2 Core Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    ClaimTrack Platform                    │
├─────────────┬──────────────┬──────────────┬─────────────┤
│  Employee   │   HR Portal  │    Broker    │   Admin     │
│  App (PWA)  │   (React)    │  Dashboard   │  Console    │
├─────────────┴──────────────┴──────────────┴─────────────┤
│                    API Gateway (REST + GraphQL)           │
├─────────────────────────────────────────────────────────┤
│                    Core Services Layer                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────┐ │
│  │  Claim    │ │  Status  │ │Escalation│ │ Analytics  │ │
│  │  Ingestion│ │  Engine  │ │  Engine  │ │  Engine    │ │
│  └──────────┘ └──────────┘ └──────────┘ └────────────┘ │
├─────────────────────────────────────────────────────────┤
│              Carrier Integration Layer                    │
│  ┌──────┐ ┌──────────┐ ┌──────────┐ ┌───────────────┐  │
│  │ API  │ │  Screen  │ │  Email   │ │    Manual     │  │
│  │Direct│ │  Scraper │ │  Parser  │ │  Entry + OCR  │  │
│  └──────┘ └──────────┘ └──────────┘ └───────────────┘  │
├─────────────────────────────────────────────────────────┤
│  PostgreSQL │ Redis │ S3 (docs) │ ML Pipeline (ETAs)    │
└─────────────────────────────────────────────────────────┘
```

### 5.3 Carrier Integration Strategy (The Hard Part)

This is the make-or-break technical challenge. ClaimTrack uses a **tiered integration approach**:

#### Tier 1: Direct API Integration
- **Feasibility:** Low initially, grows with market leverage
- **Carriers with APIs:** Some larger carriers (Cigna, Aetna/CVS, UnitedHealthcare) offer limited claims APIs through their developer portals, primarily for health claims
- **Approach:** Partner with carriers who see ClaimTrack as a competitive advantage (better claims experience = more employer wins)
- **Timeline:** 6–18 months per carrier partnership

#### Tier 2: Authenticated Screen Scraping (Primary MVP Strategy)
- **Feasibility:** Medium — requires employee credential delegation or OAuth where available
- **How it works:**
  1. Employee connects their carrier portal account (like Plaid for banking)
  2. ClaimTrack uses headless browser automation (Playwright/Puppeteer) to log in and scrape claim status
  3. Status is normalized into ClaimTrack's universal claim schema
- **Legal consideration:** Employees accessing their own data; precedent from Plaid/financial data aggregation (CFPB Section 1033 principles)
- **Carriers targeted for MVP:** Unum, MetLife, Prudential, Guardian, Lincoln Financial (top 5 group disability/life carriers)

#### Tier 3: Email/Document Parsing (AI-Powered)
- **Feasibility:** High — most carriers send status emails and EOBs
- **How it works:**
  1. Employee forwards carrier emails to a ClaimTrack-assigned email address (or connects Gmail/Outlook)
  2. LLM-powered parser extracts claim ID, status, next steps, deadlines
  3. OCR pipeline processes uploaded letters, EOBs, denial notices
- **Accuracy target:** 92%+ extraction accuracy with human review for edge cases

#### Tier 4: Manual Entry Fallback
- **Feasibility:** Always available
- **How it works:** Employee manually enters claim updates after calls with carrier
- **Enhanced by:** Structured forms, suggested statuses, voice-to-text for call notes
- **Value:** Even manual entry creates a paper trail and timeline that didn't exist before

### 5.4 Universal Claim Status Model

ClaimTrack normalizes all claims into a universal status taxonomy:

```
SUBMITTED → RECEIVED → UNDER REVIEW → INFORMATION NEEDED →
ADJUDICATION → APPROVED/DENIED → PAYMENT PROCESSING → PAID/CLOSED

(with sub-statuses and carrier-specific mappings)
```

Each status includes:
- **Timestamp** (when it entered this stage)
- **Handler** (who at the carrier is responsible, if known)
- **Next action** (what the claimant needs to do, or what the carrier should do)
- **ETA** (ML-predicted based on historical data for this carrier + claim type + state)
- **SLA status** (on-track, at-risk, SLA-breached — based on state regulatory timelines)

### 5.5 The Escalation Engine (Killer Feature)

The auto-escalation system is ClaimTrack's primary differentiator and market-forcing mechanism.

#### How It Works:

1. **SLA Monitoring:** ClaimTrack tracks state-specific claim processing deadlines. Most states require:
   - Health claims: 30 days for initial determination (45 with extension)
   - Disability claims: 45 days for initial determination (ERISA standard)
   - Life insurance claims: 30–60 days after proof of loss (varies by state)

2. **SLA Breach Detection:** When a claim exceeds the applicable regulatory timeline, ClaimTrack flags it as "SLA Breached" and presents the escalation option.

3. **One-Click Escalation:** The employee taps "Escalate to Insurance Commissioner" and ClaimTrack:
   - Auto-generates a formal complaint letter citing the specific regulation violated
   - Includes the full claim timeline (with dates) as evidence
   - Pre-fills the appropriate state DOI complaint form
   - In states with electronic filing APIs (CA, NY, TX, FL, CO), submits directly
   - In other states, generates a ready-to-mail PDF or ready-to-submit web form

4. **Carrier Notification:** ClaimTrack simultaneously notifies the carrier that a regulatory complaint has been filed, with the specific SLA violation cited.

#### Why This Changes the Market:

- **Deterrence effect:** Carriers who know their claimants have one-click regulatory complaint access will process claims faster to avoid complaints
- **Data flywheel:** Every escalation generates data on carrier performance, which feeds the HR analytics dashboard and broker benchmarking tools
- **Regulatory relationships:** Over time, ClaimTrack becomes a data partner to state DOIs, providing aggregate claims processing data that regulators can't easily get elsewhere

### 5.6 UX Design Principles

| Principle | Implementation |
|-----------|---------------|
| **Clarity over completeness** | Show status, next action, and ETA prominently; hide technical details behind expandable sections |
| **Emotional design** | Acknowledge that claims are stressful; use warm, supportive language; celebrate milestones ("Your claim has been approved!") |
| **Zero-effort updates** | Push notifications for every status change; no need to log in and check |
| **Progressive disclosure** | Simple view for employees; detailed view for HR; full analytics for brokers |
| **Accessibility** | WCAG 2.1 AA; screen reader optimized; available in Spanish (Phase 2) |

### 5.7 HR Analytics Dashboard

The HR portal transforms claims data into actionable intelligence:

- **Carrier Scorecard:** Average processing time, SLA breach rate, escalation rate, employee satisfaction by carrier
- **Claims Heatmap:** Which benefit lines and carriers generate the most friction
- **Renewal Intelligence:** Hard data for carrier negotiations ("Your disability claims took 2.3x longer than the industry average")
- **Employee Impact:** Correlation between claims friction and engagement/retention signals
- **Benchmark Data:** How their carriers compare to peers (anonymized aggregate data)

---

## 6. Revenue Model

### 6.1 Pricing Structure

ClaimTrack uses a **B2B2C model** — employers pay, employees use.

#### Primary Revenue: Employer Subscription (PEPM)

| Tier | Company Size | Price (PEPM) | Includes |
|------|-------------|-------------|----------|
| **Starter** | 50–100 employees | $4.00 | Employee app, basic status tracking (2 carriers), email parsing |
| **Professional** | 101–300 employees | $3.50 | + HR dashboard, SLA monitoring, up to 5 carriers, escalation engine |
| **Enterprise** | 301–500 employees | $3.00 | + broker dashboard, API access, custom integrations, dedicated CSM |
| **Enterprise+** | 500+ employees | Custom | Full platform + carrier negotiation data, white-label options |

**Annual contracts** with monthly billing. 15% discount for annual prepay.

#### Secondary Revenue Streams

| Stream | Model | Year Available | Projected Y3 Revenue |
|--------|-------|---------------|---------------------|
| **Broker Platform** | $500/month per brokerage + $0.50 PEPM for cross-client analytics | Year 1 | $2.4M |
| **Carrier Data Licensing** | Annual license for aggregate claims processing benchmarks | Year 2 | $1.5M |
| **Premium Employee Features** | Direct-to-consumer upgrade: priority escalation support, legal referral network | Year 2 | $800K |
| **API/Integration Fees** | HRIS platforms (Rippling, BambooHR) pay for embedded ClaimTrack widget | Year 3 | $600K |

### 6.2 Revenue Projections (Years 1–3)

#### Year 1: Foundation

| Metric | Target |
|--------|--------|
| Employer accounts | 400 |
| Covered employees | 44,000 |
| Avg PEPM | $3.00 |
| Employer subscription ARR | $1.58M |
| Broker revenue | $200K |
| **Total ARR (end of Y1)** | **$1.8M** |
| MRR growth rate | 15% month-over-month (months 6–12) |

#### Year 2: Scale

| Metric | Target |
|--------|--------|
| Employer accounts | 1,800 |
| Covered employees | 207,000 |
| Avg PEPM | $3.25 |
| Employer subscription ARR | $8.1M |
| Broker revenue | $1.2M |
| Carrier data licensing | $500K |
| Premium employee features | $300K |
| **Total ARR (end of Y2)** | **$10.1M** |

#### Year 3: Expansion

| Metric | Target |
|--------|--------|
| Employer accounts | 4,400 |
| Covered employees | 528,000 |
| Avg PEPM | $3.50 |
| Employer subscription ARR | $22.2M |
| Broker revenue | $2.4M |
| Carrier data licensing | $1.5M |
| Premium employee features | $800K |
| API/Integration fees | $600K |
| **Total ARR (end of Y3)** | **$27.5M** |

### 6.3 Unit Economics

| Metric | Year 1 | Year 2 | Year 3 |
|--------|--------|--------|--------|
| CAC (Customer Acquisition Cost) | $3,200 | $2,400 | $1,800 |
| ACV (Annual Contract Value) | $3,960 | $4,500 | $5,040 |
| LTV (3-year, 90% retention) | $10,700 | $12,150 | $13,600 |
| LTV:CAC Ratio | 3.3x | 5.1x | 7.6x |
| Gross Margin | 65% | 72% | 78% |
| Payback Period | 10 months | 7 months | 5 months |

### 6.4 Funding Requirements

| Phase | Amount | Purpose |
|-------|--------|---------|
| Pre-seed / Bootstrap | $500K | Founding team (3 months), carrier integration R&D, legal review of escalation feature |
| Seed | $3M | MVP build (9 months), initial go-to-market, first 50 employer pilots |
| Series A (Month 15–18) | $12M | Scale engineering team, expand carrier integrations, broker channel, marketing |
| **Total through Year 2** | **$15.5M** | |

---

## 7. Go-to-Market Strategy

### 7.1 Phase 1: Employer-Direct (Months 1–9)

**Channel:** Direct sales to SMB HR leaders and benefits managers.

**Lead Generation:**
- **Content marketing:** "The Claims Black Box" — publish carrier performance data (anonymized) as thought leadership. Blog posts, LinkedIn content, webinars.
- **SEO:** Target keywords like "insurance claim taking too long," "Unum claim status," "MetLife claim delay" — these have surprisingly high search volume and zero commercial competition.
- **Reddit/community presence:** Organic engagement in r/insurance, r/humanresources, r/disability. ClaimTrack's origin story (built because of these exact complaints) resonates.
- **HR event sponsorships:** SHRM conferences, local HR association events, benefits-focused webinars.

**Sales Motion:**
- Free 30-day pilot for first 50 employers (subsidized)
- Self-serve signup for small employers (50–100)
- Inside sales team for mid-market (100–500)
- Target: 400 employers by end of Year 1

### 7.2 Phase 2: Broker Channel (Months 6–18)

**Why Brokers:**
Brokers are the primary distribution channel for SMB group insurance. They advise employers on carrier selection, manage renewals, and handle escalated claims issues. ClaimTrack gives them:

- **Differentiation:** "We don't just sell you insurance — we track your claims and hold carriers accountable"
- **Retention data:** Claims experience data helps brokers justify their value to employer clients
- **Renewal leverage:** Hard data on carrier performance for negotiating renewals and switches

**Broker Go-to-Market:**
- Partner with 20–30 regional brokerages in Year 1 (target: firms with 50–200 employer clients each)
- Broker-branded version of ClaimTrack (white-label option for larger brokerages)
- Revenue share: broker gets 15% of first-year PEPM for referred clients
- Target: 30% of Year 2 new accounts sourced through broker channel

### 7.3 Phase 3: Viral / Bottom-Up (Months 9+)

**The Natural Viral Loop:**
1. Employee has a terrible claim experience
2. Employee searches for help → finds ClaimTrack content
3. Employee asks HR: "Can we get ClaimTrack?"
4. HR evaluates → purchases
5. Other employees at the company use it → share with friends at other companies

**Viral Amplification:**
- "Share your claim timeline" feature — anonymized claim journey shareable on social media
- "Carrier Report Card" — annual public report on carrier claims performance (massive PR potential)
- Employee referral program: employees who refer their company's HR get premium features free

### 7.4 Phase 4: HRIS Platform Integrations (Months 12–24)

**Embed ClaimTrack into existing HR workflows:**
- Rippling, Gusto, BambooHR, Paylocity marketplace integrations
- One-click activation from within the employer's existing HRIS
- Reduces friction to zero — no separate login, no additional implementation
- Revenue: integration partners get 10–15% referral fee; ClaimTrack gets distribution

### 7.5 GTM Budget Allocation

| Category | Year 1 | Year 2 |
|----------|--------|--------|
| Content & SEO | $150K | $300K |
| Events & Sponsorships | $100K | $200K |
| Inside Sales Team (3 reps) | $360K | $720K (6 reps) |
| Broker Channel Development | $80K | $250K |
| Product Marketing | $60K | $150K |
| PR / Carrier Report Card | $50K | $100K |
| **Total** | **$800K** | **$1.72M** |

---

## 8. Build Plan

### 8.1 Team

#### Founding Team (Pre-seed, Months 0–3)

| Role | Skills Required | Compensation |
|------|----------------|-------------|
| **CEO/Product** | Insurance industry experience + product management. Must understand group benefits, carrier relationships, and regulatory landscape. | Equity-heavy |
| **CTO** | Full-stack engineering, data scraping/integration experience, security. Prior experience with financial data aggregation (Plaid-like) is ideal. | Equity-heavy |
| **Head of Carrier Integration** | Deep carrier operations knowledge. Ideally someone who has worked inside a group insurance carrier's claims department. | Equity + salary |

#### MVP Team (Seed, Months 3–12)

| Role | Headcount | Focus |
|------|-----------|-------|
| Backend Engineers | 3 | Carrier integration layer, claim status engine, API |
| Frontend Engineers | 2 | Employee app (React Native / PWA), HR portal |
| Data/ML Engineer | 1 | ETA prediction model, email/document parsing |
| Designer | 1 | UX/UI for all three interfaces |
| QA Engineer | 1 | Cross-carrier testing, integration validation |
| Sales (inside) | 2 | Employer outreach, pilot management |
| Customer Success | 1 | Pilot onboarding, feedback collection |
| Legal/Compliance (contract) | 0.5 | Escalation feature compliance, carrier ToS review |
| **Total** | **11.5** | |

### 8.2 MVP Scope (Months 3–12)

#### Phase A: Core Platform (Months 3–6)

| Deliverable | Details |
|-------------|---------|
| Employee web app (PWA) | Claim dashboard, status timeline, document upload, notifications |
| Carrier integration: email parsing | LLM-powered parser for carrier emails and EOBs (works with any carrier immediately) |
| Carrier integration: manual entry | Structured forms for manual status updates after carrier calls |
| Universal claim status model | Taxonomy mapping for disability, life, health, dental claims |
| User auth & employer onboarding | SSO, employer admin panel, employee invitation flow |

**Launch: Private beta with 10 employer pilots.**

#### Phase B: Intelligence Layer (Months 6–9)

| Deliverable | Details |
|-------------|---------|
| Carrier portal scraping (top 3) | Authenticated access to Unum, MetLife, Guardian portals via headless browser |
| ETA prediction model v1 | Based on carrier + claim type + state + historical data from pilots |
| SLA monitoring engine | State-specific regulatory timelines for all 50 states |
| HR analytics dashboard v1 | Carrier scorecard, claims heatmap, basic benchmarking |
| Push notifications | Status change alerts via push, email, and SMS |

**Launch: Expand beta to 50 employers.**

#### Phase C: Escalation & Scale (Months 9–12)

| Deliverable | Details |
|-------------|---------|
| Auto-escalation engine | Complaint generation for all 50 states + DC; direct electronic filing for top 10 states |
| Carrier portal scraping (top 5) | Add Prudential, Lincoln Financial |
| Broker dashboard v1 | Cross-client carrier benchmarking, referral tracking |
| HRIS integrations (2) | Rippling + one other (Gusto or BambooHR) |
| Mobile app (React Native) | iOS + Android native experience |

**Launch: General availability. Target 400 employers by end of Month 12.**

### 8.3 MVP Cost Breakdown

| Category | 9-Month Cost |
|----------|-------------|
| Engineering team (8 FTEs) | $1,080K |
| Design | $120K |
| Sales + CS (3 FTEs) | $180K |
| Legal/Compliance | $80K |
| Infrastructure (AWS/GCP) | $60K |
| Tools & Services | $40K |
| Office / Remote Stipends | $50K |
| Contingency (15%) | $240K |
| **Total MVP Build** | **$1.85M** |

### 8.4 Technical Stack (Recommended)

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend (Employee) | React Native (Expo) + PWA | Cross-platform mobile + web from single codebase |
| Frontend (HR/Broker) | Next.js + React | SSR for SEO, fast dashboards |
| Backend API | Node.js (NestJS) or Python (FastAPI) | Flexible, async-friendly for scraping workloads |
| Carrier Scraping | Playwright + custom headless infrastructure | Reliable browser automation; handles JS-heavy carrier portals |
| Email/Doc Parsing | OpenAI API (GPT-4o) + custom fine-tuned model | High accuracy on insurance documents; fine-tune on carrier-specific formats |
| OCR | AWS Textract or Google Document AI | Production-grade document extraction |
| Database | PostgreSQL (primary) + Redis (cache/queues) | Reliable, scalable, well-understood |
| ML/ETA | Python + scikit-learn → graduate to custom model | Start simple (gradient boosting on claim features), upgrade as data grows |
| Infrastructure | AWS (ECS/Fargate) + Terraform | Scalable, HIPAA-eligible, infrastructure-as-code |
| Compliance | HIPAA BAA with all vendors; SOC 2 Type I by Month 12 | Non-negotiable for employer-facing health data |

---

## 9. Risks & Mitigations

### 9.1 Risk Matrix

| # | Risk | Probability | Impact | Severity | Mitigation |
|---|------|------------|--------|----------|------------|
| 1 | **Carrier blocks scraping / sends C&D** | High | High | 🔴 Critical | See 9.2 |
| 2 | **Escalation feature creates legal liability** | Medium | High | 🟠 High | See 9.3 |
| 3 | **Slow carrier API adoption** | High | Medium | 🟠 High | Tiered integration strategy; don't depend on APIs for MVP |
| 4 | **HIPAA compliance complexity** | Medium | High | 🟠 High | HIPAA-first architecture; BAAs from day 1; SOC 2 roadmap |
| 5 | **Low employer willingness to pay** | Medium | High | 🟠 High | Pilot data on ROI (HR time saved, claim resolution speed); freemium entry tier |
| 6 | **Employee adoption within accounts** | Medium | Medium | 🟡 Medium | Frictionless onboarding; value on first claim; employer-pushed enrollment |
| 7 | **Carrier retaliates against employers** | Low | Medium | 🟡 Medium | Data on retaliation = PR goldmine; regulatory complaint if carrier retaliates |
| 8 | **Claim status data accuracy** | Medium | Medium | 🟡 Medium | Multi-source validation; confidence scores; human review queue |
| 9 | **Competitor from incumbent (carrier or HRIS)** | Low | High | 🟡 Medium | Speed to market; data moat (aggregated cross-carrier data); escalation feature is uncopiable by carriers |
| 10 | **State regulatory pushback on auto-escalation** | Low | Medium | 🟢 Low | Complaints are a consumer right; ClaimTrack facilitates, doesn't fabricate |

### 9.2 Deep Dive: Carrier Resistance to Scraping

**The threat:** Carriers may attempt to block ClaimTrack's scraping of their portals, issue cease-and-desist letters, or modify their Terms of Service to prohibit automated access.

**Mitigation strategy:**

1. **Legal foundation:** The employee is accessing their own data. ClaimTrack acts as the employee's authorized agent. This is analogous to Plaid's model for bank data before open banking regulations.
   - **Key precedent:** *hiQ Labs v. LinkedIn* (9th Circuit, 2022) — scraping publicly available data is not a CFAA violation. ClaimTrack's case is even stronger because it uses authenticated access with the account holder's consent.
   - **ERISA rights:** Under ERISA, participants have the right to access claim information. ClaimTrack helps them exercise that right.

2. **Regulatory leverage:** File amicus briefs and public comments supporting insurance data portability, modeled on CFPB Section 1033 (financial data rights). Several states are already considering insurance data access regulations.

3. **Carrots, not just sticks:** Offer carriers a "ClaimTrack Certified" program — carriers who provide API access get favorable positioning in carrier scorecards and employer-facing reports.

4. **Diversified integration:** Never depend solely on scraping. Email parsing + manual entry + OCR provide fallback paths that carriers cannot block.

5. **PR strategy:** If a carrier blocks access, publicize it. "Carrier X is actively preventing their customers from tracking their own claims." This is a PR nightmare for the carrier and free marketing for ClaimTrack.

### 9.3 Deep Dive: Escalation Feature Legal/Regulatory Risk

**The concern:** Could auto-generating regulatory complaints expose ClaimTrack to legal risk? Could carriers claim harassment, abuse of process, or tortious interference?

**Analysis:**

1. **Filing a complaint is a protected consumer right.** Every state provides a mechanism for consumers to complain about insurance companies. ClaimTrack facilitates the exercise of this right — it does not fabricate complaints.

2. **Factual basis requirement:** ClaimTrack's complaints are based on documented claim timelines with timestamps. They cite specific regulatory deadlines. This is the opposite of frivolous — it's data-driven.

3. **Carrier pushback risk:** Carriers may lobby state DOIs to limit automated complaint filing. Mitigation:
   - Require employee confirmation before filing (not fully automatic — employee taps "Submit")
   - Include ClaimTrack as a disclosed facilitator in the complaint
   - Build relationships with state DOI consumer affairs divisions proactively
   - Rate-limit escalations (one per claim per SLA breach, not spamming)

4. **First Amendment protection:** Petitioning the government (including filing complaints with regulatory agencies) is protected speech under the First Amendment.

5. **Insurance-specific:** Many states have "Unfair Claims Settlement Practices" statutes (based on NAIC Model Act) that explicitly prohibit carriers from:
   - Failing to acknowledge and act promptly on claims
   - Not attempting in good faith to make prompt, fair settlements
   - Compelling claimants to institute litigation to recover amounts due
   
   ClaimTrack's escalation feature simply enforces existing law.

### 9.4 Deep Dive: HIPAA and Data Security

**PHI handling:** ClaimTrack will process Protected Health Information (PHI) for health/dental/vision claims and potentially disability claims.

**Compliance approach:**
- HIPAA Business Associate Agreement (BAA) with every employer client
- BAAs with all subprocessors (AWS, email providers, LLM providers)
- End-to-end encryption (AES-256 at rest, TLS 1.3 in transit)
- Access controls: employees see only their own claims; HR sees anonymized aggregate data (no individual PHI without employee consent)
- SOC 2 Type I certification by Month 12; Type II by Month 24
- Annual penetration testing and HIPAA risk assessment
- Dedicated HIPAA Privacy Officer (initially CTO, then hired role by Month 12)

---

## 10. Recommendation

### 10.1 Verdict: **CONDITIONAL GO** ✅

ClaimTrack addresses a genuine, emotionally resonant problem that affects tens of millions of Americans annually. The competitive landscape is wide open — no one is doing this. The auto-escalation feature is a true moat that incumbents (carriers, HRIS platforms) cannot easily replicate because it runs counter to carrier interests.

### 10.2 Conditions for Go

The "conditional" qualifier reflects three critical dependencies:

| Condition | Why It Matters | How to Validate |
|-----------|---------------|-----------------|
| **1. Carrier portal scraping is technically viable at scale** | If carriers can easily block access and email parsing alone isn't sufficient, the core value prop weakens | 90-day R&D sprint: build proof-of-concept scrapers for top 3 carriers; test robustness over 30 days |
| **2. Employers will pay $3–5 PEPM for claims visibility** | If this is a "nice to have" but not a line item, revenue doesn't materialize | Pre-sell 10 pilot contracts (even at reduced rates) before committing to full build |
| **3. Escalation feature survives legal review** | If the auto-escalation creates unacceptable legal risk, the primary differentiator is lost | Engage insurance regulatory attorney for formal opinion before seed round |

### 10.3 Decision Framework

```
IF all 3 conditions validate → Full GO, raise seed round, build MVP
IF conditions 1 & 2 validate but 3 is risky → GO with modified escalation 
   (generate complaint but don't auto-file; employee files manually)
IF condition 1 fails → PIVOT to email-parsing-only model 
   (less real-time but still valuable; lower technical risk)
IF condition 2 fails → NO-GO 
   (problem is real but market won't pay; consider consumer-direct model)
```

### 10.4 Why Now

1. **LLMs make email/document parsing 10x better** than it was 3 years ago — this was the missing technical capability
2. **Post-pandemic benefits expectations are higher** — employees expect digital, transparent experiences
3. **State regulatory modernization** — electronic complaint filing is becoming standard
4. **No incumbent is moving** — carriers won't build this, HRIS platforms aren't thinking about it, and brokers lack the technical capability
5. **The Reddit/social proof is overwhelming** — this is a problem people are already screaming about in public

### 10.5 Immediate Next Steps

| Step | Timeline | Owner | Deliverable |
|------|----------|-------|-------------|
| 1. Legal opinion on escalation feature | Weeks 1–4 | Founding team | Written legal opinion from insurance regulatory attorney |
| 2. Carrier scraping R&D sprint | Weeks 1–12 | CTO | Working scrapers for Unum, MetLife, Guardian with 30-day reliability data |
| 3. Employer pre-sales (10 LOIs) | Weeks 1–8 | CEO | 10 signed letters of intent from SMB employers |
| 4. Seed fundraise | Weeks 6–16 | CEO | $3M seed round from insurtech or vertical SaaS investors |
| 5. MVP team hiring | Weeks 8–16 | CEO + CTO | 8 core hires (engineering, design, first sales rep) |
| 6. Begin MVP Phase A | Week 12 | Full team | Core platform development starts |

---

## Appendix A: State Insurance Claim Processing Timelines

Select states with explicit claim processing deadlines:

| State | Health Claims | Disability Claims | Life Claims | Complaint Filing |
|-------|--------------|-------------------|-------------|------------------|
| **California** | 30 days (40 with extension) | 45 days (ERISA) | 30 days after proof | Online portal |
| **New York** | 30 days | 45 days | 30 days after proof | Online portal |
| **Texas** | 30 days (45 with notice) | 45 days | 60 days after proof | Online portal |
| **Florida** | 30 days | 45 days | 60 days after proof | Online portal |
| **Illinois** | 30 days | 45 days | 30 days after proof | Email/mail |
| **Pennsylvania** | 30 days | 45 days | 30 days after proof | Online portal |
| **Ohio** | 21 days (ack) + 30 days | 45 days | 30 days after proof | Online portal |
| **Colorado** | 30 days | 45 days | 60 days after proof | Online portal |

*Note: ERISA preempts state regulation for most employer-sponsored plans, but state prompt-pay laws still apply to insured (non-self-funded) plans. Self-funded plans follow DOL/ERISA timelines exclusively.*

## Appendix B: Carrier Market Share (Group Benefits, US)

Top carriers by group premium for ClaimTrack's target lines:

| Carrier | Group Life | Group Disability | Group Dental | Priority for Integration |
|---------|-----------|-----------------|--------------|------------------------|
| MetLife | #1 | #3 | #2 | 🔴 MVP |
| Prudential | #2 | #5 | — | 🔴 MVP |
| Unum | #4 | #1 | — | 🔴 MVP |
| Lincoln Financial | #3 | #2 | — | 🟡 Phase 2 |
| Guardian | #5 | #4 | #3 | 🟡 Phase 2 |
| Hartford | #6 | #6 | — | 🟢 Phase 3 |
| Principal | #7 | #7 | #5 | 🟢 Phase 3 |
| Cigna | — | — | #1 | 🟢 Phase 3 (dental) |
| Delta Dental | — | — | #4 | 🟢 Phase 3 (dental) |

## Appendix C: Consumer Complaint Data

NAIC Consumer Complaint Index (2024) — higher = more complaints relative to market share:

| Carrier | Complaint Index | Top Complaint Categories |
|---------|----------------|------------------------|
| Unum | 1.8x industry avg | Claim delays, claim denials, unsatisfactory settlement |
| MetLife | 1.2x industry avg | Claim delays, policy service |
| Prudential | 1.1x industry avg | Claim delays, premium/billing |
| Lincoln Financial | 1.4x industry avg | Claim delays, claim denials |
| Guardian | 0.9x industry avg | Claim delays |

*"Claim delays" is the #1 complaint category across all group carriers — validating ClaimTrack's core thesis.*

---

**End of Report**

*For questions or discussion, contact the analysis team.*
