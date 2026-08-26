// LocalStorage Central Engine
let cart = JSON.parse(localStorage.getItem('omni_cart')) || [];

function saveCart() {
  localStorage.setItem('omni_cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(title, price, icon = 'fa-box') {
  cart.push({ id: Date.now() + Math.random(), title, price, icon });
  saveCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
}

function updateCartUI() {
  const cartCountEl = document.getElementById('cartCount');
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartTotalEl = document.getElementById('cartTotal');

  if (cartCountEl) cartCountEl.textContent = cart.length;

  if (cartTotalEl) {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalEl.textContent = '₦' + total.toLocaleString();
  }

  if (cartItemsContainer) {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="text-xs text-gray-400 text-center py-10">Your shopping cart is empty.</p>';
    } else {
      cartItemsContainer.innerHTML = cart.map(item => `
        <div class="flex justify-between items-center bg-gray-50 p-2.5 rounded border text-xs">
          <div>
            <p class="font-semibold text-slate-800 line-clamp-1">${item.title}</p>
            <p class="text-gray-500 font-bold mt-0.5">₦${item.price.toLocaleString()}</p>
          </div>
          <button onclick="removeFromCart(${item.id})" class="text-red-400 hover:text-red-600 p-1">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `).join('');
    }
  }
}

// Drawer Toggles
const cartBtn = document.getElementById('cartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');

function openCart() {
  if (cartDrawer && cartOverlay) {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
  }
}

function closeCart() {
  if (cartDrawer && cartOverlay) {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
  }
}

if (cartBtn) cartBtn.addEventListener('click', openCart);
if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

// Initial Load
updateCartUI();
