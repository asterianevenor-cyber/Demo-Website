<?php require_once 'includes/config.php'; ?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tentang Kami — NewsPortal</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

<?php include 'includes/navbar.php'; ?>

<?php if (isAdmin()): ?>
<div class="admin-edit-bar">
  <span data-t="about_admin_bar">Mode Admin Aktif — Anda dapat mengedit halaman ini</span>
  <button class="btn-edit-about" data-t="about_edit_btn" onclick="window.location.href='admin.php#about-section'">
    ✏ Edit Tentang Kami
  </button>
</div>
<?php endif; ?>

<main>
  <div class="page-hero">
    <h1 data-t="about_page_title">Tentang Kami</h1>
    <p data-t="about_page_subtitle">Kenali lebih dekat siapa kami dan apa yang kami perjuangkan</p>
  </div>

  <div class="about-container">
    <div class="about-content" id="about-content">
      <?php
      $result = $conn->query("SELECT content FROM about_us ORDER BY id DESC LIMIT 1");
      $about = $result ? $result->fetch_assoc() : null;
      echo $about ? $about['content'] : '<p>Konten sedang disiapkan.</p>';
      ?>
    </div>
  </div>
</main>

<?php include 'includes/footer.php'; ?>

<div id="global-toast" class="toast"></div>
<script src="assets/js/lang.js"></script>
<script src="assets/js/main.js"></script>
</body>
</html>