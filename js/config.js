// Configuration - Sections et Navigation
const CONFIG = {
  sections: [
    'intro', 'internet', 'html-tags', 'html-structure', 'html-best-practices',
    'html-text', 'html-formatting', 'html-lists', 'html-definition-lists', 'html-nested-lists',
    'html-links', 'css-selectors', 'css-where', 'css-comments', 'css-elements',
    'css-advanced-selectors', 'css-inheritance', 'css-font', 'css-text', 'css-boxmodel',
    'css-display-position', 'css-background', 'html-media', 'html-tables', 'html-forms', 'css-responsive',
    'js-intro'
  ],

  chapters: [
    { id: 'intro', name: 'Introduction', icon: '🎓', color: 'violet', items: ['intro', 'internet'] },
    { id: 'html', name: 'HTML', icon: '🏗️', color: 'orange', items: ['html-tags', 'html-structure', 'html-best-practices', 'html-text', 'html-formatting', 'html-lists', 'html-definition-lists', 'html-nested-lists', 'html-links'] },
    { id: 'css', name: 'CSS', icon: '🎨', color: 'blue', items: ['css-selectors', 'css-where', 'css-comments', 'css-elements', 'css-advanced-selectors', 'css-inheritance', 'css-font', 'css-text', 'css-boxmodel', 'css-display-position', 'css-background'] },
    { id: 'media', name: 'Médias & Formulaires', icon: '📝', color: 'green', items: ['html-media', 'html-tables', 'html-forms'] },
    { id: 'advanced', name: 'Aller Plus Loin', icon: '🚀', color: 'emerald', items: ['css-responsive'] },
    { id: 'javascript', name: 'JavaScript', icon: '⚡', color: 'yellow', items: ['js-intro'] }
  ],

  navItems: [
    { id: 'intro', name: 'Introduction', icon: '🎓', chapter: '1', type: 'intro' },
    { id: 'internet', name: 'Internet & Web', icon: '🌐', chapter: 'Intro', type: 'intro' },
    { id: 'html-tags', name: 'Balises & Attributs', icon: '🏗️', chapter: '2.1.1', type: 'html' },
    { id: 'html-structure', name: 'Structure HTML5', icon: '🏛️', chapter: '2.1.2', type: 'html' },
    { id: 'html-best-practices', name: 'Bonnes Pratiques', icon: '✨', chapter: '2.1.3', type: 'html' },
    { id: 'html-text', name: 'Titres & Paragraphes', icon: '📝', chapter: '2.1.4', type: 'html' },
    { id: 'html-formatting', name: 'Formatage Texte', icon: '🎨', chapter: '2.1.5', type: 'html' },
    { id: 'html-lists', name: 'Listes', icon: '📋', chapter: '2.1.6', type: 'html' },
    { id: 'html-definition-lists', name: 'Listes Définitions', icon: '📖', chapter: '2.1.7', type: 'html' },
    { id: 'html-nested-lists', name: 'Listes Imbriquées', icon: '🔀', chapter: '2.1.8', type: 'html' },
    { id: 'html-links', name: 'Liens', icon: '🔗', chapter: '2.1.9', type: 'html' },
    { id: 'css-selectors', name: 'Sélecteurs CSS', icon: '🎯', chapter: '2.2.1', type: 'css' },
    { id: 'css-where', name: 'Où Écrire CSS', icon: '📍', chapter: '2.2.2', type: 'css' },
    { id: 'css-comments', name: 'Commentaires CSS', icon: '💬', chapter: '2.2.3', type: 'css' },
    { id: 'css-elements', name: 'div & span', icon: '📦', chapter: '2.2.4-6', type: 'css' },
    { id: 'css-advanced-selectors', name: 'Sélecteurs Avancés', icon: '🔮', chapter: '2.2.7', type: 'css' },
    { id: 'css-inheritance', name: 'Héritage CSS', icon: '🧬', chapter: '2.2.8', type: 'css' },
    { id: 'css-font', name: 'Propriétés Fonts', icon: '🔤', chapter: '3.1', type: 'css' },
    { id: 'css-text', name: 'Propriétés Texte', icon: '📄', chapter: '3.2', type: 'css' },
    { id: 'css-boxmodel', name: 'Box Model', icon: '📦', chapter: '3.3', type: 'css' },
    { id: 'css-display-position', name: 'Display & Position', icon: '📐', chapter: '3.4', type: 'css' },
    { id: 'css-background', name: 'Background', icon: '🎨', chapter: '3.5', type: 'css' },
    { id: 'html-media', name: 'Médias', icon: '🖼️', chapter: '4.1', type: 'html' },
    { id: 'html-tables', name: 'Tableaux', icon: '📊', chapter: '4.2', type: 'html' },
    { id: 'html-forms', name: 'Formulaires', icon: '📝', chapter: '4.3', type: 'html' },
    { id: 'css-responsive', name: 'Responsive', icon: '📱', chapter: '5', type: 'advanced' },
    { id: 'js-intro', name: 'Intro JavaScript', icon: '⚡', chapter: '6', type: 'js' },
  ],

  colorMap: {
    'intro': 'from-violet-500 to-purple-600',
    'html': 'from-orange-500 to-red-500',
    'css': 'from-blue-500 to-cyan-500',
    'advanced': 'from-emerald-500 to-teal-500'
  },

  badgeDefinitions: [
    { id: 'first-step', name: 'Premier Pas', icon: '🚀' },
    { id: 'html-basics', name: 'Bases HTML', icon: '🏗️' },
    { id: 'html-text', name: 'Formatage Texte', icon: '📝' },
    { id: 'html-lists-master', name: 'Maître Listes', icon: '📋' },
    { id: 'html-links', name: 'Expert Liens', icon: '🔗' },
    { id: 'css-basics', name: 'Bases CSS', icon: '🎨' },
    { id: 'css-elements', name: 'Éléments CSS', icon: '📦' },
    { id: 'css-advanced', name: 'Sélecteurs', icon: '🔮' },
    { id: 'css-font-text', name: 'Fonts & Texte', icon: '🔤' },
    { id: 'css-boxmodel', name: 'Box Model', icon: '📦' },
    { id: 'css-display', name: 'Display', icon: '📐' },
    { id: 'css-background', name: 'Background', icon: '🎨' },
    { id: 'html-media', name: 'Médias', icon: '🖼️' },
    { id: 'html-tables', name: 'Tableaux', icon: '📊' },
    { id: 'html-forms', name: 'Formulaires', icon: '📝' },
    { id: 'css-responsive', name: 'Responsive', icon: '📱' },
    { id: 'half-course', name: 'Demi-Parcours', icon: '🎯' },
    { id: 'course-complete', name: 'Diplômé', icon: '🎓' }
  ],

  badgeConditions: [
    { id: 'first-step', condition: (app) => app.completedSections.size >= 1 },
    { id: 'html-basics', condition: (app) => app.completedSections.has('html-tags') && app.completedSections.has('html-structure') },
    { id: 'html-text', condition: (app) => app.completedSections.has('html-text') && app.completedSections.has('html-formatting') },
    { id: 'html-lists-master', condition: (app) => app.completedSections.has('html-lists') && app.completedSections.has('html-nested-lists') },
    { id: 'html-links', condition: (app) => app.completedSections.has('html-links') },
    { id: 'css-basics', condition: (app) => app.completedSections.has('css-selectors') && app.completedSections.has('css-where') },
    { id: 'css-elements', condition: (app) => app.completedSections.has('css-elements') },
    { id: 'css-advanced', condition: (app) => app.completedSections.has('css-advanced-selectors') && app.completedSections.has('css-inheritance') },
    { id: 'css-font-text', condition: (app) => app.completedSections.has('css-font') && app.completedSections.has('css-text') },
    { id: 'css-boxmodel', condition: (app) => app.completedSections.has('css-boxmodel') },
    { id: 'css-display', condition: (app) => app.completedSections.has('css-display-position') },
    { id: 'css-background', condition: (app) => app.completedSections.has('css-background') },
    { id: 'html-media', condition: (app) => app.completedSections.has('html-media') },
    { id: 'html-tables', condition: (app) => app.completedSections.has('html-tables') },
    { id: 'html-forms', condition: (app) => app.completedSections.has('html-forms') },
    { id: 'css-responsive', condition: (app) => app.completedSections.has('css-responsive') },
    { id: 'half-course', condition: (app) => app.completedSections.size >= Math.floor(app.sections.length / 2) },
    { id: 'course-complete', condition: (app) => app.completedSections.size >= app.sections.length }
  ]
};
