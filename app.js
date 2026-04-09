// Formation HTML CSS - Application JavaScript
// Version: 3.0

const APP = {
  sections: ['intro', 'internet', 'html', 'css', 'box', 'flex', 'responsive', 'forms', 'tables', 'js', 'projects', 'exercises', 'editor'],
  currentSection: 0,
  completedSections: new Set(),
  exerciseScore: 0,
  exerciseCompleted: new Set(),
  badges: [],
  notes: {},
  nightMode: false,

  init() {
    this.loadProgress();
    this.loadNotes();
    this.loadBadges();
    this.setupDarkMode();
    this.setupScrollSpy();
    this.setupFadeIn();
    this.setupKeyboardShortcuts();
    this.setupSearch();
    this.setupNotes();
    this.updateNavActive();
    this.updateProgress();
    this.updateExerciseScore();
    this.checkBadges();
    this.runCode();
    this.initFirstVisit();
  },

  loadProgress() {
    const saved = localStorage.getItem('courseProgress');
    if (saved) this.completedSections = new Set(JSON.parse(saved));
    const savedSection = localStorage.getItem('currentSection');
    if (savedSection) this.currentSection = parseInt(savedSection);
    const savedScore = localStorage.getItem('exerciseScore');
    if (savedScore) this.exerciseScore = parseInt(savedScore);
    const savedCompleted = localStorage.getItem('exerciseCompleted');
    if (savedCompleted) this.exerciseCompleted = new Set(JSON.parse(savedCompleted));
  },

  saveProgress() {
    localStorage.setItem('courseProgress', JSON.stringify([...this.completedSections]));
    localStorage.setItem('currentSection', this.currentSection.toString());
    localStorage.setItem('exerciseScore', this.exerciseScore.toString());
    localStorage.setItem('exerciseCompleted', JSON.stringify([...this.exerciseCompleted]));
  },

  loadNotes() {
    const saved = localStorage.getItem('courseNotes');
    if (saved) this.notes = JSON.parse(saved);
  },

  saveNotes() {
    localStorage.setItem('courseNotes', JSON.stringify(this.notes));
  },

  loadBadges() {
    const saved = localStorage.getItem('courseBadges');
    if (saved) this.badges = JSON.parse(saved);
  },

  saveBadges() {
    localStorage.setItem('courseBadges', JSON.stringify(this.badges));
  },

  initFirstVisit() {
    const visited = localStorage.getItem('visited');
    if (!visited) {
      setTimeout(() => {
        this.showWelcome();
        localStorage.setItem('visited', 'true');
      }, 500);
    }
    document.getElementById('darkIcon').textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
    document.getElementById('sidebarDarkIcon').textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
  },

  showWelcome() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md text-center">
        <div class="text-6xl mb-4">👋</div>
        <h2 class="text-2xl font-bold mb-4">Bienvenue !</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-6">Apprenez HTML, CSS et JavaScript pour créer des sites web professionnels.</p>
        <button onclick="this.closest('.fixed').remove(); APP.confetti();" class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90">
          Commencer ! 🚀
        </button>
      </div>
    `;
    document.body.appendChild(modal);
  },

  setupDarkMode() {
    if (localStorage.getItem('darkMode') === 'true' || 
        (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  },

  toggleDark() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
    document.getElementById('darkIcon').textContent = isDark ? '☀️' : '🌙';
    document.getElementById('sidebarDarkIcon').textContent = isDark ? '☀️' : '🌙';
  },

  toggleNightMode() {
    this.nightMode = !this.nightMode;
    document.body.classList.toggle('night-reading', this.nightMode);
    localStorage.setItem('nightMode', this.nightMode);
  },

  navigateTo(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      this.currentSection = this.sections.indexOf(sectionId);
      this.updateNavActive();
      this.updateProgress();
      this.saveProgress();
      this.closeMobileMenu();
    }
  },

  navigateNext() {
    if (this.currentSection < this.sections.length - 1) {
      this.currentSection++;
      this.navigateTo(this.sections[this.currentSection]);
    }
  },

  navigatePrev() {
    if (this.currentSection > 0) {
      this.currentSection--;
      this.navigateTo(this.sections[this.currentSection]);
    }
  },

  updateNavActive() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.section === this.sections[this.currentSection]) {
        btn.classList.add('active');
      }
    });
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    if (btnPrev) {
      btnPrev.disabled = this.currentSection === 0;
      btnPrev.classList.toggle('opacity-50', this.currentSection === 0);
    }
    if (btnNext) {
      btnNext.disabled = this.currentSection === this.sections.length - 1;
      btnNext.classList.toggle('opacity-50', this.currentSection === this.sections.length - 1);
    }
  },

  setupScrollSpy() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const index = this.sections.indexOf(id);
          if (index !== -1) {
            this.currentSection = index;
            this.completedSections.add(id);
            this.updateNavActive();
            this.updateProgress();
            this.saveProgress();
            this.checkBadges();
          }
        }
      });
    }, { threshold: 0.3 });
    this.sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  },

  updateProgress() {
    const progress = (this.completedSections.size / this.sections.length) * 100;
    const fill = document.getElementById('progressFill');
    const sidebar = document.getElementById('progressBarSidebar');
    const percent = document.getElementById('progressPercent');
    if (fill) fill.style.width = progress + '%';
    if (sidebar) sidebar.style.width = progress + '%';
    if (percent) percent.textContent = Math.round(progress) + '%';
  },

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

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && !this.isInputFocused()) {
        e.preventDefault();
        this.openSearch();
      }
      if (e.key === 'Escape') {
        this.closeSearch();
      }
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        this.openSearch();
      }
      if (e.key === 'ArrowRight' && !this.isInputFocused()) {
        this.navigateNext();
      }
      if (e.key === 'ArrowLeft' && !this.isInputFocused()) {
        this.navigatePrev();
      }
      if (e.key === 'n' && e.altKey && !this.isInputFocused()) {
        e.preventDefault();
        this.toggleNightMode();
      }
    });
  },

  isInputFocused() {
    const tag = document.activeElement.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
  },

  setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.filterSections(e.target.value));
    }
  },

  openSearch() {
    const modal = document.getElementById('searchModal');
    if (modal) {
      modal.classList.remove('hidden');
      document.getElementById('searchInput').focus();
    }
  },

  closeSearch() {
    const modal = document.getElementById('searchModal');
    if (modal) {
      modal.classList.add('hidden');
      const input = document.getElementById('searchInput');
      if (input) input.value = '';
      document.querySelectorAll('.search-result').forEach(el => el.classList.remove('hidden'));
    }
  },

  filterSections(query) {
    const lower = query.toLowerCase();
    document.querySelectorAll('.search-result').forEach(el => {
      const text = el.textContent.toLowerCase();
      el.classList.toggle('hidden', !text.includes(lower));
    });
  },

  setupNotes() {
    this.sections.forEach(id => {
      const noteEl = document.getElementById('note-' + id);
      if (noteEl && this.notes[id]) {
        noteEl.value = this.notes[id];
      }
    });
  },

  saveNote(sectionId) {
    const noteEl = document.getElementById('note-' + sectionId);
    if (noteEl) {
      this.notes[sectionId] = noteEl.value;
      this.saveNotes();
    }
  },

  toggleNotes(sectionId) {
    const panel = document.getElementById('notes-panel-' + sectionId);
    const btn = document.getElementById('notes-btn-' + sectionId);
    if (panel) panel.classList.toggle('hidden');
    if (btn) {
      btn.classList.toggle('bg-yellow-100');
      btn.classList.toggle('dark:bg-yellow-900');
    }
  },

  toggleCollapsible(btn) {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('svg');
    if (content) content.classList.toggle('open');
    if (icon) icon.style.transform = content.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
  },

  checkQuiz(btn, correct, quizId) {
    const result = document.getElementById('result-' + quizId);
    const allBtns = document.querySelectorAll(`[data-quiz="${quizId}"]`);
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    if (correct) {
      btn.classList.add('bg-green-200');
      if (result) {
        result.textContent = '✅ Bonne réponse !';
        result.className = 'mt-2 text-sm font-semibold text-green-600';
      }
      this.completedSections.add('internet');
      this.updateProgress();
      this.saveProgress();
      this.checkBadges();
    } else {
      btn.classList.add('bg-red-200');
      if (result) {
        result.textContent = '❌ Réessayez !';
        result.className = 'mt-2 text-sm font-semibold text-red-600';
      }
    }
  },

  checkExHTML(num) {
    const result = document.getElementById('result-ex-html-' + num);
    if (result) {
      result.textContent = '✅ Correct ! La bonne réponse était B.';
      result.className = 'mt-2 text-sm font-semibold text-green-600';
    }
    const key = 'html-' + num;
    if (!this.exerciseCompleted.has(key)) {
      this.exerciseCompleted.add(key);
      this.exerciseScore = Math.min(this.exerciseScore + 1, 10);
      this.updateExerciseScore();
      this.confetti();
    }
    this.saveProgress();
    this.checkBadges();
  },

  checkImgQuiz(btn, correct) {
    const result = document.getElementById('result-img-quiz');
    const allBtns = document.querySelectorAll('.quiz-img');
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    if (correct) {
      btn.classList.add('bg-green-200');
      if (!this.exerciseCompleted.has('img-1')) {
        this.exerciseCompleted.add('img-1');
        this.exerciseScore = Math.min(this.exerciseScore + 1, 10);
        this.updateExerciseScore();
        this.confetti();
      }
      if (result) {
        result.textContent = '✅ Correct ! La balise <img> nécessite src et alt.';
        result.className = 'mt-2 text-sm font-semibold text-green-600';
      }
    } else {
      btn.classList.add('bg-red-200');
      if (result) {
        result.textContent = '❌ Réessayez !';
        result.className = 'mt-2 text-sm font-semibold text-red-600';
      }
    }
    this.saveProgress();
  },

  checkCSSQuiz(btn, correct, exNum) {
    const result = document.getElementById('result-css-quiz-' + exNum);
    const allBtns = document.querySelectorAll('.quiz-css-' + exNum);
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    if (correct) {
      btn.classList.add('bg-green-200');
      if (result) {
        result.textContent = '✅ Correct ! color est la propriété pour la couleur du texte.';
        result.className = 'mt-2 text-sm font-semibold text-green-600';
      }
      const key = 'css-' + exNum;
      if (!this.exerciseCompleted.has(key)) {
        this.exerciseCompleted.add(key);
        this.exerciseScore = Math.min(this.exerciseScore + 1, 10);
        this.updateExerciseScore();
        this.confetti();
      }
    } else {
      btn.classList.add('bg-red-200');
      if (result) {
        result.textContent = '❌ Réessayez !';
        result.className = 'mt-2 text-sm font-semibold text-red-600';
      }
    }
    this.saveProgress();
    this.checkBadges();
  },

  checkBoxQuiz(btn, correct, exNum) {
    const result = document.getElementById('result-box-quiz-' + exNum);
    const allBtns = document.querySelectorAll('.quiz-box-' + exNum);
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    if (correct) {
      btn.classList.add('bg-green-200');
      if (result) {
        result.textContent = '✅ Correct ! padding est l\'espace intérieur.';
        result.className = 'mt-2 text-sm font-semibold text-green-600';
      }
      const key = 'box-' + exNum;
      if (!this.exerciseCompleted.has(key)) {
        this.exerciseCompleted.add(key);
        this.exerciseScore = Math.min(this.exerciseScore + 1, 10);
        this.updateExerciseScore();
        this.confetti();
      }
    } else {
      btn.classList.add('bg-red-200');
      if (result) {
        result.textContent = '❌ Réessayez !';
        result.className = 'mt-2 text-sm font-semibold text-red-600';
      }
    }
    this.saveProgress();
    this.checkBadges();
  },

  checkFlexQuiz(btn, correct, exNum) {
    const result = document.getElementById('result-flex-quiz-' + exNum);
    const allBtns = document.querySelectorAll('.quiz-flex-' + exNum);
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    if (correct) {
      btn.classList.add('bg-green-200');
      if (result) {
        result.textContent = '✅ Correct ! display: flex active Flexbox.';
        result.className = 'mt-2 text-sm font-semibold text-green-600';
      }
      const key = 'flex-' + exNum;
      if (!this.exerciseCompleted.has(key)) {
        this.exerciseCompleted.add(key);
        this.exerciseScore = Math.min(this.exerciseScore + 1, 10);
        this.updateExerciseScore();
        this.confetti();
      }
    } else {
      btn.classList.add('bg-red-200');
      if (result) {
        result.textContent = '❌ Réessayez !';
        result.className = 'mt-2 text-sm font-semibold text-red-600';
      }
    }
    this.saveProgress();
    this.checkBadges();
  },

  checkFormQuiz(btn, correct) {
    const result = document.getElementById('result-form-quiz');
    const allBtns = document.querySelectorAll('.quiz-form');
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    if (correct) {
      btn.classList.add('bg-green-200');
      if (!this.exerciseCompleted.has('form-1')) {
        this.exerciseCompleted.add('form-1');
        this.exerciseScore = Math.min(this.exerciseScore + 1, 10);
        this.updateExerciseScore();
        this.confetti();
      }
      if (result) {
        result.textContent = '✅ Correct ! required empêche l\'envoi si vide.';
        result.className = 'mt-2 text-sm font-semibold text-green-600';
      }
    } else {
      btn.classList.add('bg-red-200');
      if (result) {
        result.textContent = '❌ Réessayez !';
        result.className = 'mt-2 text-sm font-semibold text-red-600';
      }
    }
    this.saveProgress();
    this.checkBadges();
  },

  checkTableQuiz(btn, correct) {
    const result = document.getElementById('result-table-quiz');
    const allBtns = document.querySelectorAll('.quiz-table');
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    if (correct) {
      btn.classList.add('bg-green-200');
      if (!this.exerciseCompleted.has('table-1')) {
        this.exerciseCompleted.add('table-1');
        this.exerciseScore = Math.min(this.exerciseScore + 1, 10);
        this.updateExerciseScore();
        this.confetti();
      }
      if (result) {
        result.textContent = '✅ Correct ! <th> définit un en-tête.';
        result.className = 'mt-2 text-sm font-semibold text-green-600';
      }
    } else {
      btn.classList.add('bg-red-200');
      if (result) {
        result.textContent = '❌ Réessayez !';
        result.className = 'mt-2 text-sm font-semibold text-red-600';
      }
    }
    this.saveProgress();
    this.checkBadges();
  },

  checkResponsiveQuiz(btn, correct) {
    const result = document.getElementById('result-responsive-quiz');
    const allBtns = document.querySelectorAll('.quiz-responsive');
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    if (correct) {
      btn.classList.add('bg-green-200');
      if (!this.exerciseCompleted.has('responsive-1')) {
        this.exerciseCompleted.add('responsive-1');
        this.exerciseScore = Math.min(this.exerciseScore + 1, 10);
        this.updateExerciseScore();
        this.confetti();
      }
      if (result) {
        result.textContent = '✅ Correct ! md: commence à 768px.';
        result.className = 'mt-2 text-sm font-semibold text-green-600';
      }
    } else {
      btn.classList.add('bg-red-200');
      if (result) {
        result.textContent = '❌ Réessayez !';
        result.className = 'mt-2 text-sm font-semibold text-red-600';
      }
    }
    this.saveProgress();
    this.checkBadges();
  },

  checkEventQuiz(btn, correct) {
    const result = document.getElementById('result-event-quiz');
    const allBtns = document.querySelectorAll('.quiz-event');
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    if (correct) {
      btn.classList.add('bg-green-200');
      if (!this.exerciseCompleted.has('event-1')) {
        this.exerciseCompleted.add('event-1');
        this.exerciseScore = Math.min(this.exerciseScore + 1, 10);
        this.updateExerciseScore();
        this.confetti();
      }
      if (result) {
        result.textContent = '✅ Correct ! addEventListener est la méthode standard.';
        result.className = 'mt-2 text-sm font-semibold text-green-600';
      }
    } else {
      btn.classList.add('bg-red-200');
      if (result) {
        result.textContent = '❌ Réessayez !';
        result.className = 'mt-2 text-sm font-semibold text-red-600';
      }
    }
    this.saveProgress();
    this.checkBadges();
  },

  checkJSQuiz(btn, correct, exNum) {
    const result = document.getElementById('result-js-quiz-' + exNum);
    const allBtns = document.querySelectorAll('.quiz-js-' + exNum);
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    if (correct) {
      btn.classList.add('bg-green-200');
      if (result) {
        result.textContent = '✅ Correct !';
        result.className = 'mt-2 text-sm font-semibold text-green-600';
      }
      const key = 'js-' + exNum;
      if (!this.exerciseCompleted.has(key)) {
        this.exerciseCompleted.add(key);
        this.exerciseScore = Math.min(this.exerciseScore + 1, 10);
        this.updateExerciseScore();
        this.confetti();
      }
    } else {
      btn.classList.add('bg-red-200');
      if (result) {
        result.textContent = '❌ Réessayez !';
        result.className = 'mt-2 text-sm font-semibold text-red-600';
      }
    }
    this.saveProgress();
    this.checkBadges();
  },

  updateExerciseScore() {
    const scoreEl = document.getElementById('exerciseScore');
    const scoreDisplayEl = document.getElementById('exerciseScoreDisplay');
    const messageEl = document.getElementById('scoreMessage');
    if (scoreEl) scoreEl.textContent = this.exerciseScore + '/10';
    if (scoreDisplayEl) scoreDisplayEl.textContent = this.exerciseScore + '/10';
    if (messageEl) {
      const messages = ['Commencez les exercices !', 'Bien commencé !', 'Continuez comme ça !', 'Vous êtes sur la bonne voie !', 'Impressionnant !', 'Proche de la perfection !', '🎉 Score parfait !'];
      const level = Math.min(this.exerciseScore, 9);
      const msgIndex = Math.min(Math.floor(level / 2) + 1, messages.length - 1);
      messageEl.textContent = messages[msgIndex];
    }
  },

  checkBadges() {
    const badgeDefinitions = [
      { id: 'first-step', condition: () => this.completedSections.size >= 1 },
      { id: 'html-master', condition: () => this.completedSections.has('html') && this.completedSections.has('internet') },
      { id: 'css-artist', condition: () => this.completedSections.has('css') && this.completedSections.has('box') },
      { id: 'flex-wizard', condition: () => this.completedSections.has('flex') },
      { id: 'responsive-guru', condition: () => this.completedSections.has('responsive') },
      { id: 'js-novice', condition: () => this.completedSections.has('js') },
      { id: 'project-builder', condition: () => this.completedSections.has('projects') },
      { id: 'perfectionist', condition: () => this.exerciseScore >= 8 },
      { id: 'course-complete', condition: () => this.completedSections.size >= this.sections.length }
    ];
    badgeDefinitions.forEach(badge => {
      if (!this.badges.includes(badge.id) && badge.condition()) {
        this.badges.push(badge.id);
        this.showBadgeNotification(badge.id);
      }
    });
    this.saveBadges();
    this.updateBadgesDisplay();
  },

  showBadgeNotification(badgeId) {
    const names = {
      'first-step': 'Premier Pas', 'html-master': 'Maître HTML', 'css-artist': 'Artiste CSS',
      'flex-wizard': 'Magicien Flexbox', 'responsive-guru': 'Guru Responsive',
      'js-novice': 'Novice JavaScript', 'project-builder': 'Bâtisseur', 'perfectionist': 'Perfectionniste', 'course-complete': 'Diplômé'
    };
    const icons = {
      'first-step': '🚀', 'html-master': '🏗️', 'css-artist': '🎨',
      'flex-wizard': '📐', 'responsive-guru': '📱', 'js-novice': '⚡',
      'project-builder': '🏆', 'perfectionist': '⭐', 'course-complete': '🎓'
    };
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-8 right-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50';
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-3xl">${icons[badgeId] || '🏆'}</span>
        <div>
          <div class="font-bold">Nouveau Badge !</div>
          <div class="text-sm opacity-90">${names[badgeId] || badgeId}</div>
        </div>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  },

  updateBadgesDisplay() {
    const container = document.getElementById('badgesContainer');
    const badgeCount = document.getElementById('badgeCount');
    const showcaseContainer = document.getElementById('badgesShowcase');
    const showcaseCount = document.getElementById('badgeCountIntro');
    const badgeDefinitions = [
      { id: 'first-step', name: 'Premier Pas', icon: '🚀' },
      { id: 'html-master', name: 'Maître HTML', icon: '🏗️' },
      { id: 'css-artist', name: 'Artiste CSS', icon: '🎨' },
      { id: 'flex-wizard', name: 'Magicien Flexbox', icon: '📐' },
      { id: 'responsive-guru', name: 'Guru Responsive', icon: '📱' },
      { id: 'js-novice', name: 'Novice JavaScript', icon: '⚡' },
      { id: 'project-builder', name: 'Bâtisseur', icon: '🏆' },
      { id: 'perfectionist', name: 'Perfectionniste', icon: '⭐' },
      { id: 'course-complete', name: 'Diplômé', icon: '🎓' }
    ];
    const badgeHTML = badgeDefinitions.map(badge => {
      const isUnlocked = this.badges.includes(badge.id);
      return `
        <div class="badge-item flex-shrink-0 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center cursor-pointer relative group" title="${badge.name}">
          <span class="text-lg">${isUnlocked ? badge.icon : '🔒'}</span>
        </div>
      `;
    }).join('');
    if (container) container.innerHTML = badgeHTML;
    if (showcaseContainer) {
      showcaseContainer.innerHTML = badgeDefinitions.map(badge => {
        const isUnlocked = this.badges.includes(badge.id);
        return `
          <div class="flex flex-col items-center gap-1 p-2 rounded-lg ${isUnlocked ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-gray-100 dark:bg-gray-700/50'}">
            <span class="text-2xl ${isUnlocked ? '' : 'grayscale opacity-50'}">${isUnlocked ? badge.icon : '🔒'}</span>
            <span class="text-xs text-center text-gray-600 dark:text-gray-400 truncate w-full">${badge.name}</span>
          </div>
        `;
      }).join('');
    }
    if (badgeCount) badgeCount.textContent = `${this.badges.length}/${badgeDefinitions.length}`;
    if (showcaseCount) showcaseCount.textContent = `${this.badges.length}/${badgeDefinitions.length}`;
  },

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

  resetCode() {
    const editor = document.getElementById('codeEditor');
    if (editor) {
      editor.value = '<h1>Hello World!</h1>\n<p>Bienvenue sur ma page !</p>\n<style>\n  body {\n    font-family: Arial;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    min-height: 100vh;\n    margin: 0;\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    color: white;\n  }\n  h1 { font-size: 3rem; }\n  p { font-size: 1.2rem; opacity: 0.9; }\n</style>';
      this.runCode();
    }
  },

  loadExample(name) {
    const examples = {
      card: '<div style="max-width:300px;padding:20px;background:white;border-radius:10px;box-shadow:0 4px 6px rgba(0,0,0,0.1);font-family:Arial"><h2 style="color:#333">Ma Carte</h2><p style="color:#666">Ceci est une carte.</p><button style="background:#3B82F6;color:white;border:none;padding:10px 20px;border-radius:5px">Cliquez-moi</button></div>',
      layout: '<div style="display:flex;gap:20px;padding:20px;font-family:Arial;background:#f3f4f6;min-height:200px;align-items:center;justify-content:center"><div style="background:#3B82F6;width:100px;height:100px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold">1</div><div style="background:#10B981;width:100px;height:100px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold">2</div><div style="background:#8B5CF6;width:100px;height:100px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold">3</div></div>',
      button: '<div style="display:flex;flex-direction:column;gap:20px;padding:40px;align-items:center;font-family:Arial;background:#1F2937;min-height:200px;justify-content:center"><button style="background:linear-gradient(135deg,#667eea,#764ba2);color:white;border:none;padding:15px 30px;border-radius:25px;font-size:16px;cursor:pointer">Bouton Cool</button><p style="color:#9CA3AF;font-size:14px">Survolez le bouton !</p></div>',
      navbar: '<nav style="display:flex;justify-content:space-between;align-items:center;padding:1rem 2rem;background:#1F2937;color:white;font-family:Arial"><div style="font-weight:bold;font-size:1.5rem">MonSite</div><div style="display:flex;gap:20px"><a href="#" style="color:white;text-decoration:none">Accueil</a><a href="#" style="color:white;text-decoration:none">À propos</a><a href="#" style="color:white;text-decoration:none">Contact</a></div></nav>',
      form: '<form style="max-width:400px;padding:20px;background:white;border-radius:10px;box-shadow:0 4px 6px rgba(0,0,0,0.1);font-family:Arial"><h2 style="margin-top:0">Contactez-moi</h2><div style="margin-bottom:15px"><label style="display:block;margin-bottom:5px;font-weight:bold">Nom</label><input type="text" placeholder="Votre nom" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:5px;box-sizing:border-box"></div><button type="submit" style="width:100%;padding:12px;background:#3B82F6;color:white;border:none;border-radius:5px;cursor:pointer;font-size:16px">Envoyer</button></form>'
    };
    const editor = document.getElementById('codeEditor');
    if (editor && examples[name]) {
      editor.value = examples[name];
      this.runCode();
    }
  },

  openInNewTab() {
    const code = document.getElementById('codeEditor');
    if (code) {
      const newWindow = window.open('', '_blank');
      newWindow.document.write(code.value);
      newWindow.document.close();
    }
  },

  resetProgress() {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser toute votre progression ?')) {
      localStorage.clear();
      location.reload();
    }
  },

  closeMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.add('hidden');
  },

  toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('hidden');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  APP.init();
});

const confettiStyle = document.createElement('style');
confettiStyle.textContent = '@keyframes confetti-fall { to { transform: translateY(100vh) rotate(720deg); opacity: 0; } }';
document.head.appendChild(confettiStyle);
