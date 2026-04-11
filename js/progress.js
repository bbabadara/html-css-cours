// Progress & Badges Module
const Progress = {
  load() {
    const progress = SafeStorage.parseJSON('courseProgress', null);
    if (Array.isArray(progress)) APP.completedSections = new Set(progress);
    const savedSection = SafeStorage.get('currentSection');
    if (savedSection != null && savedSection !== '') {
      const n = parseInt(savedSection, 10);
      if (!Number.isNaN(n)) APP.currentSection = n;
    }
  },

  save() {
    SafeStorage.set('courseProgress', JSON.stringify([...APP.completedSections]));
    SafeStorage.set('currentSection', APP.currentSection.toString());
  },

  loadBadges() {
    const data = SafeStorage.parseJSON('courseBadges', null);
    if (Array.isArray(data)) APP.badges = data;
  },

  saveBadges() {
    SafeStorage.set('courseBadges', JSON.stringify(APP.badges));
  },

  update() {
    const progress = (APP.completedSections.size / CONFIG.sections.length) * 100;
    const fill = document.getElementById('progressFill');
    const sidebar = document.getElementById('progressBarSidebar');
    const top = document.getElementById('progressBarTop');
    const percent = document.getElementById('progressPercent');
    const percentTop = document.getElementById('progressPercentTop');
    if (fill) fill.style.width = progress + '%';
    if (sidebar) sidebar.style.width = progress + '%';
    if (top) top.style.width = progress + '%';
    if (percent) percent.textContent = Math.round(progress) + '%';
    if (percentTop) percentTop.textContent = Math.round(progress) + '%';
    const rounded = Math.round(progress);
    const bar = document.getElementById('progressBar');
    if (bar) {
      bar.setAttribute('aria-valuenow', String(rounded));
      bar.setAttribute('aria-valuemin', '0');
      bar.setAttribute('aria-valuemax', '100');
    }
  },

  checkBadges() {
    CONFIG.badgeConditions.forEach(badge => {
      if (!APP.badges.includes(badge.id) && badge.condition(APP)) {
        APP.badges.push(badge.id);
        this.showNotification(badge.id);
      }
    });
    this.saveBadges();
    this.updateDisplay();
  },

  showNotification(badgeId) {
    const badge = CONFIG.badgeDefinitions.find(b => b.id === badgeId);
    if (!badge) return;

    const notification = document.createElement('div');
    notification.className = 'fixed bottom-8 right-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50';
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-3xl animate-bounce">${badge.icon}</span>
        <div>
          <div class="font-bold">Nouveau Badge !</div>
          <div class="text-sm opacity-90">${badge.name}</div>
        </div>
      </div>
    `;
    document.body.appendChild(notification);
    APP.confetti();
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(20px)';
      notification.style.transition = 'all 0.5s ease';
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  },

  updateDisplay() {
    const container = document.getElementById('badgesContainer');
    const containerTop = document.getElementById('badgesTop');
    const badgeCount = document.getElementById('badgeCount');
    const badgeCountTop = document.getElementById('badgeCountTop');
    
    const badgesHtml = CONFIG.badgeDefinitions.map(badge => `
      <div class="badge-item w-7 h-7 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center cursor-pointer ${APP.badges.includes(badge.id) ? '' : 'opacity-30'}" 
           title="${badge.name}" data-badge="${badge.id}">
        <span class="text-xs">${APP.badges.includes(badge.id) ? badge.icon : '🔒'}</span>
      </div>
    `).join('');

    if (container) container.innerHTML = badgesHtml;
    if (containerTop) containerTop.innerHTML = badgesHtml;
    if (badgeCount) badgeCount.textContent = `${APP.badges.length}/${CONFIG.badgeDefinitions.length}`;
    if (badgeCountTop) badgeCountTop.textContent = `${APP.badges.length}/${CONFIG.badgeDefinitions.length}`;
  },

  reset() {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser votre progression ?')) {
      SafeStorage.clear();
      location.reload();
    }
  }
};
