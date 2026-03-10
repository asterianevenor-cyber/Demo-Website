<?php
require_once 'config.php';
header('Content-Type: application/json');

$action = $_POST['action'] ?? '';

switch ($action) {
    case 'login':
        $username = trim($_POST['username'] ?? '');
        $password = $_POST['password'] ?? '';

        if (empty($username) || empty($password)) {
            echo json_encode(['success' => false, 'message' => 'Username dan password wajib diisi.']);
            exit;
        }

        $stmt = $conn->prepare("SELECT id, username, password, role FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['role'] = $user['role'];
            echo json_encode(['success' => true, 'username' => $user['username'], 'role' => $user['role']]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Username atau password salah.']);
        }
        break;

    case 'signup':
        $username = trim($_POST['username'] ?? '');
        $password = $_POST['password'] ?? '';

        if (empty($username) || empty($password)) {
            echo json_encode(['success' => false, 'message' => 'Username dan password wajib diisi.']);
            exit;
        }
        if (strlen($username) < 3 || strlen($username) > 50) {
            echo json_encode(['success' => false, 'message' => 'Username harus 3-50 karakter.']);
            exit;
        }
        if (strlen($password) < 6) {
            echo json_encode(['success' => false, 'message' => 'Password minimal 6 karakter.']);
            exit;
        }

        $stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        if ($stmt->get_result()->num_rows > 0) {
            echo json_encode(['success' => false, 'message' => 'Username sudah digunakan.']);
            exit;
        }

        $hashed = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("INSERT INTO users (username, password, role) VALUES (?, ?, 'user')");
        $stmt->bind_param("ss", $username, $hashed);

        if ($stmt->execute()) {
            $newId = $conn->insert_id;
            $_SESSION['user_id'] = $newId;
            $_SESSION['username'] = $username;
            $_SESSION['role'] = 'user';
            echo json_encode(['success' => true, 'username' => $username, 'role' => 'user']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Gagal membuat akun. Coba lagi.']);
        }
        break;

    case 'logout':
        session_destroy();
        echo json_encode(['success' => true]);
        break;

    case 'check':
        if (isLoggedIn()) {
            echo json_encode(['loggedIn' => true, 'username' => $_SESSION['username'], 'role' => $_SESSION['role']]);
        } else {
            echo json_encode(['loggedIn' => false]);
        }
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Aksi tidak valid.']);
}
?>