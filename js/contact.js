/**
 * CRISPSTER — CONTACT & LOCATIONS INTERACTION (contact.js)
 * Real-time Form Validation, Submission Modal Feedback, FAQ Accordion
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
    initFaqAccordion();
  });

  // --------------------------------------------------------------------------
  // 1. Contact Form Real-time Validation
  // --------------------------------------------------------------------------
  function initContactForm() {
    const form = document.getElementById('crispster-contact-form');
    if (!form) return;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const phoneInput = document.getElementById('contact-phone');
    const subjectSelect = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const charCounter = document.getElementById('message-char-count');

    // Live character count
    messageInput?.addEventListener('input', () => {
      const length = messageInput.value.length;
      if (charCounter) {
        charCounter.textContent = `${length} / 500 characters`;
      }
    });

    // Validation helpers
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }

    function setFieldError(field, errorElementId, message) {
      field.classList.add('error');
      const errEl = document.getElementById(errorElementId);
      if (errEl) {
        errEl.textContent = message;
        errEl.style.display = 'block';
      }
    }

    function clearFieldError(field, errorElementId) {
      field.classList.remove('error');
      const errEl = document.getElementById(errorElementId);
      if (errEl) {
        errEl.textContent = '';
        errEl.style.display = 'none';
      }
    }

    // Restrict Name to letters only
    nameInput?.addEventListener('keydown', (e) => {
      if (['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Home', 'End'].includes(e.key)) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (!/^[a-zA-Z\s'-]$/.test(e.key)) {
        e.preventDefault();
      }
    });
    nameInput?.addEventListener('input', () => {
      nameInput.value = nameInput.value.replace(/[^a-zA-Z\s'-]/g, '');
      if (nameInput.value.trim().length >= 2 && /^[a-zA-Z\s'-]{2,}$/.test(nameInput.value.trim())) {
        clearFieldError(nameInput, 'name-error');
      }
    });

    // Restrict Phone to numbers only
    phoneInput?.addEventListener('keydown', (e) => {
      if (['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Home', 'End'].includes(e.key)) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    });
    phoneInput?.addEventListener('input', () => {
      phoneInput.value = phoneInput.value.replace(/\D/g, '');
      if (phoneInput.value.length >= 7 && phoneInput.value.length <= 15) {
        clearFieldError(phoneInput, 'phone-error');
      }
    });

    // Live validation on blur
    nameInput?.addEventListener('blur', () => {
      const val = nameInput.value.trim();
      if (!val) {
        setFieldError(nameInput, 'name-error', 'Full name is required.');
      } else if (!/^[a-zA-Z\s'-]{2,}$/.test(val)) {
        setFieldError(nameInput, 'name-error', 'Please enter letters only (minimum 2 characters).');
      } else {
        clearFieldError(nameInput, 'name-error');
      }
    });

    emailInput?.addEventListener('blur', () => {
      if (!validateEmail(emailInput.value.trim())) {
        setFieldError(emailInput, 'email-error', 'Please provide a valid email address.');
      } else {
        clearFieldError(emailInput, 'email-error');
      }
    });

    phoneInput?.addEventListener('blur', () => {
      const val = phoneInput.value.trim();
      if (!val) {
        setFieldError(phoneInput, 'phone-error', 'Phone number is required.');
      } else if (!/^[0-9]{7,15}$/.test(val)) {
        setFieldError(phoneInput, 'phone-error', 'Please enter numbers only (7 to 15 digits).');
      } else {
        clearFieldError(phoneInput, 'phone-error');
      }
    });

    messageInput?.addEventListener('blur', () => {
      if (messageInput.value.trim().length < 10) {
        setFieldError(messageInput, 'message-error', 'Please provide more details (minimum 10 characters).');
      } else {
        clearFieldError(messageInput, 'message-error');
      }
    });

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameInput || !nameVal) {
        setFieldError(nameInput, 'name-error', 'Full name is required.');
        isValid = false;
      } else if (!/^[a-zA-Z\s'-]{2,}$/.test(nameVal)) {
        setFieldError(nameInput, 'name-error', 'Please enter letters only (minimum 2 characters).');
        isValid = false;
      } else {
        clearFieldError(nameInput, 'name-error');
      }

      if (!emailInput || !validateEmail(emailInput.value.trim())) {
        setFieldError(emailInput, 'email-error', 'Valid email address is required.');
        isValid = false;
      } else {
        clearFieldError(emailInput, 'email-error');
      }

      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      if (!phoneInput || !phoneVal) {
        setFieldError(phoneInput, 'phone-error', 'Phone number is required.');
        isValid = false;
      } else if (!/^[0-9]{7,15}$/.test(phoneVal)) {
        setFieldError(phoneInput, 'phone-error', 'Please enter numbers only (7 to 15 digits).');
        isValid = false;
      } else {
        clearFieldError(phoneInput, 'phone-error');
      }

      if (!messageInput || messageInput.value.trim().length < 10) {
        setFieldError(messageInput, 'message-error', 'Message must be at least 10 characters.');
        isValid = false;
      } else {
        clearFieldError(messageInput, 'message-error');
      }

      if (!isValid) {
        window.showToast?.('Incomplete Form', 'Please fix the highlighted fields.', 'fa-solid fa-triangle-exclamation');
        return;
      }

      // Show confirmation dialog / modal
      showContactSuccessModal(nameInput.value.trim(), emailInput.value.trim(), subjectSelect?.value || 'General Inquiry');

      // Reset form
      form.reset();
      if (charCounter) charCounter.textContent = '0 / 500 characters';
    });
  }

  function showContactSuccessModal(name, email, subject) {
    const ticketId = 'CRISP-MSG-' + Math.floor(1000 + Math.random() * 9000);

    let overlay = document.querySelector('.demo-modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'demo-modal-overlay';
      document.body.appendChild(overlay);
    }

    overlay.innerHTML = `
      <div class="demo-modal">
        <div class="modal-icon-badge" style="background: linear-gradient(135deg, #10B981, #059669); color: #FFF;">
          <i class="fa-solid fa-paper-plane"></i>
        </div>
        <h3 class="modal-title">Message Received!</h3>
        <p class="modal-desc">
          Thank you, <strong>${name}</strong>! Your inquiry regarding <em>${subject}</em> has been assigned Ticket <strong>#${ticketId}</strong>.
        </p>
        <div class="modal-receipt-box">
          <div class="receipt-row">
            <span>Confirmation Sent To:</span>
            <strong>${email}</strong>
          </div>
          <div class="receipt-row">
            <span>Estimated Kitchen Response:</span>
            <strong>Under 2 Hours</strong>
          </div>
          <div class="receipt-row">
            <span>Direct Kitchen Hotline:</span>
            <strong>(555) 374-2747</strong>
          </div>
        </div>
        <button type="button" class="btn btn-hot close-feedback-modal-btn" style="width: 100%;">Return to Crispster</button>
      </div>
    `;

    overlay.classList.add('active');

    const closeBtn = overlay.querySelector('.close-feedback-modal-btn');
    closeBtn?.addEventListener('click', () => {
      overlay.classList.remove('active');
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });

    window.showToast?.('Inquiry Submitted', 'Our takeaway team will respond shortly!', 'fa-solid fa-check-circle');
  }

  // --------------------------------------------------------------------------
  // 2. FAQ Accordion
  // --------------------------------------------------------------------------
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const header = item.querySelector('.faq-header');
      header?.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Optional: close other open items for clean single accordion
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });

        item.classList.toggle('active', !isActive);
      });
    });
  }

})();

