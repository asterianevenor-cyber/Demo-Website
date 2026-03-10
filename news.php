<?php require_once 'includes/config.php'; ?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Berita — NewsPortal</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

<?php include 'includes/navbar.php'; ?>

<main>
  <div class="page-hero">
    <h1 data-t="news_page_title">Berita Terkini</h1>
    <p data-t="news_page_subtitle">Informasi terbaru, akurat, dan terpercaya untuk Anda</p>
  </div>

  <div class="news-container">
    <div id="news-list">
      <div style="text-align:center;padding:60px;color:#888">
        <div style="margin-bottom:12px">
          <svg width="40" height="40" fill="none" stroke="#ccc" stroke-width="1.5" viewBox="0 0 24 24" style="margin:0 auto">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
        Memuat berita...
      </div>
    </div>
  </div>
</main>

<?php include 'includes/footer.php'; ?>

<div id="global-toast" class="toast"></div>
<script src="assets/js/lang.js"></script>
<script src="assets/js/main.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', async () => {
    await checkAuth();
    loadNews();
  });
</script>
</body>
</html>