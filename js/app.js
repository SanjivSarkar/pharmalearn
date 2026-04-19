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

  // ─── Helpers to resolve chapters ─────────────────────────────────────────
  const allChapters = () => Object.values(window.PL.chapters);

  const getDomainChapters = (domainId) => {
    const domain = window.PL.domains.find(d => d.id === domainId);
    if (!domain) return [];
    return domain.chapters.map(id => window.PL.chapters[id]).filter(Boolean);
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
      const chapters = getDomainChapters(domainId);
      if (!chapters.length) return 0;
      const scores = chapters.map(c => Progress.getMastery(c.id));
      return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    },
    getOverall: () => {
      const chs = allChapters();
      if (!chs.length) return 0;
      const all = chs.map(c => Progress.getMastery(c.id));
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
    page: 'home',
    sidebarOpen: window.innerWidth > 1024,
    theme: localStorage.getItem('pl_theme') || 'dark',
    searchQuery: '',
    searchResults: [],

    activeChapter: null,
    activeSection: 's1',
    readingPct: 0,
    chapterBookmarked: false,

    quiz: { active: false, current: 0, selected: null, submitted: false, score: 0, finished: false, answers: {}, questions: [] },

    domainFilter: null,

    showOnboarding: false,
    onboardStep: 1,
    onboardData: { name: '', role: 'consultant', geo: 'us', level: 'advanced' },

    toast: { show: false, msg: '', type: 'success' },

    showOtpGate: false,
    accessName: '',
    accessEmail: '',
    accessOrg: '',
    accessSent: false,
    accessError: '',
    accessLoading: false,

    pharmaNews: [],
    newsLoading: false,

    expandedStage: null,

    init() {
      initProgress();
      this.applyTheme();
      const otpVerified = store.get('otp_verified', false);
      if (!otpVerified) {
        this.showOtpGate = true;
      } else {
        const user = store.get('user', null);
        if (!user || !user.name || user.name === 'Learner') {
          this.showOnboarding = true;
        }
      }
      this.handleRoute();
      window.addEventListener('hashchange', () => this.handleRoute());
      window.addEventListener('resize', () => {
        if (window.innerWidth <= 1024) this.sidebarOpen = false;
      });
      window.addEventListener('scroll', () => this.updateReadingProgress());
      this.fetchNews();
    },

    handleRoute() {
      const hash = window.location.hash.replace('#/', '') || 'home';
      const parts = hash.split('/');
      const route = parts[0];
      if (route === 'chapter' && parts[1]) {
        this.openChapter(parts[1]);
      } else {
        this.page = ['home','domains','dashboard','bookmarks','search','roadmap'].includes(route) ? route : 'home';
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

    // ─── Domain/Chapter Data ─────────────────────────────────────────────────
    get domains() { return window.PL.domains; },

    getDomainChapters(domainId) { return getDomainChapters(domainId); },

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
          const ch = window.PL.chapters[id];
          if (!ch) return null;
          return { ...ch, mastery: Progress.getMastery(id) };
        }).filter(Boolean);
    },

    get recommendedChapter() {
      for (const d of window.PL.domains) {
        for (const id of d.chapters) {
          const ch = window.PL.chapters[id];
          if (ch && ch.available && Progress.getMastery(id) < 80) {
            return { ...ch };
          }
        }
      }
      return null;
    },

    // ─── Chapter ────────────────────────────────────────────────────────────
    openChapter(id) {
      const ch = window.PL.chapters[id];
      if (!ch) { this.navigate('domains'); return; }
      this.activeChapter = ch;
      this.page = 'chapter';
      this.chapterBookmarked = Bookmarks.has('ch_' + id);
      this.activeSection = 's1';
      this.quiz = { active: false, current: 0, selected: null, submitted: false, score: 0, finished: false, answers: {} };
      this.readingPct = Progress.get(id).reading || 0;
      XP.add(10, 'chapter_open');
      window.scrollTo(0, 0);
      if (Progress.get(id).status === 'not_started') {
        Progress.update(id, { status: 'reading', reading: 5 });
      }
      // Trigger Prism highlight after Alpine renders
      this.$nextTick(() => {
        if (window.Prism) Prism.highlightAll();
      });
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
    chapterStatus(id) { return Progress.get(id).status; },

    // ─── Quiz ────────────────────────────────────────────────────────────────

    // Normalize a single question to canonical {text, options:string[], correct:number, explanation}
    normalizeQuestion(q) {
      let options, correct;
      if (q.options && q.options.length > 0 && typeof q.options[0] === 'object') {
        // Domain 1–5 format: options:[{id:"a",text:"..."}], correct:"b"
        options = q.options.map(o => o.text || o.label || String(o));
        const idx = q.options.findIndex(o => o.id === q.correct);
        correct = idx >= 0 ? idx : 0;
      } else {
        // Domain 6 format: options:["string",...], correct:0
        options = (q.options || []).map(o => String(o));
        correct = typeof q.correct === 'number' ? q.correct : parseInt(q.correct) || 0;
      }
      return {
        id: q.id || '',
        text: q.text || q.question || '',
        options,
        correct,
        explanation: q.explanation || ''
      };
    },

    // Normalize + shuffle questions and options for a dynamic quiz
    buildQuiz(questions) {
      const normalized = questions.map(q => this.normalizeQuestion(q));
      // Shuffle question order
      const shuffled = [...normalized].sort(() => Math.random() - 0.5);
      // Shuffle each question's options while tracking new correct index
      return shuffled.map(q => {
        if (!q.options || q.options.length < 2) return q;
        const order = q.options.map((_, i) => i).sort(() => Math.random() - 0.5);
        return {
          ...q,
          options: order.map(i => q.options[i]),
          correct: order.indexOf(q.correct)
        };
      });
    },

    startQuiz() {
      const questions = this.buildQuiz(this.activeChapter.questions || []);
      this.quiz = { active: true, current: 0, selected: null, submitted: false, score: 0, finished: false, answers: {}, questions };
      this.showToast('Quiz started — questions randomized!', 'info');
    },

    selectAnswer(optId) {
      if (this.quiz.submitted) return;
      this.quiz.selected = optId;
    },

    submitAnswer() {
      if (this.quiz.selected === null) return;
      const q = this.currentQuestion;
      if (!q) return;
      const correct = this.quiz.selected === q.correct;
      this.quiz.submitted = true;
      this.quiz.answers[this.quiz.current] = { selected: this.quiz.selected, correct };
      if (correct) this.quiz.score++;
    },

    nextQuestion() {
      const total = (this.quiz.questions || []).length;
      if (this.quiz.current + 1 >= total) {
        this.quiz.finished = true;
        const pct = total > 0 ? Math.round((this.quiz.score / total) * 100) : 0;
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
      if (!this.activeChapter || !this.quiz.active || !this.quiz.questions) return null;
      return this.quiz.questions[this.quiz.current] || null;
    },

    get quizTotal() {
      return this.quiz.active ? (this.quiz.questions || []).length : (this.activeChapter?.questions || []).length;
    },

    optionClass(optId) {
      if (!this.quiz.submitted) return this.quiz.selected === optId ? 'quiz-option selected' : 'quiz-option';
      const q = this.currentQuestion;
      if (!q) return 'quiz-option';
      if (optId === q.correct) return 'quiz-option correct';
      if (optId === this.quiz.selected && optId !== q.correct) return 'quiz-option incorrect';
      return 'quiz-option';
    },

    // ─── Search ──────────────────────────────────────────────────────────────
    runSearch() {
      const q = this.searchQuery.toLowerCase().trim();
      if (!q) { this.searchResults = []; return; }
      const results = [];
      for (const ch of allChapters()) {
        const haystack = [ch.title, ch.domain, ...(ch.tags || [])].join(' ').toLowerCase();
        if (haystack.includes(q)) {
          const d = window.PL.domains.find(dom => dom.id === ch.domain_id);
          results.push({ ...ch, domain_color: d ? d.color : '#5b8dee' });
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
      return window.PL.domains.map(d => ({
        ...d,
        progress: Progress.getDomainPct(d.id),
        chaptersDetail: getDomainChapters(d.id).map(c => ({
          ...c,
          mastery: Progress.getMastery(c.id),
          status: Progress.get(c.id).status
        }))
      }));
    },

    get weakAreas() {
      const all = [];
      for (const ch of allChapters()) {
        const m = Progress.getMastery(ch.id);
        if (m > 0 && m < 60) all.push({ ...ch, mastery: m });
      }
      return all.sort((a,b) => a.mastery - b.mastery).slice(0, 3);
    },

    // ─── Onboarding ──────────────────────────────────────────────────────────
    completeOnboarding() {
      if (!this.onboardData.name) this.onboardData.name = 'Learner';
      store.set('user', this.onboardData);
      this.showOnboarding = false;
      XP.add(50, 'onboarding');
      this.showToast('Welcome to PAL!', 'success');
    },

    // ─── Access Request Gate ──────────────────────────────────────────────────
    requestAccess() {
      const name = this.accessName.trim();
      const email = this.accessEmail.trim();
      if (!name) { this.accessError = 'Please enter your full name'; return; }
      if (!email || !email.includes('@') || !email.includes('.')) {
        this.accessError = 'Please enter a valid email address';
        return;
      }
      this.accessLoading = true;
      this.accessError = '';

      // Compose and open mailto to notify admin
      const sub = encodeURIComponent('PAL Access Request — ' + name);
      const body = encodeURIComponent(
        'New access request for Pharma Analytics Library (PAL):\n\n' +
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Organization: ' + (this.accessOrg.trim() || '—') + '\n' +
        'Time: ' + new Date().toLocaleString() + '\n\n' +
        '---\nReply to this email to grant access.'
      );
      window.open('mailto:sanjivkumarsarkar@gmail.com?subject=' + sub + '&body=' + body, '_blank');

      store.set('access_info', { name, email, org: this.accessOrg.trim(), ts: Date.now() });
      this.accessLoading = false;
      this.accessSent = true;
    },

    enterPlatform() {
      store.set('otp_verified', true);
      this.showOtpGate = false;
      if (this.accessName) this.onboardData.name = this.accessName;
      const user = store.get('user', null);
      if (!user || !user.name || user.name === 'Learner') {
        this.showOnboarding = true;
      }
      this.showToast('Welcome to PAL — Pharma Analytics Library!', 'success');
    },

    // ─── Pharma News ─────────────────────────────────────────────────────────
    async fetchNews() {
      this.newsLoading = true;
      const feeds = [
        { url: 'https://endpts.com/feed/', name: 'Endpoints News' },
        { url: 'https://www.statnews.com/feed/', name: 'STAT News' },
        { url: 'https://www.fda.gov/about-fda/contact-fda/stay-informed/rss-feeds/pressannouncements/rss.xml', name: 'FDA News' },
        { url: 'https://www.fiercepharma.com/rss/xml', name: 'FiercePharma' },
      ];
      for (const feed of feeds) {
        try {
          const controller = new AbortController();
          const tId = setTimeout(() => controller.abort(), 7000);
          const url = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(feed.url) + '&count=5';
          const res = await fetch(url, { signal: controller.signal });
          clearTimeout(tId);
          if (!res.ok) continue;
          const data = await res.json();
          if (data.status === 'ok' && data.items && data.items.length > 0) {
            this.pharmaNews = data.items.slice(0, 5).map(item => ({
              title: (item.title || '').trim(),
              url: item.link || '#',
              date: item.pubDate ? new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '',
              source: feed.name
            }));
            break;
          }
        } catch(e) { /* try next feed */ }
      }
      this.newsLoading = false;
    },

    // ─── Roadmap ──────────────────────────────────────────────────────────────
    get roadmapStages() {
      return [
        { id:'discovery', label:'Drug Discovery', icon:'🔬', color:'#6366f1', desc:'Target identification, compound screening, hit-to-lead optimization', chapters:['1-1'] },
        { id:'preclinical', label:'Pre-Clinical Development', icon:'🧪', color:'#6366f1', desc:'In vitro/vivo studies, ADMET profiling, toxicology, IND filing', chapters:['1-2'] },
        { id:'phase1', label:'Phase I Clinical Trials', icon:'💉', color:'#8b5cf6', desc:'First-in-human safety, PK/PD characterization, dose escalation', chapters:['1-3'] },
        { id:'phase23', label:'Phase II/III Trials', icon:'📋', color:'#8b5cf6', desc:'Efficacy proof-of-concept, dose-ranging, pivotal randomized trials', chapters:['1-3','1-4'] },
        { id:'regulatory', label:'Regulatory Submission', icon:'📄', color:'#0ea5e9', desc:'NDA/BLA/MAA dossier, FDA/EMA review, approval strategy & labeling', chapters:['1-5'] },
        { id:'marketaccess', label:'Market Access & Pricing', icon:'💊', color:'#10b981', desc:'Payer negotiations, HTA, pricing strategy, reimbursement, value dossiers', chapters:['3-1','3-2','3-3','3-4','3-5','3-6','3-7','3-8','3-9','3-10'] },
        { id:'launch', label:'Product Launch', icon:'🚀', color:'#0ea5e9', desc:'Commercial readiness, go-to-market strategy, SFE, launch analytics', chapters:['1-6','2-6'] },
        { id:'commercial', label:'Commercial Operations', icon:'📊', color:'#0ea5e9', desc:'Patient journey analytics, HCP targeting, omnichannel, IC design, forecasting', chapters:['2-1','2-2','2-3','2-4','2-5','2-7','2-8','2-9','2-10','2-11'] },
        { id:'rwe', label:'Post-Market RWE & Medical Affairs', icon:'🏥', color:'#f59e0b', desc:'Real-world studies, HEOR, medical affairs analytics, safety surveillance', chapters:['4-1','4-2','4-3','4-4','4-5'] },
        { id:'loe', label:'LOE & Lifecycle Management', icon:'🔄', color:'#6366f1', desc:'Patent cliff strategy, biosimilar competition, indication expansion, LCM', chapters:['1-7'] },
      ];
    },

    get roadmapEnablers() {
      return [
        { label:'Data Science & ML', icon:'⚙️', color:'#ec4899', desc:'Statistics, ML, causal inference, NLP, deep learning, MLOps for pharma analytics', chapters:['5-1','5-2','5-3','5-4','5-5','5-6','5-7','5-8','5-9','5-10'] },
        { label:'Data Engineering', icon:'🏗️', color:'#14b8a6', desc:'Modern data stack, Snowflake, Spark, DataOps, streaming, data quality for healthcare', chapters:['6-1','6-2','6-3','6-4','6-5','6-6','6-7','6-8','6-9'] },
      ];
    },

    // ─── Toast ────────────────────────────────────────────────────────────────
    showToast(msg, type = 'success') {
      this.toast = { show: true, msg, type };
      setTimeout(() => { this.toast.show = false; }, 3000);
    },

    // ─── Utilities ────────────────────────────────────────────────────────────
    getLevelClass(level) {
      const map = { 'Beginner': 'tag-green', 'Intermediate': 'tag-yellow', 'Advanced': 'tag-red' };
      return 'tag ' + (map[level] || '');
    },

    formatTime(mins) {
      if (mins < 60) return mins + ' min';
      return Math.floor(mins/60) + 'h ' + (mins%60 ? (mins%60)+'m' : '');
    },

    statusDot(status) {
      const map = { completed: '#10b981', read: '#6366f1', reading: '#f59e0b', needs_review: '#ef4444', not_started: '#374151' };
      return map[status] || map.not_started;
    },

    domainColor(domainId) {
      const d = window.PL.domains.find(dom => dom.id === domainId);
      return d ? d.color : '#5b8dee';
    },

    getChapter(id) {
      return window.PL.chapters[id] || null;
    }
  });
})();
