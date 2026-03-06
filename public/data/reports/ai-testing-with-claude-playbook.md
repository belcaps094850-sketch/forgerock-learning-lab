# AI in Software Testing with Claude — Practical Playbook
**Prepared for:** Bel's Team  
**Date:** March 6, 2026  
**Purpose:** Step-by-step instructions for using Claude in each testing use case  
**Researcher:** Alec

---

## How to Use This Guide

Each section follows the same format:
1. **What it is** — the use case explained simply
2. **Why it matters** — the pain it solves
3. **Step-by-step with Claude** — exact prompts you can copy-paste
4. **Example output** — what to expect
5. **Pro tips** — how to get better results

You can use these with Claude in the browser (claude.ai), Claude Code CLI, or the API.

---

## 1. 🎯 Smart Test Selection — "Which Tests Should I Run?"

### What It Is
Instead of running your entire test suite for every code change, you ask Claude to analyze what changed and recommend which tests are most relevant. This doesn't replace a full regression run — it helps you get fast feedback on the tests that matter most for your specific change.

### Why It Matters
- A typical CI pipeline runs 2,000-10,000 tests per commit
- Most changes only affect a small portion of the codebase
- Running everything wastes 30-60 minutes of developer wait time
- Google reduced test execution time by 50% with smart selection

### Step-by-Step with Claude

**Step 1: Get your diff**
```bash
git diff main --name-only > changed_files.txt
git diff main > full_diff.patch
```

**Step 2: Prompt Claude with your diff + test structure**

```
I made the following code changes. Analyze the diff and tell me which test files 
I should prioritize running first, ranked by likelihood of being affected.

## Changed Files:
[paste changed_files.txt]

## Full Diff:
[paste full_diff.patch]

## Our Test Structure:
- src/tests/unit/ — unit tests, mirror src/ structure
- src/tests/integration/ — API integration tests
- src/tests/e2e/ — Cypress end-to-end tests

For each recommended test, explain WHY it's relevant to this change. 
Also flag any areas where we might be MISSING test coverage for this change.
```

**Step 3: Run the recommended subset first**
```bash
# Run just the priority tests
npx jest --testPathPattern="auth|login|session" --verbose
```

**Step 4: Ask Claude to evaluate gaps**
```
Here are my test results for the priority tests you recommended:
[paste test output]

Based on these results and the original code change, are there any 
additional tests I should run? Any edge cases not covered?
```

### Pro Tips
- Include your `package.json` or project structure so Claude understands your stack
- If you have a test map (which tests cover which source files), share it
- Ask Claude to generate a `jest --testPathPattern` or `pytest -k` command directly
- For large diffs, use Claude Code — it can read the files directly from your repo

---

## 2. 👁️ Visual Regression Testing — "Does This Look Right?"

### What It Is
You take screenshots of your UI before and after changes, then ask Claude to compare them and identify meaningful visual differences vs. irrelevant noise (font rendering, anti-aliasing, sub-pixel shifts).

### Why It Matters
- Pixel-diff tools flag everything — font smoothing, aliasing, tiny rendering variations
- Meta reduced manual visual inspection by 80% using AI visual testing
- Human review doesn't scale when you have 50+ pages across 3 breakpoints
- Visual bugs are the #1 thing users notice and report

### Step-by-Step with Claude

**Step 1: Capture before/after screenshots**
```bash
# Using Playwright to capture screenshots
npx playwright screenshot --url http://localhost:3000/login before-login.png
# Make your changes, then:
npx playwright screenshot --url http://localhost:3000/login after-login.png
```

Or use any screenshot tool — browser DevTools, Cypress, etc.

**Step 2: Send both images to Claude**

```
I'm doing visual regression testing. Compare these two screenshots of our 
login page — BEFORE (first image) and AFTER (second image).

Identify:
1. **Intentional changes** — things that look like deliberate design updates
2. **Potential regressions** — things that look broken or unintended
3. **Layout issues** — alignment problems, overlapping elements, spacing changes
4. **Responsive concerns** — anything that might break on smaller screens
5. **Accessibility issues** — contrast problems, text readability, touch target sizes

For each finding, describe the location on the page and severity (critical/medium/low).
Ignore minor rendering differences like font smoothing or anti-aliasing.
```

**Step 3: Multi-page batch review**

```
I'm reviewing visual changes across our app after a CSS refactor. 
Here are before/after pairs for 5 pages:

[Upload 10 images — 5 before, 5 after]

Pages: Home, Login, Dashboard, Settings, Profile

For each page, tell me:
- What changed (intentional vs unintentional)
- Any layout regressions
- Severity rating

Summarize: which pages are safe to ship and which need fixes?
```

**Step 4: Cross-browser comparison**

```
Here are screenshots of our checkout page across 3 browsers:
1. Chrome (image 1)
2. Firefox (image 2) 
3. Safari (image 3)

Identify any cross-browser inconsistencies that could affect user experience.
Focus on: layout differences, font rendering issues, form element styling, 
button appearances, and spacing discrepancies.
```

### Pro Tips
- Capture at consistent viewport sizes (1440px desktop, 768px tablet, 375px mobile)
- Include a "known good" reference screenshot so Claude has a baseline
- For component libraries, screenshot individual components in isolation
- Ask Claude to generate CSS fix suggestions for any regressions it finds
- Combine with Playwright: automate the screenshot capture, use Claude for the analysis

---

## 3. 🔄 Self-Healing Test Maintenance — "Fix My Broken Tests"

### What It Is
When UI changes break your automated tests (locators changed, elements moved, new flow steps added), Claude can analyze the failures and update your test code automatically.

### Why It Matters
- UI changes are the #1 cause of test automation failure
- Teams report spending 30-40% of QA time fixing broken tests, not writing new ones
- Self-healing reduces test maintenance by up to 60%
- It's the difference between test automation that scales and automation that becomes technical debt

### Step-by-Step with Claude

**Step 1: Collect the failure info**
```bash
# Run your tests, capture the output
npx cypress run --spec "cypress/e2e/login.cy.js" 2>&1 > test-failure.log
```

**Step 2: Send Claude the failure + current page source**

```
My Cypress test is failing after a UI update. Fix the test to work 
with the new UI while maintaining the same test intent.

## Test Failure Log:
[paste test-failure.log]

## Current Test Code:
[paste login.cy.js]

## Current Page HTML (after the UI change):
[paste the relevant HTML from browser DevTools, or a snapshot]

Instructions:
1. Identify which locators/selectors are broken
2. Find the correct new selectors in the HTML
3. Update the test code
4. Use resilient selectors (data-testid > CSS class > XPath)
5. Explain each change you made and why
6. Flag if the test LOGIC needs to change (not just locators)
```

**Step 3: Batch fix multiple broken tests**

```
We updated our navigation component and 12 tests broke. Here are the failures:

[paste summary of 12 test failures]

Here's the new navigation component HTML:
[paste nav HTML]

Here's the old navigation component HTML:
[paste old nav HTML]

Generate a find-and-replace mapping I can apply across all test files:
Old selector → New selector

Then show me the updated test code for the 3 most complex failures.
```

**Step 4: Make tests more resilient going forward**

```
Review this test file and refactor it to be more resilient to UI changes:

[paste test file]

Specifically:
1. Replace brittle selectors (nth-child, CSS classes) with data-testid attributes
2. Add fallback selectors where possible
3. Use visible text or ARIA roles instead of implementation details
4. List the data-testid attributes I should add to my components
```

### Pro Tips
- Always paste the current HTML/DOM, not just the error message — Claude needs context
- Ask Claude to suggest `data-testid` attributes you should add to your components
- For Selenium: share the page source. For Cypress: share the DOM snapshot from the failure
- Have Claude output the exact `git diff` or find-and-replace commands
- Ask it to also add comments explaining WHY each selector was chosen

---

## 4. 🧪 Test Case Generation — "Write My Tests"

### What It Is
Claude analyzes your source code, requirements, or user stories and generates comprehensive test cases — including edge cases, boundary conditions, and negative scenarios that humans typically miss.

### Why It Matters
- Manual test case creation takes 50%+ of QA time
- Microsoft saw a 50% reduction in test creation time and 35% more coverage with AI
- Humans are bad at thinking of edge cases (we test the happy path and move on)
- Generated tests often catch bugs the developer didn't anticipate

### Step-by-Step with Claude

**Step 1: Generate unit tests from source code**

```
Write comprehensive unit tests for this function. Use Jest + React Testing Library.

[paste your component or function code]

Requirements:
- Cover all branches and conditions
- Include happy path, edge cases, boundary values, and error scenarios
- Test both the component behavior AND the user interactions
- Mock external dependencies (API calls, context providers)
- Use descriptive test names that read like specifications
- Aim for >90% branch coverage
- Group tests logically with describe blocks
```

**Step 2: Generate tests from a user story**

```
Generate test cases for this user story. Include manual test steps 
AND automated test code (Cypress).

## User Story:
As a registered user, I want to reset my password so that I can 
regain access to my account if I forget my credentials.

## Acceptance Criteria:
- User clicks "Forgot Password" on login page
- User enters their registered email
- System sends a reset link (expires in 24 hours)
- User clicks link, enters new password (min 8 chars, 1 uppercase, 1 number)
- User confirms password
- System validates and updates password
- User can log in with new password

Generate:
1. **Test case matrix** — table with ID, scenario, steps, expected result, priority
2. **Happy path test** — Cypress code for the main flow
3. **Negative tests** — wrong email, expired link, weak password, mismatched confirm
4. **Edge cases** — multiple reset requests, already logged in, SQL injection in email, 
   link used twice, password same as old password
5. **Accessibility tests** — screen reader flow, keyboard navigation, error announcements
```

**Step 3: Generate API tests from a spec**

```
Generate API test cases for this endpoint. Use any testing framework 
(Jest + supertest preferred).

## Endpoint: POST /api/claims
## Request Body:
{
  "claimType": "STD" | "LTD",
  "employeeId": "string",
  "dateOfIncident": "YYYY-MM-DD",
  "description": "string",
  "amount": number
}

## Business Rules:
- employeeId must exist in the system
- dateOfIncident cannot be in the future
- dateOfIncident cannot be more than 90 days ago
- amount must be positive and <= $50,000 for STD, <= $250,000 for LTD
- description is required, max 2000 characters
- Authenticated users only (Bearer token)
- Rate limited: 10 requests per minute

Generate tests for:
1. Happy path (valid STD claim, valid LTD claim)
2. Authentication (no token, expired token, invalid token)
3. Validation (every field, every rule)
4. Boundary values (amount at 0, max, max+1; description at 0, 2000, 2001 chars)
5. Rate limiting
6. Idempotency (same claim submitted twice)
```

**Step 4: Generate a test plan for a feature**

```
I'm about to start testing a new feature. Create a comprehensive test plan.

## Feature: Employee Benefits Enrollment Portal
## Tech Stack: React, Node.js, PostgreSQL, Open Liberty backend
## Users: HR admins and employees at SMBs (2-100 people)

## Key Flows:
- HR admin configures available plans (health, dental, vision, life, disability)
- Employee logs in, sees available plans with costs
- Employee selects plans, adds dependents
- Employee reviews selections and submits enrollment
- HR admin sees enrollment dashboard and can export to carrier

Generate:
1. **Test strategy** — what types of testing (functional, integration, 
   performance, security, accessibility, usability)
2. **Test case matrix** — organized by flow and priority (P0/P1/P2)
3. **Risk-based focus areas** — where to spend the most effort
4. **Test data requirements** — what data we need to set up
5. **Environment needs** — what infrastructure/services are required
6. **Estimated effort** — hours per test type
```

### Pro Tips
- Always share your existing test patterns so Claude matches your style
- Include your linting rules or test conventions (naming, structure)
- For React: specify which testing library (RTL, Enzyme, Vitest)
- Ask Claude to generate the test AND explain what it's testing and why
- Iterate: run the generated tests, share failures back with Claude to fix
- Use Claude Code for this — it can read your actual source files and project structure

---

## 5. 🧬 Synthetic Test Data Generation — "Create Realistic Fake Data"

### What It Is
Claude generates realistic but entirely fictional test data that mimics your production data patterns — correct formats, realistic distributions, proper relationships between entities — without any privacy/compliance concerns.

### Why It Matters
- Using production data in test environments violates GDPR/HIPAA/PCI
- Manually creating test data is tedious and never covers enough scenarios
- IBM eliminated reliance on production data by using AI-generated synthetic datasets
- Good test data is the foundation of good testing — garbage in, garbage out

### Step-by-Step with Claude

**Step 1: Generate data from your schema**

```
Generate realistic test data for our employee benefits database. 
Output as SQL INSERT statements.

## Schema:
- employees (id, first_name, last_name, email, hire_date, salary, 
  department, location, status)
- plans (id, name, type, carrier, monthly_premium_employee, 
  monthly_premium_family, deductible)
- enrollments (id, employee_id, plan_id, coverage_level, 
  effective_date, status, dependents_count)
- claims (id, enrollment_id, claim_date, claim_type, amount, 
  status, description, provider_name)

Generate 50 employees across 5 departments with:
- Realistic name diversity (multiple ethnicities)
- Salaries that make sense for each department
- Hire dates spanning 2018-2026
- 3 active, 1 on leave, 1 terminated per department

Then generate enrollments and claims that tell realistic stories:
- Most employees enrolled in at least health + dental
- Some with family coverage, some individual
- A few employees with no enrollment (new hires, waived)
- Claims distribution: 60% routine, 25% moderate, 10% high-value, 5% denied
- Include a few edge cases: claim before enrollment, claim after termination, 
  duplicate claim
```

**Step 2: Generate edge case data specifically**

```
I need test data that specifically targets edge cases and boundary conditions 
for our claims processing system.

Generate 20 claims records as JSON, each designed to test a specific scenario:

1. Claim amount = $0.00
2. Claim amount = $0.01 (minimum)
3. Claim amount = $49,999.99 (just under STD max)
4. Claim amount = $50,000.00 (exactly at STD max)
5. Claim amount = $50,000.01 (over STD max)
6. Claim date = today
7. Claim date = tomorrow (future — should reject)
8. Claim date = exactly 90 days ago (boundary)
9. Claim date = 91 days ago (should reject)
10. Description with exactly 2000 characters
11. Description with 2001 characters (over limit)
12. Description with special characters: <script>alert('xss')</script>
13. Description with SQL injection: '; DROP TABLE claims; --
14. Description with unicode: emoji, Chinese characters, Arabic text
15. Employee ID that doesn't exist
16. Duplicate claim (same employee, date, amount)
17. Claim for terminated employee
18. Claim for employee not yet enrolled
19. Multiple claims on same day (stress test)
20. Claim with null/missing required fields

For each, specify the expected system behavior (accept/reject/error).
```

**Step 3: Generate API test payloads**

```
Generate realistic HTTP request payloads for load testing our enrollment API.

Endpoint: POST /api/enrollments
Auth: Bearer token

Generate 100 varied request bodies as a JSON array. Include:
- Mix of coverage levels: individual (40%), employee+spouse (25%), 
  employee+children (15%), family (20%)
- Mix of plan types: health (100%), dental (70%), vision (40%), 
  life (80%), disability (50%)
- Realistic dependent counts: 0-5
- Some invalid payloads mixed in (10%): wrong types, missing fields, 
  out-of-range values

Output format: JSON array I can feed directly into k6 or Artillery 
for load testing.
```

**Step 4: Generate data for specific compliance scenarios**

```
Generate HIPAA-compliant synthetic patient data for testing our 
healthcare claims portal. 

Requirements:
- 30 patient records
- Realistic but COMPLETELY FICTIONAL (not based on real people)
- Include: name, DOB, member ID (format: MEM-XXXXXXXX), group number, 
  plan type, PCP name, recent claims
- Mix of ages (18-85), genders, plan types
- Include scenarios: pre-existing conditions, high-utilization patients, 
  pediatric care, mental health claims, prescription drug claims
- All dates should be in 2025-2026 range
- Output as CSV I can import into our test database
```

### Pro Tips
- Always specify the exact format you need (SQL, JSON, CSV, etc.)
- Include your actual table schemas and constraints
- Ask for data that "tells a story" — not random records, but realistic scenarios
- Explicitly mention compliance requirements (GDPR, HIPAA)
- For large datasets, ask Claude to generate a script that creates the data programmatically
- Request data with known "answers" — e.g., "this claim should be denied because..."

---

## 6. 🔮 Predictive Defect Analysis — "Where Will Bugs Hide?"

### What It Is
You share code metrics, recent changes, and historical bug data with Claude, and it predicts which areas of your codebase are most likely to have defects — so you can focus testing effort there.

### Why It Matters
- Accenture: 40% faster defect detection using predictive analytics
- 80% of bugs come from 20% of modules (the Pareto principle applies to code)
- Testing uniformly across all code wastes effort on stable, well-tested areas
- Risk-based testing is more efficient and catches more real bugs

### Step-by-Step with Claude

**Step 1: Analyze code churn + complexity**

```bash
# Get files changed most frequently in the last 3 months
git log --since="3 months ago" --name-only --format="" | sort | uniq -c | sort -rn | head -30 > churn.txt

# Get files with the most bug-fix commits
git log --since="6 months ago" --all --grep="fix\|bug\|hotfix" --name-only --format="" | sort | uniq -c | sort -rn | head -30 > bugfix-files.txt
```

```
Analyze these code metrics and predict where bugs are most likely to appear.

## Most Frequently Changed Files (last 3 months):
[paste churn.txt]

## Files Most Associated with Bug Fixes (last 6 months):
[paste bugfix-files.txt]

## Recent Significant Changes:
[paste last 2 weeks of git log --oneline]

## Our Current Test Coverage (from Jest/Istanbul):
[paste coverage summary or file-level coverage report]

Based on this data:
1. **Risk rank** the top 10 files/modules most likely to have undiscovered bugs
2. **Explain** why each is high risk (churn + bugs + coverage gaps)
3. **Recommend** specific types of tests to add for each high-risk area
4. **Identify** any "blind spots" — areas with high churn but low coverage
5. **Prioritize** testing effort: where should we spend the next 40 hours of QA time?
```

**Step 2: Analyze a specific PR for risk**

```
Review this pull request and assess the risk of introducing bugs.

## PR: Add employee benefits enrollment flow
## Files changed: 14
## Lines added: 847
## Lines deleted: 203

## Diff:
[paste the diff or key files]

Assess:
1. **Risk score** (1-10) for this PR overall
2. **Highest risk changes** — which specific files/functions worry you most?
3. **Potential regression areas** — what existing functionality might this break?
4. **Recommended test focus** — what should QA prioritize when testing this PR?
5. **Code smells** — any patterns that historically lead to bugs?
   (deep nesting, large functions, complex conditionals, missing error handling)
6. **Missing tests** — what test coverage is needed before this merges?
```

**Step 3: Post-mortem pattern analysis**

```
We've had 15 production bugs in the last quarter. Analyze the patterns 
and help us prevent future ones.

## Bug Log:
| Bug | Module | Root Cause | Severity | Date |
|-----|--------|-----------|----------|------|
[paste your bug history table]

## Questions:
1. What patterns do you see? (common modules, root cause types, timing)
2. What types of tests would have caught each bug?
3. Which module needs the most testing investment?
4. Are there systemic issues (e.g., always after deployments, always in the 
   same layer, always on certain browsers)?
5. Recommend 5 specific testing improvements based on these patterns.
```

### Pro Tips
- The more historical data you provide, the better the predictions
- Combine git metrics with actual bug tracker data (Jira exports work great)
- Run this analysis monthly as a QA health check
- Share the risk analysis with developers — it helps them be more careful in hot spots
- Use the output to justify test automation investment for specific areas

---

## 7. 🔐 Security Testing — "Find Vulnerabilities Before Attackers Do"

### What It Is
Claude reviews your code for security vulnerabilities, generates security-focused test cases, triages SAST/DAST findings, and helps you understand if vulnerabilities are actually exploitable.

### Why It Matters
- Traditional SAST tools produce 70-80% false positives
- Manual security review is expensive ($300-500/hour for pentesters)
- Security bugs found in production cost 6x more to fix than in development
- OWASP Top 10 vulnerabilities can be systematically tested

### Step-by-Step with Claude

**Step 1: Security code review**

```
Perform a security review of this code. Focus on the OWASP Top 10.

[paste your code — API routes, auth logic, data handling, etc.]

For each finding:
1. **Vulnerability type** (SQL injection, XSS, CSRF, broken auth, etc.)
2. **Severity** (Critical/High/Medium/Low)
3. **Location** (file, line, function)
4. **Exploitability** — is this actually exploitable or just theoretical?
5. **Proof of concept** — show me an example attack payload
6. **Fix** — show me the exact code fix
7. **Test** — give me a test case that verifies the fix works
```

**Step 2: Generate security test cases for an API**

```
Generate security test cases for our authentication API. 
Use Jest + supertest format.

## Endpoints:
- POST /api/auth/login (email, password)
- POST /api/auth/register (email, password, name)
- POST /api/auth/forgot-password (email)
- POST /api/auth/reset-password (token, newPassword)
- GET /api/auth/me (requires Bearer token)
- POST /api/auth/logout

Generate tests for:
1. **Brute force protection** — rapid login attempts
2. **SQL injection** — on all input fields
3. **XSS** — stored and reflected on all text inputs
4. **Authentication bypass** — missing token, expired token, 
   tampered token, token from another user
5. **Authorization** — accessing another user's data, privilege escalation
6. **Rate limiting** — exceeding limits on all endpoints
7. **Password rules** — weak passwords, common passwords, password reuse
8. **Session management** — token expiration, concurrent sessions, logout invalidation
9. **Information disclosure** — error messages leaking stack traces or DB info
10. **CSRF** — state-changing requests without proper tokens
```

**Step 3: Triage SAST findings**

```
Our SAST tool (SonarQube/Snyk/Semgrep) produced 47 findings. 
Help me triage them — which are real threats vs false positives?

## Findings:
[paste the SAST report — finding type, severity, file, line, code snippet]

For each finding, tell me:
1. **Real or false positive?** (and confidence level: high/medium/low)
2. **Why?** — explain your reasoning. Is the input actually user-controlled? 
   Is there sanitization upstream? Is this path reachable?
3. **If real:** severity reassessment and recommended fix
4. **If false positive:** what context makes this safe? How should I suppress it?

Prioritize the findings I should fix first.
```

**Step 4: Dependency vulnerability analysis**

```
Here's the output of `npm audit` for our project:

[paste npm audit output]

For each vulnerability:
1. Is it exploitable in our context? (we're a server-side app / client-side SPA / etc.)
2. What's the actual attack vector?
3. Is there a fix available? (upgrade path)
4. If no fix, what's the workaround?
5. Priority: fix now / fix this sprint / acceptable risk / false positive
```

### Pro Tips
- Never paste real credentials, API keys, or production secrets into Claude
- Use Claude for code review, but don't rely on it as your only security testing
- Focus on your most exposed surface area first: login, payment, file upload, admin panels
- Have Claude generate a security checklist specific to your tech stack
- Combine Claude's review with automated tools (Snyk, SonarQube) for best coverage

---

## 8. 📊 Test Failure Triage & Reporting — "Make Sense of the Chaos"

### What It Is
When your CI pipeline fails with dozens of test failures, Claude analyzes the output, groups related failures by root cause, identifies flaky tests, and generates a clear triage report.

### Why It Matters
- Teams spend 40-60% of triage time on failures that share the same root cause
- Flaky tests erode trust in the test suite — people start ignoring CI
- Clear, fast triage means faster fixes and shorter feedback loops
- Nobody wants to read 500 lines of stack traces at 5 PM on a Friday

### Step-by-Step with Claude

**Step 1: Triage a failed CI build**

```
Our CI build failed with 23 test failures. Analyze and triage them.

## Build Log (failures only):
[paste the relevant test failure output]

Provide:
1. **Root cause clusters** — group related failures (e.g., "these 8 all fail 
   because the DB migration didn't run")
2. **Likely flaky tests** — any that look like timing issues, race conditions, 
   or environment problems (not real bugs)
3. **Real bugs** — failures that indicate actual code defects
4. **Priority order** — what should we fix first?
5. **Suggested fixes** — for each root cause, what's the likely fix?
6. **One-line summary** — for the team Slack channel
```

**Step 2: Analyze test flakiness patterns**

```
Here are the last 20 CI runs with their pass/fail status per test:

[paste a matrix showing test names vs run results — P/F for each]

Or: Here are the tests that have failed intermittently in the last month:
[paste list of tests with failure rate percentages]

Analyze:
1. Which tests are genuinely flaky (inconsistent results)?
2. What patterns do you see? (time-dependent? order-dependent? environment?)
3. For each flaky test, what's the likely root cause?
4. Which flaky tests should we quarantine (move to a separate non-blocking suite)?
5. Which should we fix and how?
6. What's the overall health of our test suite? (flakiness rate)
```

**Step 3: Generate a test health report**

```
Generate a weekly test health report for our team.

## Data:
- Total tests: 2,847
- Tests run this week: 14,235 (across 5 builds per day)
- Unique failures: 67
- Flaky tests (failed then passed without changes): 12
- New tests added: 23
- Tests deleted: 5
- Average build time: 18 minutes
- Slowest tests: [list top 10 with times]
- Coverage: 74% lines, 61% branches

## Recent failures:
[paste summary]

Generate a report with:
1. **Executive summary** — 2-3 sentences on overall health
2. **Key metrics** — trending up/down from last week
3. **Top issues** — what needs immediate attention
4. **Flaky test hall of shame** — top offenders to fix
5. **Slow test optimization candidates** — tests that could be faster
6. **Coverage gaps** — areas most in need of new tests
7. **Recommendations** — 3 specific actions for next week
```

**Step 4: Create test documentation from existing tests**

```
Analyze our test suite and generate documentation:

[paste test file or describe the test structure]

Generate:
1. **Test inventory** — table of all test cases with: name, type (unit/integration/e2e), 
   what it verifies, priority
2. **Coverage map** — which features/flows have tests and which don't
3. **Risk assessment** — which areas are under-tested?
4. **Recommended additions** — tests we should write next, prioritized
```

### Pro Tips
- Pipe your CI output directly: `cat build.log | claude "Triage these failures"`
- Set up a weekly routine: export test metrics → Claude analysis → team report
- Track flakiness over time — it should be going DOWN
- Use Claude's triage output as the starting point for your standup "CI health" update
- Ask Claude to draft Jira tickets for the bugs it identifies

---

## Bonus: Claude Code Integration

If you're using **Claude Code** (CLI), you can do all of this directly in your terminal with access to your full codebase:

```bash
# Generate tests for a specific file
claude "Write unit tests for src/services/claims.js using Jest. Cover all branches."

# Security review of a directory
claude "Security review all files in src/api/routes/. Focus on OWASP Top 10."

# Triage CI failures
cat ci-output.log | claude "Triage these test failures. Group by root cause."

# Generate test data
claude "Generate 50 rows of synthetic claims data matching the schema in src/models/claim.js. Output as a JSON seed file."

# Analyze test coverage gaps
claude "Read our Jest coverage report in coverage/lcov-report/ and identify the riskiest uncovered code paths."
```

---

## Quick Start Matrix — Pick Your First Win

| Your Biggest Pain Point | Start Here | Time to First Result |
|------------------------|------------|---------------------|
| Slow CI pipeline | Use Case 1: Smart Test Selection | 15 minutes |
| UI bugs slipping through | Use Case 2: Visual Regression | 20 minutes |
| Broken tests after every release | Use Case 3: Self-Healing | 10 minutes |
| Writing tests takes forever | Use Case 4: Test Generation | 5 minutes |
| Bad test data / compliance worries | Use Case 5: Synthetic Data | 10 minutes |
| Don't know where bugs will appear | Use Case 6: Predictive Analysis | 30 minutes |
| Security concerns | Use Case 7: Security Testing | 15 minutes |
| CI failures are a black box | Use Case 8: Triage & Reporting | 5 minutes |

---

*Start with Use Case 4 (Test Generation) — it's the fastest to try and gives immediate value. You can literally paste code into Claude right now and get tests back in 30 seconds.*
