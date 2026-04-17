// PharmaLearn — Application Logic
(function() {
  'use strict';

  // ─── Storage Helpers ──────────────────────────────────────────────────────
  const store = {
    get: (k, def = null) => { try { return JSON.parse(localStorage.getItem('pl_' + k)) ?? def; } catch(e){ return def; } },
    set: (k, v) => { try { localStorage.setItem('pl_' + k, JSON.stringify(v)); } catch(e){} },
    update: (k, fn, def = {}) => { store.set(k, fn(store.get(k, def))); }
  };

  // ─── Initial State ────────────────────────────────────────────────────────
  const initProgress = () => {
    if (!store.get('progress')) store.set('progress', {});
    if (!store.get('bookmarks')) store.set('bookmarks', []);
    if (!store.get('quiz_results')) store.set('quiz_results', {});
    if (!store.get('xp')) store.set('xp', { total: 0, streak: 0, last_active: null });
    if (!store.get('user')) store.set('user', { name: 'Learner', role: 'consultant', geo: 'us', level: 'advanced' });
  };

  // ─── XP System ───────────────────────────────────────────────────────────
  const XP = {
    add: (pts, reason = '') => {
      store.update('xp', xp => {
        const today = new Date().toDateString();
        const streak = (xp.last_active === new Date(Date.now() - 86400000).toDateString())
          ? xp.streak + 1 : (xp.last_active === today ? xp.streak : 1);
        const mult = streak >= 30 ? 1.5 : streak >= 7 ? 1.2 : 1;
        return { ...xp, total: (xp.total || 0) + Math.round(pts * mult), streak, last_active: today };
      });
    },
    getLevel: () => {
      const xp = store.get('xp', { total: 0 }).total;
      if (xp >= 5001) return { name: 'Principal', color: '#f59e0b', next: null, pct: 100 };
      if (xp >= 2001) return { name: 'Consultant', color: '#8b5cf6', next: 5001, pct: Math.round((xp-2001)/(5001-2001)*100) };
      if (xp >= 501)  return { name: 'Sr. Analyst', color: '#6366f1', next: 2001, pct: Math.round((xp-501)/(2001-501)*100) };
      return { name: 'Analyst', color: '#06b6d4', next: 501, pct: Math.round(xp/501*100) };
    }
  };

  // ─── Progress ─────────────────────────────────────────────────────────────
  const Progress = {
    get: (chapterId) => store.get('progress', {})[chapterId] || { reading: 0, quiz: null, status: 'not_started' },
    update: (chapterId, data) => {
      store.update('progress', p => ({
        ...p,
        [chapterId]: { ...Progress.get(chapterId), ...data, updated: Date.now() }
      }));
    },
    getMastery: (chapterId) => {
      const p = Progress.get(chapterId);
      return Math.min(100, Math.round(
        (p.reading || 0) * 0.4 +
        (p.quiz != null ? p.quiz * 0.4 : 0) +
        (p.reading >= 90 ? 20 : 0)
      ));
    },
    getDomainPct: (domainId) => {
      const domain = window.PHARMALEARN.domains.find(d => d.id === domainId);
      if (!domain) return 0;
      const scores = domain.chapters_list.map(c => Progress.getMastery(c.id));
      return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    },
    getOverall: () => {
      const all = window.PHARMALEARN.domains.flatMap(d =>
        d.chapters_list.map(c => Progress.getMastery(c.id))
      );
      return Math.round(all.reduce((a, b) => a + b, 0) / all.length);
    }
  };

  // ─── Bookmarks ────────────────────────────────────────────────────────────
  const Bookmarks = {
    getAll: () => store.get('bookmarks', []),
    add: (item) => {
      const bms = Bookmarks.getAll();
      if (!bms.find(b => b.id === item.id)) {
        store.set('bookmarks', [...bms, { ...item, saved_at: Date.now() }]);
        XP.add(5, 'bookmark');
      }
    },
    remove: (id) => store.set('bookmarks', Bookmarks.getAll().filter(b => b.id !== id)),
    has: (id) => Bookmarks.getAll().some(b => b.id === id),
    toggle: (item) => Bookmarks.has(item.id) ? Bookmarks.remove(item.id) : Bookmarks.add(item)
  };

  // ─── Alpine.js App Data ───────────────────────────────────────────────────
  window.pharmaApp = () => ({
    // Navigation
    page: 'home',
    sidebarOpen: window.innerWidth > 768,
    theme: localStorage.getItem('pl_theme') || 'dark',
    searchQuery: '',
    searchResults: [],

    // Chapter state
    activeChapter: null,
    activeSection: 's1',
    readingPct: 0,
    chapterBookmarked: false,

    // Quiz state
    quiz: { active: false, current: 0, selected: null, submitted: false, score: 0, finished: false, answers: {} },

    // Onboarding
    showOnboarding: false,
    onboardStep: 1,
    onboardData: { name: '', role: 'consultant', geo: 'us', level: 'advanced' },

    // Notification
    toast: { show: false, msg: '', type: 'success' },

    init() {
      initProgress();
      this.applyTheme();

      const user = store.get('user', null);
      if (!user || !user.name || user.name === 'Learner') {
        this.showOnboarding = true;
      }

      // Hash routing
      this.handleRoute();
      window.addEventListener('hashchange', () => this.handleRoute());
      window.addEventListener('resize', () => {
        this.sidebarOpen = window.innerWidth > 768;
      });

      // Reading progress tracker
      window.addEventListener('scroll', () => this.updateReadingProgress());
    },

    handleRoute() {
      const hash = window.location.hash.replace('#/', '') || 'home';
      const parts = hash.split('/');
      const route = parts[0];
      if (route === 'chapter' && parts[1]) {
        this.openChapter(parts[1]);
      } else {
        this.page = ['home','domains','dashboard','bookmarks','search'].includes(route) ? route : 'home';
        this.activeChapter = null;
      }
    },

    navigate(pg, params = '') {
      window.location.hash = '/' + pg + (params ? '/' + params : '');
    },

    applyTheme() {
      document.documentElement.setAttribute('data-theme', this.theme);
      localStorage.setItem('pl_theme', this.theme);
    },

    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      this.applyTheme();
    },

    // ─── Home ───────────────────────────────────────────────────────────────
    get domains() { return window.PHARMALEARN.domains; },
    get overallProgress() { return Progress.getOverall(); },
    get userXP() { return store.get('xp', { total: 0, streak: 0 }); },
    get userLevel() { return XP.getLevel(); },
    get userName() { return store.get('user', { name: 'Learner' }).name; },

    getDomainProgress(domainId) { return Progress.getDomainPct(domainId); },

    get recentChapters() {
      const p = store.get('progress', {});
      return Object.entries(p)
        .sort((a, b) => (b[1].updated || 0) - (a[1].updated || 0))
        .slice(0, 3)
        .map(([id]) => {
          for (const d of window.PHARMALEARN.domains) {
            const c = d.chapters_list.find(ch => ch.id === id);
            if (c) return { ...c, domain: d.title, mastery: Progress.getMastery(id) };
          }
          return null;
        }).filter(Boolean);
    },

    get recommendedChapter() {
      // Find first available chapter not yet mastered
      for (const d of window.PHARMALEARN.domains) {
        for (const c of d.chapters_list) {
          if (c.available && Progress.getMastery(c.id) < 80) {
            return { ...c, domain: d.title };
          }
        }
      }
      return null;
    },

    // ─── Chapter ────────────────────────────────────────────────────────────
    openChapter(id) {
      const ch = window.PHARMALEARN.chapters[id];
      if (!ch) { this.navigate('domains'); return; }
      this.activeChapter = ch;
      this.page = 'chapter';
      this.chapterBookmarked = Bookmarks.has('ch_' + id);
      this.activeSection = 's1';
      this.quiz = { active: false, current: 0, selected: null, submitted: false, score: 0, finished: false, answers: {} };
      this.readingPct = Progress.get(id).reading || 0;
      XP.add(10, 'chapter_open');
      window.scrollTo(0, 0);

      // Mark as started
      if (Progress.get(id).status === 'not_started') {
        Progress.update(id, { status: 'reading', reading: 5 });
      }
    },

    updateReadingProgress() {
      if (this.page !== 'chapter' || !this.activeChapter) return;
      const el = document.getElementById('chapter-body');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight;
      const viewed = Math.max(0, -rect.top + window.innerHeight);
      const pct = Math.min(100, Math.round((viewed / total) * 100));
      this.readingPct = pct;

      const bar = document.getElementById('reading-bar');
      if (bar) bar.style.width = pct + '%';

      if (pct > (Progress.get(this.activeChapter.id).reading || 0)) {
        Progress.update(this.activeChapter.id, { reading: pct });
        if (pct >= 90 && Progress.get(this.activeChapter.id).status !== 'completed') {
          Progress.update(this.activeChapter.id, { status: 'read' });
          XP.add(25, 'chapter_read');
        }
      }

      // Active TOC item
      if (this.activeChapter.toc) {
        for (const t of [...this.activeChapter.toc].reverse()) {
          const s = document.getElementById(t.id);
          if (s && s.getBoundingClientRect().top < 150) {
            this.activeSection = t.id;
            break;
          }
        }
      }
    },

    scrollToSection(id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    toggleBookmark() {
      if (!this.activeChapter) return;
      const item = { id: 'ch_' + this.activeChapter.id, type: 'chapter', chapter_id: this.activeChapter.id, title: this.activeChapter.title, domain: this.activeChapter.domain };
      Bookmarks.toggle(item);
      this.chapterBookmarked = Bookmarks.has('ch_' + this.activeChapter.id);
      this.showToast(this.chapterBookmarked ? 'Chapter bookmarked!' : 'Bookmark removed', this.chapterBookmarked ? 'success' : 'info');
    },

    chapterProgress(id) { return Progress.getMastery(id); },

    // ─── Quiz ────────────────────────────────────────────────────────────────
    startQuiz() {
      this.quiz = { active: true, current: 0, selected: null, submitted: false, score: 0, finished: false, answers: {} };
      this.showToast('Quiz started — 3 questions', 'info');
    },

    selectAnswer(optId) {
      if (this.quiz.submitted) return;
      this.quiz.selected = optId;
    },

    submitAnswer() {
      if (!this.quiz.selected) return;
      const q = this.activeChapter.questions[this.quiz.current];
      const correct = this.quiz.selected === q.correct;
      this.quiz.submitted = true;
      this.quiz.answers[this.quiz.current] = { selected: this.quiz.selected, correct };
      if (correct) this.quiz.score++;
    },

    nextQuestion() {
      const total = this.activeChapter.questions.length;
      if (this.quiz.current + 1 >= total) {
        this.quiz.finished = true;
        const pct = Math.round((this.quiz.score / total) * 100);
        Progress.update(this.activeChapter.id, { quiz: pct, status: pct >= 60 ? 'completed' : 'needs_review' });
        XP.add(25 + (pct >= 80 ? 50 : 0), 'quiz_complete');
        this.showToast(`Quiz complete! ${this.quiz.score}/${total} correct`, pct >= 60 ? 'success' : 'warning');
      } else {
        this.quiz.current++;
        this.quiz.selected = null;
        this.quiz.submitted = false;
      }
    },

    get currentQuestion() {
      if (!this.activeChapter || !this.quiz.active) return null;
      return this.activeChapter.questions[this.quiz.current];
    },

    optionClass(optId) {
      if (!this.quiz.submitted) return this.quiz.selected === optId ? 'selected' : '';
      const q = this.currentQuestion;
      if (optId === q.correct) return 'correct';
      if (optId === this.quiz.selected && optId !== q.correct) return 'incorrect';
      return '';
    },

    // ─── Search ──────────────────────────────────────────────────────────────
    runSearch() {
      const q = this.searchQuery.toLowerCase().trim();
      if (!q) { this.searchResults = []; return; }
      const results = [];
      for (const d of window.PHARMALEARN.domains) {
        for (const c of d.chapters_list) {
          const score = [c.title, ...d.tags].join(' ').toLowerCase();
          if (score.includes(q)) {
            results.push({ ...c, domain: d.title, domain_color: d.color });
          }
        }
      }
      this.searchResults = results.slice(0, 20);
    },

    // ─── Bookmarks ───────────────────────────────────────────────────────────
    get bookmarks() { return Bookmarks.getAll().reverse(); },
    removeBookmark(id) {
      Bookmarks.remove(id);
      this.showToast('Bookmark removed', 'info');
    },

    // ─── Dashboard ───────────────────────────────────────────────────────────
    get dashboardDomains() {
      return window.PHARMALEARN.domains.map(d => ({
        ...d,
        progress: Progress.getDomainPct(d.id),
        chapters_detail: d.chapters_list.map(c => ({
          ...c,
          mastery: Progress.getMastery(c.id),
          status: Progress.get(c.id).status
        }))
      }));
    },

    get weakAreas() {
      const all = [];
      for (const d of window.PHARMALEARN.domains) {
        for (const c of d.chapters_list) {
          const m = Progress.getMastery(c.id);
          if (m > 0 && m < 60) all.push({ ...c, mastery: m, domain: d.title });
        }
      }
      return all.slice(0, 3);
    },

    // ─── Onboarding ──────────────────────────────────────────────────────────
    completeOnboarding() {
      if (!this.onboardData.name) this.onboardData.name = 'Learner';
      store.set('user', this.onboardData);
      this.showOnboarding = false;
      XP.add(50, 'onboarding');
      this.showToast('Welcome to PharmaLearn! 🎉', 'success');
    },

    // ─── Toast ────────────────────────────────────────────────────────────────
    showToast(msg, type = 'success') {
      this.toast = { show: true, msg, type };
      setTimeout(() => { this.toast.show = false; }, 3000);
    },

    // ─── Utilities ────────────────────────────────────────────────────────────
    getLevelBadge(level) {
      const map = { 'Beginner': 'tag-green', 'Intermediate': 'tag-yellow', 'Advanced': 'tag-red' };
      return map[level] || 'tag';
    },

    formatTime(mins) {
      if (mins < 60) return mins + ' min';
      return Math.floor(mins/60) + 'h ' + (mins%60 ? (mins%60)+'m' : '');
    },

    statusIcon(status) {
      const map = { 'completed': '✅', 'read': '📖', 'reading': '📂', 'needs_review': '⚠️', 'not_started': '○' };
      return map[status] || '○';
    }
  });
})();
