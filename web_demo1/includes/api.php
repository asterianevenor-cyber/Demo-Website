<?php
require_once 'config.php';
header('Content-Type: application/json');

$action = $_POST['action'] ?? $_GET['action'] ?? '';

switch ($action) {
    // ---- GET ALL NEWS ----
    case 'get_all':
        $sql = "SELECT n.id, n.title, n.content, n.image_url, n.created_at, u.username,
                (SELECT COUNT(*) FROM likes l WHERE l.news_id = n.id) AS like_count,
                (SELECT COUNT(*) FROM comments c WHERE c.news_id = n.id) AS comment_count
                FROM news n JOIN users u ON n.author_id = u.id
                ORDER BY n.created_at DESC";
        $result = $conn->query($sql);
        $news = [];
        while ($row = $result->fetch_assoc()) {
            $row['liked'] = false;
            if (isLoggedIn()) {
                $stmt = $conn->prepare("SELECT id FROM likes WHERE news_id=? AND user_id=?");
                $stmt->bind_param("ii", $row['id'], $_SESSION['user_id']);
                $stmt->execute();
                $row['liked'] = $stmt->get_result()->num_rows > 0;
            }
            $news[] = $row;
        }
        echo json_encode(['success' => true, 'news' => $news]);
        break;

    // ---- GET COMMENTS ----
    case 'get_comments':
        $news_id = intval($_GET['news_id'] ?? 0);
        $stmt = $conn->prepare("SELECT c.id, c.comment, c.created_at, u.username 
                                FROM comments c JOIN users u ON c.user_id = u.id 
                                WHERE c.news_id = ? ORDER BY c.created_at DESC");
        $stmt->bind_param("i", $news_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $comments = [];
        while ($row = $result->fetch_assoc()) {
            $comments[] = $row;
        }
        echo json_encode(['success' => true, 'comments' => $comments]);
        break;

    // ---- ADD COMMENT ----
    case 'add_comment':
        if (!isLoggedIn()) {
            echo json_encode(['success' => false, 'message' => 'Harus login untuk berkomentar.']);
            exit;
        }
        $news_id = intval($_POST['news_id'] ?? 0);
        $comment = trim($_POST['comment'] ?? '');
        if (empty($comment)) {
            echo json_encode(['success' => false, 'message' => 'Komentar tidak boleh kosong.']);
            exit;
        }
        $stmt = $conn->prepare("INSERT INTO comments (news_id, user_id, comment) VALUES (?, ?, ?)");
        $stmt->bind_param("iis", $news_id, $_SESSION['user_id'], $comment);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'username' => $_SESSION['username'], 'comment' => sanitize($comment), 'created_at' => date('Y-m-d H:i:s')]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Gagal menambah komentar.']);
        }
        break;

    // ---- TOGGLE LIKE ----
    case 'toggle_like':
        if (!isLoggedIn()) {
            echo json_encode(['success' => false, 'message' => 'Harus login untuk like.']);
            exit;
        }
        $news_id = intval($_POST['news_id'] ?? 0);
        $user_id = $_SESSION['user_id'];

        $stmt = $conn->prepare("SELECT id FROM likes WHERE news_id=? AND user_id=?");
        $stmt->bind_param("ii", $news_id, $user_id);
        $stmt->execute();
        $exists = $stmt->get_result()->num_rows > 0;

        if ($exists) {
            $stmt = $conn->prepare("DELETE FROM likes WHERE news_id=? AND user_id=?");
            $stmt->bind_param("ii", $news_id, $user_id);
            $stmt->execute();
            $liked = false;
        } else {
            $stmt = $conn->prepare("INSERT INTO likes (news_id, user_id) VALUES (?, ?)");
            $stmt->bind_param("ii", $news_id, $user_id);
            $stmt->execute();
            $liked = true;
        }

        $stmt = $conn->prepare("SELECT COUNT(*) as cnt FROM likes WHERE news_id=?");
        $stmt->bind_param("i", $news_id);
        $stmt->execute();
        $count = $stmt->get_result()->fetch_assoc()['cnt'];

        echo json_encode(['success' => true, 'liked' => $liked, 'like_count' => $count]);
        break;

    // ---- ADD NEWS (admin only) ----
    case 'add_news':
        if (!isAdmin()) {
            echo json_encode(['success' => false, 'message' => 'Akses ditolak.']);
            exit;
        }
        $title = trim($_POST['title'] ?? '');
        $content = trim($_POST['content'] ?? '');
        $image_url = trim($_POST['image_url'] ?? '');

        if (empty($title) || empty($content)) {
            echo json_encode(['success' => false, 'message' => 'Judul dan konten wajib diisi.']);
            exit;
        }

        $stmt = $conn->prepare("INSERT INTO news (title, content, image_url, author_id) VALUES (?, ?, ?, ?)");
        $author_id = is_numeric($_SESSION['user_id']) ? $_SESSION['user_id'] : 1;
        $stmt->bind_param("sssi", $title, $content, $image_url, $author_id);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Berita berhasil ditambahkan.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Gagal menambah berita.']);
        }
        break;

    // ---- DELETE NEWS (admin only) ----
    case 'delete_news':
        if (!isAdmin()) {
            echo json_encode(['success' => false, 'message' => 'Akses ditolak.']);
            exit;
        }
        $id = intval($_POST['id'] ?? 0);
        $stmt = $conn->prepare("DELETE FROM news WHERE id=?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Gagal menghapus berita.']);
        }
        break;

    // ---- GET ABOUT ----
    case 'get_about':
        $result = $conn->query("SELECT content FROM about_us ORDER BY id DESC LIMIT 1");
        $row = $result->fetch_assoc();
        echo json_encode(['success' => true, 'content' => $row['content'] ?? '']);
        break;

    // ---- UPDATE ABOUT (admin only) ----
    case 'update_about':
        if (!isAdmin()) {
            echo json_encode(['success' => false, 'message' => 'Akses ditolak.']);
            exit;
        }
        $content = $_POST['content'] ?? '';
        $conn->query("DELETE FROM about_us");
        $stmt = $conn->prepare("INSERT INTO about_us (content) VALUES (?)");
        $stmt->bind_param("s", $content);
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Gagal update.']);
        }
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Aksi tidak dikenali.']);
}
?>
