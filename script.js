const categories = [
  { id: 'pan', label: 'Personal Pan' },
  { id: 'specialty', label: 'Specialty Pies' },
  { id: 'large', label: '16\" Large Pan' },
  { id: 'apps', label: 'Appetizers' },
  { id: 'drinks', label: 'Beverages' }
];

const menuItems = [
  { id: '10-plain-pan-pizza', photo: 'assets/pizza-best.jpg', category: 'pan', name: '10\" Plain Pan Pizza', description: 'Shredded cheese. Add toppings for an additional charge.', basePrice: 9.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'], popular: true },
  { id: 'green-pepper-pizza', photo: 'assets/deal-cinco.jpg', category: 'pan', name: 'Green Pepper Pizza', description: 'Freshly sliced green peppers.', basePrice: 10.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'], popular: true },
  { id: 'hot-pepper-pineapple-pizza', photo: 'assets/storefront-deal.jpg', category: 'pan', name: 'Hot Pepper & Pineapple Pizza', description: 'Freshly sliced hot peppers & pineapple.', basePrice: 11.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'], popular: true },
  { id: 'mushroom-pizza', photo: 'assets/pizza-best.jpg', category: 'pan', name: 'Mushroom Pizza', description: 'Freshly sliced mushrooms.', basePrice: 9.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'cauliflower-pizza', photo: 'assets/deal-cinco.jpg', category: 'pan', name: 'Cauliflower Pizza', description: 'Freshly chopped cauliflower.', basePrice: 9.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'pepperoni-pizza', photo: 'assets/storefront-deal.jpg', category: 'pan', name: 'Pepperoni Pizza', description: 'Sliced pepperoni.', basePrice: 10.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'bacon-pizza', photo: 'assets/pizza-best.jpg', category: 'pan', name: 'Bacon Pizza', description: 'Strips of smoked bacon.', basePrice: 10.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'grilled-chicken-pizza', photo: 'assets/deal-cinco.jpg', category: 'pan', name: 'Grilled Chicken Pizza', description: 'Fresh-grilled chicken made with 100% Halal chicken', basePrice: 10.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'hot-pepper-pizza', photo: 'assets/storefront-deal.jpg', category: 'pan', name: 'Hot Pepper Pizza', description: 'Fresh jalapenos.', basePrice: 9.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'], popular: true },
  { id: 'hot-pepper-onion-pizza', photo: 'assets/pizza-best.jpg', category: 'pan', name: 'Hot Pepper & Onion Pizza', description: 'Freshly sliced hot peppers & onions.', basePrice: 10.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'], popular: true },
  { id: 'broccoli-pizza', photo: 'assets/deal-cinco.jpg', category: 'pan', name: 'Broccoli Pizza', description: 'Freshly chopped broccoli.', basePrice: 9.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'pineapple-pizza', photo: 'assets/storefront-deal.jpg', category: 'pan', name: 'Pineapple Pizza', description: 'Freshly diced pineapple.', basePrice: 9.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'black-olive-pizza', photo: 'assets/pizza-best.jpg', category: 'pan', name: 'Black Olive Pizza', description: 'Freshly sliced black olive.', basePrice: 9.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'sausage-pizza', photo: 'assets/deal-cinco.jpg', category: 'pan', name: 'Sausage Pizza', description: 'Sweet Italian sausage.', basePrice: 10.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'white-pizza', photo: 'assets/storefront-deal.jpg', category: 'pan', name: 'White Pizza', description: 'Ricotta & shredded cheese.', basePrice: 10.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'hamburger-pizza', photo: 'assets/pizza-best.jpg', category: 'pan', name: 'Hamburger Pizza', description: 'Freshly chopped hamburger.', basePrice: 10.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'onion-pizza', photo: 'assets/deal-cinco.jpg', category: 'pan', name: 'Onion Pizza', description: 'Freshly sliced onions.', basePrice: 9.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'onion-pepper-pizza', photo: 'assets/storefront-deal.jpg', category: 'pan', name: 'Onion & Pepper Pizza', description: 'Freshly sliced onions & green peppers.', basePrice: 10.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'spinach-pizza', photo: 'assets/pizza-best.jpg', category: 'pan', name: 'Spinach Pizza', description: 'Freshly chopped spinach.', basePrice: 9.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'garlic-pizza', photo: 'assets/deal-cinco.jpg', category: 'pan', name: 'Garlic Pizza', description: 'Freshly chopped garlic.', basePrice: 9.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'tomato-pizza', photo: 'assets/storefront-deal.jpg', category: 'pan', name: 'Tomato Pizza', description: 'Freshly sliced tomato.', basePrice: 9.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'ham-pizza', photo: 'assets/pizza-best.jpg', category: 'pan', name: 'Ham Pizza', description: 'Freshly sliced ham.', basePrice: 10.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'hawaiian-pizza', photo: 'assets/deal-cinco.jpg', category: 'pan', name: 'Hawaiian Pizza', description: 'Freshly sliced ham & pineapple.', basePrice: 11.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'chicken-tikka-masala-pizza', photo: 'assets/storefront-deal.jpg', category: 'pan', name: 'Chicken Tikka Masala Pizza', description: 'Topped with our masala seasoning made with 100% Halal Chicken.', basePrice: 12.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'paneer-tikka-masala-pizza', photo: 'assets/pizza-best.jpg', category: 'pan', name: 'Paneer Tikka Masala Pizza', description: 'Topped with our masala seasoning, cubes of paneer, and shredded cheese. (Vegetarian)', basePrice: 12.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'buffalo-chicken-bacon-ranch-pizza', photo: 'assets/deal-cinco.jpg', category: 'pan', name: 'Buffalo Chicken Bacon Ranch Pizza', description: 'Topped with spicy buffalo chicken, chopped smoky bacon, shredded cheese and finished with ranch dressing.', basePrice: 13.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: '10-plain-cauliflower-crust', photo: 'assets/storefront-deal.jpg', category: 'pan', name: '10\'\' Plain Cauliflower Crust', description: 'Gluten free option.', basePrice: 16.00, sizes: ['One size'], toppings: [] },
  { id: 'guallpa-s-veggie-special-pizza', photo: 'assets/food-spread.jpg', category: 'specialty', name: 'Guallpa\'s Veggie Special Pizza', description: 'Fresh spinach, broccoli, black olives, onions, mushrooms, green peppers & shredded cheese.', basePrice: 12.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'], popular: true },
  { id: 'guallpa-s-famous-special-pizza', photo: 'assets/pizza-best.jpg', category: 'specialty', name: 'Guallpa\'s Famous Special Pizza', description: 'pepperoni, sausage, mushrooms, black olives, onions, green peppers & shredded cheese.', basePrice: 13.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'guallpa-s-meat-lovers-special-pizza', photo: 'assets/food-spread.jpg', category: 'specialty', name: 'Guallpa\'s Meat Lovers Special Pizza', description: 'Pepperoni, sausage, bacon, ham & shredded cheese.', basePrice: 14.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'buffalo-chicken-pizza', photo: 'assets/pizza-best.jpg', category: 'specialty', name: 'Buffalo Chicken Pizza', description: 'Grilled chicken & Buffalo sauce made 100% halal chicken.', basePrice: 12.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'bbq-chicken-pizza', photo: 'assets/food-spread.jpg', category: 'specialty', name: 'BBQ Chicken Pizza', description: 'Grilled chicken & BBQ sauce made with 100% halal chicken.', basePrice: 12.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: '16-plain-pan-pizza', photo: 'assets/food-spread.jpg', category: 'large', name: '16\" Plain Pan Pizza', description: 'Shredded cheese.', basePrice: 21.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: '16-guallpa-s-famous-special-pizza', photo: 'assets/storefront-deal.jpg', category: 'large', name: '16\" Guallpa\'s Famous Special Pizza', description: 'Beef, pepperoni, sausage, mushrooms, black olives, onions, green peppers & shredded cheese.', basePrice: 26.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: '16-guallpa-s-veggie-special', photo: 'assets/food-spread.jpg', category: 'large', name: '16\" Guallpa\'s Veggie Special', description: 'Fresh spinach, broccoli, black olives, onions, mushrooms, green peppers & shredded cheese.', basePrice: 25.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'buffalo-wings', photo: 'assets/deal-cinco.jpg', category: 'apps', name: 'Buffalo Wings', description: 'Cooked wing of a chicken coated in sauce or seasoning.', basePrice: 10.75, sizes: ['One size'], toppings: [] },
  { id: 'bbq-wings', photo: 'assets/food-spread.jpg', category: 'apps', name: 'BBQ Wings', description: 'Cooked wing of a chicken coated in sauce or seasoning.', basePrice: 10.75, sizes: ['One size'], toppings: [] },
  { id: 'french-fries', photo: 'assets/deal-cinco.jpg', category: 'apps', name: 'French Fries', description: 'Cooked in oil.', basePrice: 5.75, sizes: ['One size'], toppings: [] },
  { id: 'soda-cans', photo: 'assets/food-spread.jpg', category: 'drinks', name: 'Soda Cans', description: 'Ice cold.', basePrice: 2.50, sizes: ['One size'], toppings: [] },
  { id: '2-liter-soda', photo: 'assets/food-spread.jpg', category: 'drinks', name: '2 Liter Soda', description: 'Ice cold.', basePrice: 6.50, sizes: ['One size'], toppings: [] }
];

const state = {
  category: 'pan',
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
  return item.basePrice + item.selectedToppings.length * 1.00;
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
    <div class="total-row"><span>NJ sales tax</span><strong>${money.format(currentTotals.tax)}</strong></div>
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

const ORDER_INBOX = 'https://formsubmit.co/ajax/johntaco11@gmail.com';
const LIVE_HOSTS = ['github.io', 'joe-miz.com'];

function orderSummaryText() {
  const t = totals();
  const lines = state.cart.map((item) => {
    const extras = item.toppings.length ? ` + ${item.toppings.join(', ')}` : '';
    const notes = item.notes ? ` (${item.notes})` : '';
    return `${item.quantity}x ${item.name}${extras}${notes} — ${money.format(item.unitPrice * item.quantity)}`;
  });
  lines.push(`Subtotal ${money.format(t.subtotal)} | Tax ${money.format(t.tax)} | Total ${money.format(t.total)}`);
  return lines.join('\n');
}

async function submitOrder(payload) {
  const isLive = LIVE_HOSTS.some((h) => window.location.hostname.endsWith(h));
  if (!isLive) return { delivered: false };
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 4000);
  try {
    const resp = await fetch(ORDER_INBOX, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    return { delivered: resp.ok };
  } catch (err) {
    return { delivered: false };
  } finally {
    window.clearTimeout(timer);
  }
}

checkoutForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(checkoutForm);
  const name = String(data.get('customerName') || '').trim();
  const phone = String(data.get('phone') || '').trim();
  const address = String(data.get('address') || '').trim();
  if (!state.cart.length) {
    formError.textContent = 'Add an item before placing your order.';
    return;
  }
  if (!name || !phone) {
    formError.textContent = 'Add your name and phone to place the order.';
    return;
  }
  if (state.orderType === 'delivery' && !address) {
    formError.textContent = 'Add a delivery address so we know where the pies go.';
    return;
  }
  formError.textContent = '';
  const placeButton = checkoutForm.querySelector('[data-place-order]');
  if (placeButton) {
    placeButton.disabled = true;
    placeButton.textContent = 'Placing order…';
  }
  const confirmation = `GFP-${Math.floor(1000 + Math.random() * 9000)}`;
  const scheduledTime = data.get('scheduledTime');
  await submitOrder({
    _subject: `New order ${confirmation} — G's Famous Pizza site`,
    order: confirmation,
    type: state.orderType,
    name,
    phone,
    address: state.orderType === 'delivery' ? address : 'pickup',
    time: scheduledTime,
    items: orderSummaryText()
  });
  checkoutForm.innerHTML = `
    <div class="confirmation">
      <p class="eyebrow">Order confirmed</p>
      <h2>Order received</h2>
      <p>Thanks ${name.split(' ')[0]} — your order number is <strong>${confirmation}</strong>. Estimated ${state.orderType === 'pickup' ? 'pickup' : 'delivery'} time: ${scheduledTime}.</p>
      <p>Questions about your order? Call the shop at <a href="tel:+17323215005"><strong>(732) 321-5005</strong></a>.</p>
      <a class="button primary" href="https://www.instagram.com/guallpasfamouspizza/" target="_blank" rel="noopener">Follow on Instagram</a>
    </div>
  `;
  showToast(`Order ${confirmation} received`);
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
