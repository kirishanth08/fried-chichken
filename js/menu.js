/**
 * CRISPSTER — MENU PAGE INTERACTION (menu.js)
 * Filtering, Search, Dynamic Category Count, Interactive "Build Your Own Bucket"
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initMenuFiltering();
    initBuildYourOwnBucket();
  });

  // --------------------------------------------------------------------------
  // 1. Menu Category Filtering & Live Search
  // --------------------------------------------------------------------------
  function initMenuFiltering() {
    const categoryBtns = document.querySelectorAll('.category-pill-btn');
    const menuCards = document.querySelectorAll('.menu-item-card');
    const searchInput = document.querySelector('.menu-search-input');
    const noResultsMsg = document.querySelector('.menu-no-results');

    let currentCategory = 'all';
    let searchQuery = '';

    // Dynamically calculate and render exact category item counts on filter pills
    function updateCategoryCounts() {
      categoryBtns.forEach(btn => {
        const filter = btn.getAttribute('data-filter') || 'all';
        const countSpan = btn.querySelector('.category-count');
        if (!countSpan) return;

        if (filter === 'all') {
          countSpan.textContent = menuCards.length;
        } else {
          let count = 0;
          menuCards.forEach(card => {
            const itemCat = card.getAttribute('data-category') || '';
            const cats = itemCat.split(/\s+/);
            if (cats.includes(filter)) {
              count++;
            }
          });
          countSpan.textContent = count;
        }
      });
    }

    updateCategoryCounts();

    function filterItems() {
      let visibleCount = 0;

      menuCards.forEach(card => {
        const itemCategory = card.getAttribute('data-category') || '';
        const cats = itemCategory.split(/\s+/);
        const itemName = (card.querySelector('.card-title')?.textContent || '').toLowerCase();
        const itemDesc = (card.querySelector('.card-desc')?.textContent || '').toLowerCase();

        const matchesCategory = currentCategory === 'all' || cats.includes(currentCategory);
        const matchesSearch = !searchQuery || itemName.includes(searchQuery) || itemDesc.includes(searchQuery);

        if (matchesCategory && matchesSearch) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (noResultsMsg) {
        noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    }

    // Category button clicks
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-filter') || 'all';
        filterItems();
      });
    });

    // Search input typing
    searchInput?.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      filterItems();
    });
  }

  // --------------------------------------------------------------------------
  // 2. Interactive "Build Your Own Bucket" Calculator
  // --------------------------------------------------------------------------
  function initBuildYourOwnBucket() {
    const byobContainer = document.querySelector('.byob-container');
    if (!byobContainer) return;

    let selectedSize = { name: '12-Piece Crunch Bucket', price: 23.99 };
    let selectedCoating = 'Signature Herb Crunch';
    let selectedSauces = ['Smoky Ghost Mayo', 'Honey Mustard Gold'];
    let selectedSide = 'Large Seasoned Fries (+$2.50)';
    let sideExtraPrice = 2.50;

    const sizeOptions = byobContainer.querySelectorAll('.byob-size-opt');
    const coatingOptions = byobContainer.querySelectorAll('.byob-coating-opt');
    const sauceOptions = byobContainer.querySelectorAll('.byob-sauce-opt');
    const sideOptions = byobContainer.querySelectorAll('.byob-side-opt');

    const summaryText = byobContainer.querySelector('.byob-summary-text-val');
    const summaryPrice = byobContainer.querySelector('.byob-summary-price');
    const addCustomBucketBtn = byobContainer.querySelector('.btn-add-custom-bucket');

    function updateSummary() {
      const totalPrice = selectedSize.price + sideExtraPrice;
      if (summaryPrice) {
        summaryPrice.textContent = `$${totalPrice.toFixed(2)}`;
      }
      if (summaryText) {
        summaryText.innerHTML = `
          <strong>${selectedSize.name}</strong> • ${selectedCoating} <br>
          <span style="font-size: 0.88rem; color: var(--text-muted);">
            Sauces: ${selectedSauces.join(', ') || 'None'} | Side: ${selectedSide}
          </span>
        `;
      }
    }

    // Size selection
    sizeOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        sizeOptions.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        selectedSize.name = opt.dataset.name;
        selectedSize.price = parseFloat(opt.dataset.price);
        updateSummary();
      });
    });

    // Coating selection
    coatingOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        coatingOptions.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        selectedCoating = opt.dataset.name;
        updateSummary();
      });
    });

    // Sauce multi-selection (up to 3)
    sauceOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        const sauceName = opt.dataset.name;
        if (opt.classList.contains('selected')) {
          if (selectedSauces.length > 1) {
            opt.classList.remove('selected');
            selectedSauces = selectedSauces.filter(s => s !== sauceName);
          } else {
            window.showToast?.('Dip Selection', 'Please keep at least 1 dipping sauce.', 'fa-solid fa-bell');
          }
        } else {
          if (selectedSauces.length < 3) {
            opt.classList.add('selected');
            selectedSauces.push(sauceName);
          } else {
            window.showToast?.('Sauce Limit', 'Max 3 complimentary dips included! Extra dips can be added from the menu.', 'fa-solid fa-bell');
          }
        }
        updateSummary();
      });
    });

    // Side selection
    sideOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        sideOptions.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        selectedSide = opt.dataset.name;
        sideExtraPrice = parseFloat(opt.dataset.priceExtra || 0);
        updateSummary();
      });
    });

    // Add Custom Bucket to Bag
    addCustomBucketBtn?.addEventListener('click', () => {
      const totalPrice = selectedSize.price + sideExtraPrice;
      const customTitle = `Custom ${selectedSize.name} (${selectedCoating})`;
      window.addToCart?.(
        'custom-bucket-' + Date.now(),
        customTitle,
        totalPrice,
        'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=300&q=80'
      );
    });

    updateSummary();
  }

})();

