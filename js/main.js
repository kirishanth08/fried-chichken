/**
 * CRISPSTER — PREMIUM FRIED CHICKEN TAKEAWAY
 * Core JavaScript: Theme, Direction, Navigation, Cart Drawer, Demo Checkout, Toasts
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Global State & Storage Keys
  // --------------------------------------------------------------------------
  const STORAGE_THEME = 'crispster_theme';
  const STORAGE_DIR = 'crispster_dir';
  const STORAGE_CART = 'crispster_cart';

  let cart = [];
  try {
    const savedCart = localStorage.getItem(STORAGE_CART);
    if (savedCart) {
      cart = JSON.parse(savedCart);
    }
  } catch (e) {
    cart = [];
  }

  // --------------------------------------------------------------------------
  // 2. Dark / Light Theme System
  // --------------------------------------------------------------------------
  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_THEME);
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    applyTheme(initialTheme);

    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    themeToggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
      });
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_THEME, theme);

    // Ensure brand logo maintains uniform colors and fonts across all modes
    const dynamicLogos = document.querySelectorAll('.brand-logo-img, .drawer-logo-img, .footer-logo-img');
    dynamicLogos.forEach(logo => {
      logo.src = 'images/logo.svg';
    });

    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    themeToggleBtns.forEach(btn => {
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'fa-solid fa-sun';
          btn.style.color = '#FFD400';
        } else {
          icon.className = 'fa-solid fa-moon';
          btn.style.color = '';
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. RTL / LTR Direction Switching
  // --------------------------------------------------------------------------
  function initDirection() {
    const savedDir = localStorage.getItem(STORAGE_DIR) || 'ltr';
    applyDirection(savedDir);

    const dirToggleBtns = document.querySelectorAll('.direction-toggle-btn');
    dirToggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        applyDirection(newDir);
        showToast(
          newDir === 'rtl' ? 'RTL Layout Activated' : 'LTR Layout Activated',
          `Switched reading direction to ${newDir.toUpperCase()}.`,
          'fa-solid fa-language'
        );
      });
    });
  }

  function applyDirection(dir) {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
    localStorage.setItem(STORAGE_DIR, dir);

    const dirToggleBtns = document.querySelectorAll('.direction-toggle-btn');
    dirToggleBtns.forEach(btn => {
      btn.setAttribute('aria-label', `Switch to ${dir === 'rtl' ? 'LTR' : 'RTL'} direction`);
      btn.innerHTML = dir === 'rtl' 
        ? '<span style="font-weight: 800; font-size: 0.8rem;">LTR</span>' 
        : '<span style="font-weight: 800; font-size: 0.8rem;">RTL</span>';
    });
  }

  // --------------------------------------------------------------------------
  // 4. Header & Mobile Menu
  // --------------------------------------------------------------------------
  function initNavbar() {
    const header = document.querySelector('.site-header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const drawerCloseBtn = document.querySelector('.drawer-close-btn');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const mobileOverlay = document.querySelector('.mobile-drawer-overlay');

    // Sticky shadow effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    });

    // Mobile menu open
    mobileMenuBtn?.addEventListener('click', () => {
      mobileDrawer?.classList.add('open');
      mobileOverlay?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    // Mobile menu close
    function closeMobileMenu() {
      mobileDrawer?.classList.remove('open');
      mobileOverlay?.classList.remove('active');
      document.body.style.overflow = '';
    }

    drawerCloseBtn?.addEventListener('click', closeMobileMenu);
    mobileOverlay?.addEventListener('click', closeMobileMenu);
  }

  // --------------------------------------------------------------------------
  // 5. Back to Top Button
  // --------------------------------------------------------------------------
  function initBackToTop() {
    const bttBtn = document.querySelector('.back-to-top');
    if (!bttBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        bttBtn.classList.add('visible');
      } else {
        bttBtn.classList.remove('visible');
      }
    });

    bttBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --------------------------------------------------------------------------
  // 6. Toast Notification Helper
  // --------------------------------------------------------------------------
  window.showToast = function (title, message, iconClass = 'fa-solid fa-fire') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon"><i class="${iconClass}"></i></div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
    `;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Remove after 3.5 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3500);
  };

  // --------------------------------------------------------------------------
  // 7. Interactive Takeaway Bag (Cart Drawer & Demo Checkout)
  // --------------------------------------------------------------------------
  function saveCart() {
    try {
      localStorage.setItem(STORAGE_CART, JSON.stringify(cart));
    } catch (e) {
      // storage quota or disabled
    }
    updateCartUI();
  }

  function updateCartUI() {
    const countBadges = document.querySelectorAll('.cart-count-badge');
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

    countBadges.forEach(badge => {
      badge.textContent = totalQty;
      badge.style.display = totalQty > 0 ? 'inline-flex' : 'none';
    });

    const itemsContainer = document.querySelector('.cart-items-container');
    const subtotalEl = document.querySelector('.cart-subtotal-val');
    const totalEl = document.querySelector('.total-amount');

    if (!itemsContainer) return;

    if (cart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <i class="fa-solid fa-drumstick-bite"></i>
          <h4>Your bag is feeling crispy light!</h4>
          <p>Add some hot fried chicken, wings, or combos to start your takeaway order.</p>
          <a href="menu.html" class="btn btn-primary btn-sm" style="margin-top: 0.5rem;">Browse Menu</a>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = '$0.00';
      if (totalEl) totalEl.textContent = '$0.00';
      return;
    }

    let subtotal = 0;
    itemsContainer.innerHTML = cart.map((item, index) => {
      const itemSub = item.price * item.qty;
      subtotal += itemSub;
      return `
        <div class="cart-item-row" data-index="${index}">
          <img src="${item.img}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=150&q=80'">
          <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            <div class="cart-item-controls">
              <button type="button" class="cart-qty-btn btn-cart-dec" data-index="${index}" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button>
              <span class="cart-qty-val">${item.qty}</span>
              <button type="button" class="cart-qty-btn btn-cart-inc" data-index="${index}" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button>
            </div>
          </div>
          <button type="button" class="cart-item-remove btn-cart-remove" data-index="${index}" aria-label="Remove item">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `;
    }).join('');

    // Apply promo if active
    const discount = window.activeDiscountPercent ? (subtotal * (window.activeDiscountPercent / 100)) : 0;
    const finalTotal = Math.max(0, subtotal - discount);

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${finalTotal.toFixed(2)}`;
  }

  window.addToCart = function (id, name, price, img) {
    const existingIndex = cart.findIndex(item => item.id === id);
    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({
        id: id || Date.now().toString(),
        name: name || 'Crispster Favorite',
        price: parseFloat(price) || 9.99,
        img: img || 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=300&q=80',
        qty: 1
      });
    }
    saveCart();
    showToast('Added to Takeaway Bag!', `${name} is ready in your bag.`, 'fa-solid fa-bag-shopping');
  };

  function initCartDrawer() {
    const cartToggleBtns = document.querySelectorAll('.cart-toggle-btn, .open-cart-trigger');
    const cartDrawer = document.querySelector('.cart-drawer');
    const cartBackdrop = document.querySelector('.cart-drawer-backdrop');
    const cartCloseBtn = document.querySelector('.cart-drawer-close');
    const itemsContainer = document.querySelector('.cart-items-container');

    function openCart() {
      cartDrawer?.classList.add('open');
      cartBackdrop?.classList.add('active');
      document.body.style.overflow = 'hidden';
      updateCartUI();
    }

    function closeCart() {
      cartDrawer?.classList.remove('open');
      cartBackdrop?.classList.remove('active');
      document.body.style.overflow = '';
    }

    cartToggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openCart();
      });
    });

    cartCloseBtn?.addEventListener('click', closeCart);
    cartBackdrop?.addEventListener('click', closeCart);

    // Quantity buttons & deletion event delegation
    itemsContainer?.addEventListener('click', (e) => {
      const incBtn = e.target.closest('.btn-cart-inc');
      const decBtn = e.target.closest('.btn-cart-dec');
      const removeBtn = e.target.closest('.btn-cart-remove');

      if (incBtn) {
        const index = parseInt(incBtn.dataset.index, 10);
        if (cart[index]) {
          cart[index].qty += 1;
          saveCart();
        }
      } else if (decBtn) {
        const index = parseInt(decBtn.dataset.index, 10);
        if (cart[index]) {
          cart[index].qty -= 1;
          if (cart[index].qty <= 0) {
            cart.splice(index, 1);
          }
          saveCart();
        }
      } else if (removeBtn) {
        const index = parseInt(removeBtn.dataset.index, 10);
        if (cart[index]) {
          const removedName = cart[index].name;
          cart.splice(index, 1);
          saveCart();
          showToast('Item Removed', `${removedName} removed from bag.`, 'fa-solid fa-trash');
        }
      }
    });

    // Global Add to Cart click delegation for elements with data-action="add-to-cart"
    document.addEventListener('click', (e) => {
      const addBtn = e.target.closest('[data-action="add-to-cart"]');
      if (addBtn) {
        e.preventDefault();
        const id = addBtn.dataset.id;
        const name = addBtn.dataset.name;
        const price = addBtn.dataset.price;
        const img = addBtn.dataset.img;
        window.addToCart(id, name, price, img);
      }
    });

    // Promo code input
    const promoForm = document.querySelector('.cart-promo-box');
    promoForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = promoForm.querySelector('.cart-promo-input');
      const code = input?.value.trim().toUpperCase();

      if (!code) return;

      if (code === 'CRISP50') {
        window.activeDiscountPercent = 50;
        showToast('50% Off Applied!', 'Code CRISP50 gave you 50% discount!', 'fa-solid fa-tag');
        updateCartUI();
      } else if (code === 'FEAST20') {
        window.activeDiscountPercent = 20;
        showToast('20% Off Applied!', 'Code FEAST20 applied successfully!', 'fa-solid fa-tag');
        updateCartUI();
      } else if (code === 'CRUNCH10') {
        window.activeDiscountPercent = 10;
        showToast('10% Off Applied!', 'Code CRUNCH10 applied!', 'fa-solid fa-tag');
        updateCartUI();
      } else {
        showToast('Invalid Promo Code', 'Try CRISP50 or FEAST20 for instant discounts!', 'fa-solid fa-circle-exclamation');
      }
    });

    // Demo Checkout Trigger
    const checkoutBtn = document.querySelector('.cart-checkout-btn');
    checkoutBtn?.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Your Bag is Empty', 'Please add delicious fried chicken first!', 'fa-solid fa-circle-info');
        return;
      }
      closeCart();
      triggerDemoCheckoutModal();
    });
  }

  // --------------------------------------------------------------------------
  // 8. Demo Checkout Confirmation Modal
  // --------------------------------------------------------------------------
  function triggerDemoCheckoutModal() {
    let overlay = document.querySelector('.demo-modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'demo-modal-overlay';
      document.body.appendChild(overlay);
    }

    const orderNumber = 'CRISP-' + Math.floor(100000 + Math.random() * 900000);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const discount = window.activeDiscountPercent ? (subtotal * (window.activeDiscountPercent / 100)) : 0;
    const finalTotal = Math.max(0, subtotal - discount);

    overlay.innerHTML = `
      <div class="demo-modal">
        <div class="modal-icon-badge">
          <i class="fa-solid fa-check"></i>
        </div>
        <h3 class="modal-title">Hot & Fresh Order Placed!</h3>
        <p class="modal-desc">
          <strong>Order #${orderNumber}</strong> has been transmitted to our kitchen fryers! Your hot and crunchy meal will be ready for pickup shortly.
        </p>
        <div class="modal-receipt-box">
          <div class="receipt-row">
            <span>Estimated Pickup Time:</span>
            <strong>12-15 Minutes</strong>
          </div>
          <div class="receipt-row">
            <span>Pickup Counter:</span>
            <strong>Downtown Express Hub</strong>
          </div>
          <div class="receipt-row">
            <span>Items Ordered:</span>
            <span>${cart.reduce((s, i) => s + i.qty, 0)} items</span>
          </div>
          <div class="receipt-row total">
            <span>Total Paid:</span>
            <span>$${finalTotal.toFixed(2)}</span>
          </div>
        </div>
        <button type="button" class="btn btn-hot close-demo-modal-btn" style="width: 100%;">Got It, Thanks!</button>
      </div>
    `;

    overlay.classList.add('active');

    const closeBtn = overlay.querySelector('.close-demo-modal-btn');
    closeBtn?.addEventListener('click', () => {
      overlay.classList.remove('active');
      // Reset cart for clean experience
      cart = [];
      window.activeDiscountPercent = 0;
      saveCart();
      showToast('Order Placed Successfully', 'Thank you for ordering with Crispster!', 'fa-solid fa-check');
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 9. Intersection Observer for Scroll Reveals
  // --------------------------------------------------------------------------
  function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!revealElements.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(el => observer.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add('revealed'));
    }
  }

  // --------------------------------------------------------------------------
  // 10. Global Form Input Restrictions & Validation (Name: letters only, Phone: numbers only)
  // --------------------------------------------------------------------------
  function initGlobalFormValidation() {
    // 1. All Name Inputs (Letters, spaces, hyphens, apostrophes only)
    const nameSelectors = [
      'input#checkout-name',
      'input#contact-name',
      'input#commentAuthorInput',
      'input[name="name"]',
      'input[name="fullname"]',
      'input[data-type="name"]',
      '.name-input'
    ].join(',');

    const nameInputs = document.querySelectorAll(nameSelectors);
    nameInputs.forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Home', 'End'].includes(e.key)) return;
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        if (!/^[a-zA-Z\s'-]$/.test(e.key)) {
          e.preventDefault();
        }
      });

      input.addEventListener('input', () => {
        const cleaned = input.value.replace(/[^a-zA-Z\s'-]/g, '');
        if (input.value !== cleaned) {
          input.value = cleaned;
        }
      });

      input.addEventListener('paste', (e) => {
        e.preventDefault();
        const text = (e.clipboardData || window.clipboardData)?.getData('text') || '';
        const cleaned = text.replace(/[^a-zA-Z\s'-]/g, '');
        document.execCommand('insertText', false, cleaned);
      });
    });

    // 2. All Phone Inputs (Digits 0-9 only)
    const phoneSelectors = [
      'input[type="tel"]',
      'input#checkout-phone',
      'input#contact-phone',
      'input[name="phone"]',
      'input[name="mobile"]',
      'input[data-type="phone"]',
      '.phone-input'
    ].join(',');

    const phoneInputs = document.querySelectorAll(phoneSelectors);
    phoneInputs.forEach(input => {
      input.setAttribute('inputmode', 'numeric');

      input.addEventListener('keydown', (e) => {
        if (['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Home', 'End'].includes(e.key)) return;
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        if (!/^[0-9]$/.test(e.key)) {
          e.preventDefault();
        }
      });

      input.addEventListener('input', () => {
        const cleaned = input.value.replace(/\D/g, '');
        if (input.value !== cleaned) {
          input.value = cleaned;
        }
      });

      input.addEventListener('paste', (e) => {
        e.preventDefault();
        const text = (e.clipboardData || window.clipboardData)?.getData('text') || '';
        const cleaned = text.replace(/\D/g, '');
        document.execCommand('insertText', false, cleaned);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 11. Bootstrap Everything on DOM Ready
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initDirection();
    initNavbar();
    initBackToTop();
    initCartDrawer();
    initScrollReveals();
    initGlobalFormValidation();
    updateCartUI();
  });

})();

