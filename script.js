const categories = [
  { id: 'pizza', label: 'Pizza' },
  { id: 'subs', label: 'Subs' },
  { id: 'pasta', label: 'Pasta' },
  { id: 'salads', label: 'Salads' },
  { id: 'sides', label: 'Sides' },
  { id: 'drinks', label: 'Drinks' }
];

const menuItems = [
  { id: 'famous-cheese', photo: 'assets/pizza-best.jpg', category: 'pizza', name: 'Famous Cheese Pie', description: 'Classic red sauce, whole milk mozzarella, crisp edge, and a balanced fold.', basePrice: 17.95, sizes: ['Small', 'Large', 'Sicilian'], toppings: ['Pepperoni', 'Mushrooms', 'Onions', 'Basil', 'Extra cheese'] },
  { id: 'pepperoni-glow', photo: 'assets/deal-cinco.jpg', category: 'pizza', name: 'Pepperoni Glow', description: 'Cupped pepperoni, extra cheese pull, tomato finish, and a little heat.', basePrice: 21.5, sizes: ['Small', 'Large'], toppings: ['Hot honey', 'Jalapenos', 'Garlic', 'Extra pepperoni'] },
  { id: 'garden-luxe', photo: 'assets/food-spread.jpg', category: 'pizza', name: 'Garden Luxe', description: 'Peppers, mushrooms, onions, olives, basil, and bright tomato sauce.', basePrice: 22, sizes: ['Small', 'Large'], toppings: ['Spinach', 'Broccoli', 'Ricotta', 'Roasted garlic'] },
  { id: 'chicken-parm-hero', photo: 'assets/storefront-deal.jpg', category: 'subs', name: 'Chicken Parm Hero', description: 'Crispy chicken, marinara, melted mozzarella, toasted roll.', basePrice: 11.5, sizes: ['Regular', 'Large'], toppings: ['Extra mozzarella', 'Peppers', 'Onions'] },
  { id: 'italian-hero', photo: 'assets/food-spread.jpg', category: 'subs', name: 'Famous Italian Hero', description: 'Layered deli meats, provolone, lettuce, tomato, oil, and vinegar.', basePrice: 10.95, sizes: ['Regular', 'Large'], toppings: ['Hot peppers', 'Mayo', 'Extra provolone'] },
  { id: 'baked-ziti', photo: 'assets/deal-cinco.jpg', category: 'pasta', name: 'Baked Ziti', description: 'Ricotta, marinara, mozzarella cap, and oven-baked edges.', basePrice: 13.95, sizes: ['Tray'], toppings: ['Meatballs', 'Sausage', 'Extra ricotta'] },
  { id: 'caesar', photo: 'assets/food-spread.jpg', category: 'salads', name: 'Crisp Caesar', description: 'Romaine, parmesan, croutons, Caesar dressing, optional grilled chicken.', basePrice: 9.95, sizes: ['Regular'], toppings: ['Grilled chicken', 'Extra parmesan'] },
  { id: 'garlic-knots', photo: 'assets/deal-cinco.jpg', category: 'sides', name: 'Garlic Knots', description: 'Warm knots, garlic oil, parsley, and marinara for dipping.', basePrice: 5.95, sizes: ['6 pack', '12 pack'], toppings: ['Extra sauce', 'Parmesan'] },
  { id: 'soda', photo: 'assets/food-spread.jpg', category: 'drinks', name: 'Cold Soda', description: 'A cold finish for the full pizza order.', basePrice: 2.75, sizes: ['Can', '2 liter'], toppings: [] }
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
      <div class="food-art" style="background-image:url('${item.photo}')" aria-hidden="true"></div>
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

  function draw() {
    context.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    const displayWidth = canvas.offsetWidth;
    const displayHeight = canvas.offsetHeight;
    const pulse = reduceMotion ? 0 : Math.sin(frame / 70) * 8;
    context.save();
    context.translate(0, pulse * .4);
    context.fillStyle = 'rgba(217,164,65,.08)';
    for (let i = 0; i < 7; i += 1) {
      context.beginPath();
      context.arc(displayWidth * (.58 + i * .06), displayHeight * (.24 + (i % 3) * .18), 80 + i * 18, 0, Math.PI * 2);
      context.fill();
    }
    context.restore();
    frame += 1;
    if (!reduceMotion) requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', resize);
}

startHeroScene();
