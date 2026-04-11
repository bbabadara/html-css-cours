# Formation Web Complète - HTML, CSS & JavaScript

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Support-brightgreen?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-6.0-blue?style=for-the-badge)

Plateforme de formation interactive pour apprendre le développement web moderne.

## 📊 Statistiques

| Métrique | Valeur |
|----------|--------|
| Sections | 27 |
| Chapitres | 6 |
| Quiz | 12 |
| Badges | 18 |
| Durée | ~7h |

## 📚 Modules

| Module | Sections | Durée | Description |
|--------|----------|-------|-------------|
| **Introduction** | 2 | 15 min | Présentation et concepts de base |
| **HTML5** | 9 | ~2h | Structure et sémantique des pages |
| **CSS3** | 11 | ~3h | Design, layout, flexbox et animations |
| **Médias & Formulaires** | 3 | 45 min | Images, audio, vidéo, tables, formulaires |
| **Responsive** | 1 | 30 min | Media queries et design adaptatif |
| **JavaScript** | 1 | 45 min | Interactivité et manipulation DOM |

## ✨ Fonctionnalités

### 🤖 Apprentissage Intelligent
- **📝 Notes personnelles** - Annotations par section
- **🏆 Système de badges** - 18 récompenses à débloquer
- **📊 Progression** - Suivi visuel par chapitre
- **📤 Export** - Téléchargement notes (JSON/TXT)

### 🎨 Interface
- **📖 Mode lecture** - Interface épurée immersive
- **🌙 Mode sombre** - Confort visuel nocturne
- **⭐ Favoris** - Marquez vos sections importantes
- **🔍 recherche** - Navigation rapide (/ ou Ctrl+K)

### ⌨️ Raccourcis Clavier

| Touche | Action |
|--------|--------|
| `/` | Ouvrir la recherche |
| `B` | Marquer en favoris |
| `R` | Toggle mode lecture |
| `D` | Toggle mode sombre |
| `?` | Afficher l'aide |
| `←` / `→` | Navigation section |

## 📁 Structure du Projet

```
html/
├── index.html           # Page principale (formation)
├── manifest.json        # PWA manifest
├── sw.js               # Service Worker (offline)
├── css/
│   └── styles.css      # Styles personnalisés
├── js/
│   ├── config.js       # Configuration (sections, badges)
│   ├── navigation.js   # Navigation et scroll spy
│   ├── quiz.js        # Fonctions de quiz
│   ├── progress.js     # Progression et badges
│   ├── notes.js        # Notes personnelles
│   └── app.js         # Orchestrateur principal
└── README.md           # Documentation
```

## 🚀 Installation

```bash
# Optionnel : Serveur local
npx serve .

# ou avec Python
python -m http.server 8000
```

Puis ouvrez `index.html` dans votre navigateur.

## 📖 Chapitres Détaillés

### Chapitre 2 : HTML5
- Balises et attributs
- Structure HTML5 (`<!DOCTYPE>`, `<head>`, `<body>`)
- Bonnes pratiques
- Textes et formatage (`<h1>` à `<h6>`, `<p>`, `<br>`, `<strong>`, `<em>`)
- Listes (ordonnées `<ol>`, non-ordonnées `<ul>`, définitions `<dl>`)
- Liens (`<a href="">`, `_blank`, `rel`)

### Chapitre 3 : CSS3
- Sélecteurs (balise, classe `.`, ID `#`, avancé `>`, `+`, `~`)
- Où écrire CSS (inline, `<style>`, externe)
- Commentaires CSS
- div & span (block vs inline)
- Propriétés de texte (`text-align`, `text-decoration`, `text-transform`)
- Box Model (`content`, `padding`, `border`, `margin`)
- Display (`block`, `inline`, `flex`, `grid`)
- Position (`static`, `relative`, `absolute`, `fixed`, `sticky`)
- Background (couleurs, images, dégradés)
- Héritage CSS

### Chapitre 4 : Médias & Formulaires
- Images (`<img>`, `<figure>`, `<figcaption>`)
- Audio (`<audio controls>`)
- Vidéo (`<video controls>`)
- Tableaux (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<td>`, `colspan`, `rowspan`)
- Formulaires (`<form>`, `<input>`, `<label>`, `<textarea>`, validation HTML5)

### Chapitre 5 : Responsive
- Meta viewport
- Media queries (`@media`)
- Breakpoints
- Mobile-first

### Chapitre 6 : JavaScript
- Variables (`let`, `const`)
- Types de données
- Fonctions
- Arrow functions
- Événements (`click`, `mouseenter`, `keypress`)
- Conditions et boucles
- Manipulation DOM
- LocalStorage

## 🏆 Badges

| Badge | Condition |
|-------|-----------|
| 🚀 Premier Pas | Compléter 1 section |
| 🏗️ Bases HTML | Balises + Structure |
| 📝 Formatage Texte | Titres + Formatage |
| 📋 Maître des Listes | Listes + Listes imbriquées |
| 🔗 Expert Liens | Liens |
| 🎨 Bases CSS | Sélecteurs + Où écrire |
| 📦 Éléments CSS | div & span |
| 🔮 Sélecteurs Avancés | Avancé + Héritage |
| 🔤 Fonts & Texte | Fonts + Texte |
| 📊 Box Model | Box Model |
| 📐 Display | Display & Position |
| 🎨 Background | Background |
| 🖼️ Médias | Médias |
| 📊 Tableaux | Tableaux |
| 📝 Formulaires | Formulaires |
| 📱 Responsive | Responsive |
| ⚡ JavaScript | JS |
| 🎓 Diplômé | 100% complété |

## 🔧 Technologies

- **HTML5** - Structure sémantique
- **CSS3** - Styles et animations
- **Tailwind CSS** - Framework utilitaire
- **JavaScript ES6+** - Interactivité modulaire
- **LocalStorage** - Persistance des données
- **Prism.js** - Coloration syntaxique
- **Service Worker** - Support offline PWA

## 📱 Responsive

| Appareil | Breakpoint |
|----------|------------|
| Mobile | < 640px |
| Tablette | 640px - 1023px |
| Desktop | ≥ 1024px |

## 💡 Conseils

1. **Pratiquez régulièrement** - 15-30 min par jour suffisent
2. **Utilisez les notes** - Personnalisez votre apprentissage
3. **Faites les quiz** - Validez vos connaissances
4. **Marquez vos favoris** - Accédez rapidement aux sections importantes
5. **Exportez vos notes** - Sauvegardez régulièrement

## 🤝 Contribuer

Suggestions bienvenues :
- Signaler des bugs
- Proposer des améliorations
- Ajouter des exercices
- Corriger les contenus

## 📄 Licence

MIT License - Libre d'utilisation.

## 🙏 Crédits

Inspiré par les meilleures plateformes :
- [OpenClassrooms](https://openclassrooms.com)
- [Grafikart](https://grafikart.fr)
- [MDN Web Docs](https://developer.mozilla.org)
- [CSS-Tricks](https://css-tricks.com)

---

**Bonne formation ! 🚀**
