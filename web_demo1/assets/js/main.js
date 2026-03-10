// =============================================
// NewsPortal - Main JavaScript
// =============================================

// ---- AUTH STATE ----
let currentUser = null;

async function checkAuth() {
  try {
    const res = await fetch('includes/auth.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'action=check'
    });
    const data = await res.json();
    if (data.loggedIn) {
      currentUser = { username: data.username, role: data.role };
      updateNavUser();
    } else {
      currentUser = null;
      updateNavGuest();
    }
  } catch (e) { console.error('Auth check failed', e); }
}

function updateNavUser() {
  const navRight = document.getElementById('nav-right');
  if (!navRight) return;
  navRight.innerHTML = `
    <div class="user-info">
      ${currentUser.role === 'admin' ? '<span class="admin-badge" data-t="nav_admin_badge">Admin</span>' : ''}
      <div class="user-avatar">${currentUser.username[0]}</div>
      <span class="user-name">${currentUser.username}</span>
      <button class="btn-logout" data-t="nav_logout" onclick="logout()">Keluar</button>
    </div>`;
  if (typeof applyTranslations === 'function') applyTranslations();
}

function updateNavGuest() {
  const navRight = document.getElementById('nav-right');
  if (!navRight) return;
  navRight.innerHTML = `<button class="btn-login" onclick="openAuthModal()">
    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>
    <span data-t="nav_login">Masuk</span>
  </button>`;
  if (typeof applyTranslations === 'function') applyTranslations();
}

async function logout() {
  await fetch('includes/auth.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'action=logout'
  });
  currentUser = null;
  updateNavGuest();
  showToast('Berhasil keluar.', 'success');
  setTimeout(() => location.reload(), 600);
}

// ---- AUTH MODAL ----
function openAuthModal(defaultTab = 'login') {
  const overlay = document.getElementById('auth-modal');
  overlay.classList.add('active');
  switchTab(defaultTab);
  document.getElementById('login-message').className = 'form-message';
  document.getElementById('signup-message').className = 'form-message';
}

function closeAuthModal() {
  document.getElementById('auth-modal').classList.remove('active');
}

function switchTab(tab) {
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.modal-form').forEach(f => f.classList.remove('active'));
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
  document.getElementById(`form-${tab}`).classList.add('active');
}

// Login
async function submitLogin(e) {
  e && e.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  const msgEl = document.getElementById('login-message');
  const btn = document.getElementById('btn-login-submit');

  msgEl.className = 'form-message';
  btn.innerHTML = '<span class="spinner"></span>';
  btn.disabled = true;

  try {
    const body = new URLSearchParams({ action: 'login', username, password });
    const res = await fetch('includes/auth.php', { method: 'POST', body });
    const data = await res.json();

    if (data.success) {
      currentUser = { username: data.username, role: data.role };
      updateNavUser();
      closeAuthModal();
      showToast(`Selamat datang, ${data.username}!`, 'success');
      setTimeout(() => location.reload(), 700);
    } else {
      msgEl.textContent = data.message;
      msgEl.className = 'form-message error';
    }
  } catch (e) {
    msgEl.textContent = 'Terjadi kesalahan. Coba lagi.';
    msgEl.className = 'form-message error';
  }

  btn.innerHTML = 'Masuk';
  btn.disabled = false;
}

// Signup
async function submitSignup(e) {
  e && e.preventDefault();
  const username = document.getElementById('signup-username').value.trim();
  const password = document.getElementById('signup-password').value;
  const msgEl = document.getElementById('signup-message');
  const btn = document.getElementById('btn-signup-submit');

  msgEl.className = 'form-message';
  btn.innerHTML = '<span class="spinner"></span>';
  btn.disabled = true;

  try {
    const body = new URLSearchParams({ action: 'signup', username, password });
    const res = await fetch('includes/auth.php', { method: 'POST', body });
    const data = await res.json();

    if (data.success) {
      currentUser = { username: data.username, role: data.role };
      updateNavUser();
      closeAuthModal();
      showToast(`Akun berhasil dibuat! Selamat datang, ${data.username}!`, 'success');
      setTimeout(() => location.reload(), 700);
    } else {
      msgEl.textContent = data.message;
      msgEl.className = 'form-message error';
    }
  } catch (e) {
    msgEl.textContent = 'Terjadi kesalahan. Coba lagi.';
    msgEl.className = 'form-message error';
  }

  btn.innerHTML = 'Daftar';
  btn.disabled = false;
}

// Close modal on overlay click
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('auth-modal');
  if (overlay) {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeAuthModal();
    });
  }
  checkAuth();
  setActiveNav();
});

// ---- SET ACTIVE NAV ----
function setActiveNav() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.php';
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.php') ||
        (page === 'index.php' && href === 'index.php') ||
        (page === 'news.php' && href === 'news.php') ||
        (page === 'about.php' && href === 'about.php') ||
        (page === 'admin.php' && href === 'admin.php')) {
      link.classList.add('active');
    }
  });
}

// ---- TOAST ----
function showToast(msg, type = '') {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = `toast ${type}`;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });
  setTimeout(() => toast.classList.remove('show'), 3200);
}

// ---- NEWS FUNCTIONS (used in news.php) ----
async function loadNews() {
  const container = document.getElementById('news-list');
  if (!container) return;

  const loadingText = (window.tGet && window.tGet('news_loading')) || 'Memuat berita...';
  container.innerHTML = `<div style="text-align:center;padding:60px;color:#888">${loadingText}</div>`;

  try {
    const res = await fetch('includes/api.php?action=get_all');
    const data = await res.json();

    const emptyText = (window.tGet && window.tGet('news_empty')) || 'Belum ada berita tersedia.';
    if (!data.news || data.news.length === 0) {
      container.innerHTML = `<div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z"/><line x1="9" y1="10" x2="9" y2="10"/><line x1="15" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="15" y2="14"/>
        </svg>
        <p>${emptyText}</p>
      </div>`;
      return;
    }

    container.innerHTML = data.news.map(n => renderNewsCard(n)).join('');
    if (typeof applyTranslations === 'function') applyTranslations();
  } catch (e) {
    container.innerHTML = `<div class="empty-state"><p>Gagal memuat berita.</p></div>`;
  }
}

function renderNewsCard(n) {
  const excerpt = n.content.replace(/<[^>]+>/g, '').substring(0, 240) + '...';
  const date = new Date(n.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const imgSrc = n.image_url || `https://picsum.photos/seed/${n.id}/800/450`;
  const commentLabel = (window.tGet && window.tGet('news_comment_btn')) || 'Komentar';
  const commentPh = (window.tGet && window.tGet('news_comment_placeholder')) || 'Tulis komentar...';
  const sendLabel = (window.tGet && window.tGet('news_comment_send')) || 'Kirim';

  return `
  <article class="news-card" data-id="${n.id}">
    <div class="news-card-img-wrap">
      <img class="news-card-image" src="${imgSrc}" alt="${escapeHtml(n.title)}" loading="lazy"
        style="cursor:pointer"
        onclick="window.location.href='article.php?id=${n.id}'"
        onerror="this.src='https://picsum.photos/seed/${n.id}news/800/450'">
    </div>
    <div class="news-card-body">
      <div class="news-card-meta">
        <div class="news-author">
          <div class="author-dot">${n.username[0]}</div>
          <span class="author-name">${escapeHtml(n.username)}</span>
        </div>
        <span class="news-date">${date}</span>
      </div>
      <h2 class="news-card-title" style="cursor:pointer" onclick="window.location.href='article.php?id=${n.id}'">${escapeHtml(n.title)}</h2>
      <p class="news-card-excerpt">${escapeHtml(excerpt)}</p>
      <div class="news-actions">
        <button class="action-btn ${n.liked ? 'liked' : ''}" onclick="toggleLike(${n.id}, this)" id="like-btn-${n.id}">
          <svg width="16" height="16" fill="${n.liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span id="like-count-${n.id}">${n.like_count}</span>
        </button>
        <button class="action-btn" onclick="toggleComments(${n.id}, this)">
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

async function toggleLike(newsId, btn) {
  if (!currentUser) {
    showToast('Silakan login terlebih dahulu.', 'error');
    openAuthModal('login');
    return;
  }
  try {
    const body = new URLSearchParams({ action: 'toggle_like', news_id: newsId });
    const res = await fetch('includes/api.php', { method: 'POST', body });
    const data = await res.json();
    if (data.success) {
      btn.classList.toggle('liked', data.liked);
      document.getElementById(`like-count-${newsId}`).textContent = data.like_count;
      const icon = btn.querySelector('svg');
      icon.setAttribute('fill', data.liked ? 'currentColor' : 'none');
    } else {
      showToast(data.message, 'error');
    }
  } catch (e) {
    showToast('Gagal. Coba lagi.', 'error');
  }
}

async function toggleComments(newsId, btn) {
  const section = document.getElementById(`comments-${newsId}`);
  const isOpen = section.classList.contains('open');
  if (isOpen) {
    section.classList.remove('open');
    return;
  }
  section.classList.add('open');
  await loadComments(newsId);
}

async function loadComments(newsId) {
  const list = document.getElementById(`comments-list-${newsId}`);
  list.innerHTML = '<div style="padding:10px;color:#888;font-size:.85rem">Memuat...</div>';
  try {
    const res = await fetch(`includes/api.php?action=get_comments&news_id=${newsId}`);
    const data = await res.json();
    const noCommentText = (window.tGet && window.tGet('news_no_comments')) || 'Belum ada komentar. Jadilah yang pertama!';
    if (data.comments.length === 0) {
      list.innerHTML = `<div class="no-comments">${noCommentText}</div>`;
    } else {
      list.innerHTML = data.comments.map(c => `
        <div class="comment-item">
          <div class="comment-avatar">${c.username[0]}</div>
          <div>
            <div class="comment-user">${escapeHtml(c.username)}</div>
            <div class="comment-text">${escapeHtml(c.comment)}</div>
            <div class="comment-time">${new Date(c.created_at).toLocaleDateString('id-ID', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })}</div>
          </div>
        </div>`).join('');
    }
  } catch (e) {
    list.innerHTML = '<div class="no-comments">Gagal memuat komentar.</div>';
  }
}

async function submitComment(newsId) {
  if (!currentUser) {
    showToast('Silakan login terlebih dahulu.', 'error');
    openAuthModal('login');
    return;
  }
  const input = document.getElementById(`comment-input-${newsId}`);
  const comment = input.value.trim();
  if (!comment) return;

  try {
    const body = new URLSearchParams({ action: 'add_comment', news_id: newsId, comment });
    const res = await fetch('includes/api.php', { method: 'POST', body });
    const data = await res.json();
    if (data.success) {
      input.value = '';
      const list = document.getElementById(`comments-list-${newsId}`);
      const noComment = list.querySelector('.no-comments');
      if (noComment) noComment.remove();
      const newComment = document.createElement('div');
      newComment.className = 'comment-item';
      const justNow = (window.tGet && window.tGet('news_just_now')) || 'Baru saja';
      newComment.innerHTML = `
        <div class="comment-avatar">${data.username[0]}</div>
        <div>
          <div class="comment-user">${escapeHtml(data.username)}</div>
          <div class="comment-text">${escapeHtml(data.comment)}</div>
          <div class="comment-time">${justNow}</div>
        </div>`;
      list.insertBefore(newComment, list.firstChild);
      const countEl = document.getElementById(`comment-count-${newsId}`);
      countEl.textContent = parseInt(countEl.textContent) + 1;
    } else {
      showToast(data.message, 'error');
    }
  } catch (e) {
    showToast('Gagal mengirim komentar.', 'error');
  }
}

// Allow Enter key in comment input
document.addEventListener('keydown', e => {
  if (e.target.classList.contains('comment-input') && e.key === 'Enter') {
    const id = e.target.id.replace('comment-input-', '');
    submitComment(parseInt(id));
  }
});

function togglePass(inputId, btn) {
  const input = document.querySelector('#' + inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.innerHTML = '🙈';
  } else {
    input.type = 'password';
    btn.innerHTML = '👁';
  }
}

// ---- HELPER ----
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}