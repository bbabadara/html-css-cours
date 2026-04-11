// Formation HTML CSS - Application JavaScript
// Version 6.0 - Enhanced Features

const APP = {
  currentSection: 0,
  completedSections: new Set(),
  exerciseScore: 0,
  exerciseCompleted: new Set(),
  badges: [],
  notes: {},
  bookmarks: new Set(),
  nightMode: false,
  readingMode: false,

  get sections() { return CONFIG.sections; },

  init() {
    Progress.load();
    Progress.loadBadges();
    Notes.load();
    this.loadBookmarks();
    this.setupDarkMode();
    Navigation.setupScrollSpy();
    this.setupFadeIn();
    Navigation.setupKeyboardShortcuts();
    Notes.setup();
    Navigation.updateNavActive();
    Progress.update();
    Progress.checkBadges();
    this.runCode();
    this.updateLineNumbers();
    this.setupBackToTop();
    this.initFirstVisit();
    this.buildNavigation();
    Navigation.setupSearch();
    this.setupShortcutsButton();
    this.highlightCode();
  },

  highlightCode() {
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll();
    }
  },

  buildNavigation() {
    Navigation.buildSidebar();
    Navigation.buildMobileNav();
    Navigation.buildSearchResults();
    Progress.updateDisplay();
  },

  loadProgress: () => Progress.load(),
  saveProgress: () => Progress.save(),
  loadNotes: () => Notes.load(),
  saveNotes: () => Notes.save(),
  loadBadges: () => Progress.loadBadges(),
  saveBadges: () => Progress.saveBadges(),

  initFirstVisit() {
    const visited = SafeStorage.get('visited');
    if (!visited) {
      setTimeout(() => {
        this.showWelcome();
        SafeStorage.set('visited', 'true');
      }, 500);
    }
    const darkIcon = document.getElementById('darkIcon');
    if (darkIcon) {
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        darkIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
      } else {
        darkIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';
      }
    }
  },

  showWelcome() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md text-center">
        <div class="text-6xl mb-4">👋</div>
        <h2 class="text-2xl font-bold mb-4">Bienvenue !</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-6">Apprenez HTML, CSS et JavaScript pour créer des sites web professionnels.</p>
        <button onclick="this.closest('.fixed').remove(); APP.confetti();" 
                class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90">
          Commencer ! 🚀
        </button>
      </div>
    `;
    document.body.appendChild(modal);
  },

  setupDarkMode() {
    if (SafeStorage.get('darkMode') === 'true' ||
        (!SafeStorage.get('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  },

  toggleDark() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    SafeStorage.set('darkMode', isDark);
    const darkIcon = document.getElementById('darkIcon');
    if (darkIcon) {
      if (isDark) {
        darkIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
      } else {
        darkIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';
      }
    }
  },

  navigateTo: (id) => Navigation.navigateTo(id),
  navigateNext: () => Navigation.navigateNext(),
  navigatePrev: () => Navigation.navigatePrev(),
  updateNavActive: () => Navigation.updateNavActive(),
  openSearch: () => Navigation.openSearch(),
  closeSearch: () => Navigation.closeSearch(),
  filterSections: (q) => Navigation.filterSections(q),

  setupFadeIn() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  },

  isInputFocused() {
    const tag = document.activeElement.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
  },

  setupNotes: () => Notes.setup(),
  saveNote: (id) => Notes.saveNote(id),
  toggleNotes: (id) => Notes.toggle(id),

  toggleCollapsible(btn) {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('svg');
    if (content) content.classList.toggle('open');
    if (icon) icon.style.transform = content.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
  },

  checkQuiz: (btn, correct, quizId) => Quiz.checkAnswer(btn, correct, quizId),
  checkHTMLTagsQuiz: (btn, correct) => Quiz.htmlTagsQuiz(btn, correct),
  checkStructureQuiz: (btn, correct) => Quiz.structureQuiz(btn, correct),
  checkHeadingQuiz: (btn, correct) => Quiz.headingQuiz(btn, correct),
  checkListQuiz: (btn, correct) => Quiz.listQuiz(btn, correct),
  checkLinkQuiz: (btn, correct) => Quiz.linkQuiz(btn, correct),
  checkSelectorQuiz: (btn, correct) => Quiz.selectorQuiz(btn, correct),
  checkFontQuiz: (btn, correct) => Quiz.fontQuiz(btn, correct),
  checkBoxQuiz: (btn, correct) => Quiz.boxQuiz(btn, correct),
  checkFormQuiz: (btn, correct) => Quiz.formQuiz(btn, correct),
  checkResponsiveQuiz: (btn, correct) => Quiz.responsiveQuiz(btn, correct),
  checkJSQuiz: (btn, correct) => Quiz.jsQuiz(btn, correct),

  checkBadges: () => Progress.checkBadges(),

  confetti() {
    const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899'];
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `position:fixed;width:10px;height:10px;background:${colors[Math.floor(Math.random() * colors.length)]};left:${Math.random() * 100}vw;top:-10px;border-radius:${Math.random() > 0.5 ? '50%' : '0'};z-index:9999;pointer-events:none;animation:confetti-fall ${2 + Math.random() * 2}s linear forwards`;
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 4000);
    }
  },

  runCode() {
    const code = document.getElementById('codeEditor');
    const frame = document.getElementById('previewFrame');
    if (code && frame) frame.srcdoc = code.value;
  },

  updateLineNumbers() {
    const editor = document.getElementById('codeEditor');
    const lineNumbers = document.getElementById('lineNumbers');
    if (editor && lineNumbers) {
      const lines = editor.value.split('\n').length;
      lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
    }
  },

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  setupBackToTop() {
    const btn = document.getElementById('backToTop');
    if (btn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
          btn.classList.remove('opacity-0', 'pointer-events-none');
          btn.classList.add('opacity-100');
        } else {
          btn.classList.add('opacity-0', 'pointer-events-none');
          btn.classList.remove('opacity-100');
        }
      });
    }
  },

  copyCode() {
    const editor = document.getElementById('codeEditor');
    if (editor) {
      navigator.clipboard.writeText(editor.value).then(() => {
        this.showToast('Code copié !');
      });
    }
  },

  copyCodeBlock(btn) {
    const codeBlock = btn.closest('.code-block');
    const code = codeBlock.querySelector('code') || codeBlock.querySelector('pre');
    if (code) {
      const text = code.textContent || code.innerText;
      navigator.clipboard.writeText(text).then(() => {
        btn.innerHTML = '✓ Copié !';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = 'Copier';
          btn.classList.remove('copied');
        }, 2000);
      });
    }
  },

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  },

  resetProgress: () => Progress.reset(),

  closeMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.add('hidden');
  },

  toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('hidden');
  },

  // Bookmarks
  loadBookmarks() {
    const arr = SafeStorage.parseJSON('courseBookmarks', null);
    if (Array.isArray(arr)) this.bookmarks = new Set(arr);
  },

  saveBookmarks() {
    SafeStorage.set('courseBookmarks', JSON.stringify([...this.bookmarks]));
  },

  toggleBookmark(sectionId) {
    if (this.bookmarks.has(sectionId)) {
      this.bookmarks.delete(sectionId);
      this.showToast('Favori supprimé');
    } else {
      this.bookmarks.add(sectionId);
      this.showToast('Favori ajouté ★');
      this.confetti();
    }
    this.saveBookmarks();
    Navigation.buildSidebar();
  },

  exportNotes() {
    const data = {
      notes: this.notes,
      bookmarks: [...this.bookmarks],
      progress: [...this.completedSections],
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formation-html-notes.json';
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('Notes exportées !');
  },

  exportNotesTXT() {
    let text = '=== FORMATION HTML/CSS - MES NOTES ===\n\n';
    CONFIG.navItems.forEach(item => {
      if (this.notes[item.id] && this.notes[item.id].trim()) {
        text += `## ${item.chapter} - ${item.name}\n${this.notes[item.id]}\n\n`;
      }
    });
    text += `\n--- Exporté le ${new Date().toLocaleDateString('fr-FR')} ---`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formation-html-notes.txt';
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('Notes exportées (TXT) !');
  },

  // Reading Mode
  toggleReadingMode() {
    this.readingMode = !this.readingMode;
    document.body.classList.toggle('reading-mode', this.readingMode);
    
    // Ensure sidebar is properly hidden in reading mode
    const sidebar = document.getElementById('sidebar');
    const mobileMenu = document.getElementById('mobileMenu');
    const topNav = document.getElementById('topNav');
    const menuToggle = document.getElementById('readingModeMenuToggle');
    
    if (this.readingMode) {
      if (sidebar) sidebar.style.display = 'none';
      if (mobileMenu) mobileMenu.style.display = 'none';
      if (topNav) topNav.style.display = 'none';
      
      // Add fullscreen class for immersive experience
      document.body.classList.add('fullscreen');
      
      // Show menu toggle button
      if (menuToggle) {
        menuToggle.classList.remove('hidden');
        setTimeout(() => {
          menuToggle.classList.remove('opacity-0', 'pointer-events-none');
        }, 100);
      }
    } else {
      if (sidebar) sidebar.style.display = '';
      if (mobileMenu) mobileMenu.style.display = '';
      if (topNav) topNav.style.display = '';
      
      // Remove fullscreen class
      document.body.classList.remove('fullscreen');
      
      // Hide menu toggle button
      if (menuToggle) {
        menuToggle.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => {
          menuToggle.classList.add('hidden');
        }, 300);
      }
    }
    
    this.showToast(this.readingMode ? 'Mode lecture activé' : 'Mode lecture désactivé');
  },

  // Reading Mode Menu Toggle
  toggleReadingModeMenu() {
    const menuToggle = document.getElementById('readingModeMenuToggle');
    const sidebar = document.getElementById('sidebar');
    const mobileMenu = document.getElementById('mobileMenu');
    const topNav = document.getElementById('topNav');
    
    if (menuToggle.classList.contains('hidden')) {
      menuToggle.classList.remove('hidden');
      menuToggle.classList.remove('opacity-0', 'pointer-events-none');
      
      if (sidebar) sidebar.style.display = '';
      if (mobileMenu) mobileMenu.style.display = '';
      if (topNav) topNav.style.display = '';
      
      this.showToast('Menu restauré');
    } else {
      // Hide menu and return to reading mode
      menuToggle.classList.add('hidden');
      menuToggle.classList.add('opacity-0', 'pointer-events-none');
      
      if (sidebar) sidebar.style.display = 'none';
      if (mobileMenu) mobileMenu.style.display = 'none';
      if (topNav) topNav.style.display = 'none';
      
      this.showToast('Menu masqué');
    }
  },

  // Shortcuts button in header
  setupShortcutsButton() {
    const shortcutsBtn = document.getElementById('shortcutsBtn');
    if (shortcutsBtn) {
      shortcutsBtn.addEventListener('click', () => Navigation.toggleShortcuts());
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  APP.init();
  
  // Register Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW registered'))
      .catch(err => console.log('SW registration failed:', err));
  }
});

const confettiStyle = document.createElement('style');
confettiStyle.textContent = '@keyframes confetti-fall { to { transform: translateY(100vh) rotate(720deg); opacity: 0; } }';
document.head.appendChild(confettiStyle);
