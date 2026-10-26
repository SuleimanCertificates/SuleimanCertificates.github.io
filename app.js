// Modern Certificate Showcase Application
// Suleyman Hajizadeh - 2026 Edition
// Strict compliance with Modern Web Guidance:
// - light-dismiss-a-dialog (native closedby="any" with programmatic fallback)
// - optimize-image-priority (fetchpriority="high" on top LCP candidates, lazy loading on below-the-fold)

import { categories, certificates } from './data.js';

// Application State
const state = {
  lang: localStorage.getItem('cert_lang') || 'az',
  theme: localStorage.getItem('cert_theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'),
  activeCategory: 'all',
  searchQuery: '',
  sortBy: 'latest',
  viewMode: localStorage.getItem('cert_view_mode') || 'grid',
  activeCertIndex: -1,
  zoomLevel: 1
};

// UI Translations Dictionary
const i18n = {
  az: {
    siteTitle: 'Süleyman Hacızadə',
    siteRole: 'Sertifikatlar & Nailiyyətlər',
    heroTag: 'Rəsmi Portfel & İxtisaslaşmalar',
    heroTitle: 'Sertifikatlar və <span class="gradient-text">Akademik Nailiyyətlər</span>',
    heroDesc: 'Süni İntellekt (AI), Bioinformatika, Kompüter Elmləri, Məlumat Analitikası və Sahibkarlıq sahələrində beynəlxalq qurumlardan əldə olunmuş 32 rəsmi sertifikat və akkreditasiya.',
    searchPlaceholder: 'Sertifikat, qurum, ID və ya açar söz axtarın... (⌘K)',
    sortLabel: 'Sırala:',
    sortLatest: 'Ən son əldə olunanlar',
    sortTitleAsc: 'Başlıq (A → Z)',
    sortTitleDesc: 'Başlıq (Z → A)',
    sortIssuerAsc: 'Qurum (A → Z)',
    resultsCount: (count, total) => `Toplam <b>${total}</b> sertifikatdan <b>${count}</b> ədədi göstərilir`,
    quickView: 'Ətraflı Bax',
    downloadPdf: 'PDF Yüklə',
    openPdf: 'Orijinal PDF Sənədini Aç',
    openImg: 'Yüksək Keyfiyyətli Şəkil',
    verifyCert: 'Rəsmi Təsdiq Səhifəsi',
    copyId: 'ID Kopyala',
    copiedId: 'Sertifikat ID-si kopyalandı!',
    copyLink: 'Keçidi Kopyala',
    copiedLink: 'Sertifikat linki kopyalandı!',
    emptyTitle: 'Uyğun sertifikat tapılmadı',
    emptyDesc: 'Axtarış sorğunuza uyğun heç bir nəticə mövcud deyil. Zəhmət olmasa filtrləri sıfırlayın.',
    resetFilters: 'Filtrləri Sıfırla',
    statTotal: 'Toplam Sertifikat',
    statAi: 'Süni İntellekt & ML',
    statBio: 'Bioinformatika & Səhiyyə',
    statCs: 'Kompüter Elmləri',
    statData: 'Məlumat Elmləri',
    statBiz: 'Startap & Hakaton',
    statOther: 'Fəxri & Digər',
    modalCredential: 'Sertifikat ID / Təsdiq Kodu',
    modalDate: 'Verilmə Tarixi',
    modalIssuer: 'Verən Qurum',
    modalInstructor: 'Təlimçi / Rəhbər',
    modalCategory: 'Kateqoriya',
    modalSkills: 'Əhatə Olunan Bacarıqlar',
    footerRights: 'Bütün hüquqlar qorunur.',
    footerUpdated: 'Son yenilənmə: 2026'
  },
  en: {
    siteTitle: 'Suleyman Hajizadeh',
    siteRole: 'Certificates & Credentials',
    heroTag: 'Official Portfolio & Accreditations',
    heroTitle: 'Certificates & <span class="gradient-text">Academic Milestones</span>',
    heroDesc: 'Official collection of 32 verified certificates across Artificial Intelligence (AI), Bioinformatics, Computer Science, Data Analytics, and Entrepreneurship.',
    searchPlaceholder: 'Search certificates, issuers, ID or skills... (⌘K)',
    sortLabel: 'Sort by:',
    sortLatest: 'Most Recent First',
    sortTitleAsc: 'Title (A → Z)',
    sortTitleDesc: 'Title (Z → A)',
    sortIssuerAsc: 'Issuer (A → Z)',
    resultsCount: (count, total) => `Showing <b>${count}</b> of <b>${total}</b> verified credentials`,
    quickView: 'View Details',
    downloadPdf: 'Download PDF',
    openPdf: 'Open Original PDF',
    openImg: 'High-Res Image',
    verifyCert: 'Official Verification',
    copyId: 'Copy ID',
    copiedId: 'Credential ID copied!',
    copyLink: 'Copy Share Link',
    copiedLink: 'Certificate link copied to clipboard!',
    emptyTitle: 'No matching certificates found',
    emptyDesc: 'Try adjusting your search criteria or resetting filters.',
    resetFilters: 'Reset Filters',
    statTotal: 'Total Credentials',
    statAi: 'AI & Machine Learning',
    statBio: 'Bioinformatics & Health',
    statCs: 'Computer Science & Systems',
    statData: 'Data Science & Math',
    statBiz: 'Startups & Business',
    statOther: 'Honors & Others',
    modalCredential: 'Credential ID / Verification',
    modalDate: 'Issued Date',
    modalIssuer: 'Issuing Institution',
    modalInstructor: 'Instructor / Director',
    modalCategory: 'Field / Category',
    modalSkills: 'Skills & Competencies',
    footerRights: 'All rights reserved.',
    footerUpdated: 'Last updated: 2026'
  }
};

// DOM References
const DOM = {
  themeToggle: document.getElementById('themeToggle'),
  langToggle: document.getElementById('langToggle'),
  searchInput: document.getElementById('searchInput'),
  searchClear: document.getElementById('searchClear'),
  filterPills: document.getElementById('filterPills'),
  sortSelect: document.getElementById('sortSelect'),
  viewGridBtn: document.getElementById('viewGridBtn'),
  viewListBtn: document.getElementById('viewListBtn'),
  galleryContainer: document.getElementById('galleryContainer'),
  resultsCount: document.getElementById('resultsCount'),
  certModal: document.getElementById('certModal'),
  modalCloseBtn: document.getElementById('modalCloseBtn'),
  modalPrevBtn: document.getElementById('modalPrevBtn'),
  modalNextBtn: document.getElementById('modalNextBtn'),
  zoomInBtn: document.getElementById('zoomInBtn'),
  zoomOutBtn: document.getElementById('zoomOutBtn'),
  zoomResetBtn: document.getElementById('zoomResetBtn'),
  fullscreenBtn: document.getElementById('fullscreenBtn'),
  modalImg: document.getElementById('modalImg'),
  modalTitle: document.getElementById('modalTitle'),
  modalIssuer: document.getElementById('modalIssuer'),
  modalDesc: document.getElementById('modalDesc'),
  modalDetailsTable: document.getElementById('modalDetailsTable'),
  modalTags: document.getElementById('modalTags'),
  modalBadges: document.getElementById('modalBadges'),
  modalActions: document.getElementById('modalActions'),
  toastContainer: document.getElementById('toastContainer'),
  backToTop: document.getElementById('backToTop')
};

// Initialize Application
function init() {
  applyTheme(state.theme);
  renderCategoryPills();
  bindEvents();
  renderGallery();
  animateStats();
  checkUrlHash();
  setupDialogLightDismiss();
}

// Setup Dialog Light-Dismiss (Strict Compliance with Modern Web Guidance)
function setupDialogLightDismiss() {
  const dialog = DOM.certModal;
  if (!dialog) return;

  // Modern Web Guidance: light-dismiss-a-dialog fallback
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    dialog.addEventListener('click', (event) => {
      // 1. When clicking the backdrop, the event target is the dialog element itself.
      if (event.target !== dialog) return;

      // 2. Check if the click coordinates fall within the dialog's content box.
      const rect = dialog.getBoundingClientRect();
      const isDialogContent = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );

      if (isDialogContent) return;

      // 3. Click was outside content area, close the dialog.
      closeModal();
    });
  }

  // Handle Escape and Native close
  dialog.addEventListener('close', () => {
    state.activeCertIndex = -1;
    resetZoom();
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
  });
}

// Bind Global UI Events
function bindEvents() {
  // Theme Toggle
  DOM.themeToggle?.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('cert_theme', state.theme);
    applyTheme(state.theme);
  });

  // Language Toggle
  DOM.langToggle?.addEventListener('click', () => {
    state.lang = state.lang === 'az' ? 'en' : 'az';
    localStorage.setItem('cert_lang', state.lang);
    updateLanguage();
  });

  // Search Input
  let debounceTimeout;
  DOM.searchInput?.addEventListener('input', (e) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      state.searchQuery = e.target.value.trim().toLowerCase();
      DOM.searchClear.classList.toggle('visible', state.searchQuery.length > 0);
      renderGallery();
    }, 150);
  });

  // Search Clear
  DOM.searchClear?.addEventListener('click', () => {
    DOM.searchInput.value = '';
    state.searchQuery = '';
    DOM.searchClear.classList.remove('visible');
    DOM.searchInput.focus();
    renderGallery();
  });

  // Sort Select
  DOM.sortSelect?.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderGallery();
  });

  // View Mode Switcher
  DOM.viewGridBtn?.addEventListener('click', () => setViewMode('grid'));
  DOM.viewListBtn?.addEventListener('click', () => setViewMode('list'));

  // Modal Controls
  DOM.modalCloseBtn?.addEventListener('click', closeModal);
  DOM.modalPrevBtn?.addEventListener('click', showPrevCertificate);
  DOM.modalNextBtn?.addEventListener('click', showNextCertificate);

  // Zoom Controls
  DOM.zoomInBtn?.addEventListener('click', () => adjustZoom(0.25));
  DOM.zoomOutBtn?.addEventListener('click', () => adjustZoom(-0.25));
  DOM.zoomResetBtn?.addEventListener('click', resetZoom);
  DOM.fullscreenBtn?.addEventListener('click', toggleFullscreen);

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // ⌘K or / to search
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k' || (e.key === '/' && document.activeElement !== DOM.searchInput)) {
      e.preventDefault();
      DOM.searchInput?.focus();
      return;
    }

    // Modal navigation
    if (DOM.certModal?.open) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPrevCertificate();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        showNextCertificate();
      } else if (e.key === '+' || e.key === '=') {
        adjustZoom(0.25);
      } else if (e.key === '-') {
        adjustZoom(-0.25);
      } else if (e.key === '0') {
        resetZoom();
      }
    }
  });

  // Back to Top Scroll
  window.addEventListener('scroll', () => {
    const isScrolled = window.scrollY > 400;
    DOM.backToTop?.classList.toggle('visible', isScrolled);
  }, { passive: true });

  DOM.backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Hash Change
  window.addEventListener('hashchange', checkUrlHash);
}

// Apply Theme
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = DOM.themeToggle?.querySelector('.theme-icon');
  if (icon) {
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// Update UI Language
function updateLanguage() {
  const currentLang = state.lang;
  const t = i18n[currentLang];

  DOM.langToggle.querySelector('.lang-label').textContent = currentLang === 'az' ? 'EN' : 'AZ';

  // Update translatable static elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.innerHTML = t[key];
    }
  });

  // Update Search Placeholder
  if (DOM.searchInput) {
    DOM.searchInput.placeholder = t.searchPlaceholder;
  }

  // Update Sort Options
  if (DOM.sortSelect) {
    DOM.sortSelect.options[0].text = t.sortLatest;
    DOM.sortSelect.options[1].text = t.sortTitleAsc;
    DOM.sortSelect.options[2].text = t.sortTitleDesc;
    DOM.sortSelect.options[3].text = t.sortIssuerAsc;
  }

  renderCategoryPills();
  renderGallery();

  // If modal is currently open, re-render modal with new language
  if (DOM.certModal?.open && state.activeCertIndex >= 0) {
    const filtered = getFilteredCertificates();
    const cert = filtered[state.activeCertIndex];
    if (cert) renderModalContent(cert);
  }
}

// Render Category Filter Pills
function renderCategoryPills() {
  if (!DOM.filterPills) return;

  const currentLang = state.lang;
  DOM.filterPills.innerHTML = '';

  categories.forEach(cat => {
    const count = cat.id === 'all'
      ? certificates.length
      : certificates.filter(c => c.category === cat.id).length;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `pill-btn ${state.activeCategory === cat.id ? 'active' : ''}`;
    btn.setAttribute('data-category', cat.id);
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', state.activeCategory === cat.id ? 'true' : 'false');

    const name = currentLang === 'az' ? cat.name_az : cat.name_en;
    btn.innerHTML = `<span>${cat.icon}</span> <span>${name}</span> <span class="pill-count">${count}</span>`;

    btn.addEventListener('click', () => {
      state.activeCategory = cat.id;
      renderCategoryPills();
      renderGallery();
    });

    DOM.filterPills.appendChild(btn);
  });
}

// Set View Mode (Grid vs List)
function setViewMode(mode) {
  state.viewMode = mode;
  localStorage.setItem('cert_view_mode', mode);
  DOM.viewGridBtn?.classList.toggle('active', mode === 'grid');
  DOM.viewListBtn?.classList.toggle('active', mode === 'list');
  renderGallery();
}

// Filter and Sort Logic
function getFilteredCertificates() {
  let list = [...certificates];

  // Category filter
  if (state.activeCategory !== 'all') {
    list = list.filter(c => c.category === state.activeCategory);
  }

  // Search query filter
  if (state.searchQuery) {
    const q = state.searchQuery;
    list = list.filter(c => {
      const titleMatch = (c.title || '').toLowerCase().includes(q) || (c.title_az || '').toLowerCase().includes(q);
      const issuerMatch = (c.issuer || '').toLowerCase().includes(q);
      const idMatch = (c.credential_id || '').toLowerCase().includes(q);
      const instructorMatch = (c.instructor || '').toLowerCase().includes(q);
      const tagMatch = c.tags.some(t => t.toLowerCase().includes(q));
      return titleMatch || issuerMatch || idMatch || instructorMatch || tagMatch;
    });
  }

  // Sorting
  switch (state.sortBy) {
    case 'title-asc':
      list.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'title-desc':
      list.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case 'issuer-asc':
      list.sort((a, b) => a.issuer.localeCompare(b.issuer));
      break;
    case 'latest':
    default:
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
  }

  return list;
}

// Render Gallery Cards
function renderGallery() {
  if (!DOM.galleryContainer) return;

  const filtered = getFilteredCertificates();
  const t = i18n[state.lang];

  // Update Results Count
  if (DOM.resultsCount) {
    DOM.resultsCount.innerHTML = t.resultsCount(filtered.length, certificates.length);
  }

  // Set Container Class
  DOM.galleryContainer.className = state.viewMode === 'grid' ? 'cert-gallery-grid' : 'cert-gallery-list';
  DOM.galleryContainer.innerHTML = '';

  // Empty State
  if (filtered.length === 0) {
    DOM.galleryContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3 class="empty-title">${t.emptyTitle}</h3>
        <p class="empty-desc">${t.emptyDesc}</p>
        <button type="button" class="btn-pill" id="emptyResetBtn">${t.resetFilters}</button>
      </div>
    `;
    document.getElementById('emptyResetBtn')?.addEventListener('click', () => {
      state.searchQuery = '';
      state.activeCategory = 'all';
      if (DOM.searchInput) DOM.searchInput.value = '';
      DOM.searchClear?.classList.remove('visible');
      renderCategoryPills();
      renderGallery();
    });
    return;
  }

  // Modern Web Guidance: optimize-image-priority
  // Elevate priority for top 4 critical LCP candidates with fetchpriority="high"
  // Deprioritize non-critical below-the-fold images using loading="lazy" alone (without fetchpriority="low")
  filtered.forEach((cert, index) => {
    const card = createCertificateCard(cert, index, index < 4);
    DOM.galleryContainer.appendChild(card);
  });
}

// Create Single Certificate Card Element
function createCertificateCard(cert, index, isTopPriority) {
  const currentLang = state.lang;
  const t = i18n[currentLang];
  const title = currentLang === 'az' && cert.title_az ? cert.title_az : cert.title;
  const desc = currentLang === 'az' && cert.description_az ? cert.description_az : cert.description;

  const card = document.createElement('article');
  card.className = 'cert-card';
  card.setAttribute('data-id', cert.id);

  // Modern Web Guidance compliance:
  // fetchpriority="high" on LCP candidates; loading="lazy" alone on below-the-fold
  const imgAttr = isTopPriority
    ? `fetchpriority="high" width="600" height="400"`
    : `loading="lazy" width="600" height="400"`;

  card.innerHTML = `
    <div class="cert-thumb-wrap" tabindex="0" role="button" aria-label="${t.quickView}: ${title}">
      <div class="thumb-chips">
        <span class="chip-issuer">${cert.issuer_badge}</span>
        <span class="chip-category chip-cat-${cert.category}">${getCategoryIcon(cert.category)} ${getCategoryName(cert.category, currentLang)}</span>
      </div>
      <img src="${cert.image}" alt="${title}" class="cert-thumb" ${imgAttr}>
      <div class="cert-overlay-hover">
        <span class="cert-quick-view-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          ${t.quickView}
        </span>
      </div>
    </div>
    <div class="cert-body">
      <div class="cert-meta-top">
        <span class="cert-date">${cert.date_display}</span>
        ${cert.credential_id ? `<span class="cert-id-tag">ID: ${cert.credential_id.substring(0, 10)}${cert.credential_id.length > 10 ? '…' : ''}</span>` : ''}
      </div>
      <h3 class="cert-title">${title}</h3>
      <p class="cert-desc">${desc}</p>
      <div class="cert-tags">
        ${cert.tags.slice(0, 4).map(tag => `<span class="tag-badge">${tag}</span>`).join('')}
        ${cert.tags.length > 4 ? `<span class="tag-badge">+${cert.tags.length - 4}</span>` : ''}
      </div>
      <div class="cert-footer-actions">
        <button type="button" class="btn-card-action btn-card-primary" data-action="view">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          ${t.quickView}
        </button>
        ${cert.pdf ? `
          <a href="${cert.pdf}" download class="btn-card-action btn-card-pdf" title="${t.downloadPdf}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            PDF
          </a>
        ` : ''}
        ${cert.credential_id ? `
          <button type="button" class="btn-card-icon" data-action="copy-id" title="${t.copyId}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          </button>
        ` : ''}
        <button type="button" class="btn-card-icon" data-action="share" title="${t.copyLink}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        </button>
      </div>
    </div>
  `;

  // Interaction handlers
  const thumb = card.querySelector('.cert-thumb-wrap');
  const titleEl = card.querySelector('.cert-title');
  const viewBtn = card.querySelector('[data-action="view"]');
  const copyIdBtn = card.querySelector('[data-action="copy-id"]');
  const shareBtn = card.querySelector('[data-action="share"]');

  const openCertModal = () => openModal(cert.id);
  thumb?.addEventListener('click', openCertModal);
  thumb?.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') openCertModal(); });
  titleEl?.addEventListener('click', openCertModal);
  viewBtn?.addEventListener('click', openCertModal);

  copyIdBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    copyToClipboard(cert.credential_id, t.copiedId);
  });

  shareBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#${cert.id}`;
    copyToClipboard(url, t.copiedLink);
  });

  return card;
}

// Category Helpers
function getCategoryIcon(catId) {
  const cat = categories.find(c => c.id === catId);
  return cat ? cat.icon : '📄';
}

function getCategoryName(catId, lang) {
  const cat = categories.find(c => c.id === catId);
  if (!cat) return 'General';
  return lang === 'az' ? cat.name_az : cat.name_en;
}

// Open Certificate Modal (Strict Compliance with Modern Web Guidance)
function openModal(certId) {
  const filtered = getFilteredCertificates();
  const index = filtered.findIndex(c => c.id === certId);
  if (index === -1) return;

  state.activeCertIndex = index;
  const cert = filtered[index];

  renderModalContent(cert);
  resetZoom();

  // MANDATORY: Always open modal dialogs with showModal()
  DOM.certModal.showModal();

  // Deep Link Hash update
  history.replaceState(null, '', `#${cert.id}`);
}

// Render Modal Content
function renderModalContent(cert) {
  const currentLang = state.lang;
  const t = i18n[currentLang];
  const title = currentLang === 'az' && cert.title_az ? cert.title_az : cert.title;
  const desc = currentLang === 'az' && cert.description_az ? cert.description_az : cert.description;

  // Image & Lightbox
  if (DOM.modalImg) {
    DOM.modalImg.src = cert.image;
    DOM.modalImg.alt = title;
  }

  // Titles
  if (DOM.modalTitle) DOM.modalTitle.textContent = title;
  if (DOM.modalIssuer) {
    DOM.modalIssuer.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
      <span>${cert.issuer}</span>
    `;
  }
  if (DOM.modalDesc) DOM.modalDesc.textContent = desc;

  // Badges
  if (DOM.modalBadges) {
    DOM.modalBadges.innerHTML = `
      <span class="chip-issuer">${cert.issuer_badge}</span>
      <span class="chip-category chip-cat-${cert.category}">${getCategoryIcon(cert.category)} ${getCategoryName(cert.category, currentLang)}</span>
    `;
  }

  // Details Table
  if (DOM.modalDetailsTable) {
    DOM.modalDetailsTable.innerHTML = `
      <div class="detail-label">${t.modalDate}:</div>
      <div class="detail-val">${cert.date_display}</div>

      ${cert.instructor ? `
        <div class="detail-label">${t.modalInstructor}:</div>
        <div class="detail-val">${cert.instructor}</div>
      ` : ''}

      ${cert.credential_id ? `
        <div class="detail-label">${t.modalCredential}:</div>
        <div class="detail-val detail-val-mono">
          <span>${cert.credential_id}</span>
          <button type="button" class="btn-icon" style="width:1.65rem;height:1.65rem;" id="modalCopyIdBtn" title="${t.copyId}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          </button>
        </div>
      ` : ''}

      <div class="detail-label">${t.modalCategory}:</div>
      <div class="detail-val">${getCategoryName(cert.category, currentLang)}</div>
    `;

    document.getElementById('modalCopyIdBtn')?.addEventListener('click', () => {
      copyToClipboard(cert.credential_id, t.copiedId);
    });
  }

  // Tags
  if (DOM.modalTags) {
    DOM.modalTags.innerHTML = cert.tags.map(t => `<span class="tag-badge">${t}</span>`).join('');
  }

  // Action Buttons
  if (DOM.modalActions) {
    DOM.modalActions.innerHTML = `
      ${cert.pdf ? `
        <a href="${cert.pdf}" target="_blank" rel="noopener noreferrer" class="btn-modal-action btn-modal-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          ${t.openPdf}
        </a>
      ` : ''}
      ${cert.verify_url ? `
        <a href="${cert.verify_url}" target="_blank" rel="noopener noreferrer" class="btn-modal-action btn-modal-secondary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          ${t.verifyCert}
        </a>
      ` : ''}
      <a href="${cert.image}" target="_blank" rel="noopener noreferrer" class="btn-modal-action btn-modal-secondary">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        ${t.openImg}
      </a>
      <button type="button" class="btn-modal-action btn-modal-secondary" id="modalShareBtn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        ${t.copyLink}
      </button>
    `;

    document.getElementById('modalShareBtn')?.addEventListener('click', () => {
      const url = `${window.location.origin}${window.location.pathname}#${cert.id}`;
      copyToClipboard(url, t.copiedLink);
    });
  }
}

// Close Modal
function closeModal() {
  if (DOM.certModal?.open) {
    DOM.certModal.close();
  }
}

// Navigate Previous Certificate in Modal
function showPrevCertificate() {
  const filtered = getFilteredCertificates();
  if (filtered.length <= 1) return;
  state.activeCertIndex = (state.activeCertIndex - 1 + filtered.length) % filtered.length;
  const cert = filtered[state.activeCertIndex];
  renderModalContent(cert);
  resetZoom();
  history.replaceState(null, '', `#${cert.id}`);
}

// Navigate Next Certificate in Modal
function showNextCertificate() {
  const filtered = getFilteredCertificates();
  if (filtered.length <= 1) return;
  state.activeCertIndex = (state.activeCertIndex + 1) % filtered.length;
  const cert = filtered[state.activeCertIndex];
  renderModalContent(cert);
  resetZoom();
  history.replaceState(null, '', `#${cert.id}`);
}

// Zoom Image Viewer Controls
function adjustZoom(delta) {
  state.zoomLevel = Math.max(0.75, Math.min(3.5, state.zoomLevel + delta));
  applyZoom();
}

function resetZoom() {
  state.zoomLevel = 1;
  applyZoom();
}

function applyZoom() {
  if (DOM.modalImg) {
    DOM.modalImg.style.transform = `scale(${state.zoomLevel})`;
  }
}

function toggleFullscreen() {
  const container = document.querySelector('.modal-img-container');
  if (!container) return;
  if (!document.fullscreenElement) {
    container.requestFullscreen?.().catch(() => {});
  } else {
    document.exitFullscreen?.().catch(() => {});
  }
}

// Deep Linking Check via URL Hash
function checkUrlHash() {
  const hash = window.location.hash.replace('#', '');
  if (!hash) return;

  const cert = certificates.find(c => c.id === hash);
  if (cert) {
    // Switch to 'all' or matching category if filtered out
    if (state.activeCategory !== 'all' && state.activeCategory !== cert.category) {
      state.activeCategory = 'all';
      renderCategoryPills();
    }
    openModal(cert.id);
  }
}

// Toast Notifications
function copyToClipboard(text, message) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(message);
  }).catch(() => {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast(message);
  });
}

function showToast(message) {
  if (!DOM.toastContainer) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${message}</span>
  `;
  DOM.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-out');
    toast.addEventListener('animationend', () => toast.remove());
  }, 2600);
}

// Animate Numbers on Hero Stats Ribbon
function animateStats() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target') || '0', 10);
    let count = 0;
    const step = Math.max(1, Math.floor(target / 25));
    const timer = setInterval(() => {
      count += step;
      if (count >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = count;
      }
    }, 30);
  });
}

// Start Application on DOM Ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
