/**
 * CRISPSTER — OFFERS & PROMOTIONS INTERACTION (offers.js)
 * Countdown Timer, Copy-to-Clipboard Coupons with feedback
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initCouponCopy();
  });

  // --------------------------------------------------------------------------
  // 1. Dynamic Countdown Timer (Resets at midnight)
  // --------------------------------------------------------------------------
  function initCountdown() {
    const hoursEl = document.getElementById('timer-hours');
    const minsEl = document.getElementById('timer-mins');
    const secsEl = document.getElementById('timer-secs');

    if (!hoursEl || !minsEl || !secsEl) return;

    function updateTimer() {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(23, 59, 59, 999);

      const diff = midnight - now;

      if (diff <= 0) {
        hoursEl.textContent = '00';
        minsEl.textContent = '00';
        secsEl.textContent = '00';
        return;
      }

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      hoursEl.textContent = String(hours).padStart(2, '0');
      minsEl.textContent = String(minutes).padStart(2, '0');
      secsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  // --------------------------------------------------------------------------
  // 2. One-Click Copy Coupon Code
  // --------------------------------------------------------------------------
  function initCouponCopy() {
    const copyBtns = document.querySelectorAll('.btn-copy-code');

    copyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.getAttribute('data-code');
        if (!code) return;

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(code).then(() => {
            onCopySuccess(btn, code);
          }).catch(() => {
            fallbackCopy(code, btn);
          });
        } else {
          fallbackCopy(code, btn);
        }
      });
    });

    function fallbackCopy(text, btn) {
      const tempInput = document.createElement('input');
      tempInput.value = text;
      document.body.appendChild(tempInput);
      tempInput.select();
      try {
        document.execCommand('copy');
        onCopySuccess(btn, text);
      } catch (err) {
        window.showToast?.('Copy Error', `Use code: ${text}`, 'fa-solid fa-tag');
      }
      document.body.removeChild(tempInput);
    }

    function onCopySuccess(btn, code) {
      const originalHtml = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> COPIED!';
      btn.style.background = '#10B981';
      btn.style.color = '#FFFFFF';

      window.showToast?.(
        'Promo Code Copied!',
        `Code ${code} copied to clipboard. Apply it in your Takeaway Bag!`,
        'fa-solid fa-clipboard-check'
      );

      setTimeout(() => {
        btn.innerHTML = originalHtml;
        btn.style.background = '';
        btn.style.color = '';
      }, 2500);
    }
  }

})();

