// Quiz Module
const Quiz = {
  checkAnswer(btn, correct, quizId, sectionId = null, successMsg = 'Bonne réponse !') {
    const result = document.getElementById('result-' + quizId);
    const allBtns = btn.parentElement.querySelectorAll('button');
    allBtns.forEach(b => {
      b.classList.remove('bg-green-200', 'bg-red-200');
      if (correct && b === btn) b.classList.add('bg-green-200');
      if (!correct && b === btn) b.classList.add('bg-red-200');
    });
    if (correct) {
      if (result) {
        result.textContent = '✅ ' + successMsg;
        result.className = 'mt-2 text-sm font-semibold text-green-600';
      }
      if (sectionId) {
        APP.completedSections.add(sectionId);
        Progress.update();
      }
      APP.saveProgress();
      APP.checkBadges();
    } else {
      if (result) {
        result.textContent = '❌ Réessayez !';
        result.className = 'mt-2 text-sm font-semibold text-red-600';
      }
    }
  },

  htmlTagsQuiz(btn, correct) {
    const result = document.getElementById('result-html-tags-quiz');
    const allBtns = document.querySelectorAll('.quiz-html-tags');
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    if (correct) {
      btn.classList.add('bg-green-200');
      if (result) { result.textContent = '✅ Correct ! <img> nécessite src et se ferme elle-même.'; result.className = 'mt-2 text-sm font-semibold text-green-600'; }
      this.addCompletedQuiz('html-tags');
    } else {
      btn.classList.add('bg-red-200');
      if (result) { result.textContent = '❌ Réessayez !'; result.className = 'mt-2 text-sm font-semibold text-red-600'; }
    }
  },

  structureQuiz(btn, correct) {
    const result = document.getElementById('result-structure-quiz');
    const allBtns = document.querySelectorAll('.quiz-structure');
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    if (correct) {
      btn.classList.add('bg-green-200');
      if (result) { result.textContent = '?? Correct ! <head> contient les métadonnées.'; result.className = 'mt-2 text-sm font-semibold text-green-600'; }
      this.addCompletedQuiz('html-structure');
    } else {
      btn.classList.add('bg-red-200');
      if (result) { result.textContent = '?? Réessayez !'; result.className = 'mt-2 text-sm font-semibold text-red-600'; }
    }
  },

  jsQuiz(btn, correct) {
    const result = document.getElementById('result-js-quiz');
    const allBtns = document.querySelectorAll('.quiz-js');
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    if (correct) {
      btn.classList.add('bg-green-200');
      if (result) { result.textContent = '?? Correct ! split(), reverse() et join()'; result.className = 'mt-2 text-sm font-semibold text-green-600'; }
      this.addCompletedQuiz('js-intro');
    } else {
      btn.classList.add('bg-red-200');
      if (result) { result.textContent = '?? Réessayez !'; result.className = 'mt-2 text-sm font-semibold text-red-600'; }
    }
  },

  headingQuiz(btn, correct) {
    const result = document.getElementById('result-heading-quiz');
    const allBtns = document.querySelectorAll('.quiz-heading');
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    if (correct) {
      btn.classList.add('bg-green-200');
      if (result) { result.textContent = '✅ Correct ! <h1> est le titre principal.'; result.className = 'mt-2 text-sm font-semibold text-green-600'; }
      this.addCompletedQuiz('html-text');
    } else {
      btn.classList.add('bg-red-200');
      if (result) { result.textContent = '❌ Réessayez !'; result.className = 'mt-2 text-sm font-semibold text-red-600'; }
    }
  },

  listQuiz(btn, correct) {
    const result = document.getElementById('result-list-quiz');
    const allBtns = document.querySelectorAll('.quiz-list');
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    if (correct) {
      btn.classList.add('bg-green-200');
      if (result) { result.textContent = '✅ Correct ! <ol> crée une liste numérotée.'; result.className = 'mt-2 text-sm font-semibold text-green-600'; }
      this.addCompletedQuiz('html-lists');
    } else {
      btn.classList.add('bg-red-200');
      if (result) { result.textContent = '❌ Réessayez !'; result.className = 'mt-2 text-sm font-semibold text-red-600'; }
    }
  },

  linkQuiz(btn, correct) {
    const result = document.getElementById('result-link-quiz');
    const allBtns = document.querySelectorAll('.quiz-link');
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    if (correct) {
      btn.classList.add('bg-green-200');
      if (result) { result.textContent = '✅ Correct ! target="_blank" ouvre dans un nouvel onglet.'; result.className = 'mt-2 text-sm font-semibold text-green-600'; }
      this.addCompletedQuiz('html-links');
    } else {
      btn.classList.add('bg-red-200');
      if (result) { result.textContent = '❌ Réessayez !'; result.className = 'mt-2 text-sm font-semibold text-red-600'; }
    }
  },

  selectorQuiz(btn, correct) {
    const result = document.getElementById('result-selector-quiz');
    const allBtns = document.querySelectorAll('.quiz-selector');
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    if (correct) {
      btn.classList.add('bg-green-200');
      if (result) { result.textContent = '✅ Correct ! .menu sélectionne la classe.'; result.className = 'mt-2 text-sm font-semibold text-green-600'; }
      this.addCompletedQuiz('css-selectors');
    } else {
      btn.classList.add('bg-red-200');
      if (result) { result.textContent = '❌ Réessayez !'; result.className = 'mt-2 text-sm font-semibold text-red-600'; }
    }
  },

  fontQuiz(btn, correct) {
    const result = document.getElementById('result-font-quiz');
    const allBtns = document.querySelectorAll('.quiz-font');
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    if (correct) {
      btn.classList.add('bg-green-200');
      if (result) { result.textContent = '✅ Correct ! font-size contrôle la taille.'; result.className = 'mt-2 text-sm font-semibold text-green-600'; }
      this.addCompletedQuiz('css-font');
    } else {
      btn.classList.add('bg-red-200');
      if (result) { result.textContent = '❌ Réessayez !'; result.className = 'mt-2 text-sm font-semibold text-red-600'; }
    }
  },

  boxQuiz(btn, correct) {
    const result = document.getElementById('result-box-quiz');
    const allBtns = document.querySelectorAll('.quiz-box');
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    if (correct) {
      btn.classList.add('bg-green-200');
      if (result) { result.textContent = '✅ Correct ! padding est la marge interne.'; result.className = 'mt-2 text-sm font-semibold text-green-600'; }
      this.addCompletedQuiz('css-boxmodel');
    } else {
      btn.classList.add('bg-red-200');
      if (result) { result.textContent = '❌ Réessayez !'; result.className = 'mt-2 text-sm font-semibold text-red-600'; }
    }
  },

  formQuiz(btn, correct) {
    const result = document.getElementById('result-form-quiz');
    const allBtns = document.querySelectorAll('.quiz-form');
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    if (correct) {
      btn.classList.add('bg-green-200');
      if (result) { result.textContent = '✅ Correct ! required rend le champ obligatoire.'; result.className = 'mt-2 text-sm font-semibold text-green-600'; }
      this.addCompletedQuiz('html-forms');
    } else {
      btn.classList.add('bg-red-200');
      if (result) { result.textContent = '❌ Réessayez !'; result.className = 'mt-2 text-sm font-semibold text-red-600'; }
    }
  },

  responsiveQuiz(btn, correct) {
    const result = document.getElementById('result-responsive-quiz');
    const allBtns = document.querySelectorAll('.quiz-responsive');
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    if (correct) {
      btn.classList.add('bg-green-200');
      if (result) { result.textContent = '✅ Correct ! max-width rend responsive.'; result.className = 'mt-2 text-sm font-semibold text-green-600'; }
      this.addCompletedQuiz('css-responsive');
    } else {
      btn.classList.add('bg-red-200');
      if (result) { result.textContent = '❌ Réessayez !'; result.className = 'mt-2 text-sm font-semibold text-red-600'; }
    }
  },

  jsQuiz(btn, correct) {
    const result = document.getElementById('result-js-quiz');
    const allBtns = document.querySelectorAll('.quiz-js');
    allBtns.forEach(b => b.classList.remove('bg-green-200', 'bg-red-200'));
    if (correct) {
      btn.classList.add('bg-green-200');
      if (result) { result.textContent = '✅ Correct ! const est pour les valeurs fixes.'; result.className = 'mt-2 text-sm font-semibold text-green-600'; }
      this.addCompletedQuiz('js-intro');
    } else {
      btn.classList.add('bg-red-200');
      if (result) { result.textContent = '❌ Réessayez !'; result.className = 'mt-2 text-sm font-semibold text-red-600'; }
    }
  },

  addCompletedQuiz(sectionId) {
    const key = 'quiz-' + sectionId;
    if (!APP.exerciseCompleted.has(key)) {
      APP.exerciseCompleted.add(key);
      APP.exerciseScore++;
      APP.confetti();
    }
    APP.saveProgress();
    APP.checkBadges();
  }
};
