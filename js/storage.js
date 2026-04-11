// Accès localStorage sécurisé (quota, navigation privée, etc.)
const SafeStorage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn('SafeStorage.set:', key, e);
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('SafeStorage.remove:', key, e);
    }
  },

  clear() {
    try {
      localStorage.clear();
    } catch (e) {
      console.warn('SafeStorage.clear:', e);
    }
  },

  parseJSON(key, fallback) {
    const raw = this.get(key);
    if (raw == null || raw === '') return fallback;
    try {
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }
};
