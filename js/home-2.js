/**
 * CRISPSTER — HOME 2 (LATE-NIGHT FLAME & SIZZLE LAB)
 * Interactive Script for Custom Box Builder, Heat Selector, Soundboard, Roulette & Calculator
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeatSelector();
  initCustomBoxBuilder();
  initAsmrSoundboard();
  initSecretMenuNotes();
  initSauceMatrix();
  initWingRoulette();
  initSquadCalculator();
  initCurbsideTabs();
});

/* ==========================================================================
   1. HERO HEAT LEVEL SELECTOR
   ========================================================================== */
function initHeatSelector() {
  const heatData = {
    mild: {
      name: "Southern Mild Herb",
      shu: "250 SHU",
      desc: "Buttermilk marinated with 12 aromatic garden herbs and cracked tellicherry pepper. Smooth comfort crunch with zero burn.",
      barWidth: "15%",
      img: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
      badge: "Gentle Crunch",
      color: "#10B981"
    },
    chipotle: {
      name: "Smoked Honey Chipotle",
      shu: "2,500 SHU",
      desc: "Pure clover honey caramel glaze infused with oak-smoked chipotle chilis and sweet spanish paprika. Warming sweet heat.",
      barWidth: "40%",
      img: "images/home 2/chipotle.jpg",
      badge: "Sweet Smoke",
      color: "#FFD400"
    },
    nashville: {
      name: "Nashville Fire Storm",
      shu: "45,000 SHU",
      desc: "Traditional brown-sugar cayenne lard dip dusted with habanero dry rub. Authentic Music City deep heat that sizzles.",
      barWidth: "75%",
      img: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
      badge: "Blistering Heat",
      color: "#FF5F00"
    },
    ghost: {
      name: "Ghost Pepper Inferno",
      shu: "1,000,000 SHU",
      desc: "Triple-dredged chicken basted in fermented Bhut Jolokia ghost pepper oil. Endorphin-rushing scorch for true chili maniacs.",
      barWidth: "100%",
      img: "images/home 2/ghost.jpg",
      badge: "Extreme Danger",
      color: "#E11D48"
    }
  };

  const btns = document.querySelectorAll('.heat-btn');
  const nameEl = document.getElementById('hero-heat-name');
  const descEl = document.getElementById('hero-heat-desc');
  const barEl = document.getElementById('hero-heat-bar');
  const imgEl = document.getElementById('hero-heat-img');
  const badgeEl = document.getElementById('hero-heat-badge');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const level = btn.getAttribute('data-level');
      const data = heatData[level];
      if (!data) return;

      if (nameEl) nameEl.textContent = data.name;
      if (descEl) descEl.textContent = data.desc;
      if (barEl) {
        barEl.style.width = data.barWidth;
      }
      if (imgEl) {
        imgEl.style.opacity = '0';
        setTimeout(() => {
          imgEl.src = data.img;
          imgEl.style.opacity = '1';
        }, 150);
      }
      if (badgeEl) {
        badgeEl.textContent = `${data.badge} • ${data.shu}`;
        badgeEl.style.borderColor = data.color;
      }
    });
  });
}

/* ==========================================================================
   2. INTERACTIVE CRUNCH BOX BUILDER (LIVE CUSTOMIZER)
   ========================================================================== */
function initCustomBoxBuilder() {
  const form = document.getElementById('box-builder-form');
  if (!form) return;

  const basePrices = {
    tenders: { name: "4x Jumbo Tenders", price: 12.99, cals: 680 },
    bonein: { name: "3-Pc Thighs & Drumsticks", price: 13.99, cals: 790 },
    wings: { name: "8x Fiery Bone-In Wings", price: 14.49, cals: 840 },
    popcorn: { name: "Mega Popcorn Crunch Bucket", price: 11.99, cals: 620 }
  };

  const spices = {
    mild: { name: "Southern Herb Buttermilk", extra: 0 },
    chipotle: { name: "Honey Chipotle Glaze", extra: 0.50 },
    nashville: { name: "Nashville Fire Dredge", extra: 0.75 },
    ghost: { name: "Ghost Pepper Scorch", extra: 1.00 }
  };

  const sides = {
    fries: { name: "Cajun Crinkle Fries", extra: 0 },
    biscuit: { name: "Flaky Buttermilk Biscuit (2)", extra: 0.50 },
    mac: { name: "Loaded Cheddar Mac", extra: 1.50 },
    slaw: { name: "Apple Cider Slaw", extra: 0 }
  };

  function updateReceipt() {
    const selectedBase = form.querySelector('input[name="builder-base"]:checked')?.value || 'tenders';
    const selectedSpice = form.querySelector('input[name="builder-spice"]:checked')?.value || 'mild';
    const selectedSide = form.querySelector('input[name="builder-side"]:checked')?.value || 'fries';

    const selectedDips = Array.from(form.querySelectorAll('input[name="builder-dip"]:checked')).map(el => el.value);

    const baseData = basePrices[selectedBase];
    const spiceData = spices[selectedSpice];
    const sideData = sides[selectedSide];

    const totalPrice = baseData.price + spiceData.extra + sideData.extra;

    const receiptBase = document.getElementById('receipt-base-val');
    const receiptSpice = document.getElementById('receipt-spice-val');
    const receiptSide = document.getElementById('receipt-side-val');
    const receiptDips = document.getElementById('receipt-dips-val');
    const receiptTotal = document.getElementById('receipt-total-price');

    if (receiptBase) receiptBase.textContent = baseData.name;
    if (receiptSpice) receiptSpice.textContent = `${spiceData.name} ${spiceData.extra > 0 ? '(+$' + spiceData.extra.toFixed(2) + ')' : ''}`;
    if (receiptSide) receiptSide.textContent = `${sideData.name} ${sideData.extra > 0 ? '(+$' + sideData.extra.toFixed(2) + ')' : ''}`;
    if (receiptDips) receiptDips.textContent = selectedDips.length > 0 ? selectedDips.join(' + ') : 'None Selected';
    if (receiptTotal) receiptTotal.textContent = `$${totalPrice.toFixed(2)}`;

    // Store custom item data on the add button
    const addBtn = document.getElementById('btn-add-custom-box');
    if (addBtn) {
      addBtn.setAttribute('data-custom-name', `Custom Box (${baseData.name} / ${spiceData.name})`);
      addBtn.setAttribute('data-custom-price', totalPrice.toFixed(2));
    }
  }

  // Prevent more than 2 dips
  form.querySelectorAll('input[name="builder-dip"]').forEach(cb => {
    cb.addEventListener('change', () => {
      const checked = form.querySelectorAll('input[name="builder-dip"]:checked');
      if (checked.length > 2) {
        cb.checked = false;
        alert('Your Custom Box comes with 2 signature dips included! Uncheck one to switch.');
      }
      updateReceipt();
    });
  });

  form.addEventListener('change', updateReceipt);
  updateReceipt();

  // Add custom box to cart
  const addBtn = document.getElementById('btn-add-custom-box');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const name = addBtn.getAttribute('data-custom-name') || 'Custom Sizzle Box';
      const price = parseFloat(addBtn.getAttribute('data-custom-price') || '13.99');
      
      const customItem = {
        id: 'custom-box-' + Date.now(),
        name: name,
        price: price,
        qty: 1,
        img: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=300&q=80'
      };

      try {
        const cart = JSON.parse(localStorage.getItem('crispster_cart') || '[]');
        cart.push(customItem);
        localStorage.setItem('crispster_cart', JSON.stringify(cart));

        // Update badges
        const badges = document.querySelectorAll('.cart-count-badge');
        badges.forEach(b => {
          b.textContent = cart.length;
          b.style.display = 'inline-block';
        });

        const originalText = addBtn.innerHTML;
        addBtn.innerHTML = '<i class="fa-solid fa-check"></i> Added To Bag!';
        addBtn.style.background = '#10B981';
        setTimeout(() => {
          addBtn.innerHTML = originalText;
          addBtn.style.background = '';
        }, 1800);
      } catch (e) {
        console.error(e);
      }
    });
  }
}

/* ==========================================================================
   3. ASMR CRUNCH SOUNDBOARD (WEB AUDIO SYNTHESIS)
   Pure standalone client-side audio generation (no external mp3 files!)
   ========================================================================== */
function initAsmrSoundboard() {
  const cards = document.querySelectorAll('.soundboard-card');
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Synthesize realistic crunchy audio pulses
  function playCrunchSound(type) {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      if (type === 'sizzle') {
        // White noise through highpass & bandpass for 375F bubbling oil sizzle
        const bufferSize = ctx.sampleRate * 1.5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(2800, now);
        filter.Q.setValueAtTime(1.5, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.3, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(now);
      } else if (type === 'crunch') {
        // Low thump + high shatter noise for first bite
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.25);
        oscGain.gain.setValueAtTime(0.5, now);
        oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.connect(oscGain);
        oscGain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);

        // Crackle bursts
        for (let i = 0; i < 6; i++) {
          const t = now + (i * 0.03) + (Math.random() * 0.02);
          const cOsc = ctx.createOscillator();
          const cGain = ctx.createGain();
          cOsc.type = 'sawtooth';
          cOsc.frequency.setValueAtTime(800 + Math.random() * 1200, t);
          cGain.gain.setValueAtTime(0.2, t);
          cGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
          cOsc.connect(cGain);
          cGain.connect(ctx.destination);
          cOsc.start(t);
          cOsc.stop(t + 0.06);
        }
      } else if (type === 'drizzle') {
        // Sticky viscous drops
        for (let i = 0; i < 4; i++) {
          const t = now + i * 0.25;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(600, t);
          osc.frequency.exponentialRampToValueAtTime(1400, t + 0.12);
          gain.gain.setValueAtTime(0.25, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.15);
        }
      } else {
        // Dredge shake
        const bufferSize = ctx.sampleRate * 0.8;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.sin(i / 100);
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);
        noise.connect(gain);
        gain.connect(ctx.destination);
        noise.start(now);
      }
    } catch (e) {
      console.log('Web Audio context resumed on click');
    }
  }

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('playing'));
      card.classList.add('playing');

      const soundType = card.getAttribute('data-sound') || 'crunch';
      playCrunchSound(soundType);

      setTimeout(() => {
        card.classList.remove('playing');
      }, 1400);
    });
  });
}

/* ==========================================================================
   4. SECRET MENU RECIPE DRAWER TOGGLE
   ========================================================================== */
function initSecretMenuNotes() {
  const toggleBtns = document.querySelectorAll('.btn-secret-notes');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const drawer = document.getElementById(targetId);
      if (drawer) {
        drawer.classList.toggle('open');
        btn.innerHTML = drawer.classList.contains('open') 
          ? '<i class="fa-solid fa-chevron-up"></i> Hide Chef Notes'
          : '<i class="fa-solid fa-lightbulb"></i> Chef Secret Notes';
      }
    });
  });
}

/* ==========================================================================
   5. INTERACTIVE SAUCE MATRIX & SCOVILLE METER
   ========================================================================== */
function initSauceMatrix() {
  const sauceData = {
    ghost_mayo: {
      name: "Smoked Ghost Pepper Mayo",
      shu: "95,000 SHU",
      shuPercent: "85%",
      tags: ["Smokey", "Fiery Scorch", "Creamy Aioli Base"],
      pairing: "Pairs exquisitely with Jumbo Tenders & Crispy Fries",
      desc: "Fermented ghost chilis blended with charred garlic, Spanish smoked paprika, and rich emulsified egg yolks. Intense slow-building burn."
    },
    hot_honey: {
      name: "Clover Hot Honey Glaze",
      shu: "12,000 SHU",
      shuPercent: "25%",
      tags: ["Sticky Sweet", "Clover Honey", "Warm Cayenne"],
      pairing: "Match with Buttermilk Bone-In Thighs and Biscuits",
      desc: "100% wildflower clover honey infused with habanero mash and apple cider vinegar. Sweet nectar with a prickling pepper finish."
    },
    herb_ranch: {
      name: "Cultured Buttermilk Herb Ranch",
      shu: "0 SHU (Cooling)",
      shuPercent: "5%",
      tags: ["Cooling Dill", "Cultured Buttermilk", "Fresh Chives"],
      pairing: "Essential extinguisher for Nashville Wings",
      desc: "Cultured buttermilk steeped with fresh baby dill, garden chives, roasted garlic confit, and cracked tellicherry pepper."
    },
    gochujang: {
      name: "Korean Sweet Gochujang",
      shu: "25,000 SHU",
      shuPercent: "40%",
      tags: ["Fermented Chili", "Toasted Sesame", "Garlic Glaze"],
      pairing: "Best tossed over Crispy Wing flats & drums",
      desc: "Authentic fermented red pepper paste sweetened with brown rice syrup, garlic, and toasted cold-pressed sesame oil."
    },
    truffle_queso: {
      name: "Truffle Golden Queso",
      shu: "4,000 SHU",
      shuPercent: "12%",
      tags: ["Sharp Cheddar", "Black Truffle Essence", "Silky Warm"],
      pairing: "Ideal for dipping Crinkle Fries & Waffle Sandwiches",
      desc: "Wisconsin sharp cheddar melted with pickled serranos and cold-infused black summer truffle oil."
    },
    carolina_gold: {
      name: "Carolina Gold BBQ Mustard",
      shu: "8,000 SHU",
      shuPercent: "18%",
      tags: ["Tangy Mustard", "Cider Vinegar", "Cane Molasses"],
      pairing: "Classic match with Popcorn Chicken & Sliders",
      desc: "Stoneground yellow mustard simmered with dark cane molasses, apple cider vinegar, and hickory smoke."
    }
  };

  const pills = document.querySelectorAll('.sauce-pill-card');
  const titleEl = document.getElementById('sauce-detail-title');
  const shuEl = document.getElementById('sauce-detail-shu');
  const barEl = document.getElementById('sauce-detail-bar');
  const tagsEl = document.getElementById('sauce-detail-tags');
  const descEl = document.getElementById('sauce-detail-desc');
  const pairingEl = document.getElementById('sauce-detail-pairing');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const key = pill.getAttribute('data-sauce');
      const data = sauceData[key];
      if (!data) return;

      if (titleEl) titleEl.textContent = data.name;
      if (shuEl) shuEl.textContent = data.shu;
      if (barEl) barEl.style.width = data.shuPercent;
      if (descEl) descEl.textContent = data.desc;
      if (pairingEl) pairingEl.textContent = data.pairing;

      if (tagsEl) {
        tagsEl.innerHTML = data.tags.map(t => `<span class="flavor-tag">${t}</span>`).join('');
      }
    });
  });
}

/* ==========================================================================
   6. MIDNIGHT WING ROULETTE (SPIN TO WIN)
   ========================================================================== */
function initWingRoulette() {
  const spinBtn = document.getElementById('btn-spin-roulette');
  const wheel = document.getElementById('roulette-wheel-disc');
  const prizeCard = document.getElementById('roulette-prize-card');
  const prizeTitle = document.getElementById('roulette-prize-title');
  const prizeCode = document.getElementById('roulette-prize-code');
  const copyBtn = document.getElementById('btn-copy-prize-code');

  if (!spinBtn || !wheel) return;

  const prizes = [
    { name: "15% OFF TONIGHT'S CRAVE", code: "MIDNIGHT15", deg: 1830 },
    { name: "FREE SMOKED TRUFFLE DIP", code: "FREETRUFFLE", deg: 1890 },
    { name: "DOUBLE CRUNCH UPGRADE (FREE SLIDER)", code: "CRISPSLIDER", deg: 1950 },
    { name: "$5 OFF ANY 16-PC BUCKET", code: "BUCKET5", deg: 2010 },
    { name: "FREE CAJUN CRINKLE FRIES", code: "FREEFRIES", deg: 2070 },
    { name: "20% OFF LATE NIGHT SQUAD ORDERS", code: "SQUAD20", deg: 2130 }
  ];

  let spinning = false;

  spinBtn.addEventListener('click', () => {
    if (spinning) return;
    spinning = true;
    spinBtn.disabled = true;
    spinBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sizzling The Wheel...';

    const chosen = prizes[Math.floor(Math.random() * prizes.length)];
    wheel.style.transform = `rotate(${chosen.deg}deg)`;

    setTimeout(() => {
      spinning = false;
      spinBtn.disabled = false;
      spinBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Spin Again';

      if (prizeTitle) prizeTitle.textContent = chosen.name;
      if (prizeCode) prizeCode.textContent = chosen.code;
      if (prizeCard) prizeCard.classList.add('visible');

      // Auto-save promo code
      try {
        localStorage.setItem('crispster_active_promo', chosen.code);
      } catch (e) {}
    }, 3600);
  });

  if (copyBtn && prizeCode) {
    copyBtn.addEventListener('click', () => {
      const code = prizeCode.textContent.trim();
      navigator.clipboard?.writeText(code).then(() => {
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Code Copied & Applied!';
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copy Code';
        }, 2000);
      });
    });
  }
}

/* ==========================================================================
   7. SQUAD FEED CALCULATOR
   ========================================================================== */
function initSquadCalculator() {
  const slider = document.getElementById('squad-slider');
  const countEl = document.getElementById('squad-count-display');
  const pcsEl = document.getElementById('squad-pcs-val');
  const sidesEl = document.getElementById('squad-sides-val');
  const dipsEl = document.getElementById('squad-dips-val');
  const priceEl = document.getElementById('squad-price-val');
  const perPersonEl = document.getElementById('squad-per-person-val');

  if (!slider) return;

  function updateSquad() {
    const people = parseInt(slider.value, 10);
    if (countEl) countEl.textContent = `${people} Night Owls`;

    const pcs = people * 4;
    const sides = Math.ceil(people / 2);
    const dips = people * 2;
    const totalPrice = (people * 7.50) + 4.99;
    const perPerson = (totalPrice / people).toFixed(2);

    if (pcsEl) pcsEl.textContent = `${pcs} Pieces`;
    if (sidesEl) sidesEl.textContent = `${sides} Large Sides`;
    if (dipsEl) dipsEl.textContent = `${dips} Dips`;
    if (priceEl) priceEl.textContent = `$${totalPrice.toFixed(2)}`;
    if (perPersonEl) perPersonEl.textContent = `~$${perPerson} / person`;
  }

  slider.addEventListener('input', updateSquad);
  updateSquad();

  const addSquadBtn = document.getElementById('btn-add-squad-bundle');
  if (addSquadBtn) {
    addSquadBtn.addEventListener('click', () => {
      const people = parseInt(slider.value, 10);
      const totalPrice = (people * 7.50) + 4.99;
      const squadItem = {
        id: 'squad-pack-' + Date.now(),
        name: `${people}-Person Midnight Squad Feast`,
        price: totalPrice,
        qty: 1,
        img: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=300&q=80'
      };

      try {
        const cart = JSON.parse(localStorage.getItem('crispster_cart') || '[]');
        cart.push(squadItem);
        localStorage.setItem('crispster_cart', JSON.stringify(cart));

        const badges = document.querySelectorAll('.cart-count-badge');
        badges.forEach(b => {
          b.textContent = cart.length;
          b.style.display = 'inline-block';
        });

        addSquadBtn.innerHTML = '<i class="fa-solid fa-check"></i> Squad Pack Added to Bag!';
        addSquadBtn.style.background = '#10B981';
        setTimeout(() => {
          addSquadBtn.innerHTML = '<i class="fa-solid fa-fire"></i> Add Squad Pack To Bag';
          addSquadBtn.style.background = '';
        }, 1800);
      } catch (e) {
        console.error(e);
      }
    });
  }
}

/* ==========================================================================
   8. CURBSIDE PICKUP BAY TABS
   ========================================================================== */
function initCurbsideTabs() {
  const tabs = document.querySelectorAll('.bay-tab-btn');
  const panels = document.querySelectorAll('.bay-hub-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.style.display = 'none');

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-hub');
      const panel = document.getElementById(targetId);
      if (panel) {
        panel.style.display = 'block';
      }
    });
  });
}

