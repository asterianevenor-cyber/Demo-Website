<?php require_once 'includes/config.php'; ?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NewsPortal — Berita Terpercaya</title>
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
</head>
<body>

<?php include 'includes/navbar.php'; ?>

<main>
  <!-- HERO SECTION -->
  <section class="hero">
    <div class="hero-bg-pattern"></div>
    <div class="hero-grid"></div>
    <div class="hero-content">
      <span class="hero-eyebrow" data-t="home_eyebrow">Selamat Datang di Demo.Website</span>
      <h1><span data-t="home_hero_title1">Berita</span> <em data-t="home_hero_title2">Terkini</em></h1>
      <p data-t="home_hero_subtitle">Baca berita digital terpercaya dengan informasi akurat dan terkini dari seluruh penjuru dunia.</p>
      <div class="hero-actions">
        <button class="btn-primary" data-t="home_btn_read" onclick="window.location.href='news.php'">Baca Berita</button>
        <?php if (!isLoggedIn()): ?>
        <button class="btn-secondary-outline" data-t="home_btn_join" onclick="openAuthModal('signup')">Bergabung Sekarang</button>
        <?php endif; ?>
      </div>
    </div>
  </section>

  <!-- FEATURES SECTION -->
  <section class="features-section">
    <div class="section-header">
      <span class="section-label" data-t="home_section_why">Mengapa Kami</span>
      <h2 data-t="home_section_trust">Portal Berita yang<br>Anda Percaya</h2>
    </div>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
        <h3 data-t="feat1_title">Real-Time Update</h3>
        <p data-t="feat1_desc">Berita diperbarui secara berkala sehingga Anda selalu mendapatkan informasi paling baru dan relevan.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.13 19.79 19.79 0 01.13 .5 2 2 0 012.11.01h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.41 8a16 16 0 006.59 6.59l1.36-.95a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
          </svg>
        </div>
        <h3 data-t="feat2_title">Interaksi Langsung</h3>
        <p data-t="feat2_desc">Berikan pendapat Anda melalui fitur komentar dan like. Jadilah bagian dari diskusi publik yang berkualitas.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <h3 data-t="feat3_title">Terpercaya & Akurat</h3>
        <p data-t="feat3_desc">Setiap berita melalui proses verifikasi editorial yang ketat sebelum dipublikasikan kepada pembaca.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
        </div>
        <h3 data-t="feat4_title">Multi-Platform</h3>
        <p data-t="feat4_desc">Akses berita dari perangkat apa pun — desktop, tablet, maupun smartphone, kapan saja dan di mana saja.</p>
      </div>
    </div>
  </section>

  <!-- STATS SECTION -->
  <section class="stats-section">
    <div class="stats-grid">
      <div>
        <div class="stat-number">10K+</div>
        <div class="stat-label" data-t="stats_readers">Pembaca Aktif</div>
      </div>
      <div>
        <div class="stat-number">500+</div>
        <div class="stat-label" data-t="stats_articles">Artikel Berita</div>
      </div>
      <div>
        <div class="stat-number">50+</div>
        <div class="stat-label" data-t="stats_topics">Kategori Topik</div>
      </div>
      <div>
        <div class="stat-number">24/7</div>
        <div class="stat-label" data-t="stats_updates">Berita Terkini</div>
      </div>
    </div>
  </section>

  <!-- LATEST NEWS PREVIEW -->
  <section class="latest-section">
    <div class="section-header">
      <span class="section-label" data-t="home_latest_label">Terbaru</span>
      <h2 data-t="home_latest_title">Berita Pilihan</h2>
    </div>
    <div class="latest-grid" id="home-latest-news">
      <?php
      require_once 'includes/config.php';
      $result = $conn->query("SELECT n.id, n.title, n.content, n.image_url, n.created_at FROM news n ORDER BY n.created_at DESC LIMIT 3");
      if ($result && $result->num_rows > 0):
        while ($row = $result->fetch_assoc()):
          $excerpt = strip_tags($row['content']);
          $excerpt = strlen($excerpt) > 120 ? substr($excerpt, 0, 120) . '...' : $excerpt;
          $imgSrc = $row['image_url'] ?: "https://picsum.photos/seed/{$row['id']}/800/450";
      ?>
      <div class="latest-card" onclick="window.location.href='news.php'">
        <img src="<?= htmlspecialchars($imgSrc) ?>" alt="<?= htmlspecialchars($row['title']) ?>" loading="lazy" onerror="this.src='https://picsum.photos/seed/<?= $row['id'] ?>fallback/800/450'">
        <div class="latest-card-body">
          <h3><?= htmlspecialchars($row['title']) ?></h3>
          <p><?= htmlspecialchars($excerpt) ?></p>
        </div>
      </div>
      <?php endwhile; else: ?>
      <div style="grid-column:1/-1;text-align:center;color:#888;padding:40px">Belum ada berita.</div>
      <?php endif; ?>
    </div>
    <div class="view-all-wrap">
      <a href="news.php" class="btn-outline-dark" data-t="home_view_all">Lihat Semua Berita →</a>
    </div>
  </section>
</main>

<?php include 'includes/footer.php'; ?>

<div id="global-toast" class="toast"></div>

<script src="assets/js/lang.js"></script>
<script src="assets/js/main.js"></script>

</body>
</html>
