<?php
require_once 'includes/config.php';
// Admin only
if (!isAdmin()) {
    header('Location: index.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Panel Admin — NewsPortal</title>
  <link rel="stylesheet" href="assets/css/style.css">
  <style>
    .admin-page-hero {
      background: var(--black);
      color: var(--white);
      padding: 40px 5%;
      text-align: center;
    }
    .admin-page-hero h1 {
      font-family: 'Playfair Display', serif;
      font-size: 2.2rem;
      font-weight: 900;
    }
    .admin-page-hero p {
      color: rgba(255,255,255,0.5);
      margin-top: 8px;
      font-size: 0.9rem;
    }
    .editor-toolbar {
      display: flex;
      gap: 6px;
      padding: 8px;
      background: var(--gray-light);
      border: 1.5px solid var(--gray-mid);
      border-bottom: none;
      border-radius: 8px 8px 0 0;
      flex-wrap: wrap;
    }
    .toolbar-btn {
      padding: 5px 10px;
      border: 1px solid var(--gray-mid);
      border-radius: 4px;
      background: var(--white);
      cursor: pointer;
      font-size: 0.82rem;
      font-family: var(--font-body);
      font-weight: 600;
      transition: all 0.2s ease;
    }
    .toolbar-btn:hover { background: var(--black); color: var(--white); border-color: var(--black); }
    #about-editor { border-radius: 0 0 8px 8px; }
    .tab-nav {
      display: flex;
      gap: 0;
      border-bottom: 2px solid var(--gray-mid);
      margin-bottom: 36px;
    }
    .tab-nav-btn {
      padding: 12px 28px;
      border: none;
      background: transparent;
      font-family: var(--font-body);
      font-size: 0.92rem;
      font-weight: 600;
      cursor: pointer;
      color: var(--gray-dark);
      border-bottom: 2px solid transparent;
      margin-bottom: -2px;
      transition: all 0.2s ease;
    }
    .tab-nav-btn.active { color: var(--black); border-bottom-color: var(--black); }
    .tab-content { display: none; }
    .tab-content.active { display: block; }
  </style>
</head>
<body>

<?php include 'includes/navbar.php'; ?>

<main>
  <div class="admin-page-hero">
    <h1 data-t="admin_title">Panel Admin</h1>
    <p>
      <span data-t="admin_subtitle_prefix">Selamat datang,</span>
      <?= htmlspecialchars($_SESSION['username']) ?>
      <span data-t="admin_subtitle_suffix">. Kelola konten website dari sini.</span>
    </p>
  </div>

  <div class="admin-container">
    <div class="tab-nav">
      <button class="tab-nav-btn active" data-t="admin_tab_news" onclick="showAdminTab('news', event)">📰 Kelola Berita</button>
      <button class="tab-nav-btn" data-t="admin_tab_about" onclick="showAdminTab('about', event)" id="about-tab-btn">📝 Edit Tentang Kami</button>
    </div>

    <!-- BERITA SECTION -->
    <div class="tab-content active" id="tab-news">
      <div class="admin-section">
        <h2 data-t="admin_add_news_title">Tambah Berita Baru</h2>
        <div class="admin-form">
          <div id="add-news-message" class="form-message"></div>
          <input type="text" id="news-title" data-t="admin_news_title_ph" data-t-attr="placeholder" placeholder="Judul berita *" maxlength="255">
          <input type="text" id="news-image" data-t="admin_news_img_ph" data-t-attr="placeholder" placeholder="URL gambar (opsional, mis: https://example.com/image.jpg)">
          <textarea id="news-content" data-t="admin_news_content_ph" data-t-attr="placeholder" placeholder="Konten berita lengkap *" rows="8"></textarea>
          <button class="btn-form-submit" onclick="addNews()" style="width:fit-content;padding:12px 32px">
            <span data-t="admin_btn_add_news">+ Tambah Berita</span>
          </button>
        </div>
      </div>

      <div class="admin-section">
        <h2 data-t="admin_news_list_title">Daftar Berita</h2>
        <div class="admin-news-list" id="admin-news-list">
          <div style="text-align:center;padding:30px;color:#888">Memuat...</div>
        </div>
      </div>
    </div>

    <!-- ABOUT SECTION -->
    <div class="tab-content" id="tab-about">
      <div class="admin-section" id="about-section">
        <h2 data-t="admin_about_title">Edit Halaman Tentang Kami</h2>
        <div class="admin-form">
          <div id="about-message" class="form-message"></div>
          <div>
            <div class="editor-toolbar">
              <button class="toolbar-btn" onclick="execCmd('bold')"><b>B</b></button>
              <button class="toolbar-btn" onclick="execCmd('italic')"><i>I</i></button>
              <button class="toolbar-btn" onclick="execCmd('underline')"><u>U</u></button>
              <button class="toolbar-btn" onclick="insertHeading('h2')">H2</button>
              <button class="toolbar-btn" onclick="insertHeading('h3')">H3</button>
              <button class="toolbar-btn" onclick="execCmd('insertUnorderedList')">• List</button>
              <button class="toolbar-btn" onclick="execCmd('insertOrderedList')">1. List</button>
              <button class="toolbar-btn" onclick="execCmd('removeFormat')">Clear</button>
            </div>
            <div id="about-editor" contenteditable="true"></div>
          </div>
          <button class="btn-form-submit" onclick="saveAbout()" style="width:fit-content;padding:12px 32px">
            <span data-t="admin_btn_save">💾 Simpan Perubahan</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</main>

<?php include 'includes/footer.php'; ?>

<div id="global-toast" class="toast"></div>
<script src="assets/js/lang.js"></script>
<script src="assets/js/main.js"></script>
<script>
  window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash === '#about-section') {
      showAdminTab('about', null);
    }
    loadAdminNews();
    loadAboutContent();
  });

  function showAdminTab(tab, e) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${tab}`).classList.add('active');
    if (e && e.target) e.target.classList.add('active');
  }

  async function addNews() {
    const title = document.getElementById('news-title').value.trim();
    const content = document.getElementById('news-content').value.trim();
    const image_url = document.getElementById('news-image').value.trim();
    const msgEl = document.getElementById('add-news-message');
    msgEl.className = 'form-message';

    if (!title || !content) {
      msgEl.textContent = 'Judul dan konten wajib diisi.';
      msgEl.className = 'form-message error';
      return;
    }

    try {
      const body = new URLSearchParams({ action: 'add_news', title, content, image_url });
      const res = await fetch('includes/api.php', { method: 'POST', body });
      const data = await res.json();
      if (data.success) {
        msgEl.textContent = 'Berita berhasil ditambahkan!';
        msgEl.className = 'form-message success';
        document.getElementById('news-title').value = '';
        document.getElementById('news-content').value = '';
        document.getElementById('news-image').value = '';
        loadAdminNews();
        showToast('Berita berhasil ditambahkan!', 'success');
      } else {
        msgEl.textContent = data.message;
        msgEl.className = 'form-message error';
      }
    } catch (e) {
      msgEl.textContent = 'Terjadi kesalahan. Coba lagi.';
      msgEl.className = 'form-message error';
    }
  }

  async function loadAdminNews() {
    const list = document.getElementById('admin-news-list');
    try {
      const res = await fetch('includes/api.php?action=get_all');
      const data = await res.json();
      if (!data.news || data.news.length === 0) {
        list.innerHTML = '<div style="text-align:center;padding:30px;color:#888">Belum ada berita.</div>';
        return;
      }
      const deleteLabel = (window.tGet && window.tGet('admin_btn_delete')) || 'Hapus';
      list.innerHTML = data.news.map(n => `
        <div class="admin-news-item">
          <div class="admin-news-item-title">${escapeHtml(n.title)}</div>
          <div class="admin-news-item-date">${new Date(n.created_at).toLocaleDateString('id-ID')}</div>
          <button class="btn-delete" onclick="deleteNews(${n.id}, this)">${deleteLabel}</button>
        </div>
      `).join('');
    } catch (e) {
      list.innerHTML = '<div style="color:#c00;padding:20px">Gagal memuat berita.</div>';
    }
  }

  async function deleteNews(id, btn) {
    const confirmMsg = (window.tGet && window.tGet('admin_confirm_delete')) || 'Yakin ingin menghapus berita ini?';
    if (!confirm(confirmMsg)) return;
    btn.disabled = true;
    btn.textContent = '...';
    try {
      const body = new URLSearchParams({ action: 'delete_news', id });
      const res = await fetch('includes/api.php', { method: 'POST', body });
      const data = await res.json();
      if (data.success) {
        loadAdminNews();
        showToast('Berita berhasil dihapus.', 'success');
      } else {
        showToast(data.message, 'error');
        btn.disabled = false;
        btn.textContent = (window.tGet && window.tGet('admin_btn_delete')) || 'Hapus';
      }
    } catch (e) {
      showToast('Gagal menghapus.', 'error');
      btn.disabled = false;
      btn.textContent = (window.tGet && window.tGet('admin_btn_delete')) || 'Hapus';
    }
  }

  async function loadAboutContent() {
    try {
      const res = await fetch('includes/api.php?action=get_about');
      const data = await res.json();
      document.getElementById('about-editor').innerHTML = data.content || '';
    } catch (e) {}
  }

  async function saveAbout() {
    const content = document.getElementById('about-editor').innerHTML;
    const msgEl = document.getElementById('about-message');
    msgEl.className = 'form-message';
    try {
      const body = new URLSearchParams({ action: 'update_about', content });
      const res = await fetch('includes/api.php', { method: 'POST', body });
      const data = await res.json();
      if (data.success) {
        msgEl.textContent = 'Halaman Tentang Kami berhasil disimpan!';
        msgEl.className = 'form-message success';
        showToast('Perubahan disimpan!', 'success');
      } else {
        msgEl.textContent = data.message;
        msgEl.className = 'form-message error';
      }
    } catch (e) {
      msgEl.textContent = 'Terjadi kesalahan.';
      msgEl.className = 'form-message error';
    }
  }

  function execCmd(cmd) {
    document.getElementById('about-editor').focus();
    document.execCommand(cmd, false, null);
  }

  function insertHeading(tag) {
    document.getElementById('about-editor').focus();
    document.execCommand('formatBlock', false, tag);
  }
</script>
</body>
</html>