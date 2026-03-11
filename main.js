// =============================================
// NewsPortal — Main JavaScript (no database)
// =============================================

// =============================================
// DATA STORE (in-memory)
// =============================================
let newsData = [
  {
    id: 1,
    title: "Portal Berita Terpercaya Kini Hadir untuk Anda",
    content: "NewsPortal hadir sebagai solusi informasi terkini yang dapat Anda andalkan setiap hari. Dengan tim editorial berpengalaman dan teknologi mutakhir, kami berkomitmen untuk memberikan berita yang akurat, berimbang, dan tepat waktu.\n\nMisi kami adalah mencerdaskan masyarakat melalui informasi berkualitas. Setiap artikel yang dipublikasikan telah melalui proses verifikasi ketat untuk memastikan kebenaran setiap fakta yang disajikan.",
    image_url: "https://picsum.photos/seed/news1/800/450",
    created_at: "2025-03-10T08:00:00",
    username: "admin",
    like_count: 24,
    comment_count: 2,
    liked: false
  },
  {
    id: 2,
    title: "Teknologi AI Semakin Canggih: Dampak pada Dunia Kerja",
    content: "Kecerdasan buatan atau Artificial Intelligence (AI) terus berkembang pesat dan mulai mengubah lanskap dunia kerja secara signifikan. Para ahli memperkirakan bahwa dalam 10 tahun ke depan, hampir setiap industri akan terdampak oleh otomasi berbasis AI.\n\nNamun, para ekonom juga mencatat bahwa AI tidak hanya menghilangkan pekerjaan, tetapi juga menciptakan peluang baru. Profesi seperti AI trainer, prompt engineer, dan data analyst semakin diminati di pasar kerja global.",
    image_url: "https://picsum.photos/seed/news2/800/450",
    created_at: "2025-03-09T14:30:00",
    username: "admin",
    like_count: 47,
    comment_count: 1,
    liked: false
  },
  {
    id: 3,
    title: "Cuaca Ekstrem Melanda Beberapa Wilayah Indonesia",
    content: "Badan Meteorologi, Klimatologi, dan Geofisika (BMKG) memperingatkan masyarakat tentang potensi cuaca ekstrem yang akan melanda beberapa wilayah Indonesia dalam beberapa hari ke depan.\n\nWilayah yang berpotensi terdampak meliputi Sumatera bagian barat, Jawa, Kalimantan, dan Sulawesi. Masyarakat diminta untuk tetap waspada dan mengikuti perkembangan informasi cuaca dari sumber resmi.",
    image_url: "https://picsum.photos/seed/news3/800/450",
    created_at: "2025-03-08T10:15:00",
    username: "admin",
    like_count: 18,
    comment_count: 0,
    liked: false
  }
];

let commentsData = {
  1: [
    { id: 1, username: "user", comment: "Berita yang sangat informatif!", created_at: "2025-03-10T09:00:00" },
    { id: 2, username: "user", comment: "Terima kasih atas informasinya.", created_at: "2025-03-10T10:00:00" }
  ],
  2: [
    { id: 3, username: "user", comment: "Topik yang sangat relevan di era ini.", created_at: "2025-03-09T15:00:00" }
  ],
  3: []
};

let aboutContent = `<h2>Tentang Demo.Website</h2>
<p>Demo.Website adalah portal berita digital terpercaya yang hadir untuk memberikan informasi terkini, akurat, dan berimbang kepada pembaca di seluruh Indonesia.</p>
<h3>Visi Kami</h3>
<p>Menjadi sumber informasi terpercaya yang mencerdaskan masyarakat Indonesia melalui jurnalisme berkualitas tinggi dan bertanggung jawab.</p>
<h3>Misi Kami</h3>
<p>Kami berkomitmen untuk menyajikan berita yang terverifikasi, mengedepankan prinsip kejujuran, dan memberikan ruang bagi berbagai perspektif dalam setiap pemberitaan.</p>
<h3>Tim Redaksi</h3>
<p>Diperkuat oleh tim jurnalis berpengalaman dengan latar belakang pendidikan jurnalistik dan berbagai bidang keahlian, kami hadir 24/7 untuk memastikan Anda tidak melewatkan satu pun berita penting.</p>`;

// =============================================
// AUTH
// =============================================
const USERS = {
  'admin': { password: 'admin', role: 'admin' },
  'user':  { password: 'user',  role: 'user'  }
};

let currentUser = null;
let nextNewsId = 10;
let nextCommentId = 100;

// =============================================
// HELPERS
// =============================================
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showToast(msg, type = '') {
  const toast = document.getElementById('global-toast');
  toast.textContent = msg;
  toast.className = `toast ${type}`;
  requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3200);
}

function togglePass(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
  btn.innerHTML = input.type === 'password'
    ? '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>'
    : '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
}

// =============================================
// SPA NAVIGATION
// =============================================
let currentPage = 'home';

function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const navEl = document.getElementById('nav-' + page);
  if (navEl) navEl.classList.add('active');
  currentPage = page;
  window.scrollTo(0, 0);

  if (page === 'home')  renderHomeNews();
  if (page === 'news')  renderNews();
  if (page === 'about') renderAbout();
  if (page === 'admin') {
    if (!currentUser || currentUser.role !== 'admin') { navigate('home'); return; }
    renderAdminNews();
    document.getElementById('about-editor').innerHTML = aboutContent;
    document.getElementById('admin-username-display').textContent = currentUser.username;
  }
  applyTranslations();
}

// =============================================
// HOME NEWS PREVIEW
// =============================================
function renderHomeNews() {
  const container = document.getElementById('home-latest-news');
  const latest = newsData.slice(0, 3);
  if (latest.length === 0) {
    container.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#888;padding:40px">Belum ada berita.</div>';
    return;
  }
  container.innerHTML = latest.map(n => {
    const excerpt = n.content.replace(/\n+/g, ' ').substring(0, 120) + '...';
    const img = n.image_url || `https://picsum.photos/seed/${n.id}/800/450`;
    return `<div class="latest-card" onclick="showArticle(${n.id})">
      <img src="${img}" alt="${escapeHtml(n.title)}" loading="lazy" onerror="this.src='https://picsum.photos/seed/${n.id}x/800/450'">
      <div class="latest-card-body">
        <h3>${escapeHtml(n.title)}</h3>
        <p>${escapeHtml(excerpt)}</p>
      </div>
    </div>`;
  }).join('');
}

// =============================================
// ARTICLE PAGE
// =============================================
function showArticle(id) {
  const news = newsData.find(n => n.id === id);
  if (!news) return;
  navigate('article');
  const date = new Date(news.created_at);
  const dateStr = date.toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' }) + ' WIB';
  document.getElementById('article-content').innerHTML = `
    <button class="article-back" onclick="navigate('news')">
      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
      <span data-t="article_back">Kembali ke Berita</span>
    </button>
    <h1 class="article-title">${escapeHtml(news.title)}</h1>
    <div class="article-meta">
      <div class="article-avatar">${news.username[0].toUpperCase()}</div>
      <div class="article-meta-info">
        <span class="article-author">${escapeHtml(news.username)}</span>
        <span class="article-date">${dateStr}</span>
      </div>
    </div>
    ${news.image_url ? `<img class="article-cover" src="${news.image_url}" alt="${escapeHtml(news.title)}" onerror="this.style.display='none'">` : ''}
    <div class="article-body">
      ${news.content.split('\n').map(p => p.trim() ? `<p>${escapeHtml(p)}</p>` : '').join('')}
    </div>
    <hr class="article-divider">
    <div class="news-actions" style="margin-bottom:24px">
      <button class="action-btn ${news.liked ? 'liked':''}" id="like-btn-${news.id}" onclick="toggleLike(${news.id},this)">
        <svg width="16" height="16" fill="${news.liked ? 'currentColor':'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <span id="like-count-${news.id}">${news.like_count}</span>
      </button>
      <button class="action-btn" onclick="toggleComments(${news.id},this)">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span id="comment-count-${news.id}">${news.comment_count}</span>
        <span data-t="news_comment_btn">Komentar</span>
      </button>
    </div>
    <div class="comment-section open" id="comments-${news.id}">
      <div class="comment-form">
        <input class="comment-input" type="text" id="comment-input-${news.id}" placeholder="Tulis komentar..." maxlength="500">
        <button class="btn-comment-submit" onclick="submitComment(${news.id})" data-t="news_comment_send">Kirim</button>
      </div>
      <div class="comments-list" id="comments-list-${news.id}"></div>
    </div>
  `;
  renderCommentsList(news.id);
  applyTranslations();
}

// =============================================
// NEWS LIST
// =============================================
function renderNews() {
  const container = document.getElementById('news-list');
  if (newsData.length === 0) {
    container.innerHTML = `<div class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z"/></svg>
      <p data-t="news_empty">Belum ada berita tersedia.</p>
    </div>`;
    return;
  }
  container.innerHTML = newsData.map(n => renderNewsCard(n)).join('');
  applyTranslations();
}

function renderNewsCard(n) {
  const excerpt = n.content.replace(/\n+/g, ' ').substring(0, 240) + '...';
  const date = new Date(n.created_at).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' });
  const imgSrc = n.image_url || `https://picsum.photos/seed/${n.id}/800/450`;
  const commentLabel = tGet('news_comment_btn') || 'Komentar';
  const commentPh   = tGet('news_comment_placeholder') || 'Tulis komentar...';
  const sendLabel   = tGet('news_comment_send') || 'Kirim';
  return `
  <article class="news-card" data-id="${n.id}">
    <div class="news-card-img-wrap">
      <img class="news-card-image" src="${imgSrc}" alt="${escapeHtml(n.title)}" loading="lazy"
        onclick="showArticle(${n.id})"
        onerror="this.src='https://picsum.photos/seed/${n.id}b/800/450'">
    </div>
    <div class="news-card-body">
      <div class="news-card-meta">
        <div class="news-author">
          <div class="author-dot">${n.username[0].toUpperCase()}</div>
          <span class="author-name">${escapeHtml(n.username)}</span>
        </div>
        <span class="news-date">${date}</span>
      </div>
      <h2 class="news-card-title" onclick="showArticle(${n.id})">${escapeHtml(n.title)}</h2>
      <p class="news-card-excerpt">${escapeHtml(excerpt)}</p>
      <div class="news-actions">
        <button class="action-btn ${n.liked?'liked':''}" onclick="toggleLike(${n.id},this)" id="like-btn-${n.id}">
          <svg width="16" height="16" fill="${n.liked?'currentColor':'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span id="like-count-${n.id}">${n.like_count}</span>
        </button>
        <button class="action-btn" onclick="toggleComments(${n.id},this)">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <span id="comment-count-${n.id}">${n.comment_count}</span> ${commentLabel}
        </button>
      </div>
      <div class="comment-section" id="comments-${n.id}">
        <div class="comment-form">
          <input class="comment-input" type="text" id="comment-input-${n.id}" placeholder="${commentPh}" maxlength="500">
          <button class="btn-comment-submit" onclick="submitComment(${n.id})">${sendLabel}</button>
        </div>
        <div class="comments-list" id="comments-list-${n.id}"></div>
      </div>
    </div>
  </article>`;
}

// =============================================
// LIKE & COMMENTS
// =============================================
function toggleLike(newsId, btn) {
  if (!currentUser) {
    showToast(tGet('news_login_required') || 'Silakan login terlebih dahulu.', 'error');
    openAuthModal('login'); return;
  }
  const news = newsData.find(n => n.id === newsId);
  if (!news) return;
  news.liked = !news.liked;
  news.like_count += news.liked ? 1 : -1;
  btn.classList.toggle('liked', news.liked);
  btn.querySelector('svg').setAttribute('fill', news.liked ? 'currentColor' : 'none');
  document.querySelectorAll(`#like-count-${newsId}`).forEach(el => el.textContent = news.like_count);
}

function toggleComments(newsId, btn) {
  const section = document.getElementById(`comments-${newsId}`);
  const isOpen = section.classList.contains('open');
  if (isOpen) { section.classList.remove('open'); return; }
  section.classList.add('open');
  renderCommentsList(newsId);
}

function renderCommentsList(newsId) {
  const list = document.getElementById(`comments-list-${newsId}`);
  if (!list) return;
  const comments = commentsData[newsId] || [];
  const noCommentText = tGet('news_no_comments') || 'Belum ada komentar. Jadilah yang pertama!';
  if (comments.length === 0) {
    list.innerHTML = `<div class="no-comments">${noCommentText}</div>`;
    return;
  }
  list.innerHTML = comments.map(c => `
    <div class="comment-item">
      <div class="comment-avatar">${c.username[0].toUpperCase()}</div>
      <div>
        <div class="comment-user">${escapeHtml(c.username)}</div>
        <div class="comment-text">${escapeHtml(c.comment)}</div>
        <div class="comment-time">${new Date(c.created_at).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})}</div>
      </div>
    </div>`).join('');
}

function submitComment(newsId) {
  if (!currentUser) {
    showToast(tGet('news_login_required') || 'Silakan login terlebih dahulu.', 'error');
    openAuthModal('login'); return;
  }
  const input = document.getElementById(`comment-input-${newsId}`);
  const comment = input.value.trim();
  if (!comment) return;
  if (!commentsData[newsId]) commentsData[newsId] = [];
  commentsData[newsId].unshift({ id: nextCommentId++, username: currentUser.username, comment, created_at: new Date().toISOString() });
  const news = newsData.find(n => n.id === newsId);
  if (news) news.comment_count = commentsData[newsId].length;
  input.value = '';
  document.querySelectorAll(`#comment-count-${newsId}`).forEach(el => el.textContent = commentsData[newsId].length);
  renderCommentsList(newsId);
}

document.addEventListener('keydown', e => {
  if (e.target.classList.contains('comment-input') && e.key === 'Enter') {
    submitComment(parseInt(e.target.id.replace('comment-input-', '')));
  }
});

// =============================================
// ABOUT PAGE
// =============================================
function renderAbout() {
  document.getElementById('about-content').innerHTML = aboutContent;
  const bar = document.getElementById('about-admin-bar');
  if (bar) bar.style.display = (currentUser && currentUser.role === 'admin') ? 'block' : 'none';
}

// =============================================
// ADMIN CRUD
// =============================================
function renderAdminNews() {
  const list = document.getElementById('admin-news-list');
  if (newsData.length === 0) {
    list.innerHTML = '<div style="text-align:center;padding:30px;color:#888">Belum ada berita.</div>';
    return;
  }
  const delLabel = tGet('admin_btn_delete') || 'Hapus';
  list.innerHTML = newsData.map(n => `
    <div class="admin-news-item" id="admin-item-${n.id}">
      <div class="admin-news-item-title">${escapeHtml(n.title)}</div>
      <div class="admin-news-item-date">${new Date(n.created_at).toLocaleDateString('id-ID')}</div>
      <button class="btn-delete" onclick="askDeleteNews(${n.id})">${delLabel}</button>
    </div>`).join('');
}

function askDeleteNews(id) {
  // Show inline confirm strip — no browser confirm() needed
  const item = document.getElementById(`admin-item-${id}`);
  if (!item) return;
  // Remove any existing confirm strips
  document.querySelectorAll('.confirm-strip').forEach(s => s.remove());

  const confirmMsg = tGet('admin_confirm_delete') || 'Yakin hapus berita ini?';
  const yesLabel = tGet('admin_confirm_yes') || 'Ya, Hapus';
  const noLabel  = tGet('admin_confirm_no')  || 'Batal';

  const strip = document.createElement('div');
  strip.className = 'confirm-strip';
  strip.innerHTML = `
    <span>${confirmMsg}</span>
    <button class="confirm-yes" onclick="confirmDeleteNews(${id})">⚠ ${yesLabel}</button>
    <button class="confirm-no"  onclick="cancelDeleteNews(${id})">${noLabel}</button>
  `;
  item.appendChild(strip);
}

function confirmDeleteNews(id) {
  newsData = newsData.filter(n => n.id !== id);
  delete commentsData[id];
  showToast(tGet('admin_delete_success') || 'Berita berhasil dihapus.', 'success');
  renderAdminNews();
}

function cancelDeleteNews(id) {
  const strip = document.querySelector(`#admin-item-${id} .confirm-strip`);
  if (strip) strip.remove();
}

function addNews() {
  const title     = document.getElementById('news-title').value.trim();
  const content   = document.getElementById('news-content').value.trim();
  const image_url = document.getElementById('news-image').value.trim();
  const msgEl     = document.getElementById('add-news-message');
  msgEl.className = 'form-message';

  if (!title || !content) {
    msgEl.textContent = tGet('admin_news_required') || 'Judul dan konten wajib diisi.';
    msgEl.className = 'form-message error';
    return;
  }

  const newNews = {
    id: nextNewsId++,
    title,
    content,
    image_url: image_url || `https://picsum.photos/seed/n${Date.now()}/800/450`,
    created_at: new Date().toISOString(),
    username: currentUser.username,
    like_count: 0,
    comment_count: 0,
    liked: false
  };
  newsData.unshift(newNews);
  commentsData[newNews.id] = [];

  document.getElementById('news-title').value   = '';
  document.getElementById('news-content').value = '';
  document.getElementById('news-image').value   = '';

  msgEl.textContent = tGet('admin_add_success') || 'Berita berhasil ditambahkan!';
  msgEl.className = 'form-message success';
  showToast(tGet('admin_add_success') || 'Berita berhasil ditambahkan!', 'success');
  renderAdminNews();
}

function saveAbout() {
  aboutContent = document.getElementById('about-editor').innerHTML;
  const msgEl = document.getElementById('about-message');
  msgEl.textContent = tGet('admin_about_saved') || 'Halaman Tentang Kami berhasil disimpan!';
  msgEl.className = 'form-message success';
  showToast(tGet('admin_about_saved') || 'Perubahan disimpan!', 'success');
}

function showAdminTab(tab, e) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`tab-${tab}`).classList.add('active');
  if (e && e.target) {
    e.target.classList.add('active');
  } else {
    document.querySelectorAll('.tab-nav-btn').forEach(b => {
      if (b.getAttribute('onclick') && b.getAttribute('onclick').includes(`'${tab}'`)) b.classList.add('active');
    });
  }
}

function execCmd(cmd) { document.getElementById('about-editor').focus(); document.execCommand(cmd, false, null); }
function insertHeading(tag) { document.getElementById('about-editor').focus(); document.execCommand('formatBlock', false, tag); }

// =============================================
// AUTH MODAL
// =============================================
function openAuthModal(defaultTab = 'login') {
  const overlay = document.getElementById('auth-modal');
  overlay.classList.add('active');
  startSmoke();
  switchTab(defaultTab, document.querySelector(`[data-tab="${defaultTab}"]`));
  document.getElementById('login-message').className = 'form-message';
  updateSignupDemoMsg();
}

function closeAuthModal() {
  document.getElementById('auth-modal').classList.remove('active');
  stopSmoke();
}

function switchTab(tab, btnEl) {
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.modal-form').forEach(f => f.classList.remove('active'));
  const targetBtn = btnEl || document.querySelector(`[data-tab="${tab}"]`);
  if (targetBtn) targetBtn.classList.add('active');
  document.getElementById(`form-${tab}`).classList.add('active');
  updateSignupDemoMsg();
}

function updateSignupDemoMsg() {
  const el = document.getElementById('signup-message');
  if (el) {
    el.className = 'form-message error';
    el.style.display = 'block';
    el.textContent = tGet('signup_disabled_msg') || '🚫 Ini adalah website demo. Untuk sementara pendaftaran akun baru tidak tersedia. Silakan login dengan akun yang tersedia.';
  }
}

function trySignup() {
  showDemoNotice();
  updateSignupDemoMsg();
}

// ---- GLITCH on the black submit button ----
function triggerSubmitGlitch(btnId) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.classList.remove('glitching');
  void btn.offsetWidth; // force reflow
  btn.classList.add('glitching');
  setTimeout(() => btn.classList.remove('glitching'), 420);
}

function submitLogin() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  const msgEl    = document.getElementById('login-message');
  const btn      = document.getElementById('btn-login-submit');
  msgEl.className = 'form-message';

  if (!username || !password) {
    msgEl.textContent = tGet('login_fields_required') || 'Username dan password wajib diisi.';
    msgEl.className = 'form-message error';
    triggerSubmitGlitch('btn-login-submit');
    return;
  }

  // Fire glitch on click
  triggerSubmitGlitch('btn-login-submit');
  btn.innerHTML = '<span class="spinner"></span>';
  btn.disabled = true;

  setTimeout(() => {
    const user = USERS[username];
    if (user && user.password === password) {
      currentUser = { username, role: user.role };
      updateNavUser();
      closeAuthModal();
      showToast(`Selamat datang, ${username}!`, 'success');
      if (currentPage === 'home') renderHomeNews();
      if (currentPage === 'news') renderNews();
    } else {
      msgEl.textContent = tGet('login_error') || 'Username atau password salah.';
      msgEl.className = 'form-message error';
      triggerSubmitGlitch('btn-login-submit');
    }
    btn.innerHTML = tGet('modal_btn_login') || 'Masuk';
    btn.disabled = false;
  }, 500);
}

function logout() {
  currentUser = null;
  updateNavGuest();
  showToast(tGet('logout_success') || 'Berhasil keluar.', 'success');
  if (currentPage === 'admin') navigate('home');
  newsData.forEach(n => n.liked = false);
  if (currentPage === 'news')  renderNews();
  if (currentPage === 'home')  renderHomeNews();
}

function updateNavUser() {
  const navRight = document.getElementById('nav-right');
  navRight.innerHTML = `<div class="user-info">
    ${currentUser.role === 'admin' ? '<span class="admin-badge" data-t="nav_admin_badge">Admin</span>' : ''}
    <div class="user-avatar">${currentUser.username[0].toUpperCase()}</div>
    <span class="user-name">${currentUser.username}</span>
    <button class="btn-logout" data-t="nav_logout" onclick="logout()">Keluar</button>
  </div>`;
  const adminLi = document.getElementById('nav-admin-li');
  if (adminLi) adminLi.style.display = currentUser.role === 'admin' ? 'block' : 'none';
  applyTranslations();
}

function updateNavGuest() {
  const navRight = document.getElementById('nav-right');
  navRight.innerHTML = `<button class="btn-login" onclick="openAuthModal()">
    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>
    <span data-t="nav_login">Masuk</span>
  </button>`;
  const adminLi = document.getElementById('nav-admin-li');
  if (adminLi) adminLi.style.display = 'none';
  applyTranslations();
}

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('auth-modal');
  if (overlay) overlay.addEventListener('click', e => { if (e.target === overlay) closeAuthModal(); });
});

// =============================================
// SMOKE ANIMATION
// =============================================
let smokeInterval = null;

function startSmoke() {
  const container = document.getElementById('smoke-container');
  container.innerHTML = '';
  for (let i = 0; i < 8; i++) spawnSmoke(container, i * 380);
  smokeInterval = setInterval(() => spawnSmoke(container, 0), 1300);
}

function stopSmoke() {
  clearInterval(smokeInterval);
  smokeInterval = null;
  const c = document.getElementById('smoke-container');
  if (c) c.innerHTML = '';
}

function spawnSmoke(container, delay) {
  const p = document.createElement('div');
  p.className = 'smoke-particle';
  const size  = 80 + Math.random() * 130;
  const x     = Math.random() * 100;
  const y     = 35 + Math.random() * 65;
  const dur   = 5 + Math.random() * 5;
  const dx    = (Math.random() - 0.5) * 100;
  p.style.cssText = `width:${size}px;height:${size}px;left:${x}%;top:${y}%;--dur:${dur}s;--delay:${delay}ms;--dx:${dx}px;animation-delay:${delay}ms;`;
  container.appendChild(p);
  setTimeout(() => { if (p.parentNode) p.parentNode.removeChild(p); }, dur * 1000 + delay + 600);
}

// =============================================
// DEMO NOTICE
// =============================================
function showDemoNotice() {
  const notice = document.getElementById('demo-notice');
  notice.classList.add('show');
  clearTimeout(window._demoTimer);
  window._demoTimer = setTimeout(() => notice.classList.remove('show'), 6000);
}

function closeDemoNotice() {
  document.getElementById('demo-notice').classList.remove('show');
}

// =============================================
// LANGUAGE SYSTEM
// =============================================
const LANGUAGES = {
  'en-us': { label: '🇺🇸 English (US)', short: 'EN-US' },
  'en-uk': { label: '🇬🇧 English (UK)', short: 'EN-UK' },
  'ja':    { label: '🇯🇵 日本語',         short: 'JA'    },
  'es':    { label: '🇲🇽 Español (Latam)', short: 'ES'  },
  'zh':    { label: '🇨🇳 中文',           short: 'ZH'   },
};

const T = {
  nav_home:        { 'en-us':'Home','en-uk':'Home','ja':'ホーム','es':'Inicio','zh':'首页' },
  nav_news:        { 'en-us':'News','en-uk':'News','ja':'ニュース','es':'Noticias','zh':'新闻' },
  nav_about:       { 'en-us':'About','en-uk':'About','ja':'概要','es':'Nosotros','zh':'关于' },
  nav_admin:       { 'en-us':'Admin','en-uk':'Admin','ja':'管理者','es':'Admin','zh':'管理' },
  nav_login:       { 'en-us':'Sign In','en-uk':'Sign In','ja':'ログイン','es':'Ingresar','zh':'登录' },
  nav_logout:      { 'en-us':'Sign Out','en-uk':'Log Out','ja':'ログアウト','es':'Salir','zh':'退出' },
  nav_admin_badge: { 'en-us':'Admin','en-uk':'Admin','ja':'管理者','es':'Admin','zh':'管理员' },
  modal_welcome:   { 'en-us':'Welcome Back','en-uk':'Welcome Back','ja':'ようこそ','es':'Bienvenido','zh':'欢迎回来' },
  modal_subtitle:  { 'en-us':'Sign in or create a new account','en-uk':'Sign in or create a new account','ja':'ログインまたは新規アカウント作成','es':'Inicia sesión o crea una cuenta nueva','zh':'登录或创建新账户' },
  modal_tab_login: { 'en-us':'Sign In','en-uk':'Log In','ja':'ログイン','es':'Ingresar','zh':'登录' },
  modal_tab_signup:{ 'en-us':'Sign Up','en-uk':'Register','ja':'新規登録','es':'Registrarse','zh':'注册' },
  modal_username:  { 'en-us':'Username','en-uk':'Username','ja':'ユーザー名','es':'Usuario','zh':'用户名' },
  modal_password:  { 'en-us':'Password','en-uk':'Password','ja':'パスワード','es':'Contraseña','zh':'密码' },
  modal_login_placeholder_user:  { 'en-us':'Enter your username','en-uk':'Enter your username','ja':'ユーザー名を入力','es':'Ingresa tu usuario','zh':'输入用户名' },
  modal_login_placeholder_pass:  { 'en-us':'Enter your password','en-uk':'Enter your password','ja':'パスワードを入力','es':'Ingresa tu contraseña','zh':'输入密码' },
  modal_signup_placeholder_user: { 'en-us':'Choose a username (min. 3 chars)','en-uk':'Choose a username','ja':'ユーザー名を決めてください','es':'Elige un usuario','zh':'选择用户名' },
  modal_signup_placeholder_pass: { 'en-us':'Create a password (min. 6 chars)','en-uk':'Create a password','ja':'パスワードを設定','es':'Crea una contraseña','zh':'创建密码' },
  modal_btn_login:   { 'en-us':'Sign In','en-uk':'Log In','ja':'ログイン','es':'Ingresar','zh':'登录' },
  modal_btn_signup:  { 'en-us':'Create Account','en-uk':'Register Now','ja':'アカウントを作成','es':'Crear cuenta','zh':'立即注册' },
  modal_no_account:  { 'en-us':"Don't have an account?",'en-uk':"Don't have an account?",'ja':'アカウントをお持ちでないですか？','es':'¿No tienes cuenta?','zh':'没有账户？' },
  modal_have_account:{ 'en-us':'Already have an account?','en-uk':'Already have an account?','ja':'すでにアカウントをお持ちですか？','es':'¿Ya tienes cuenta?','zh':'已有账户？' },
  modal_register_link:{ 'en-us':'Sign Up','en-uk':'Register','ja':'新規登録','es':'Regístrate','zh':'注册' },
  modal_login_link:   { 'en-us':'Sign In','en-uk':'Log In','ja':'ログイン','es':'Iniciar sesión','zh':'登录' },
  home_eyebrow:       { 'en-us':'Welcome to NewsPortal','en-uk':'Welcome to NewsPortal','ja':'NewsPortalへようこそ','es':'Bienvenido a NewsPortal','zh':'欢迎来到新闻门户' },
  home_hero_title1:   { 'en-us':'Breaking','en-uk':'Breaking','ja':'最新','es':'Noticias','zh':'最新' },
  home_hero_title2:   { 'en-us':'News','en-uk':'News','ja':'ニュース','es':'de Hoy','zh':'新闻' },
  home_hero_subtitle: { 'en-us':'A trusted digital news portal with accurate, balanced, and up-to-date information from around the world.','en-uk':'A trusted digital news portal with accurate, balanced, and up-to-date information from around the world.','ja':'世界中から正確でバランスのとれた最新情報をお届けする、信頼できるデジタルニュースポータル。','es':'Un portal de noticias digital confiable con información precisa, equilibrada y actualizada de todo el mundo.','zh':'值得信赖的数字新闻门户，为您提供来自世界各地准确、平衡、最新的信息。' },
  home_btn_read:   { 'en-us':'Read News','en-uk':'Read News','ja':'ニュースを読む','es':'Leer Noticias','zh':'阅读新闻' },
  home_btn_join:   { 'en-us':'Join Now','en-uk':'Join Now','ja':'今すぐ参加','es':'Únete Ahora','zh':'立即加入' },
  home_section_why:   { 'en-us':'Why Us','en-uk':'Why Us','ja':'なぜ私たちか','es':'Por qué Nosotros','zh':'为什么选择我们' },
  home_section_trust: { 'en-us':'A News Portal\nYou Can Trust','en-uk':'A News Portal\nYou Can Trust','ja':'信頼できる\nニュースポータル','es':'El Portal de Noticias\nque Puedes Confiar','zh':'您值得信赖的\n新闻门户' },
  feat1_title: { 'en-us':'Real-Time Updates','en-uk':'Real-Time Updates','ja':'リアルタイム更新','es':'Actualizaciones en Tiempo Real','zh':'实时更新' },
  feat1_desc:  { 'en-us':'News is updated regularly so you always get the most current and relevant information.','en-uk':'News is updated regularly so you always get the most current and relevant information.','ja':'ニュースは定期的に更新され、常に最新の関連情報を入手できます。','es':'Las noticias se actualizan regularmente para que siempre obtengas la información más actual.','zh':'新闻定期更新，让您始终获得最新、最相关的信息。' },
  feat2_title: { 'en-us':'Direct Interaction','en-uk':'Direct Interaction','ja':'直接インタラクション','es':'Interacción Directa','zh':'直接互动' },
  feat2_desc:  { 'en-us':'Share your opinions through comment and like features. Be part of quality public discussion.','en-uk':'Share your opinions through comment and like features. Be part of quality public discussion.','ja':'コメントといいね機能で意見を共有しましょう。','es':'Comparte tus opiniones a través de comentarios y likes.','zh':'通过评论和点赞功能分享您的意见。' },
  feat3_title: { 'en-us':'Trusted & Accurate','en-uk':'Trusted & Accurate','ja':'信頼できる正確な情報','es':'Confiable y Preciso','zh':'可信且准确' },
  feat3_desc:  { 'en-us':'Every news article goes through a rigorous editorial verification process before publication.','en-uk':'Every news article goes through a rigorous editorial verification process before publication.','ja':'すべての記事は公開前に厳格な編集検証プロセスを経ています。','es':'Cada artículo pasa por un riguroso proceso de verificación editorial antes de ser publicado.','zh':'每篇新闻文章在发布前都经过严格的编辑核实过程。' },
  feat4_title: { 'en-us':'Multi-Platform','en-uk':'Multi-Platform','ja':'マルチプラットフォーム','es':'Multi-Plataforma','zh':'多平台' },
  feat4_desc:  { 'en-us':'Access news from any device — desktop, tablet, or smartphone, anytime and anywhere.','en-uk':'Access news from any device anytime and anywhere.','ja':'どのデバイスからでもいつでもどこでもニュースにアクセスできます。','es':'Accede a las noticias desde cualquier dispositivo, en cualquier momento y lugar.','zh':'从任何设备访问新闻，随时随地。' },
  stats_readers:  { 'en-us':'Active Readers','en-uk':'Active Readers','ja':'アクティブ読者','es':'Lectores Activos','zh':'活跃读者' },
  stats_articles: { 'en-us':'News Articles','en-uk':'News Articles','ja':'ニュース記事','es':'Artículos de Noticias','zh':'新闻文章' },
  stats_topics:   { 'en-us':'Topic Categories','en-uk':'Topic Categories','ja':'トピックカテゴリ','es':'Categorías de Temas','zh':'话题类别' },
  stats_updates:  { 'en-us':'Latest News','en-uk':'Latest News','ja':'最新ニュース','es':'Noticias de Última Hora','zh':'最新新闻' },
  home_latest_label: { 'en-us':'Latest','en-uk':'Latest','ja':'最新','es':'Últimas','zh':'最新' },
  home_latest_title: { 'en-us':'Selected News','en-uk':'Selected News','ja':'厳選ニュース','es':'Noticias Destacadas','zh':'精选新闻' },
  home_view_all:     { 'en-us':'View All News →','en-uk':'View All News →','ja':'すべてのニュースを見る →','es':'Ver Todas las Noticias →','zh':'查看所有新闻 →' },
  news_page_title:    { 'en-us':'Latest News','en-uk':'Latest News','ja':'最新ニュース','es':'Últimas Noticias','zh':'最新新闻' },
  news_page_subtitle: { 'en-us':'Latest, accurate, and trusted information for you','en-uk':'Latest, accurate, and trusted information for you','ja':'最新で正確な信頼できる情報をお届けします','es':'La información más reciente, precisa y confiable para ti','zh':'为您提供最新、准确、可信的信息' },
  news_empty:     { 'en-us':'No news available yet.','en-uk':'No news available yet.','ja':'まだニュースはありません。','es':'Aún no hay noticias disponibles.','zh':'暂无新闻。' },
  news_comment_btn:         { 'en-us':'Comments','en-uk':'Comments','ja':'コメント','es':'Comentarios','zh':'评论' },
  news_comment_placeholder: { 'en-us':'Write a comment...','en-uk':'Write a comment...','ja':'コメントを書く...','es':'Escribe un comentario...','zh':'写下评论...' },
  news_comment_send:        { 'en-us':'Send','en-uk':'Send','ja':'送信','es':'Enviar','zh':'发送' },
  news_no_comments:         { 'en-us':'No comments yet. Be the first!','en-uk':'No comments yet. Be the first!','ja':'まだコメントはありません。最初のコメントを投稿しましょう！','es':'Aún no hay comentarios. ¡Sé el primero!','zh':'暂无评论，成为第一个评论者！' },
  news_login_required:      { 'en-us':'Please log in first.','en-uk':'Please log in first.','ja':'まずログインしてください。','es':'Por favor inicia sesión primero.','zh':'请先登录。' },
  about_page_title:    { 'en-us':'About Us','en-uk':'About Us','ja':'私たちについて','es':'Sobre Nosotros','zh':'关于我们' },
  about_page_subtitle: { 'en-us':'Get to know who we are and what we stand for','en-uk':'Get to know who we are and what we stand for','ja':'私たちが何者で、何を目指しているかをもっと知ってください','es':'Conoce más de cerca quiénes somos y por qué luchamos','zh':'深入了解我们是谁以及我们的立场' },
  about_admin_bar:  { 'en-us':'Admin Mode Active — You can edit this page','en-uk':'Admin Mode Active — You can edit this page','ja':'管理者モードが有効 — このページを編集できます','es':'Modo Admin Activo — Puedes editar esta página','zh':'管理员模式已激活 — 您可以编辑此页面' },
  about_edit_btn:   { 'en-us':'✏ Edit About Us','en-uk':'✏ Edit About Us','ja':'✏ 概要を編集','es':'✏ Editar Sobre Nosotros','zh':'✏ 编辑关于我们' },
  admin_title:           { 'en-us':'Admin Panel','en-uk':'Admin Panel','ja':'管理者パネル','es':'Panel de Admin','zh':'管理面板' },
  admin_subtitle_prefix: { 'en-us':'Welcome,','en-uk':'Welcome,','ja':'ようこそ、','es':'Bienvenido,','zh':'欢迎，' },
  admin_subtitle_suffix: { 'en-us':'. Manage website content from here.','en-uk':'. Manage website content from here.','ja':'。ここからウェブサイトのコンテンツを管理できます。','es':'. Administra el contenido del sitio web desde aquí.','zh':'。从这里管理网站内容。' },
  admin_tab_news:        { 'en-us':'📰 Manage News','en-uk':'📰 Manage News','ja':'📰 ニュース管理','es':'📰 Gestionar Noticias','zh':'📰 管理新闻' },
  admin_tab_about:       { 'en-us':'📝 Edit About Us','en-uk':'📝 Edit About Us','ja':'📝 概要を編集','es':'📝 Editar Sobre Nosotros','zh':'📝 编辑关于我们' },
  admin_add_news_title:  { 'en-us':'Add New Article','en-uk':'Add New Article','ja':'新しい記事を追加','es':'Agregar Nuevo Artículo','zh':'添加新文章' },
  admin_news_title_ph:   { 'en-us':'News title *','en-uk':'News title *','ja':'ニュースのタイトル *','es':'Título de la noticia *','zh':'新闻标题 *' },
  admin_news_img_ph:     { 'en-us':'Image URL (optional)','en-uk':'Image URL (optional)','ja':'画像URL（任意）','es':'URL de imagen (opcional)','zh':'图片URL（可选）' },
  admin_news_content_ph: { 'en-us':'Full news content *','en-uk':'Full news content *','ja':'ニュースの全文 *','es':'Contenido completo de la noticia *','zh':'新闻完整内容 *' },
  admin_btn_add_news:    { 'en-us':'+ Add News','en-uk':'+ Add News','ja':'+ ニュースを追加','es':'+ Agregar Noticia','zh':'+ 添加新闻' },
  admin_news_list_title: { 'en-us':'News List','en-uk':'News List','ja':'ニュース一覧','es':'Lista de Noticias','zh':'新闻列表' },
  admin_about_title:     { 'en-us':'Edit About Us Page','en-uk':'Edit About Us Page','ja':'概要ページを編集','es':'Editar Página Sobre Nosotros','zh':'编辑关于我们页面' },
  admin_btn_save:        { 'en-us':'💾 Save Changes','en-uk':'💾 Save Changes','ja':'💾 変更を保存','es':'💾 Guardar Cambios','zh':'💾 保存更改' },
  admin_btn_delete:      { 'en-us':'Delete','en-uk':'Delete','ja':'削除','es':'Eliminar','zh':'删除' },
  admin_confirm_delete:  { 'en-us':'Delete this article?','en-uk':'Delete this article?','ja':'この記事を削除しますか？','es':'¿Eliminar esta noticia?','zh':'删除这篇文章？' },
  admin_confirm_yes:     { 'en-us':'Yes, Delete','en-uk':'Yes, Delete','ja':'はい、削除','es':'Sí, Eliminar','zh':'是，删除' },
  admin_confirm_no:      { 'en-us':'Cancel','en-uk':'Cancel','ja':'キャンセル','es':'Cancelar','zh':'取消' },
  admin_delete_success:  { 'en-us':'Article deleted.','en-uk':'Article deleted.','ja':'記事を削除しました。','es':'Noticia eliminada.','zh':'文章已删除。' },
  admin_add_success:     { 'en-us':'Article added!','en-uk':'Article added!','ja':'記事を追加しました！','es':'¡Noticia agregada!','zh':'文章已添加！' },
  admin_news_required:   { 'en-us':'Title and content are required.','en-uk':'Title and content are required.','ja':'タイトルと内容は必須です。','es':'El título y contenido son obligatorios.','zh':'标题和内容为必填项。' },
  admin_about_saved:     { 'en-us':'About Us page saved!','en-uk':'About Us page saved!','ja':'概要ページを保存しました！','es':'¡Página Sobre Nosotros guardada!','zh':'关于我们页面已保存！' },
  footer_tagline:     { 'en-us':'A trusted news portal with the latest, accurate, and balanced information for you every day.','en-uk':'A trusted news portal with the latest, accurate, and balanced information for you every day.','ja':'毎日、最新で正確かつバランスのとれた情報をお届けする信頼できるニュースポータル。','es':'Un portal de noticias confiable con información actualizada, precisa y equilibrada para ti cada día.','zh':'值得信赖的新闻门户，每天为您提供最新、准确、均衡的信息。' },
  footer_nav_label:   { 'en-us':'Navigation','en-uk':'Navigation','ja':'ナビゲーション','es':'Navegación','zh':'导航' },
  footer_other_label: { 'en-us':'Other','en-uk':'Other','ja':'その他','es':'Otros','zh':'其他' },
  footer_privacy:     { 'en-us':'Privacy Policy','en-uk':'Privacy Policy','ja':'プライバシーポリシー','es':'Política de Privacidad','zh':'隐私政策' },
  footer_terms:       { 'en-us':'Terms & Conditions','en-uk':'Terms & Conditions','ja':'利用規約','es':'Términos y Condiciones','zh':'条款与条件' },
  footer_contact:     { 'en-us':'Contact Us','en-uk':'Contact Us','ja':'お問い合わせ','es':'Contáctanos','zh':'联系我们' },
  login_error:        { 'en-us':'Incorrect username or password.','en-uk':'Incorrect username or password.','ja':'ユーザー名またはパスワードが間違っています。','es':'Usuario o contraseña incorrectos.','zh':'用户名或密码错误。' },
  login_fields_required: { 'en-us':'Username and password are required.','en-uk':'Username and password are required.','ja':'ユーザー名とパスワードは必須です。','es':'El usuario y la contraseña son obligatorios.','zh':'用户名和密码为必填项。' },
  logout_success:     { 'en-us':'Successfully signed out.','en-uk':'Successfully signed out.','ja':'サインアウトしました。','es':'Sesión cerrada exitosamente.','zh':'成功退出。' },
  article_back:       { 'en-us':'Back to News','en-uk':'Back to News','ja':'ニュースに戻る','es':'Volver a Noticias','zh':'返回新闻' },
  signup_disabled_msg:{ 'en-us':'🚫 Demo website — New account registration is currently unavailable. Please use an existing account.','en-uk':'🚫 Demo website — New account registration is currently unavailable. Please use an existing account.','ja':'🚫 デモサイト — 現在、新規アカウント登録はご利用いただけません。既存のアカウントをご使用ください。','es':'🚫 Sitio web demo — El registro de nuevas cuentas no está disponible por el momento. Por favor usa una cuenta existente.','zh':'🚫 演示网站 — 目前无法注册新账户。请使用现有账户。' },
  demo_notice_title:  { 'en-us':'Demo Website','en-uk':'Demo Website','ja':'デモサイト','es':'Sitio Web Demo','zh':'演示网站' },
  demo_notice_msg:    { 'en-us':'This is a demo website. New account registration is temporarily unavailable. Please sign in with an existing account.','en-uk':'This is a demo website. New account registration is temporarily unavailable. Please sign in with an existing account.','ja':'これはデモサイトです。現在、新規アカウント登録はご利用いただけません。既存のアカウントでサインインしてください。','es':'Este es un sitio web demo. El registro de cuentas nuevas no está disponible temporalmente. Por favor inicia sesión con una cuenta existente.','zh':'这是一个演示网站。新账户注册暂时不可用。请使用现有账户登录。' },
  demo_notice_close:  { 'en-us':'Close','en-uk':'Close','ja':'閉じる','es':'Cerrar','zh':'关闭' },
};

let currentLang = localStorage.getItem('np_lang') || 'id';

function tGet(key) {
  if (currentLang === 'id') return null;
  const entry = T[key];
  if (!entry) return null;
  return entry[currentLang] || entry['en-us'] || null;
}

function applyTranslations() {
  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.getAttribute('data-t');
    const tr  = tGet(key);
    if (tr === null) return;
    const attr = el.getAttribute('data-t-attr');
    if      (attr === 'placeholder') el.placeholder = tr;
    else if (attr === 'value')       el.value = tr;
    else if (attr === 'title')       el.title = tr;
    else                             el.innerHTML = tr;
  });
  const langMap = { 'en-us':'en','en-uk':'en-GB','ja':'ja','es':'es','zh':'zh','id':'id' };
  document.documentElement.lang = langMap[currentLang] || 'id';
  if (document.getElementById('form-signup').classList.contains('active')) updateSignupDemoMsg();
}

window.applyTranslations = applyTranslations;
window.tGet = tGet;

// =============================================
// LANGUAGE SWITCHER UI
// =============================================
function buildLangSwitcher() {
  const wrapper = document.createElement('div');
  wrapper.id = 'lang-switcher';
  wrapper.innerHTML = `
    <button class="lang-current" onclick="toggleLangDropdown()" title="Change Language">
      <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      <span id="lang-current-label">${currentLang === 'id' ? '🇮🇩 ID' : (LANGUAGES[currentLang]?.short || currentLang.toUpperCase())}</span>
      <svg class="lang-chevron" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
    </button>
    <div class="lang-dropdown" id="lang-dropdown">
      <div class="lang-option ${currentLang==='id'?'active':''}" onclick="setLanguage('id')">🇮🇩 <span>Bahasa Indonesia</span></div>
      ${Object.entries(LANGUAGES).map(([code, info]) =>
        `<div class="lang-option ${currentLang===code?'active':''}" onclick="setLanguage('${code}')">${info.label.split(' ')[0]} <span>${info.label.split(' ').slice(1).join(' ')}</span></div>`
      ).join('')}
    </div>`;
  document.body.appendChild(wrapper);
  document.addEventListener('click', e => {
    if (!wrapper.contains(e.target)) {
      const dd = document.getElementById('lang-dropdown');
      const btn = wrapper.querySelector('.lang-current');
      if (dd)  dd.classList.remove('open');
      if (btn) btn.classList.remove('lang-dropdown-open');
    }
  });
}

function toggleLangDropdown() {
  const dd  = document.getElementById('lang-dropdown');
  const btn = document.querySelector('.lang-current');
  const open = dd.classList.contains('open');
  dd.classList.toggle('open', !open);
  btn.classList.toggle('lang-dropdown-open', !open);
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('np_lang', lang);
  const dd  = document.getElementById('lang-dropdown');
  const btn = document.querySelector('.lang-current');
  if (dd)  dd.classList.remove('open');
  if (btn) btn.classList.remove('lang-dropdown-open');
  applyTranslations();
  const label = document.getElementById('lang-current-label');
  if (label) label.textContent = lang === 'id' ? '🇮🇩 ID' : (LANGUAGES[lang]?.short || lang.toUpperCase());
  document.querySelectorAll('.lang-option').forEach((el, i) => {
    el.classList.remove('active');
    const code = i === 0 ? 'id' : Object.keys(LANGUAGES)[i - 1];
    if (code === lang) el.classList.add('active');
  });
  if (currentPage === 'news')  renderNews();
  if (currentPage === 'home')  renderHomeNews();
  if (currentPage === 'admin') renderAdminNews();
}

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  // Set data-text on login submit btn for glitch pseudo-elements
  const loginBtn = document.getElementById('btn-login-submit');
  if (loginBtn) loginBtn.setAttribute('data-text', loginBtn.textContent.trim());

  const overlay = document.getElementById('auth-modal');
  if (overlay) overlay.addEventListener('click', e => { if (e.target === overlay) closeAuthModal(); });

  buildLangSwitcher();
  navigate('home');
  if (currentLang !== 'id') applyTranslations();
  setTimeout(() => { if (currentLang !== 'id') applyTranslations(); }, 300);
});
