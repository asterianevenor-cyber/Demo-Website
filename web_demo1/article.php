<?php require_once 'includes/config.php';
$id = intval($_GET['id'] ?? 0);
if (!$id) { header('Location: news.php'); exit; }
$stmt = $conn->prepare("SELECT n.*, u.username FROM news n JOIN users u ON n.author_id = u.id WHERE n.id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$news = $stmt->get_result()->fetch_assoc();
if (!$news) { header('Location: news.php'); exit; }
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= htmlspecialchars($news['title']) ?> — NewsPortal</title>
  <link rel="stylesheet" href="assets/css/style.css">
  <style>
    .article-page { max-width: 760px; margin: 0 auto; padding: 56px 5% 80px; }
    .article-back {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 0.85rem; font-weight: 600; color: #888;
      margin-bottom: 36px; cursor: pointer;
      transition: color 0.2s ease;
      background: none; border: none; font-family: var(--font-body);
      padding: 0;
    }
    .article-back:hover { color: #000; }
    .article-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(1.8rem, 4vw, 2.8rem);
      font-weight: 900; line-height: 1.2;
      margin-bottom: 24px; color: #0a0a0a;
    }
    .article-meta {
      display: flex; align-items: center; gap: 14px;
      padding: 20px 0; border-top: 1px solid #e0e0e0;
      border-bottom: 1px solid #e0e0e0; margin-bottom: 36px;
    }
    .article-avatar {
      width: 44px; height: 44px; min-width: 44px;
      background: #0a0a0a; color: #fff; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 1rem; font-weight: 700; text-transform: uppercase;
    }
    .article-meta-info { display: flex; flex-direction: column; gap: 3px; }
    .article-author { font-size: 0.9rem; font-weight: 700; color: #0a0a0a; }
    .article-date { font-size: 0.8rem; color: #888; }
    .article-cover {
      width: 100%; height: 420px; object-fit: cover;
      border-radius: 12px; margin-bottom: 36px;
    }
    .article-body {
      font-size: 1.05rem; line-height: 1.85; color: #333;
    }
    .article-body p { margin-bottom: 20px; }
    .article-divider {
      border: none; border-top: 1px solid #e0e0e0;
      margin: 48px 0;
    }
  </style>
</head>
<body>

<?php include 'includes/navbar.php'; ?>

<main>
  <div class="article-page">
    <button class="article-back" onclick="history.back()">
      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
      Kembali ke Berita
    </button>

    <h1 class="article-title"><?= htmlspecialchars($news['title']) ?></h1>

    <div class="article-meta">
      <div class="article-avatar"><?= strtoupper(substr($news['username'], 0, 1)) ?></div>
      <div class="article-meta-info">
        <span class="article-author"><?= htmlspecialchars($news['username']) ?></span>
        <span class="article-date">
          <?php
          $date = new DateTime($news['created_at']);
          echo $date->format('d F Y, H:i') . ' WIB';
          ?>
        </span>
      </div>
    </div>

    <?php if ($news['image_url']): ?>
    <img class="article-cover" src="<?= htmlspecialchars($news['image_url']) ?>" alt="<?= htmlspecialchars($news['title']) ?>">
    <?php endif; ?>

    <div class="article-body">
      <?= nl2br(htmlspecialchars($news['content'])) ?>
    </div>

    <hr class="article-divider">

    <!-- LIKE & COMMENT -->
    <div class="news-actions" style="margin-bottom:24px">
      <button class="action-btn" id="like-btn-<?= $news['id'] ?>" onclick="toggleLike(<?= $news['id'] ?>, this)">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <span id="like-count-<?= $news['id'] ?>">0</span>
      </button>
      <button class="action-btn" onclick="toggleComments(<?= $news['id'] ?>, this)">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <span id="comment-count-<?= $news['id'] ?>">0</span>
        <span data-t="news_comment_btn">Komentar</span>
      </button>
    </div>

    <div class="comment-section open" id="comments-<?= $news['id'] ?>">
      <div class="comment-form">
        <input class="comment-input" type="text" id="comment-input-<?= $news['id'] ?>" placeholder="Tulis komentar..." maxlength="500">
        <button class="btn-comment-submit" onclick="submitComment(<?= $news['id'] ?>)" data-t="news_comment_send">Kirim</button>
      </div>
      <div class="comments-list" id="comments-list-<?= $news['id'] ?>"></div>
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

  // Load like count & status
  const newsId = <?= $news['id'] ?>;
  try {
    const res = await fetch('includes/api.php?action=get_all');
    const data = await res.json();
    const article = data.news.find(n => n.id == newsId);
    if (article) {
      document.getElementById(`like-count-${newsId}`).textContent = article.like_count;
      document.getElementById(`comment-count-${newsId}`).textContent = article.comment_count;
      if (article.liked) {
        const btn = document.getElementById(`like-btn-${newsId}`);
        btn.classList.add('liked');
        btn.querySelector('svg').setAttribute('fill', 'currentColor');
      }
    }
  } catch(e) {}

  // Load comments
  loadComments(newsId);
});
</script>
</body>
</html>