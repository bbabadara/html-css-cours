// Formation HTML CSS - Application JavaScript
// Version: 2.0

const APP = {
  sections: ['intro', 'internet', 'html', 'css', 'box', 'flex', 'responsive', 'js', 'projects', 'exercises', 'editor'],
  currentSection: 0,
  completedSections: new Set(),
  exerciseScore: 0,
  badges: [],
  notes: {},
  searchOpen: false,
  nightMode: false,
  
  examples: {
    card: `<div style="max-width: 300px; padding: 20px; background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); font-family: Arial; margin: 20px;">
  <h2 style="color: #333; margin-top: 0;">Ma Carte</h2>
  <p style="color: #666;">Ceci est une belle carte avec du CSS moderne.</p>
  <button style="background: #3B82F6; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Cliquez-moi</button>
</div>`,
    layout: `<div style="display: flex; gap: 20px; padding: 20px; font-family: Arial; background: #f3f4f6; min-height: 200px; align-items: center; justify-content: center;">
  <div style="background: #3B82F6; width: 100px; height: 100px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
  <div style="background: #10B981; width: 100px; height: 100px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">2</div>
  <div style="background: #8B5CF6; width: 100px; height: 100px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">3</div>
</div>`,
    button: `<div style="display: flex; flex-direction: column; gap: 20px; padding: 40px; align-items: center; font-family: Arial; background: #1F2937; min-height: 200px; justify-content: center;">
  <button style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 15px 30px; border-radius: 25px; font-size: 16px; cursor: pointer; transition: transform 0.2s; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
    Bouton Cool
  </button>
  <p style="color: #9CA3AF; font-size: 14px;">Survolez le bouton !</p>
</div>`,
    navbar: `<nav style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; background: #1F2937; color: white; font-family: Arial;">
  <div style="font-weight: bold; font-size: 1.5rem;">MonSite</div>
  <div style="display: flex; gap: 20px;">
    <a href="#" style="color: white; text-decoration: none;">Accueil</a>
    <a href="#" style="color: white; text-decoration: none;">À propos</a>
    <a href="#" style="color: white; text-decoration: none;">Contact</a>
  </div>
</nav>`,
    form: `<form style="max-width: 400px; padding: 20px; background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); font-family: Arial;">
  <h2 style="margin-top: 0;">Contactez-moi</h2>
  <div style="margin-bottom: 15px;">
    <label style="display: block; margin-bottom: 5px; font-weight: bold;">Nom</label>
    <input type="text" placeholder="Votre nom" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box;">
  </div>
  <div style="margin-bottom: 15px;">
    <label style="display: block; margin-bottom: 5px; font-weight: bold;">Email</label>
    <input type="email" placeholder="votre@email.com" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box;">
  </div>
  <button type="submit" style="width: 100%; padding: 12px; background: #3B82F6; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">Envoyer</button>
</form>`
  },

  badgeDefinitions: [
    { id: 'first-step', name: 'Premier Pas', icon: '🚀', condition: () => APP.completedSections.size >= 1 },
    { id: 'html-master', name: 'Maître HTML', icon: '🏗️', condition: () => APP.completedSections.has('html') && APP.completedSections.has('internet') },
    { id: 'css-artist', name: 'Artiste CSS', icon: '🎨', condition: () => APP.completedSections.has('css') && APP.completedSections.has('box') },
    { id: 'flex-wizard', name: 'Magicien Flexbox', icon: '📐', condition: () => APP.completedSections.has('flex') },
    { id: 'responsive-guru', name: 'Guru Responsive', icon: '📱', condition: () => APP.completedSections.has('responsive') },
    { id: 'js-novice', name: 'Novice JavaScript', icon: '⚡', condition: () => APP.completedSections.has('js') },
    { id: 'project-builder', name: 'Bâtisseur de Projets', icon: '🏆', condition: () => APP.completedSections.has('projects') },
    { id: 'perfectionist', name: 'Perfectionniste', icon: '⭐', condition: () => APP.exerciseScore >= 10 },
    { id: 'course-complete', name: 'Diplômé', icon: '🎓', condition: () => APP.completedSections.size >= APP.sections.length }
  ],

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
    if (saved) {
      this.completedSections = new Set(JSON.parse(saved));
    }
    const savedSection = localStorage.getItem('currentSection');
    if (savedSection) {
      this.currentSection = parseInt(savedSection);
    }
    const savedScore = localStorage.getItem('exerciseScore');
    if (savedScore) {
      this.exerciseScore = parseInt(savedScore);
    }
  },

  saveProgress() {
    localStorage.setItem('courseProgress', JSON.stringify([...this.completedSections]));
    localStorage.setItem('currentSection', this.currentSection);
    localStorage.setItem('exerciseScore', this.exerciseScore.toString());
  },

  loadNotes() {
    const saved = localStorage.getItem('courseNotes');
    if (saved) {
      this.notes = JSON.parse(saved);
    }
  },

  saveNotes() {
    localStorage.setItem('courseNotes', JSON.stringify(this.notes));
  },

  loadBadges() {
    const saved = localStorage.getItem('courseBadges');
    if (saved) {
      this.badges = JSON.parse(saved);
    }
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
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md text-center animate-fade-in">
        <div class="text-6xl mb-4">👋</div>
        <h2 class="text-2xl font-bold mb-4">Bienvenue !</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          Apprenez HTML, CSS et JavaScript pour créer des sites web professionnels.
        </p>
        <div class="grid grid-cols-3 gap-4 mb-6 text-sm">
          <div class="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
            <div class="text-2xl mb-1">📚</div>
            <div>10 Chapitres</div>
          </div>
          <div class="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
            <div class="text-2xl mb-1">✏️</div>
            <div>Exercices</div>
          </div>
          <div class="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg">
            <div class="text-2xl mb-1">🏆</div>
            <div>Projets</div>
          </div>
        </div>
        <button onclick="this.closest('.fixed').remove(); APP.confetti();" class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
          Commencer ! 🚀
        </button>
      </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
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
    
    btnPrev.disabled = this.currentSection === 0;
    btnPrev.classList.toggle('opacity-50', this.currentSection === 0);
    btnNext.disabled = this.currentSection === this.sections.length - 1;
    btnNext.classList.toggle('opacity-50', this.currentSection === this.sections.length - 1);
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
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressBarSidebar').style.width = progress + '%';
    document.getElementById('progressPercent').textContent = Math.round(progress) + '%';
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
        this.closeNotes();
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
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const firstResult = document.querySelector('.search-result:not(.hidden)');
          if (firstResult) {
            this.navigateTo(firstResult.dataset.section);
            this.closeSearch();
          }
        }
      });
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
      document.getElementById('searchInput').value = '';
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
    if (panel && btn) {
      panel.classList.toggle('hidden');
      btn.classList.toggle('bg-yellow-100');
      btn.classList.toggle('dark:bg-yellow-900');
    }
  },

  closeNotes() {
    document.querySelectorAll('.notes-panel').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.notes-btn').forEach(el => {
      el.classList.remove('bg-yellow-100', 'dark:bg-yellow-900');
    });
  },

  toggleCollapsible(btn) {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('svg');
    content.classList.toggle('open');
    icon.style.transform = content.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
  },

  checkQuiz(btn, correct, quizId) {
    const result = document.getElementById('result-' + quizId);
    const allBtns = document.querySelectorAll(`[data-quiz="${quizId}"]`);
    
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    
    if (correct) {
      btn.classList.add('bg-green-200');
      btn.classList.add('correct-answer');
      result.textContent = '✅ Bonne réponse !';
      result.className = 'mt-2 text-sm font-semibold text-green-600';
      this.completedSections.add('internet');
      this.updateProgress();
      this.saveProgress();
      this.checkBadges();
    } else {
      btn.classList.add('bg-red-200');
      btn.classList.add('shake');
      result.textContent = '❌ Réessayez !';
      result.className = 'mt-2 text-sm font-semibold text-red-600';
    }
  },

  checkExo1() {
    const input = document.getElementById('exo1-input');
    const answer = document.getElementById('exo1-answer');
    const result = document.getElementById('exo1-result');
    
    if (input.value.trim() === 'Mon Site') {
      answer.textContent = 'Mon Site';
      result.textContent = '✅ Correct !';
      result.className = 'mt-2 text-sm font-semibold text-green-600';
      this.completedSections.add('html');
      this.updateProgress();
      this.saveProgress();
      this.checkBadges();
      this.confetti();
    } else {
      result.textContent = '❌ La réponse est "Mon Site"';
      result.className = 'mt-2 text-sm font-semibold text-red-600';
    }
  },

  checkCSSExo() {
    const errorsDiv = document.getElementById('css-exo-errors');
    const result = document.getElementById('css-exo-result');
    errorsDiv.classList.remove('hidden');
    result.innerHTML = '✅ Erreurs à corriger :<br>• Ligne 2 : ajouter <code class="bg-red-200 px-1 rounded">;</code><br>• Ligne 3 : <code class="bg-red-200 px-1 rounded">fontSize</code> → <code class="bg-green-200 px-1 rounded">font-size</code>';
    result.className = 'mt-2 text-sm font-semibold text-green-600';
    this.exerciseScore = Math.min(this.exerciseScore + 1, 15);
    this.updateExerciseScore();
    this.saveProgress();
    this.checkBadges();
  },

  checkExHTML(num) {
    const input = document.getElementById('ex-html-' + num);
    const result = document.getElementById('result-ex-html-' + num);
    
    if (input.value.trim() === 'Bienvenue') {
      result.textContent = '✅ Correct !';
      result.className = 'mt-2 text-sm font-semibold text-green-600';
      this.exerciseScore = Math.min(this.exerciseScore + 1, 15);
      this.updateExerciseScore();
      this.saveProgress();
      this.checkBadges();
      this.confetti();
    } else {
      result.textContent = '❌ La réponse est "Bienvenue"';
      result.className = 'mt-2 text-sm font-semibold text-red-600';
    }
  },

  checkCSSQuiz(btn, correct, exNum) {
    const result = document.getElementById('result-css-quiz-' + exNum);
    const allBtns = document.querySelectorAll('.quiz-css-' + exNum);
    
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    
    if (correct) {
      btn.classList.add('bg-green-200');
      btn.classList.add('correct-answer');
      result.textContent = '✅ Correct ! color est la propriété pour la couleur du texte.';
      result.className = 'mt-2 text-sm font-semibold text-green-600';
      this.exerciseScore = Math.min(this.exerciseScore + 1, 15);
      this.updateExerciseScore();
      this.saveProgress();
      this.checkBadges();
      this.confetti();
    } else {
      btn.classList.add('bg-red-200');
      btn.classList.add('shake');
      result.textContent = '❌ Réessayez !';
      result.className = 'mt-2 text-sm font-semibold text-red-600';
    }
  },

  checkBoxQuiz(btn, correct, exNum) {
    const result = document.getElementById('result-box-quiz-' + exNum);
    const allBtns = document.querySelectorAll('.quiz-box-' + exNum);
    
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    
    if (correct) {
      btn.classList.add('bg-green-200');
      btn.classList.add('correct-answer');
      result.textContent = '✅ Correct ! padding = espace INTÉRIEUR, margin = espace EXTÉRIEUR.';
      result.className = 'mt-2 text-sm font-semibold text-green-600';
      this.exerciseScore = Math.min(this.exerciseScore + 1, 15);
      this.updateExerciseScore();
      this.saveProgress();
      this.checkBadges();
      this.confetti();
    } else {
      btn.classList.add('bg-red-200');
      btn.classList.add('shake');
      result.textContent = '❌ Réessayez !';
      result.className = 'mt-2 text-sm font-semibold text-red-600';
    }
  },

  checkFlexQuiz(btn, correct, exNum) {
    const result = document.getElementById('result-flex-quiz-' + exNum);
    const allBtns = document.querySelectorAll('.quiz-flex-' + exNum);
    
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    
    if (correct) {
      btn.classList.add('bg-green-200');
      btn.classList.add('correct-answer');
      result.textContent = '✅ Correct ! display: flex active Flexbox sur le conteneur.';
      result.className = 'mt-2 text-sm font-semibold text-green-600';
      this.exerciseScore = Math.min(this.exerciseScore + 1, 15);
      this.updateExerciseScore();
      this.saveProgress();
      this.checkBadges();
      this.confetti();
    } else {
      btn.classList.add('bg-red-200');
      btn.classList.add('shake');
      result.textContent = '❌ Réessayez !';
      result.className = 'mt-2 text-sm font-semibold text-red-600';
    }
  },

  checkJSQuiz(btn, correct, exNum) {
    const result = document.getElementById('result-js-quiz-' + exNum);
    const allBtns = document.querySelectorAll('.quiz-js-' + exNum);
    
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    
    if (correct) {
      btn.classList.add('bg-green-200');
      btn.classList.add('correct-answer');
      result.textContent = '✅ Correct !';
      result.className = 'mt-2 text-sm font-semibold text-green-600';
      this.exerciseScore = Math.min(this.exerciseScore + 1, 15);
      this.updateExerciseScore();
      this.saveProgress();
      this.checkBadges();
      this.confetti();
    } else {
      btn.classList.add('bg-red-200');
      btn.classList.add('shake');
      result.textContent = '❌ Réessayez !';
      result.className = 'mt-2 text-sm font-semibold text-red-600';
    }
  },

  updateExerciseScore() {
    const scoreEl = document.getElementById('exerciseScore');
    const messageEl = document.getElementById('scoreMessage');
    
    if (scoreEl) {
      scoreEl.textContent = this.exerciseScore + '/15';
    }
    
    if (messageEl) {
      const messages = [
        'Commencez les exercices !',
        'Bien commencé !',
        'Continuez comme ça !',
        'Vous êtes sur la bonne voie !',
        'Impressionnant !',
        'Proche de la perfection !',
        '🎉 Score parfait !'
      ];
      const level = Math.min(this.exerciseScore, 14);
      const msgIndex = Math.min(Math.floor(level / 2) + 1, messages.length - 1);
      messageEl.textContent = messages[msgIndex];
    }
  },

  checkBadges() {
    let newBadges = false;
    
    this.badgeDefinitions.forEach(badge => {
      if (!this.badges.includes(badge.id) && badge.condition()) {
        this.badges.push(badge.id);
        newBadges = true;
        this.showBadgeNotification(badge);
      }
    });
    
    if (newBadges) {
      this.saveBadges();
      this.updateBadgesDisplay();
    }
  },

  showBadgeNotification(badge) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-20 lg:bottom-8 right-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-slide-in';
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-3xl">${badge.icon}</span>
        <div>
          <div class="font-bold">Nouveau Badge !</div>
          <div class="text-sm opacity-90">${badge.name}</div>
        </div>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transition = 'opacity 0.5s';
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  },

  updateBadgesDisplay() {
    const container = document.getElementById('badgesContainer');
    const badgeCount = document.getElementById('badgeCount');
    const showcaseContainer = document.getElementById('badgesShowcase');
    const showcaseCount = document.getElementById('badgeCountIntro');
    
    const badgeHTML = this.badgeDefinitions.map(badge => {
      const isUnlocked = this.badges.includes(badge.id);
      const status = badge.condition() ? 'unlocked' : 'locked';
      const actualStatus = isUnlocked ? 'unlocked' : status;
      
      return `
        <div class="badge-item badge-${actualStatus} flex-shrink-0 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center cursor-pointer relative group" 
             title="${badge.name}${isUnlocked ? ' ✅' : ' (à débloquer)'}"
             onclick="APP.showBadgeInfo('${badge.id}')">
          <span class="text-lg">${isUnlocked ? badge.icon : '🔒'}</span>
          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
            ${badge.name}
            <div class="text-center text-yellow-300 mt-1">${isUnlocked ? '✅ Débloqué' : '🔒 À débloquer'}</div>
          </div>
        </div>
      `;
    }).join('');
    
    if (container) {
      container.innerHTML = badgeHTML;
    }
    
    if (showcaseContainer) {
      showcaseContainer.innerHTML = this.badgeDefinitions.map(badge => {
        const isUnlocked = this.badges.includes(badge.id);
        return `
          <div class="flex flex-col items-center gap-1 p-2 rounded-lg ${isUnlocked ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-gray-100 dark:bg-gray-700/50'} transition-all">
            <span class="text-2xl ${isUnlocked ? '' : 'grayscale opacity-50'}">${isUnlocked ? badge.icon : '🔒'}</span>
            <span class="text-xs text-center text-gray-600 dark:text-gray-400 truncate w-full">${badge.name}</span>
          </div>
        `;
      }).join('');
    }
    
    if (badgeCount) {
      badgeCount.textContent = `${this.badges.length}/${this.badgeDefinitions.length}`;
    }
    
    if (showcaseCount) {
      showcaseCount.textContent = `${this.badges.length}/${this.badgeDefinitions.length}`;
    }
  },

  showBadgeInfo(badgeId) {
    const badge = this.badgeDefinitions.find(b => b.id === badgeId);
    if (!badge) return;
    
    const isUnlocked = this.badges.includes(badgeId);
    alert(`${badge.icon} ${badge.name}\n\n${isUnlocked ? '✅ Badge débloqué !' : '🔒 À débloquer'}\n\nCondition: Complétez le cours pour obtenir ce badge.`);
  },

  confetti() {
    const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899'];
    const container = document.body;
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}vw;
        top: -10px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        z-index: 9999;
        pointer-events: none;
        animation: confetti-fall ${2 + Math.random() * 2}s linear forwards;
      `;
      container.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 4000);
    }
  },

  runCode() {
    const code = document.getElementById('codeEditor');
    const frame = document.getElementById('previewFrame');
    if (code && frame) {
      frame.srcdoc = code.value;
    }
  },

  resetCode() {
    const editor = document.getElementById('codeEditor');
    if (editor) {
      editor.value = `<h1>Hello World!</h1>
<p>Bienvenue sur ma page !</p>
<style>
  body {
    font-family: Arial;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    margin: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }
  h1 { font-size: 3rem; }
  p { font-size: 1.2rem; opacity: 0.9; }
</style>`;
      this.runCode();
    }
  },

  loadExample(name) {
    const editor = document.getElementById('codeEditor');
    if (editor && this.examples[name]) {
      editor.value = this.examples[name];
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
    if (menu) {
      menu.classList.add('hidden');
    }
  },

  toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
      menu.classList.toggle('hidden');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  APP.init();
  APP.updateBadgesDisplay();
});

const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
  @keyframes confetti-fall {
    to {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
  @keyframes slide-in {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  .animate-slide-in {
    animation: slide-in 0.3s ease-out;
  }
`;
document.head.appendChild(confettiStyle);
