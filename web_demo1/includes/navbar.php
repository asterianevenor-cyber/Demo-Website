<?php
require_once __DIR__ . '/config.php';
?>
<!-- NAVBAR -->
<nav class="navbar">
  <a href="index.php" class="navbar-brand">Demo<span>.</span>Website</a>
  <ul class="nav-links">
    <li>
      <a href="index.php">
        <svg class="nav-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span class="nav-text" data-t="nav_home">Home</span>
      </a>
    </li>
    <li>
      <a href="news.php">
        <svg class="nav-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2"/>
          <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/>
        </svg>
        <span class="nav-text" data-t="nav_news">Berita</span>
      </a>
    </li>
    <li>
      <a href="about.php">
        <svg class="nav-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span class="nav-text" data-t="nav_about">Tentang</span>
      </a>
    </li>
    <?php if (isAdmin()): ?>
    <li>
      <a href="admin.php">
        <svg class="nav-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
        <span class="nav-text" data-t="nav_admin">Admin</span>
      </a>
    </li>
    <?php endif; ?>
  </ul>
  <div id="nav-right">
    <?php if (isLoggedIn()): ?>
    <div class="user-info">
      <?php if (isAdmin()): ?>
        <span class="admin-badge">Admin</span>
      <?php endif; ?>
      <div class="user-avatar"><?= strtoupper(substr($_SESSION['username'], 0, 1)) ?></div>
      <span class="user-name"><?= htmlspecialchars($_SESSION['username']) ?></span>
      <button class="btn-logout" data-t="nav_logout" onclick="logout()">Keluar</button>
    </div>
    <?php else: ?>
    <button class="btn-login" onclick="openAuthModal()">
      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"/>
       </svg>
      <span data-t="nav_login">Masuk</span>
    </button>
    <?php endif; ?>
  </div>
</nav>

<!-- AUTH MODAL -->
<div class="modal-overlay" id="auth-modal">
  <div class="modal">
    <div class="modal-header">
      <button class="modal-close" onclick="closeAuthModal()">✕</button>
      <div style="margin-bottom:4px">
        <p style="font-size:1.5rem;font-family:'Playfair Display',serif;font-weight:900" data-t="modal_welcome">Selamat Datang</p>
        <p style="font-size:.85rem;color:#888;margin-top:4px" data-t="modal_subtitle">Masuk atau buat akun baru</p>
      </div>
      <div class="modal-tabs">
        <button class="modal-tab active" data-tab="login" data-t="modal_tab_login" onclick="switchTab('login')">Masuk</button>
        <button class="modal-tab" data-tab="signup" data-t="modal_tab_signup" onclick="switchTab('signup')">Daftar</button>
      </div>
    </div>
    <div class="modal-body">
      <!-- Login Form -->
      <div class="modal-form active" id="form-login">
        <div id="login-message" class="form-message"></div>
        <div class="form-group">
          <label for="login-username" data-t="modal_username">Username</label>
          <input type="text" id="login-username" data-t="modal_login_placeholder_user" data-t-attr="placeholder" placeholder="Masukkan username">
        </div>
        <div class="form-group">
          <label for="login-password" data-t="modal_password">Password</label>
          <div style="position:relative">
            <input type="password" id="login-password" data-t="modal_login_placeholder_pass" data-t-attr="placeholder" placeholder="Masukkan password" onkeydown="if(event.key==='Enter') submitLogin()" style="width:100%;padding-right:42px">
             <button type="button" onclick="
              var i = document.querySelector('#login-password');
               i.type = i.type === 'password' ? 'text' : 'password';
                this.innerHTML = i.type === 'password' ? '<svg width=&quot;16&quot; height=&quot;16&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; viewBox=&quot;0 0 24 24&quot;><path d=&quot;M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z&quot;/><circle cx=&quot;12&quot; cy=&quot;12&quot; r=&quot;3&quot;/></svg>' : '<svg width=&quot;16&quot; height=&quot;16&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; viewBox=&quot;0 0 24 24&quot;><path d=&quot;M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24&quot;/><line x1=&quot;1&quot; y1=&quot;1&quot; x2=&quot;23&quot; y2=&quot;23&quot;/></svg>';
                 " style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#888;padding:0;display:flex;align-items:center">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
          </div>
        </div>
        <button class="btn-form-submit" id="btn-login-submit" data-t="modal_btn_login" onclick="submitLogin()">Masuk</button>
        <span data-t="modal_no_account">Belum punya akun?</span> <a href="#" onclick="switchTab('signup');return false" style="color:#000;font-weight:600" data-t="modal_register_link">Daftar</a></p>
      </div>

      <!-- Signup Form -->
      <div class="modal-form" id="form-signup">
        <div id="signup-message" class="form-message"></div>
        <div class="form-group">
          <label for="signup-username" data-t="modal_username">Username</label>
          <input type="text" id="signup-username" data-t="modal_signup_placeholder_user" data-t-attr="placeholder" placeholder="Pilih username (min. 3 karakter)">
        </div>
        <div class="form-group">
          <label for="signup-password" data-t="modal_password">Password</label>
          <div style="position:relative">
            <input type="password" id="signup-password" data-t="modal_signup_placeholder_pass" data-t-attr="placeholder" placeholder="Buat password (min. 6 karakter)" onkeydown="if(event.key==='Enter') submitSignup()" style="width:100%;padding-right:42px">
              <button type="button" onclick="
                var i = document.querySelector('#signup-password');
                  i.type = i.type === 'password' ? 'text' : 'password';
                    this.innerHTML = i.type === 'password' ? '<svg width=&quot;16&quot; height=&quot;16&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; viewBox=&quot;0 0 24 24&quot;><path d=&quot;M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z&quot;/><circle cx=&quot;12&quot; cy=&quot;12&quot; r=&quot;3&quot;/></svg>' : '<svg width=&quot;16&quot; height=&quot;16&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; viewBox=&quot;0 0 24 24&quot;><path d=&quot;M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24&quot;/><line x1=&quot;1&quot; y1=&quot;1&quot; x2=&quot;23&quot; y2=&quot;23&quot;/></svg>';
                     " style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#888;padding:0;display:flex;align-items:center">
                    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
          </div>
        </div>
        <button class="btn-form-submit" id="btn-signup-submit" data-t="modal_btn_signup" onclick="submitSignup()">Daftar Sekarang</button>
        <span data-t="modal_have_account">Sudah punya akun?</span> <a href="#" onclick="switchTab('login');return false" style="color:#000;font-weight:600" data-t="modal_login_link">Masuk</a>
      </div>
    </div>
  </div>
</div>
