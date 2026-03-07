# API Testing with Playwright — Complete Guide
**Date:** March 6, 2026  
**Researcher:** Alec  
**Requested by:** Bel

---

## Why Playwright for API Testing?

Most people think Playwright = browser automation. But its `APIRequestContext` makes it a **first-class API testing tool** too. The killer advantage: **unified UI + API testing in one framework**.

| Feature | Playwright | Postman | SuperTest | REST Assured |
|---------|-----------|---------|-----------|-------------|
| API + UI in same test | ✅ | ❌ | ❌ | ❌ |
| Shared auth state (cookies/tokens) | ✅ Auto | Manual extraction | Manual | Manual |
| Language | JS/TS, Python, Java, C# | GUI / Newman | JS only | Java only |
| CI/CD native | ✅ Built-in | Needs Newman | ✅ | ✅ |
| Browser context aware | ✅ | ❌ | ❌ | ❌ |
| Parallel execution | ✅ Built-in | Limited | Manual | Manual |
| Tracing & debugging | ✅ Trace viewer | ❌ | ❌ | ❌ |

**Adoption:** 45.1% among testers in 2024-2025, outpacing Cypress and Selenium.

---

## Setup (2 minutes)

```bash
npm init -y
npm install @playwright/test
npx playwright install
```

**Config** — `playwright.config.ts`:
```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://api.yourapp.com',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  },
});
```

**Recommended project structure:**
```
tests/
  api/
    users.spec.ts
    claims.spec.ts
    auth.spec.ts
utils/
  auth-helper.ts
fixtures/
  test-data.json
playwright.config.ts
```

---

## The Basics — CRUD Operations

### GET — Fetch data
```typescript
import { test, expect } from '@playwright/test';

test('fetch a single user', async ({ request }) => {
  const response = await request.get('/users/1');
  
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  
  const user = await response.json();
  expect(user).toHaveProperty('id');
  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('email');
  expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
});
```

### POST — Create a resource
```typescript
test('create a new claim', async ({ request }) => {
  const response = await request.post('/claims', {
    data: {
      claimType: 'STD',
      employeeId: 'EMP-0042',
      amount: 4250.00,
      description: 'Knee surgery recovery'
    }
  });

  expect(response.status()).toBe(201);
  const claim = await response.json();
  expect(claim.claimType).toBe('STD');
  expect(claim.id).toBeDefined();
});
```

### PUT — Update
```typescript
test('update claim status', async ({ request }) => {
  const response = await request.put('/claims/1', {
    data: { status: 'approved' }
  });

  expect(response.ok()).toBeTruthy();
  const updated = await response.json();
  expect(updated.status).toBe('approved');
});
```

### DELETE
```typescript
test('delete a claim', async ({ request }) => {
  const response = await request.delete('/claims/1');
  expect(response.ok()).toBeTruthy();

  // Verify it's gone
  const verify = await request.get('/claims/1');
  expect(verify.status()).toBe(404);
});
```

---

## Authentication Patterns

### Token-based auth (JWT/Bearer)
```typescript
test.describe('Authenticated endpoints', () => {
  let authContext;

  test.beforeAll(async ({ playwright }) => {
    // Login to get token
    const loginContext = await playwright.request.newContext({
      baseURL: 'https://api.yourapp.com'
    });

    const loginResponse = await loginContext.post('/auth/login', {
      data: { email: 'admin@test.com', password: 'Test123!' }
    });

    const { token } = await loginResponse.json();

    // Create authenticated context — all requests use this token
    authContext = await playwright.request.newContext({
      baseURL: 'https://api.yourapp.com',
      extraHTTPHeaders: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  });

  test.afterAll(async () => {
    await authContext.dispose();
  });

  test('access protected resource', async () => {
    const response = await authContext.get('/users/profile');
    expect(response.ok()).toBeTruthy();
  });

  test('reject without auth', async ({ playwright }) => {
    const noAuth = await playwright.request.newContext({
      baseURL: 'https://api.yourapp.com'
    });
    const response = await noAuth.get('/users/profile');
    expect(response.status()).toBe(401);
  });
});
```

### Reusing browser auth state (the killer feature)
```typescript
test('UI login shares auth with API', async ({ page, request }) => {
  // Login via UI
  await page.goto('/login');
  await page.fill('[data-testid="email"]', 'user@test.com');
  await page.fill('[data-testid="password"]', 'Pass123!');
  await page.click('[data-testid="submit"]');
  await page.waitForURL('/dashboard');

  // API calls now automatically use the same session cookies!
  const response = await request.get('/api/claims');
  expect(response.ok()).toBeTruthy();
  
  const claims = await response.json();
  expect(claims.length).toBeGreaterThan(0);
});
```

---

## Advanced Patterns

### Chained API workflow (CRUD lifecycle)
```typescript
test('complete claims workflow', async ({ request }) => {
  // 1. Create
  const create = await request.post('/claims', {
    data: { claimType: 'STD', employeeId: 'EMP-0042', amount: 5000 }
  });
  expect(create.status()).toBe(201);
  const { id } = await create.json();

  // 2. Read
  const read = await request.get(`/claims/${id}`);
  expect(read.ok()).toBeTruthy();

  // 3. Update
  const update = await request.put(`/claims/${id}`, {
    data: { status: 'approved' }
  });
  expect(update.ok()).toBeTruthy();

  // 4. Verify
  const verify = await request.get(`/claims/${id}`);
  const claim = await verify.json();
  expect(claim.status).toBe('approved');

  // 5. Delete
  const del = await request.delete(`/claims/${id}`);
  expect(del.ok()).toBeTruthy();
});
```

### Error handling & negative tests
```typescript
test('reject invalid claim data', async ({ request }) => {
  const response = await request.post('/claims', {
    data: {
      claimType: 'INVALID',
      employeeId: '',
      amount: -500
    }
  });

  expect(response.status()).toBe(400);
  const errors = await response.json();
  expect(errors.errors).toContain('Invalid claim type');
  expect(errors.errors).toContain('Employee ID is required');
  expect(errors.errors).toContain('Amount must be positive');
});

test('return 404 for non-existent claim', async ({ request }) => {
  const response = await request.get('/claims/99999');
  expect(response.status()).toBe(404);
});
```

### Response time monitoring
```typescript
test('API responds within 2 seconds', async ({ request }) => {
  const start = Date.now();
  const response = await request.get('/claims');
  const responseTime = Date.now() - start;

  expect(response.ok()).toBeTruthy();
  expect(responseTime).toBeLessThan(2000);
});
```

### Data-driven tests
```typescript
const testCases = [
  { type: 'STD', amount: 5000, expected: 201 },
  { type: 'LTD', amount: 35000, expected: 201 },
  { type: 'STD', amount: 50001, expected: 400 },  // over max
  { type: 'INVALID', amount: 1000, expected: 400 },
];

testCases.forEach(({ type, amount, expected }) => {
  test(`claim type=${type} amount=${amount} → ${expected}`, async ({ request }) => {
    const response = await request.post('/claims', {
      data: { claimType: type, employeeId: 'EMP-0042', amount }
    });
    expect(response.status()).toBe(expected);
  });
});
```

### Mixing API + UI (preconditions & postconditions)
```typescript
test('create claim via API, verify in UI', async ({ page, request }) => {
  // Setup via API (fast)
  const response = await request.post('/claims', {
    data: { claimType: 'STD', employeeId: 'EMP-0042', amount: 4250 }
  });
  const claim = await response.json();

  // Verify via UI (user-facing)
  await page.goto('/claims');
  await expect(page.locator('text=EMP-0042')).toBeVisible();
  await expect(page.locator('text=$4,250')).toBeVisible();
});

test('submit claim via UI, verify via API', async ({ page, request }) => {
  // Action via UI
  await page.goto('/claims/new');
  await page.fill('[data-testid="amount"]', '8500');
  await page.click('[data-testid="submit"]');
  await page.waitForURL('/claims');

  // Verify via API (reliable)
  const response = await request.get('/claims?employeeId=EMP-0042');
  const claims = await response.json();
  expect(claims.some(c => c.amount === 8500)).toBeTruthy();
});
```

---

## Setup & Teardown Patterns

### Global setup for test data
```typescript
// global-setup.ts
import { request } from '@playwright/test';

export default async function globalSetup() {
  const context = await request.newContext({
    baseURL: 'https://api.yourapp.com',
    extraHTTPHeaders: {
      'Authorization': `Bearer ${process.env.API_TOKEN}`
    }
  });

  // Seed test data
  await context.post('/test/seed', {
    data: { scenario: 'claims-workflow' }
  });

  await context.dispose();
}
```

### Per-test cleanup
```typescript
test.describe('Claims CRUD', () => {
  const createdIds = [];

  test.afterEach(async ({ request }) => {
    // Clean up any claims created during tests
    for (const id of createdIds) {
      await request.delete(`/claims/${id}`);
    }
    createdIds.length = 0;
  });

  test('create claim', async ({ request }) => {
    const response = await request.post('/claims', {
      data: { claimType: 'STD', amount: 5000 }
    });
    const { id } = await response.json();
    createdIds.push(id); // track for cleanup
  });
});
```

---

## CI/CD Integration (GitHub Actions)

```yaml
name: API Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test tests/api/
        env:
          API_TOKEN: ${{ secrets.API_TOKEN }}
          BASE_URL: ${{ secrets.BASE_URL }}
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Best Practices

1. **Organize by resource** — one file per API entity (`users.spec.ts`, `claims.spec.ts`)
2. **Use `baseURL`** — never hardcode full URLs in tests
3. **Environment variables** for secrets — never commit tokens or passwords
4. **Validate structure AND content** — check field types, not just status codes
5. **Test error paths** as thoroughly as happy paths (400, 401, 403, 404, 409, 429, 500)
6. **Clean up after yourself** — delete created resources in `afterAll` or `afterEach`
7. **Use `data-testid`** when mixing API + UI tests for resilient selectors
8. **Monitor response times** — catch performance regressions early
9. **Data-driven tests** for repetitive validation (loop through test case arrays)
10. **Shared auth context** — login once in `beforeAll`, reuse across all tests
11. **Separate API tests from UI tests** — `tests/api/` vs `tests/e2e/`
12. **Use fixtures** for reusable test data — keep test files clean

---

## When to Use Playwright vs Other Tools

| Use Case | Best Tool |
|----------|-----------|
| API + UI in same test | **Playwright** ✅ |
| Quick manual API exploration | Postman |
| Java backend team | REST Assured |
| Node.js API unit tests | SuperTest |
| Load/performance testing | k6, Artillery |
| API monitoring | Postman monitors, Checkly |
| Contract testing | Pact |

**Bottom line:** If your team is already using Playwright for UI testing, there's zero reason to use a separate tool for API testing. You get shared auth, one config, one CI pipeline, and tests that actually reflect how your app works end-to-end.

---

## Sources

1. **Playwright Official Docs** — API Testing Guide: https://playwright.dev/docs/api-testing
2. **Playwright API Reference** — APIRequestContext: https://playwright.dev/docs/api/class-apirequestcontext
3. **Mergify** — "A Guide to Modern Playwright API Testing": https://articles.mergify.com/playwright-api-testing/
4. **Codoid** — "API Testing with Playwright: A Comprehensive Guide" (March 2025): https://codoid.com/api-testing/api-testing-with-playwright-a-comprehensive-guide/
5. **QAHiveLab** — "API Testing Best Practices with Playwright": https://qahivelab.github.io/automation/api/2025/06/07/api-testing-best-practices-playwright.html
6. **LambdaTest** — "Playwright API Testing Tutorial": https://www.lambdatest.com/learning-hub/playwright-api-testing
