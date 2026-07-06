# Guallpa's Famous Pizza Luxury Ordering Site Design

Date: 2026-07-06

## Goal

Build a premium, fully visual one-page website for Guallpa's Famous Pizza that feels like a high-end product launch and includes a convincing mock ordering platform. The site should use the supplied Facebook, Instagram, Yelp, and Tripadvisor URLs as visible trust and social proof surfaces while avoiding fabricated ratings, quotes, or claims that cannot be verified from accessible public pages.

## Creative Direction

The approved direction is Option C: Luxury Ordering OS.

The site should combine Apple-inspired restraint with cinematic food-commerce energy:

- A dark, immersive first viewport with precise typography, glass UI, and a staged pizza/product hero.
- High-end motion: scroll reveals, smooth section transitions, cart drawer motion, item add animations, and subtle ambient canvas/Three.js movement.
- Food imagery and generated visual assets should look appetizing, premium, and specific to pizza ordering, not generic stock restaurant design.
- UI should feel like a serious ordering product: structured categories, item customization, live cart, checkout states, and confirmation flow.

## Sources and Brand Inputs

Use these supplied links as the public proof ecosystem:

- Facebook: `https://www.facebook.com/guallpafamouspizza/`
- Instagram: `https://www.instagram.com/guallpasfamouspizza/`
- Yelp: `https://www.yelp.com/biz/guallpas-famous-pizza-iselin`
- Tripadvisor: `https://www.tripadvisor.com/Restaurant_Review-g46526-d5099150-Reviews-Guallpa_s_Famous_Pizza-Iselin_New_Jersey.html`

Some of these pages may be blocked by login, captcha, or rate-limiting in automated browsing. The site will link to them directly and describe them generically as social/review destinations unless exact accessible facts are available.

## Site Structure

The first screen is the actual restaurant/order experience, not a marketing landing page.

1. Hero and order entry
   - Brand navigation with Guallpa's Famous Pizza as the primary signal.
   - Large premium headline: famous pizza framed as a modern ordering experience.
   - Animated pizza/product stage using Three.js or a performant canvas fallback.
   - Live order preview card with ETA, selected item, and kitchen status.
   - Primary actions: start order and explore menu.

2. Signature menu
   - Category tabs for pizzas, subs, pasta, salads, sides, and drinks.
   - Feature cards for signature pies and popular combinations.
   - Item detail modal with size selection, topping chips, special instructions, quantity stepper, and add-to-cart.
   - Animated add-to-cart state.

3. Ordering platform
   - Sticky cart drawer or side panel on desktop.
   - Bottom cart bar on mobile.
   - Order type toggle: pickup or delivery mock mode.
   - Scheduled time selection.
   - Customer detail fields.
   - Mock payment/submit button that does not process real payment.
   - Confirmation receipt with order number, ETA, and social follow links.

4. Reputation and social proof
   - Four proof cards linking to Facebook, Instagram, Yelp, and Tripadvisor.
   - Instagram-inspired gallery area using generated or locally created pizza/restaurant visuals if real accessible assets are unavailable.
   - Copy will be careful: "See us on Yelp" instead of unverifiable ratings.

5. Restaurant details and final CTA
   - Location-oriented section for Iselin, New Jersey.
   - Hours/contact fields can be presented as editable site content if exact hours are not verified.
   - Final CTA returns the user to the ordering flow.

## Components

- `HeroScene`: premium first viewport, animated pizza stage, ambient lighting, order preview overlay.
- `MenuCatalog`: category tabs, menu cards, item metadata, item selection events.
- `ItemCustomizer`: modal or expanded panel for size, toppings, notes, and quantity.
- `CartDrawer`: live cart contents, subtotal/tax/total display, quantity edits, remove actions.
- `CheckoutPanel`: pickup/delivery toggle, contact inputs, schedule selection, confirmation action.
- `ProofWall`: supplied social/review links with platform-specific cards.
- `MotionSystem`: intersection reveals, reduced-motion support, page transitions, add-to-cart microinteractions.

## Data Model

Use local JavaScript data for the mock menu. Menu data should include:

- `id`
- `category`
- `name`
- `description`
- `basePrice`
- `sizes`
- `defaultImage`
- `badges`
- `availableToppings`

Cart item data should include:

- `menuItemId`
- `name`
- `size`
- `toppings`
- `notes`
- `quantity`
- `unitPrice`

Checkout state should include:

- `orderType`
- `scheduledTime`
- `customerName`
- `phone`
- `address` for delivery mock mode
- `confirmationNumber`

## Architecture

Use a static frontend unless the existing project context changes before implementation. A static build is sufficient because the ordering platform is a mockup and should not process live payments or submit orders.

Recommended file layout:

- `index.html`
- `styles.css`
- `script.js`
- `assets/`

If the final build benefits from modularity, keep the JavaScript organized into small sections inside `script.js`: menu data, cart state, render functions, event binding, motion setup, and Three.js/canvas scene setup.

## Visual and Motion Requirements

- Responsive layout must be polished on desktop and mobile.
- Cards should use restrained radii, strong spacing, and no nested card clutter.
- Avoid one-note color palettes. Use a premium base of near-black, warm cream, tomato red, basil green, and restrained gold.
- Motion should be smooth and purposeful: section reveals, hero parallax, cart transitions, active category transitions, confirmation animation.
- Respect `prefers-reduced-motion` by disabling heavy continuous animation and simplifying transitions.
- Use real or generated bitmap-style food assets rather than decorative SVG-only visuals. If live assets from the supplied pages are inaccessible, create local generated-style visual treatments or CSS/canvas food staging.

## Error Handling and Edge Cases

- Cart drawer empty state.
- Prevent checkout confirmation when the cart is empty.
- Validate basic required mock checkout fields.
- Delivery mode should request an address; pickup mode should not.
- Quantity controls must not allow values below 1.
- Cart totals should update immediately after edits.
- All external social/review links open safely with `target="_blank"` and `rel="noopener"`.

## Accessibility

- Semantic headings and sections.
- Buttons are real buttons for actions; links are links for navigation.
- Keyboard-accessible category tabs, modal close, cart drawer, and checkout controls.
- Visible focus states.
- Sufficient color contrast for text and controls.
- Alt text for meaningful images.
- ARIA labels for icon-only controls if used.

## Verification

Before calling the build complete:

- Open the site locally and inspect desktop and mobile viewports.
- Confirm the hero renders and is not blank.
- Confirm menu categories switch correctly.
- Confirm item customization adds correct cart items.
- Confirm cart totals update with quantity changes and removals.
- Confirm checkout validation and confirmation state work.
- Confirm external links point to the four supplied URLs.
- Confirm reduced-motion mode does not leave broken UI states.

## Out of Scope

- Real payment processing.
- Real order submission to the restaurant.
- Scraping private/login-gated social content.
- Claiming exact review scores, hours, prices, or menu facts that are not verified.
