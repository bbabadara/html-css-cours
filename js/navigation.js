// Navigation Module
const Navigation = {
  buildSidebar() {
    const sidebarNav = document.getElementById('sidebarNav');
    if (!sidebarNav) return;

    const { navItems, chapters } = CONFIG;
    const completedSections = APP.completedSections;

    let html = '';

    chapters.forEach(chapter => {
      const completed = chapter.items.filter(id => completedSections.has(id)).length;
      const total = chapter.items.length;
      const progress = Math.round((completed / total) * 100);

      html += `
        <div class="mb-4">
          <div class="flex items-center gap-2 mb-2 px-2">
            <span class="text-lg">${chapter.icon}</span>
            <span class="text-xs font-semibold text-gray-700 dark:text-gray-300">${chapter.name}</span>
            <span class="ml-auto text-[10px] text-gray-400">${completed}/${total}</span>
          </div>
          <div class="h-1 mx-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r ${chapter.color === 'violet' ? 'from-violet-500 to-purple-500' : chapter.color === 'orange' ? 'from-orange-500 to-red-500' : chapter.color === 'blue' ? 'from-blue-500 to-cyan-500' : chapter.color === 'green' ? 'from-green-500 to-emerald-500' : 'from-emerald-500 to-teal-500'} transition-all duration-500" style="width: ${progress}%"></div>
          </div>
        </div>
      `;

      chapter.items.forEach(itemId => {
        const item = navItems.find(n => n.id === itemId);
        if (!item) return;
        const completed = completedSections.has(itemId);
        const bookmarked = APP.bookmarks && APP.bookmarks.has(itemId);
        html += `
          <button onclick="APP.navigateTo('${itemId}')" 
                  class="nav-btn w-full text-left px-3 py-2 rounded-lg transition-all duration-150 flex items-center gap-2 text-xs group" 
                  data-section="${itemId}"
                  aria-label="${item.name}">
            <span class="w-6 h-6 rounded ${completed ? 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'} flex items-center justify-center text-[10px] font-medium shrink-0">
              ${completed ? '✓' : item.chapter}
            </span>
            <span class="truncate ${completed ? 'text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'}">${item.name}</span>
            ${bookmarked ? '<span class="ml-auto text-yellow-500 shrink-0">★</span>' : ''}
          </button>
        `;
      });
    });

    sidebarNav.innerHTML = html;
  },

  buildMobileNav() {
    const mobileNav = document.getElementById('mobileNav');
    if (!mobileNav) return;

    const colorClasses = {
      'intro': 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300',
      'html': 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
      'css': 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
      'advanced': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
    };

    mobileNav.innerHTML = CONFIG.navItems.map(item => `
      <button onclick="APP.navigateTo('${item.id}'); APP.closeMobileMenu();" 
              class="w-full text-left p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-all"
              data-section="${item.id}">
        <span class="w-10 h-10 rounded-xl ${colorClasses[item.type] || 'bg-gray-100 dark:bg-gray-700'} flex items-center justify-center text-sm font-bold shrink-0">${item.chapter}</span>
        <span class="flex-1">${item.name}</span>
      </button>
    `).join('');
  },

  buildSearchResults() {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;

    const colorClasses = {
      'intro': 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300',
      'html': 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
      'css': 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
      'advanced': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
    };

    searchResults.innerHTML = CONFIG.navItems.map(item => `
      <div class="search-result p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-3" 
           data-section="${item.id}" 
           onclick="APP.navigateTo('${item.id}'); APP.closeSearch();">
        <span class="w-8 h-8 rounded-lg ${colorClasses[item.type] || 'bg-gray-100'} flex items-center justify-center text-xs font-bold shrink-0">${item.chapter}</span>
        <div>
          <div class="font-medium">${item.name}</div>
          <div class="text-xs text-gray-500">Chapitre ${item.chapter}</div>
        </div>
      </div>
    `).join('');
  },

  navigateTo(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      const index = CONFIG.sections.indexOf(sectionId);
      if (index !== -1) APP.currentSection = index;
      this.updateNavActive();
      APP.saveProgress();
      APP.closeMobileMenu();
    }
  },

  navigateNext() {
    if (APP.currentSection < CONFIG.sections.length - 1) {
      APP.currentSection++;
      this.navigateTo(CONFIG.sections[APP.currentSection]);
    }
  },

  navigatePrev() {
    if (APP.currentSection > 0) {
      APP.currentSection--;
      this.navigateTo(CONFIG.sections[APP.currentSection]);
    }
  },

  updateNavActive() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.section === CONFIG.sections[APP.currentSection]) {
        btn.classList.add('active');
      }
    });
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    if (btnPrev) {
      btnPrev.disabled = APP.currentSection === 0;
      btnPrev.classList.toggle('opacity-50', APP.currentSection === 0);
    }
    if (btnNext) {
      btnNext.disabled = APP.currentSection === CONFIG.sections.length - 1;
      btnNext.classList.toggle('opacity-50', APP.currentSection === CONFIG.sections.length - 1);
    }
  },

  setupScrollSpy() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const index = CONFIG.sections.indexOf(id);
          if (index !== -1) {
            APP.currentSection = index;
            APP.completedSections.add(id);
            this.updateNavActive();
            Progress.update();
            APP.saveProgress();
            APP.checkBadges();
            this.buildSidebar();
          }
        }
      });
    }, { threshold: 0.3 });
    CONFIG.sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  },

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && !APP.isInputFocused()) {
        e.preventDefault();
        this.openSearch();
      }
      if (e.key === 'Escape') {
        this.closeSearch();
        APP.closeMobileMenu();
        this.closeShortcuts();
      }
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        this.openSearch();
      }
      if (e.key === 'ArrowRight' && !APP.isInputFocused()) {
        this.navigateNext();
      }
      if (e.key === 'ArrowLeft' && !APP.isInputFocused()) {
        this.navigatePrev();
      }
      if (e.key === '?' && !APP.isInputFocused()) {
        e.preventDefault();
        this.toggleShortcuts();
      }
      if (e.key === 'b' && !APP.isInputFocused() && CONFIG.sections[APP.currentSection]) {
        e.preventDefault();
        APP.toggleBookmark(CONFIG.sections[APP.currentSection]);
      }
      if (e.key === 'r' && !APP.isInputFocused()) {
        e.preventDefault();
        APP.toggleReadingMode();
      }
    });
  },

  toggleShortcuts() {
    let modal = document.getElementById('shortcutsModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'shortcutsModal';
      modal.className = 'fixed inset-0 bg-black/50 z-50 hidden items-center justify-center p-4';
      modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold">⌨️ Raccourcis Clavier</h2>
            <button onclick="Navigation.closeShortcuts()" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">✕</button>
          </div>
          <div class="space-y-3">
            <div class="flex justify-between items-center py-2 border-b dark:border-gray-700">
              <span>Recherche</span>
              <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">/</kbd>
            </div>
            <div class="flex justify-between items-center py-2 border-b dark:border-gray-700">
              <span>Recherche (Ctrl)</span>
              <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">Ctrl + K</kbd>
            </div>
            <div class="flex justify-between items-center py-2 border-b dark:border-gray-700">
              <span>Section suivante</span>
              <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">→</kbd>
            </div>
            <div class="flex justify-between items-center py-2 border-b dark:border-gray-700">
              <span>Section précédente</span>
              <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">←</kbd>
            </div>
            <div class="flex justify-between items-center py-2 border-b dark:border-gray-700">
              <span>Marquer en favoris</span>
              <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">B</kbd>
            </div>
            <div class="flex justify-between items-center py-2 border-b dark:border-gray-700">
              <span>Mode lecture</span>
              <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">R</kbd>
            </div>
            <div class="flex justify-between items-center py-2 border-b dark:border-gray-700">
              <span>Mode sombre</span>
              <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">D</kbd>
            </div>
            <div class="flex justify-between items-center py-2">
              <span>Afficher aide</span>
              <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">?</kbd>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
    modal.classList.toggle('hidden');
    modal.classList.toggle('flex');
  },

  closeShortcuts() {
    const modal = document.getElementById('shortcutsModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  },

  openSearch() {
    const modal = document.getElementById('searchModal');
    if (!modal) return;
    if (!modal.classList.contains('hidden')) {
      document.getElementById('searchInput')?.focus();
      return;
    }
    this._searchPreviousFocus = document.activeElement;
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    const input = document.getElementById('searchInput');
    if (input) {
      input.focus();
      input.select();
    }
    this._onSearchTabTrap = (e) => {
      if (e.key !== 'Tab') return;
      const panel = document.getElementById('searchModalPanel');
      if (!panel || !modal.contains(document.activeElement)) return;
      const focusables = [...panel.querySelectorAll('button:not([disabled]), input:not([disabled])')];
      if (focusables.length < 2) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', this._onSearchTabTrap, true);
  },

  closeSearch() {
    if (this._onSearchTabTrap) {
      document.removeEventListener('keydown', this._onSearchTabTrap, true);
      this._onSearchTabTrap = null;
    }
    const modal = document.getElementById('searchModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
      const input = document.getElementById('searchInput');
      if (input) input.value = '';
      document.querySelectorAll('.search-result').forEach(el => el.classList.remove('hidden'));
    }
    const prev = this._searchPreviousFocus;
    this._searchPreviousFocus = null;
    if (prev && typeof prev.focus === 'function') {
      try {
        prev.focus();
      } catch (_) { /* ignore */ }
    }
  },

  setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.filterSections(e.target.value));
    }
  },

  filterSections(query) {
    const lower = query.toLowerCase();
    document.querySelectorAll('.search-result').forEach(el => {
      const text = el.textContent.toLowerCase();
      el.classList.toggle('hidden', !text.includes(lower));
    });
  }
};
