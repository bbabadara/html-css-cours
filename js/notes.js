// Notes Module
const Notes = {
  load() {
    const data = SafeStorage.parseJSON('courseNotes', null);
    if (data && typeof data === 'object' && !Array.isArray(data)) APP.notes = data;
  },

  save() {
    SafeStorage.set('courseNotes', JSON.stringify(APP.notes));
  },

  setup() {
    CONFIG.sections.forEach(id => {
      const noteEl = document.getElementById('note-' + id);
      if (noteEl && APP.notes[id]) {
        noteEl.value = APP.notes[id];
      }
      const btn = document.getElementById('notes-btn-' + id);
      if (btn && APP.notes[id] && APP.notes[id].trim()) {
        btn.classList.add('has-note');
      }
    });
  },

  saveNote(sectionId) {
    const noteEl = document.getElementById('note-' + sectionId);
    const btn = document.getElementById('notes-btn-' + sectionId);
    if (noteEl) {
      APP.notes[sectionId] = noteEl.value;
      this.save();
      if (btn) {
        btn.classList.toggle('has-note', noteEl.value.trim().length > 0);
      }
    }
  },

  toggle(sectionId) {
    const panel = document.getElementById('notes-panel-' + sectionId);
    const btn = document.getElementById('notes-btn-' + sectionId);
    if (panel) {
      panel.classList.toggle('hidden');
      if (!panel.classList.contains('hidden')) {
        const noteEl = document.getElementById('note-' + sectionId);
        if (noteEl) noteEl.focus();
      }
    }
    if (btn) {
      btn.classList.toggle('bg-yellow-100');
      btn.classList.toggle('dark:bg-yellow-900');
    }
  }
};
