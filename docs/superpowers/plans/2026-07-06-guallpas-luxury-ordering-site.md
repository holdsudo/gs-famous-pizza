# Guallpa's Famous Pizza Luxury Ordering Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished one-page Guallpa's Famous Pizza website with a premium animated hero, interactive mock menu, cart, checkout, confirmation flow, and social/review proof links.

**Architecture:** Static frontend with focused files: `index.html` for semantic structure, `styles.css` for visual system and responsive layout, `script.js` for menu/cart/checkout/motion behavior, and Playwright smoke tests for user flows. Three.js is loaded from a CDN with a canvas fallback so the site works even if the library does not load.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Three.js CDN, Node static server, Playwright tests.

---

## File Structure

- Create `package.json`: local scripts for serving the site and running Playwright tests.
- Create `playwright.config.js`: browser test configuration.
- Create `tests/site.spec.js`: smoke tests for rendering, menu interactions, cart, checkout validation, confirmation, and external proof links.
- Create `index.html`: semantic one-page site, dialogs, cart drawer, checkout form, proof links.
- Create `styles.css`: premium visual system, responsive layouts, animation states, reduced-motion support.
- Create `script.js`: menu data, rendering, cart state, customizer, checkout validation, confirmation, Three.js/canvas setup, scroll reveal.
- Create `assets/`: local generated-style image assets if needed during implementation.

---

### Task 1: Project Scripts and Smoke Test Harness

**Files:**
- Create: `package.json`
- Create: `playwright.config.js`
- Create: `tests/site.spec.js`

- [ ] **Step 1: Create the project scripts**

Create `package.json`:

```json
{
  "scripts": {
    "start": "python3 -m http.server 4173",
    "test": "playwright test",
    "test:headed": "playwright test --headed"
  },
  "devDependencies": {
    "@playwright/test": "^1.45.0"
  }
}
```

- [ ] **Step 2: Create Playwright config**

Create `playwright.config.js`:

```js
module.exports = {
  testDir: './tests',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    viewport: { width: 1440, height: 980 }
  },
  webServer: {
    command: 'python3 -m http.server 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: true,
    timeout: 10000
  }
};
```

- [ ] **Step 3: Write failing smoke tests**

Create `tests/site.spec.js`:

```js
const { test, expect } = require('@playwright/test');

test('renders premium hero and required proof links', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Famous pizza, engineered to order/i })).toBeVisible();
  await expect(page.locator('#hero-scene')).toBeVisible();
  await expect(page.getByRole('link', { name: /Facebook/i })).toHaveAttribute('href', 'https://www.facebook.com/guallpafamouspizza/');
  await expect(page.getByRole('link', { name: /Instagram/i })).toHaveAttribute('href', 'https://www.instagram.com/guallpasfamouspizza/');
  await expect(page.getByRole('link', { name: /Yelp/i })).toHaveAttribute('href', 'https://www.yelp.com/biz/guallpas-famous-pizza-iselin');
  await expect(page.getByRole('link', { name: /Tripadvisor/i })).toHaveAttribute('href', /tripadvisor\.com\/Restaurant_Review/);
});

test('menu category switching and cart add flow work', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Subs/i }).click();
  await expect(page.getByRole('heading', { name: /Chicken Parm Hero/i })).toBeVisible();
  await page.getByRole('button', { name: /Customize Chicken Parm Hero/i }).click();
  await page.getByRole('button', { name: /Add to order/i }).click();
  await expect(page.getByText(/Chicken Parm Hero/i).last()).toBeVisible();
  await expect(page.getByText(/\$11\.50/)).toBeVisible();
});

test('checkout validates required fields and creates confirmation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Customize Famous Cheese Pie/i }).click();
  await page.getByRole('button', { name: /Add to order/i }).click();
  await page.getByRole('button', { name: /Checkout/i }).click();
  await page.getByRole('button', { name: /Place mock order/i }).click();
  await expect(page.getByText(/Add your name and phone/i)).toBeVisible();
  await page.getByLabel(/Name/i).fill('Jason');
  await page.getByLabel(/Phone/i).fill('7325550100');
  await page.getByRole('button', { name: /Place mock order/i }).click();
  await expect(page.getByRole('heading', { name: /Order received/i })).toBeVisible();
  await expect(page.getByText(/GFP-/)).toBeVisible();
});
```

- [ ] **Step 4: Run tests to verify they fail**

Run: `npm test`

Expected: fails because `@playwright/test` may not be installed yet, or because `index.html` and site elements do not exist yet.

- [ ] **Step 5: Commit harness**

```bash
git add package.json playwright.config.js tests/site.spec.js
git commit -m "test: add site smoke test harness"
```

---

### Task 2: Semantic Site Shell

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create the static HTML shell**

Create `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Guallpa's Famous Pizza in Iselin, NJ, presented as a premium mock ordering platform.">
    <meta name="theme-color" content="#100d0b">
    <title>Guallpa's Famous Pizza | Luxury Ordering OS</title>
    <link rel="preconnect" href="https://unpkg.com">
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <header class="site-header" data-header>
      <a class="brand" href="#top" aria-label="Guallpa's Famous Pizza home">
        <span class="brand-mark">G</span>
        <span>Guallpa's Famous Pizza</span>
      </a>
      <nav class="primary-nav" aria-label="Primary navigation">
        <a href="#menu">Menu</a>
        <a href="#platform">Order OS</a>
        <a href="#proof">Reviews</a>
        <a href="#visit">Visit</a>
      </nav>
      <button class="nav-order" type="button" data-scroll-order>Start order</button>
    </header>

    <main id="top">
      <section class="hero" aria-labelledby="hero-title">
        <canvas id="hero-scene" class="hero-scene" aria-label="Animated premium pizza presentation"></canvas>
        <div class="hero-content reveal">
          <p class="eyebrow">Iselin, New Jersey</p>
          <h1 id="hero-title">Famous pizza, engineered to order.</h1>
          <p class="hero-copy">A premium mock ordering platform for Guallpa's Famous Pizza, built around fast pickup, rich menu browsing, and a polished cart experience.</p>
          <div class="hero-actions">
            <button class="button primary" type="button" data-scroll-order>Build my order</button>
            <a class="button secondary" href="#menu">Explore menu</a>
          </div>
        </div>
        <aside class="hero-order-card reveal" aria-label="Live order preview">
          <div class="card-topline">
            <span>Live order preview</span>
            <span class="live-dot">Kitchen open</span>
          </div>
          <div class="preview-line"><strong>Famous Cheese Pie</strong><span>Large</span></div>
          <div class="preview-line"><strong>Half Pepperoni</strong><span>Extra crisp</span></div>
          <div class="preview-line"><strong>Pickup ETA</strong><span>18-24 min</span></div>
        </aside>
      </section>

      <section class="section platform-strip" id="platform" aria-label="Ordering platform highlights">
        <div class="strip-item reveal"><strong>Pick your lane</strong><span>Pickup or delivery mock flow</span></div>
        <div class="strip-item reveal"><strong>Customize fast</strong><span>Size, toppings, notes, quantity</span></div>
        <div class="strip-item reveal"><strong>Confirm clean</strong><span>Receipt, ETA, social links</span></div>
      </section>

      <section class="section menu-section" id="menu" aria-labelledby="menu-title">
        <div class="section-heading reveal">
          <p class="eyebrow">Signature menu</p>
          <h2 id="menu-title">Build the order like a product launch.</h2>
          <p>Choose a category, customize an item, and watch the cart update instantly.</p>
        </div>
        <div class="menu-tabs reveal" role="tablist" aria-label="Menu categories" data-category-tabs></div>
        <div class="menu-grid" data-menu-grid></div>
      </section>

      <section class="section order-section" aria-labelledby="checkout-title">
        <div class="cart-panel reveal" data-cart-panel>
          <div class="panel-heading">
            <p class="eyebrow">Mock cart</p>
            <h2>Your order</h2>
          </div>
          <div class="cart-empty" data-cart-empty>Your cart is ready for its first pie.</div>
          <div class="cart-list" data-cart-list></div>
          <div class="cart-total" data-cart-total hidden></div>
          <button class="button primary full" type="button" data-open-checkout>Checkout</button>
        </div>

        <form class="checkout-panel reveal" id="checkout" aria-labelledby="checkout-title" data-checkout-form>
          <div class="panel-heading">
            <p class="eyebrow">Checkout mockup</p>
            <h2 id="checkout-title">Schedule the handoff.</h2>
          </div>
          <div class="segmented" aria-label="Order type">
            <button class="is-active" type="button" data-order-type="pickup">Pickup</button>
            <button type="button" data-order-type="delivery">Delivery</button>
          </div>
          <label>Name <input name="customerName" autocomplete="name"></label>
          <label>Phone <input name="phone" autocomplete="tel"></label>
          <label class="delivery-field" hidden>Delivery address <input name="address" autocomplete="street-address"></label>
          <label>Time
            <select name="scheduledTime">
              <option>ASAP - 18 to 24 min</option>
              <option>30 minutes</option>
              <option>45 minutes</option>
              <option>Tonight at 7:00</option>
            </select>
          </label>
          <p class="form-error" role="alert" data-form-error></p>
          <button class="button primary full" type="submit">Place mock order</button>
        </form>
      </section>

      <section class="section proof-section" id="proof" aria-labelledby="proof-title">
        <div class="section-heading reveal">
          <p class="eyebrow">The public proof loop</p>
          <h2 id="proof-title">Follow the shop where customers already look.</h2>
          <p>These cards link to the supplied social and review assets without inventing ratings or quotes.</p>
        </div>
        <div class="proof-grid">
          <a class="proof-card reveal" href="https://www.facebook.com/guallpafamouspizza/" target="_blank" rel="noopener"><span>Facebook</span><strong>Local updates</strong></a>
          <a class="proof-card reveal" href="https://www.instagram.com/guallpasfamouspizza/" target="_blank" rel="noopener"><span>Instagram</span><strong>Food gallery</strong></a>
          <a class="proof-card reveal" href="https://www.yelp.com/biz/guallpas-famous-pizza-iselin" target="_blank" rel="noopener"><span>Yelp</span><strong>Review discovery</strong></a>
          <a class="proof-card reveal" href="https://www.tripadvisor.com/Restaurant_Review-g46526-d5099150-Reviews-Guallpa_s_Famous_Pizza-Iselin_New_Jersey.html" target="_blank" rel="noopener"><span>Tripadvisor</span><strong>Traveler proof</strong></a>
        </div>
      </section>

      <section class="section visit-section" id="visit" aria-labelledby="visit-title">
        <div class="visit-copy reveal">
          <p class="eyebrow">Visit</p>
          <h2 id="visit-title">A modern front door for a famous Iselin pizza stop.</h2>
          <p>Use this mock platform as the visual standard for online ordering, social trust, and premium local presence.</p>
          <button class="button primary" type="button" data-scroll-order>Start another order</button>
        </div>
      </section>
    </main>

    <dialog class="item-dialog" data-item-dialog aria-labelledby="dialog-title">
      <form method="dialog" class="dialog-card">
        <button class="icon-button close" value="close" aria-label="Close customizer">×</button>
        <div data-dialog-content></div>
      </form>
    </dialog>

    <div class="toast" data-toast role="status" aria-live="polite"></div>

    <script src="https://unpkg.com/three@0.165.0/build/three.min.js"></script>
    <script src="script.js"></script>
  </body>
</html>
```

- [ ] **Step 2: Run tests to verify shell progress**

Run: `npm test`

Expected: hero/proof checks may pass after dependencies install; menu and checkout tests still fail because styles and behavior are not implemented.

- [ ] **Step 3: Commit shell**

```bash
git add index.html
git commit -m "feat: add semantic pizza ordering site shell"
```

---

### Task 3: Premium Visual System

**Files:**
- Create: `styles.css`

- [ ] **Step 1: Add premium responsive CSS**

Create `styles.css` with:

```css
:root {
  --ink: #100d0b;
  --paper: #f8f1e7;
  --muted: rgba(255,255,255,.68);
  --muted-dark: rgba(16,13,11,.62);
  --tomato: #b9271c;
  --basil: #2f6f47;
  --gold: #d9a441;
  --line: rgba(255,255,255,.14);
  --shadow: 0 30px 90px rgba(25, 10, 3, .22);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  color: var(--ink);
  background: var(--paper);
}
button, input, select { font: inherit; }
a { color: inherit; text-decoration: none; }

.site-header {
  position: fixed;
  top: 18px;
  left: 50%;
  z-index: 20;
  width: min(1180px, calc(100% - 28px));
  min-height: 64px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 10px 12px 10px 16px;
  border: 1px solid rgba(255,255,255,.16);
  border-radius: 999px;
  color: #fff;
  background: rgba(16,13,11,.56);
  backdrop-filter: blur(24px);
}
.brand, .primary-nav { display: flex; align-items: center; gap: 18px; }
.brand { font-weight: 820; }
.brand-mark {
  width: 40px;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #fff;
  color: var(--ink);
  letter-spacing: -.05em;
}
.primary-nav a { color: rgba(255,255,255,.72); font-size: 14px; }
.nav-order, .button {
  border: 0;
  cursor: pointer;
  min-height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 0 18px;
  font-weight: 820;
}
.nav-order, .button.primary { color: var(--ink); background: #fff; }
.button.secondary { color: #fff; background: rgba(255,255,255,.10); border: 1px solid rgba(255,255,255,.16); }
.button.full { width: 100%; }

.hero {
  position: relative;
  min-height: 100svh;
  overflow: hidden;
  display: grid;
  align-items: center;
  padding: 140px max(24px, calc((100vw - 1180px) / 2)) 72px;
  color: #fff;
  background:
    radial-gradient(circle at 72% 48%, rgba(217,164,65,.48), transparent 24%),
    linear-gradient(115deg, #100d0b 0 48%, #38120e 78%, #9b241a 118%);
}
.hero:after {
  content: "";
  position: absolute;
  inset: auto -10% -28% -10%;
  height: 46%;
  background: radial-gradient(ellipse, rgba(0,0,0,.48), transparent 68%);
  pointer-events: none;
}
.hero-scene {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.hero-content {
  position: relative;
  z-index: 2;
  max-width: 720px;
}
.eyebrow {
  margin: 0 0 14px;
  color: var(--gold);
  font-size: 12px;
  font-weight: 900;
  letter-spacing: .14em;
  text-transform: uppercase;
}
h1, h2, h3, p { margin-top: 0; }
h1 {
  margin-bottom: 20px;
  font-size: clamp(60px, 9vw, 124px);
  line-height: .78;
  letter-spacing: -.07em;
}
.hero-copy {
  max-width: 590px;
  color: rgba(255,255,255,.72);
  font-size: clamp(18px, 2vw, 22px);
  line-height: 1.5;
}
.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
.hero-order-card {
  position: absolute;
  right: max(24px, calc((100vw - 1180px) / 2));
  bottom: 72px;
  z-index: 3;
  width: min(420px, calc(100% - 48px));
  border: 1px solid rgba(255,255,255,.18);
  border-radius: 24px;
  padding: 18px;
  background: rgba(10,8,7,.62);
  backdrop-filter: blur(24px);
  box-shadow: var(--shadow);
}
.card-topline, .preview-line, .cart-row, .total-row {
  display: flex;
  justify-content: space-between;
  gap: 18px;
}
.card-topline { margin-bottom: 12px; color: rgba(255,255,255,.62); font-size: 13px; }
.live-dot { display: inline-flex; align-items: center; gap: 7px; }
.live-dot:before {
  content: "";
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #49dd78;
  box-shadow: 0 0 18px #49dd78;
}
.preview-line {
  padding: 12px 0;
  border-top: 1px solid rgba(255,255,255,.12);
  color: rgba(255,255,255,.7);
}
.preview-line strong { color: #fff; }

.section {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 92px 0;
}
.platform-strip {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.strip-item, .cart-panel, .checkout-panel, .proof-card, .visit-section {
  border: 1px solid rgba(16,13,11,.09);
  border-radius: 24px;
  background: rgba(255,255,255,.68);
  box-shadow: 0 18px 60px rgba(35,20,9,.08);
}
.strip-item { padding: 22px; }
.strip-item strong { display: block; margin-bottom: 7px; }
.strip-item span, .section-heading p, .cart-empty, .proof-card span, .visit-copy p { color: var(--muted-dark); }
.section-heading { max-width: 760px; margin-bottom: 28px; }
.section-heading h2, .panel-heading h2, .visit-copy h2 {
  font-size: clamp(42px, 6vw, 78px);
  line-height: .92;
  letter-spacing: -.055em;
}
.menu-tabs { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 22px; }
.menu-tabs button, .segmented button, .qty button, .chip {
  border: 1px solid rgba(16,13,11,.12);
  border-radius: 999px;
  background: rgba(255,255,255,.72);
  cursor: pointer;
}
.menu-tabs button, .segmented button, .chip { padding: 11px 15px; font-weight: 780; }
.menu-tabs button.is-active, .segmented button.is-active, .chip.is-active { color: #fff; background: var(--ink); }
.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.menu-card {
  overflow: hidden;
  min-height: 420px;
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 20px 70px rgba(35,20,9,.1);
}
.food-art {
  min-height: 210px;
  background:
    radial-gradient(circle at 38% 38%, #f9edb8 0 5%, transparent 6%),
    radial-gradient(circle at 62% 45%, var(--tomato) 0 7%, transparent 8%),
    radial-gradient(circle at 44% 67%, var(--basil) 0 4%, transparent 5%),
    repeating-conic-gradient(from 20deg, rgba(94,37,12,.16) 0 2deg, transparent 2deg 34deg),
    radial-gradient(circle, #ffd76d 0 56%, #c66e2b 57% 70%, #6b2d17 71%);
}
.menu-card-body { padding: 20px; flex: 1; display: flex; flex-direction: column; }
.menu-card h3 { margin-bottom: 8px; font-size: 25px; letter-spacing: -.025em; }
.menu-card p { color: var(--muted-dark); line-height: 1.5; }
.menu-card-footer { margin-top: auto; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.price { font-weight: 900; }
.customize { color: #fff; background: var(--ink); }

.order-section {
  display: grid;
  grid-template-columns: .95fr 1.05fr;
  gap: 18px;
}
.cart-panel, .checkout-panel { padding: 24px; }
.cart-list { display: grid; gap: 12px; margin: 18px 0; }
.cart-row { align-items: center; padding: 14px; border-radius: 18px; background: var(--paper); }
.cart-actions { display: flex; align-items: center; gap: 8px; }
.qty { display: inline-flex; align-items: center; gap: 8px; }
.qty button, .icon-button { width: 34px; height: 34px; padding: 0; display: inline-grid; place-items: center; }
.cart-total { margin: 16px 0; border-top: 1px solid rgba(16,13,11,.12); padding-top: 14px; }
.total-row { padding: 6px 0; }
.total-row.grand { font-weight: 900; font-size: 20px; }
.checkout-panel { display: grid; gap: 14px; }
.segmented { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 5px; border-radius: 999px; background: var(--paper); }
label { display: grid; gap: 7px; font-weight: 760; }
input, select {
  width: 100%;
  min-height: 46px;
  border: 1px solid rgba(16,13,11,.13);
  border-radius: 14px;
  padding: 0 13px;
  background: #fff;
}
.form-error { min-height: 20px; margin: 0; color: var(--tomato); font-weight: 760; }

.proof-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.proof-card { min-height: 190px; padding: 22px; display: flex; flex-direction: column; justify-content: flex-end; transition: transform .25s ease, background .25s ease; }
.proof-card:hover { transform: translateY(-4px); background: #fff; }
.proof-card strong { font-size: 24px; letter-spacing: -.03em; }
.visit-section {
  width: min(1180px, calc(100% - 32px));
  padding: 70px;
  margin-bottom: 60px;
  background:
    linear-gradient(90deg, rgba(16,13,11,.92), rgba(16,13,11,.50)),
    radial-gradient(circle at 78% 40%, rgba(217,164,65,.75), transparent 24%),
    #35120f;
  color: #fff;
}
.visit-copy { max-width: 620px; }
.visit-copy p { color: rgba(255,255,255,.68); }

.item-dialog {
  width: min(680px, calc(100% - 28px));
  border: 0;
  border-radius: 26px;
  padding: 0;
  background: transparent;
}
.item-dialog::backdrop { background: rgba(0,0,0,.62); backdrop-filter: blur(7px); }
.dialog-card {
  position: relative;
  display: grid;
  gap: 18px;
  padding: 24px;
  border-radius: 26px;
  background: #fff;
}
.close { position: absolute; right: 16px; top: 16px; border: 0; border-radius: 50%; cursor: pointer; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.toast {
  position: fixed;
  left: 50%;
  bottom: 24px;
  z-index: 40;
  transform: translate(-50%, 20px);
  opacity: 0;
  pointer-events: none;
  padding: 12px 16px;
  border-radius: 999px;
  color: #fff;
  background: var(--ink);
  transition: opacity .25s ease, transform .25s ease;
}
.toast.is-visible { opacity: 1; transform: translate(-50%, 0); }
.reveal { opacity: 0; transform: translateY(22px); transition: opacity .7s ease, transform .7s ease; }
.reveal.is-visible { opacity: 1; transform: translateY(0); }

@media (max-width: 900px) {
  .primary-nav { display: none; }
  .site-header { top: 10px; width: calc(100% - 18px); }
  .brand span:last-child { max-width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .hero { padding-top: 118px; align-items: start; }
  h1 { font-size: clamp(56px, 16vw, 82px); }
  .hero-order-card { position: relative; right: auto; bottom: auto; margin-top: 42px; }
  .platform-strip, .menu-grid, .order-section, .proof-grid { grid-template-columns: 1fr; }
  .section { padding: 62px 0; }
  .visit-section { padding: 34px 22px; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .001ms !important;
  }
  .reveal { opacity: 1; transform: none; }
}
```

- [ ] **Step 2: Run tests**

Run: `npm test`

Expected: still fails on menu/cart behavior because `script.js` does not exist yet.

- [ ] **Step 3: Commit visual system**

```bash
git add styles.css
git commit -m "feat: add premium visual system"
```

---

### Task 4: Menu Rendering, Cart, and Customizer Behavior

**Files:**
- Create: `script.js`

- [ ] **Step 1: Implement menu data and cart flow**

Create `script.js` with:

```js
const categories = [
  { id: 'pizza', label: 'Pizza' },
  { id: 'subs', label: 'Subs' },
  { id: 'pasta', label: 'Pasta' },
  { id: 'salads', label: 'Salads' },
  { id: 'sides', label: 'Sides' },
  { id: 'drinks', label: 'Drinks' }
];

const menuItems = [
  { id: 'famous-cheese', category: 'pizza', name: 'Famous Cheese Pie', description: 'Classic red sauce, whole milk mozzarella, crisp edge, and a balanced fold.', basePrice: 17.95, sizes: ['Small', 'Large', 'Sicilian'], toppings: ['Pepperoni', 'Mushrooms', 'Onions', 'Basil', 'Extra cheese'] },
  { id: 'pepperoni-glow', category: 'pizza', name: 'Pepperoni Glow', description: 'Cupped pepperoni, extra cheese pull, tomato finish, and a little heat.', basePrice: 21.5, sizes: ['Small', 'Large'], toppings: ['Hot honey', 'Jalapenos', 'Garlic', 'Extra pepperoni'] },
  { id: 'garden-luxe', category: 'pizza', name: 'Garden Luxe', description: 'Peppers, mushrooms, onions, olives, basil, and bright tomato sauce.', basePrice: 22, sizes: ['Small', 'Large'], toppings: ['Spinach', 'Broccoli', 'Ricotta', 'Roasted garlic'] },
  { id: 'chicken-parm-hero', category: 'subs', name: 'Chicken Parm Hero', description: 'Crispy chicken, marinara, melted mozzarella, toasted roll.', basePrice: 11.5, sizes: ['Regular', 'Large'], toppings: ['Extra mozzarella', 'Peppers', 'Onions'] },
  { id: 'italian-hero', category: 'subs', name: 'Famous Italian Hero', description: 'Layered deli meats, provolone, lettuce, tomato, oil, and vinegar.', basePrice: 10.95, sizes: ['Regular', 'Large'], toppings: ['Hot peppers', 'Mayo', 'Extra provolone'] },
  { id: 'baked-ziti', category: 'pasta', name: 'Baked Ziti', description: 'Ricotta, marinara, mozzarella cap, and oven-baked edges.', basePrice: 13.95, sizes: ['Tray'], toppings: ['Meatballs', 'Sausage', 'Extra ricotta'] },
  { id: 'caesar', category: 'salads', name: 'Crisp Caesar', description: 'Romaine, parmesan, croutons, Caesar dressing, optional grilled chicken.', basePrice: 9.95, sizes: ['Regular'], toppings: ['Grilled chicken', 'Extra parmesan'] },
  { id: 'garlic-knots', category: 'sides', name: 'Garlic Knots', description: 'Warm knots, garlic oil, parsley, and marinara for dipping.', basePrice: 5.95, sizes: ['6 pack', '12 pack'], toppings: ['Extra sauce', 'Parmesan'] },
  { id: 'soda', category: 'drinks', name: 'Cold Soda', description: 'A cold finish for the full pizza order.', basePrice: 2.75, sizes: ['Can', '2 liter'], toppings: [] }
];

const state = {
  category: 'pizza',
  cart: [],
  orderType: 'pickup',
  activeItem: null
};

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const tabsEl = document.querySelector('[data-category-tabs]');
const gridEl = document.querySelector('[data-menu-grid]');
const dialog = document.querySelector('[data-item-dialog]');
const dialogContent = document.querySelector('[data-dialog-content]');
const cartList = document.querySelector('[data-cart-list]');
const cartEmpty = document.querySelector('[data-cart-empty]');
const cartTotal = document.querySelector('[data-cart-total]');
const toast = document.querySelector('[data-toast]');

function renderTabs() {
  tabsEl.innerHTML = categories.map((category) => `
    <button type="button" class="${category.id === state.category ? 'is-active' : ''}" role="tab" aria-selected="${category.id === state.category}" data-category="${category.id}">
      ${category.label}
    </button>
  `).join('');
}

function renderMenu() {
  const items = menuItems.filter((item) => item.category === state.category);
  gridEl.innerHTML = items.map((item) => `
    <article class="menu-card reveal is-visible">
      <div class="food-art" aria-hidden="true"></div>
      <div class="menu-card-body">
        <p class="eyebrow">${categories.find((category) => category.id === item.category).label}</p>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="menu-card-footer">
          <span class="price">${money.format(item.basePrice)}</span>
          <button class="button customize" type="button" data-customize="${item.id}">Customize ${item.name}</button>
        </div>
      </div>
    </article>
  `).join('');
}

function openCustomizer(itemId) {
  const item = menuItems.find((entry) => entry.id === itemId);
  state.activeItem = {
    ...item,
    size: item.sizes[0],
    selectedToppings: [],
    quantity: 1,
    notes: ''
  };
  renderCustomizer();
  dialog.showModal();
}

function renderCustomizer() {
  const item = state.activeItem;
  dialogContent.innerHTML = `
    <p class="eyebrow">Customize</p>
    <h2 id="dialog-title">${item.name}</h2>
    <p>${item.description}</p>
    <label>Size
      <select data-size>
        ${item.sizes.map((size) => `<option ${size === item.size ? 'selected' : ''}>${size}</option>`).join('')}
      </select>
    </label>
    <div>
      <p class="eyebrow">Toppings</p>
      <div class="chips">
        ${item.toppings.length ? item.toppings.map((topping) => `<button class="chip ${item.selectedToppings.includes(topping) ? 'is-active' : ''}" type="button" data-topping="${topping}">${topping}</button>`).join('') : '<span>No add-ons for this item.</span>'}
      </div>
    </div>
    <label>Special instructions
      <input data-notes placeholder="Well done, light sauce, extra napkins">
    </label>
    <div class="menu-card-footer">
      <div class="qty" aria-label="Quantity">
        <button type="button" data-qty="-1">−</button>
        <strong>${item.quantity}</strong>
        <button type="button" data-qty="1">+</button>
      </div>
      <button class="button primary" type="button" data-add-active>Add to order</button>
    </div>
  `;
}

function itemUnitPrice(item) {
  const sizeUpcharge = item.size === 'Large' || item.size === '2 liter' || item.size === '12 pack' ? 3 : item.size === 'Sicilian' ? 5 : 0;
  return item.basePrice + sizeUpcharge + item.selectedToppings.length * 1.25;
}

function addActiveToCart() {
  const item = state.activeItem;
  state.cart.push({
    id: `${item.id}-${Date.now()}`,
    menuItemId: item.id,
    name: item.name,
    size: item.size,
    toppings: [...item.selectedToppings],
    notes: item.notes,
    quantity: item.quantity,
    unitPrice: itemUnitPrice(item)
  });
  dialog.close();
  renderCart();
  showToast(`${item.name} added to order`);
}

function totals() {
  const subtotal = state.cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const tax = subtotal * 0.06625;
  return { subtotal, tax, total: subtotal + tax };
}

function renderCart() {
  cartEmpty.hidden = state.cart.length > 0;
  cartTotal.hidden = state.cart.length === 0;
  cartList.innerHTML = state.cart.map((item) => `
    <div class="cart-row">
      <div>
        <strong>${item.name}</strong>
        <div>${item.size}${item.toppings.length ? ` · ${item.toppings.join(', ')}` : ''}</div>
      </div>
      <div class="cart-actions">
        <div class="qty">
          <button type="button" data-cart-qty="${item.id}" data-delta="-1">−</button>
          <strong>${item.quantity}</strong>
          <button type="button" data-cart-qty="${item.id}" data-delta="1">+</button>
        </div>
        <span>${money.format(item.unitPrice * item.quantity)}</span>
        <button class="icon-button" type="button" data-remove="${item.id}" aria-label="Remove ${item.name}">×</button>
      </div>
    </div>
  `).join('');
  const currentTotals = totals();
  cartTotal.innerHTML = `
    <div class="total-row"><span>Subtotal</span><strong>${money.format(currentTotals.subtotal)}</strong></div>
    <div class="total-row"><span>NJ sales tax mock</span><strong>${money.format(currentTotals.tax)}</strong></div>
    <div class="total-row grand"><span>Total</span><strong>${money.format(currentTotals.total)}</strong></div>
  `;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.setTimeout(() => toast.classList.remove('is-visible'), 1800);
}

tabsEl.addEventListener('click', (event) => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  state.category = button.dataset.category;
  renderTabs();
  renderMenu();
});

gridEl.addEventListener('click', (event) => {
  const button = event.target.closest('[data-customize]');
  if (button) openCustomizer(button.dataset.customize);
});

dialog.addEventListener('click', (event) => {
  const topping = event.target.closest('[data-topping]');
  const qty = event.target.closest('[data-qty]');
  const add = event.target.closest('[data-add-active]');
  if (topping) {
    const value = topping.dataset.topping;
    state.activeItem.selectedToppings = state.activeItem.selectedToppings.includes(value)
      ? state.activeItem.selectedToppings.filter((entry) => entry !== value)
      : [...state.activeItem.selectedToppings, value];
    renderCustomizer();
  }
  if (qty) {
    state.activeItem.quantity = Math.max(1, state.activeItem.quantity + Number(qty.dataset.qty));
    renderCustomizer();
  }
  if (add) addActiveToCart();
});

dialog.addEventListener('change', (event) => {
  if (event.target.matches('[data-size]')) state.activeItem.size = event.target.value;
});

dialog.addEventListener('input', (event) => {
  if (event.target.matches('[data-notes]')) state.activeItem.notes = event.target.value;
});

cartList.addEventListener('click', (event) => {
  const remove = event.target.closest('[data-remove]');
  const qty = event.target.closest('[data-cart-qty]');
  if (remove) state.cart = state.cart.filter((item) => item.id !== remove.dataset.remove);
  if (qty) {
    const item = state.cart.find((entry) => entry.id === qty.dataset.cartQty);
    item.quantity = Math.max(1, item.quantity + Number(qty.dataset.delta));
  }
  renderCart();
});

renderTabs();
renderMenu();
renderCart();
```

- [ ] **Step 2: Run tests**

Run: `npm test`

Expected: menu and cart test passes; checkout test still fails until Task 5.

- [ ] **Step 3: Commit menu/cart flow**

```bash
git add script.js
git commit -m "feat: add interactive menu and cart"
```

---

### Task 5: Checkout, Confirmation, Motion, and Hero Scene

**Files:**
- Modify: `script.js`
- Modify: `styles.css`

- [ ] **Step 1: Append checkout and motion code**

Append to `script.js`:

```js
const checkoutForm = document.querySelector('[data-checkout-form]');
const formError = document.querySelector('[data-form-error]');
const deliveryField = document.querySelector('.delivery-field');

function scrollToOrder() {
  document.querySelector('#menu').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.querySelectorAll('[data-scroll-order]').forEach((button) => {
  button.addEventListener('click', scrollToOrder);
});

document.querySelector('[data-open-checkout]').addEventListener('click', () => {
  document.querySelector('#checkout').scrollIntoView({ behavior: 'smooth', block: 'center' });
});

document.querySelectorAll('[data-order-type]').forEach((button) => {
  button.addEventListener('click', () => {
    state.orderType = button.dataset.orderType;
    document.querySelectorAll('[data-order-type]').forEach((entry) => entry.classList.toggle('is-active', entry === button));
    deliveryField.hidden = state.orderType !== 'delivery';
  });
});

checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(checkoutForm);
  const name = String(data.get('customerName') || '').trim();
  const phone = String(data.get('phone') || '').trim();
  const address = String(data.get('address') || '').trim();
  if (!state.cart.length) {
    formError.textContent = 'Add an item before placing a mock order.';
    return;
  }
  if (!name || !phone) {
    formError.textContent = 'Add your name and phone to place the mock order.';
    return;
  }
  if (state.orderType === 'delivery' && !address) {
    formError.textContent = 'Add a delivery address for delivery mock mode.';
    return;
  }
  formError.textContent = '';
  const confirmation = `GFP-${Math.floor(1000 + Math.random() * 9000)}`;
  checkoutForm.innerHTML = `
    <div class="confirmation">
      <p class="eyebrow">Confirmed mock order</p>
      <h2>Order received</h2>
      <p>Your mock order number is <strong>${confirmation}</strong>. Estimated ${state.orderType === 'pickup' ? 'pickup' : 'delivery'} time: ${data.get('scheduledTime')}.</p>
      <a class="button primary" href="https://www.instagram.com/guallpasfamouspizza/" target="_blank" rel="noopener">Follow on Instagram</a>
    </div>
  `;
  showToast(`Mock order ${confirmation} confirmed`);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

function startHeroScene() {
  const canvas = document.querySelector('#hero-scene');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const context = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let frame = 0;

  function resize() {
    width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  }

  function drawPizza(x, y, radius, rotation) {
    context.save();
    context.translate(x, y);
    context.rotate(rotation);
    const gradient = context.createRadialGradient(0, 0, radius * .1, 0, 0, radius);
    gradient.addColorStop(0, '#ffd86f');
    gradient.addColorStop(.62, '#f0b84c');
    gradient.addColorStop(.75, '#b45b22');
    gradient.addColorStop(1, '#6f2b16');
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(0, 0, radius, 0, Math.PI * 2);
    context.fill();
    const toppings = [
      [-.35, -.24, '#b9271c'], [.2, -.18, '#b9271c'], [.38, .2, '#b9271c'],
      [-.18, .32, '#2f6f47'], [.18, .42, '#17130f'], [.08, -.45, '#f7f1e7']
    ];
    toppings.forEach(([tx, ty, color]) => {
      context.fillStyle = color;
      context.beginPath();
      context.arc(tx * radius, ty * radius, radius * .09, 0, Math.PI * 2);
      context.fill();
    });
    context.restore();
  }

  function draw() {
    context.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    const displayWidth = canvas.offsetWidth;
    const displayHeight = canvas.offsetHeight;
    const pulse = reduceMotion ? 0 : Math.sin(frame / 70) * 8;
    drawPizza(displayWidth * .72, displayHeight * .45 + pulse, Math.min(displayWidth, displayHeight) * .22, -.2 + frame / 900);
    context.fillStyle = 'rgba(217,164,65,.08)';
    for (let i = 0; i < 7; i += 1) {
      context.beginPath();
      context.arc(displayWidth * (.58 + i * .06), displayHeight * (.24 + (i % 3) * .18), 80 + i * 18, 0, Math.PI * 2);
      context.fill();
    }
    frame += 1;
    if (!reduceMotion) requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', resize);
}

startHeroScene();
```

- [ ] **Step 2: Add confirmation CSS**

Append to `styles.css`:

```css
.confirmation {
  min-height: 420px;
  display: grid;
  align-content: center;
  gap: 16px;
  padding: 28px;
  border-radius: 22px;
  color: #fff;
  background:
    radial-gradient(circle at 76% 26%, rgba(217,164,65,.72), transparent 26%),
    linear-gradient(145deg, #100d0b, #4b1711);
}
.confirmation h2 {
  margin: 0;
  font-size: clamp(42px, 6vw, 72px);
  line-height: .9;
  letter-spacing: -.055em;
}
.confirmation p {
  color: rgba(255,255,255,.72);
  line-height: 1.5;
}
```

- [ ] **Step 3: Run tests**

Run: `npm test`

Expected: all Playwright tests pass.

- [ ] **Step 4: Commit checkout and motion**

```bash
git add script.js styles.css
git commit -m "feat: add checkout confirmation and motion"
```

---

### Task 6: Final Polish, Responsive QA, and Verification

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `script.js`

- [ ] **Step 1: Run full test suite**

Run: `npm test`

Expected: all tests pass.

- [ ] **Step 2: Start local server for manual review**

Run: `python3 -m http.server 4173`

Expected: server starts at `http://127.0.0.1:4173`.

- [ ] **Step 3: Inspect desktop and mobile**

Open:

- Desktop: `http://127.0.0.1:4173`
- Mobile viewport in browser dev tools at `390 x 844`

Verify:

- Hero canvas is visible and not blank.
- Text does not overlap the order card.
- Category tabs wrap cleanly on mobile.
- Cart controls fit without horizontal scrolling.
- Dialog is usable on mobile.
- Proof links open in new tabs.

- [ ] **Step 4: Fix any visual overflow found**

If mobile overflow appears in menu cards or cart rows, add this CSS:

```css
.cart-row {
  flex-wrap: wrap;
}
.cart-actions {
  flex-wrap: wrap;
  justify-content: flex-start;
}
.menu-card-footer {
  flex-wrap: wrap;
}
.customize {
  width: 100%;
}
```

- [ ] **Step 5: Final status check**

Run: `git status --short`

Expected: only intentional files are modified.

- [ ] **Step 6: Commit final polish if changes were made**

```bash
git add index.html styles.css script.js
git commit -m "polish: refine responsive ordering experience"
```

---

## Self-Review

Spec coverage:

- Premium one-page site: Tasks 2 and 3.
- Animated hero with canvas/Three.js-style fallback: Task 5.
- Interactive menu categories and item customization: Task 4.
- Cart drawer/panel, totals, checkout validation, confirmation: Tasks 4 and 5.
- Four supplied social/review links: Task 2 and tested in Task 1.
- Accessibility basics: Task 2 semantic structure and Task 3 focusable controls.
- Verification: Tasks 1 and 6.

Placeholder scan:

- No placeholder tokens or unspecified implementation steps are intentionally left in this plan.

Type consistency:

- Menu item fields use `id`, `category`, `name`, `description`, `basePrice`, `sizes`, and `toppings`.
- Cart item fields use `id`, `menuItemId`, `name`, `size`, `toppings`, `notes`, `quantity`, and `unitPrice`.
- Test selectors match the names and labels defined in `index.html` and rendered by `script.js`.
