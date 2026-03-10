// =============================================
// NewsPortal — Language Switcher
// Supports: en-us, en-uk, ja, es-latam, zh
// Excludes: email addresses, phone numbers
// =============================================

const LANGUAGES = {
  'en-us': { label: '🇺🇸 English (US)',  short: 'EN-US' },
  'en-uk': { label: '🇬🇧 English (UK)',  short: 'EN-UK' },
  'ja':    { label: '🇯🇵 日本語',         short: 'JA'    },
  'es':    { label: '🇲🇽 Español (Latam)', short: 'ES'   },
  'zh':    { label: '🇨🇳 中文',           short: 'ZH'    },
};

// =============================================
// TRANSLATION DICTIONARY
// key: translation id => each language
// =============================================
const T = {
  // ---- NAVBAR ----
  nav_home: {
    'en-us': 'Home',
    'en-uk': 'Home',
    'ja':    'ホーム',
    'es':    'Inicio',
    'zh':    '首页',
  },
  nav_news: {
    'en-us': 'News',
    'en-uk': 'News',
    'ja':    'ニュース',
    'es':    'Noticias',
    'zh':    '新闻',
  },
  nav_about: {
    'en-us': 'About',
    'en-uk': 'About',
    'ja':    '概要',
    'es':    'Nosotros',
    'zh':    '关于',
  },
  nav_admin: {
    'en-us': 'Admin',
    'en-uk': 'Admin',
    'ja':    '管理者',
    'es':    'Admin',
    'zh':    '管理',
  },
  nav_login: {
    'en-us': 'Sign In',
    'en-uk': 'Sign In',
    'ja':    'ログイン',
    'es':    'Ingresar',
    'zh':    '登录',
  },
  nav_logout: {
    'en-us': 'Sign Out',
    'en-uk': 'Log Out',
    'ja':    'ログアウト',
    'es':    'Salir',
    'zh':    '退出',
  },
  nav_admin_badge: {
    'en-us': 'Admin',
    'en-uk': 'Admin',
    'ja':    '管理者',
    'es':    'Admin',
    'zh':    '管理员',
  },

  // ---- AUTH MODAL ----
  modal_welcome: {
    'en-us': 'Welcome Back',
    'en-uk': 'Welcome Back',
    'ja':    'ようこそ',
    'es':    'Bienvenido',
    'zh':    '欢迎回来',
  },
  modal_subtitle: {
    'en-us': 'Sign in or create a new account',
    'en-uk': 'Sign in or create a new account',
    'ja':    'ログインまたは新規アカウント作成',
    'es':    'Inicia sesión o crea una cuenta nueva',
    'zh':    '登录或创建新账户',
  },
  modal_tab_login: {
    'en-us': 'Sign In',
    'en-uk': 'Log In',
    'ja':    'ログイン',
    'es':    'Ingresar',
    'zh':    '登录',
  },
  modal_tab_signup: {
    'en-us': 'Sign Up',
    'en-uk': 'Register',
    'ja':    '新規登録',
    'es':    'Registrarse',
    'zh':    '注册',
  },
  modal_username: {
    'en-us': 'Username',
    'en-uk': 'Username',
    'ja':    'ユーザー名',
    'es':    'Usuario',
    'zh':    '用户名',
  },
  modal_password: {
    'en-us': 'Password',
    'en-uk': 'Password',
    'ja':    'パスワード',
    'es':    'Contraseña',
    'zh':    '密码',
  },
  modal_login_placeholder_user: {
    'en-us': 'Enter your username',
    'en-uk': 'Enter your username',
    'ja':    'ユーザー名を入力',
    'es':    'Ingresa tu usuario',
    'zh':    '输入用户名',
  },
  modal_login_placeholder_pass: {
    'en-us': 'Enter your password',
    'en-uk': 'Enter your password',
    'ja':    'パスワードを入力',
    'es':    'Ingresa tu contraseña',
    'zh':    '输入密码',
  },
  modal_signup_placeholder_user: {
    'en-us': 'Choose a username (min. 3 chars)',
    'en-uk': 'Choose a username (min. 3 chars)',
    'ja':    'ユーザー名を決めてください（3文字以上）',
    'es':    'Elige un usuario (mín. 3 caracteres)',
    'zh':    '选择用户名（至少3个字符）',
  },
  modal_signup_placeholder_pass: {
    'en-us': 'Create a password (min. 6 chars)',
    'en-uk': 'Create a password (min. 6 chars)',
    'ja':    'パスワードを設定（6文字以上）',
    'es':    'Crea una contraseña (mín. 6 caracteres)',
    'zh':    '创建密码（至少6个字符）',
  },
  modal_btn_login: {
    'en-us': 'Sign In',
    'en-uk': 'Log In',
    'ja':    'ログイン',
    'es':    'Ingresar',
    'zh':    '登录',
  },
  modal_btn_signup: {
    'en-us': 'Create Account',
    'en-uk': 'Register Now',
    'ja':    'アカウントを作成',
    'es':    'Crear cuenta',
    'zh':    '立即注册',
  },
  modal_no_account: {
    'en-us': "Don't have an account?",
    'en-uk': "Don't have an account?",
    'ja':    'アカウントをお持ちでないですか？',
    'es':    '¿No tienes cuenta?',
    'zh':    '没有账户？',
  },
  modal_have_account: {
    'en-us': 'Already have an account?',
    'en-uk': 'Already have an account?',
    'ja':    'すでにアカウントをお持ちですか？',
    'es':    '¿Ya tienes cuenta?',
    'zh':    '已有账户？',
  },
  modal_register_link: {
    'en-us': 'Sign Up',
    'en-uk': 'Register',
    'ja':    '新規登録',
    'es':    'Regístrate',
    'zh':    '注册',
  },
  modal_login_link: {
    'en-us': 'Sign In',
    'en-uk': 'Log In',
    'ja':    'ログイン',
    'es':    'Iniciar sesión',
    'zh':    '登录',
  },

  // ---- HOME PAGE ----
  home_eyebrow: {
    'en-us': 'Welcome to NewsPortal',
    'en-uk': 'Welcome to NewsPortal',
    'ja':    'NewsPortalへようこそ',
    'es':    'Bienvenido a NewsPortal',
    'zh':    '欢迎来到新闻门户',
  },
  home_hero_title1: {
    'en-us': 'Breaking',
    'en-uk': 'Breaking',
    'ja':    '最新',
    'es':    'Noticias',
    'zh':    '最新',
  },
  home_hero_title2: {
    'en-us': 'News',
    'en-uk': 'News',
    'ja':    'ニュース',
    'es':    'de Hoy',
    'zh':    '新闻',
  },
  home_hero_subtitle: {
    'en-us': 'A trusted digital news portal with accurate, balanced, and up-to-date information from around the world.',
    'en-uk': 'A trusted digital news portal with accurate, balanced, and up-to-date information from around the world.',
    'ja':    '世界中から正確でバランスのとれた最新情報をお届けする、信頼できるデジタルニュースポータル。',
    'es':    'Un portal de noticias digital confiable con información precisa, equilibrada y actualizada de todo el mundo.',
    'zh':    '值得信赖的数字新闻门户，为您提供来自世界各地准确、平衡、最新的信息。',
  },
  home_btn_read: {
    'en-us': 'Read News',
    'en-uk': 'Read News',
    'ja':    'ニュースを読む',
    'es':    'Leer Noticias',
    'zh':    '阅读新闻',
  },
  home_btn_join: {
    'en-us': 'Join Now',
    'en-uk': 'Join Now',
    'ja':    '今すぐ参加',
    'es':    'Únete Ahora',
    'zh':    '立即加入',
  },
  home_section_why: {
    'en-us': 'Why Us',
    'en-uk': 'Why Us',
    'ja':    'なぜ私たちか',
    'es':    'Por qué Nosotros',
    'zh':    '为什么选择我们',
  },
  home_section_trust: {
    'en-us': 'A News Portal\nYou Can Trust',
    'en-uk': 'A News Portal\nYou Can Trust',
    'ja':    '信頼できる\nニュースポータル',
    'es':    'El Portal de Noticias\nque Puedes Confiar',
    'zh':    '您值得信赖的\n新闻门户',
  },
  feat1_title: {
    'en-us': 'Real-Time Updates',
    'en-uk': 'Real-Time Updates',
    'ja':    'リアルタイム更新',
    'es':    'Actualizaciones en Tiempo Real',
    'zh':    '实时更新',
  },
  feat1_desc: {
    'en-us': 'News is updated regularly so you always get the most current and relevant information.',
    'en-uk': 'News is updated regularly so you always get the most current and relevant information.',
    'ja':    'ニュースは定期的に更新され、常に最新の関連情報を入手できます。',
    'es':    'Las noticias se actualizan regularmente para que siempre obtengas la información más actual y relevante.',
    'zh':    '新闻定期更新，让您始终获得最新、最相关的信息。',
  },
  feat2_title: {
    'en-us': 'Direct Interaction',
    'en-uk': 'Direct Interaction',
    'ja':    '直接インタラクション',
    'es':    'Interacción Directa',
    'zh':    '直接互动',
  },
  feat2_desc: {
    'en-us': 'Share your opinions through comment and like features. Be part of quality public discussion.',
    'en-uk': 'Share your opinions through comment and like features. Be part of quality public discussion.',
    'ja':    'コメントといいね機能で意見を共有し、質の高い議論に参加しましょう。',
    'es':    'Comparte tu opinión mediante comentarios y likes. Sé parte de una discusión pública de calidad.',
    'zh':    '通过评论和点赞功能分享您的意见，成为高质量公共讨论的一部分。',
  },
  feat3_title: {
    'en-us': 'Trusted & Accurate',
    'en-uk': 'Trusted & Accurate',
    'ja':    '信頼性と正確さ',
    'es':    'Confiable y Preciso',
    'zh':    '可信且准确',
  },
  feat3_desc: {
    'en-us': 'Every article goes through a strict editorial verification process before being published.',
    'en-uk': 'Every article goes through a strict editorial verification process before being published.',
    'ja':    'すべての記事は厳格な編集審査プロセスを経て公開されます。',
    'es':    'Cada artículo pasa por un riguroso proceso de verificación editorial antes de publicarse.',
    'zh':    '每篇文章在发布前都经过严格的编辑审核流程。',
  },
  feat4_title: {
    'en-us': 'Multi-Platform',
    'en-uk': 'Multi-Platform',
    'ja':    'マルチプラットフォーム',
    'es':    'Multi-Plataforma',
    'zh':    '多平台',
  },
  feat4_desc: {
    'en-us': 'Access news from any device — desktop, tablet, or smartphone, anytime, anywhere.',
    'en-uk': 'Access news from any device — desktop, tablet, or smartphone, anytime, anywhere.',
    'ja':    'デスクトップ、タブレット、スマートフォンなど、どんなデバイスでもいつでもどこでもアクセス可能。',
    'es':    'Accede a las noticias desde cualquier dispositivo — escritorio, tablet o smartphone, en cualquier momento y lugar.',
    'zh':    '随时随地从任何设备访问新闻——台式机、平板电脑或智能手机。',
  },
  stats_readers: {
    'en-us': 'Active Readers',
    'en-uk': 'Active Readers',
    'ja':    'アクティブ読者',
    'es':    'Lectores Activos',
    'zh':    '活跃读者',
  },
  stats_articles: {
    'en-us': 'News Articles',
    'en-uk': 'News Articles',
    'ja':    'ニュース記事',
    'es':    'Artículos de Noticias',
    'zh':    '新闻文章',
  },
  stats_topics: {
    'en-us': 'Topic Categories',
    'en-uk': 'Topic Categories',
    'ja':    'トピックカテゴリ',
    'es':    'Categorías de Temas',
    'zh':    '主题类别',
  },
  stats_updates: {
    'en-us': 'Breaking News',
    'en-uk': 'Breaking News',
    'ja':    'ニュース速報',
    'es':    'Noticias de Último Momento',
    'zh':    '突发新闻',
  },
  home_latest_label: {
    'en-us': 'Latest',
    'en-uk': 'Latest',
    'ja':    '最新',
    'es':    'Últimas',
    'zh':    '最新',
  },
  home_latest_title: {
    'en-us': 'Featured News',
    'en-uk': 'Featured News',
    'ja':    '注目ニュース',
    'es':    'Noticias Destacadas',
    'zh':    '精选新闻',
  },
  home_view_all: {
    'en-us': 'View All News →',
    'en-uk': 'View All News →',
    'ja':    'すべてのニュースを見る →',
    'es':    'Ver Todas las Noticias →',
    'zh':    '查看所有新闻 →',
  },

  // ---- NEWS PAGE ----
  news_page_title: {
    'en-us': 'Latest News',
    'en-uk': 'Latest News',
    'ja':    '最新ニュース',
    'es':    'Noticias Recientes',
    'zh':    '最新新闻',
  },
  news_page_subtitle: {
    'en-us': 'Accurate, trusted, and up-to-date information for you',
    'en-uk': 'Accurate, trusted, and up-to-date information for you',
    'ja':    'あなたへの正確で信頼できる最新情報',
    'es':    'Información precisa, confiable y actualizada para ti',
    'zh':    '为您提供准确、可信的最新信息',
  },
  news_like_btn: {
    'en-us': 'Like',
    'en-uk': 'Like',
    'ja':    'いいね',
    'es':    'Me gusta',
    'zh':    '点赞',
  },
  news_comment_btn: {
    'en-us': 'Comments',
    'en-uk': 'Comments',
    'ja':    'コメント',
    'es':    'Comentarios',
    'zh':    '评论',
  },
  news_comment_placeholder: {
    'en-us': 'Write a comment...',
    'en-uk': 'Write a comment...',
    'ja':    'コメントを入力...',
    'es':    'Escribe un comentario...',
    'zh':    '写评论...',
  },
  news_comment_send: {
    'en-us': 'Send',
    'en-uk': 'Send',
    'ja':    '送信',
    'es':    'Enviar',
    'zh':    '发送',
  },
  news_no_comments: {
    'en-us': 'No comments yet. Be the first!',
    'en-uk': 'No comments yet. Be the first!',
    'ja':    'まだコメントはありません。最初にコメントしましょう！',
    'es':    'Aún no hay comentarios. ¡Sé el primero!',
    'zh':    '暂无评论，成为第一个评论的人！',
  },
  news_loading: {
    'en-us': 'Loading news...',
    'en-uk': 'Loading news...',
    'ja':    'ニュースを読み込んでいます...',
    'es':    'Cargando noticias...',
    'zh':    '正在加载新闻...',
  },
  news_empty: {
    'en-us': 'No news available yet.',
    'en-uk': 'No news available yet.',
    'ja':    'まだニュースはありません。',
    'es':    'Aún no hay noticias disponibles.',
    'zh':    '暂无新闻。',
  },
  news_just_now: {
    'en-us': 'Just now',
    'en-uk': 'Just now',
    'ja':    'たった今',
    'es':    'Ahora mismo',
    'zh':    '刚刚',
  },

  // ---- ABOUT PAGE ----
  about_page_title: {
    'en-us': 'About Us',
    'en-uk': 'About Us',
    'ja':    '私たちについて',
    'es':    'Sobre Nosotros',
    'zh':    '关于我们',
  },
  about_page_subtitle: {
    'en-us': 'Get to know us better and what we stand for',
    'en-uk': 'Get to know us better and what we stand for',
    'ja':    '私たちをもっとよく知ってください',
    'es':    'Conócenos mejor y en qué creemos',
    'zh':    '更深入了解我们和我们的理念',
  },
  about_admin_bar: {
    'en-us': 'Admin Mode Active — You can edit this page',
    'en-uk': 'Admin Mode Active — You can edit this page',
    'ja':    '管理者モード有効 — このページを編集できます',
    'es':    'Modo Admin Activo — Puedes editar esta página',
    'zh':    '管理员模式已激活 — 您可以编辑此页面',
  },
  about_edit_btn: {
    'en-us': '✏ Edit About Us',
    'en-uk': '✏ Edit About Us',
    'ja':    '✏ 概要を編集',
    'es':    '✏ Editar Nosotros',
    'zh':    '✏ 编辑关于我们',
  },

  // ---- ADMIN PAGE ----
  admin_title: {
    'en-us': 'Admin Panel',
    'en-uk': 'Admin Panel',
    'ja':    '管理パネル',
    'es':    'Panel de Administración',
    'zh':    '管理面板',
  },
  admin_subtitle_prefix: {
    'en-us': 'Welcome,',
    'en-uk': 'Welcome,',
    'ja':    'ようこそ、',
    'es':    'Bienvenido,',
    'zh':    '欢迎，',
  },
  admin_subtitle_suffix: {
    'en-us': '. Manage website content from here.',
    'en-uk': '. Manage website content from here.',
    'ja':    'さん。ここからウェブサイトのコンテンツを管理できます。',
    'es':    '. Gestiona el contenido del sitio web desde aquí.',
    'zh':    '。在此管理网站内容。',
  },
  admin_tab_news: {
    'en-us': '📰 Manage News',
    'en-uk': '📰 Manage News',
    'ja':    '📰 ニュース管理',
    'es':    '📰 Gestionar Noticias',
    'zh':    '📰 管理新闻',
  },
  admin_tab_about: {
    'en-us': '📝 Edit About Us',
    'en-uk': '📝 Edit About Us',
    'ja':    '📝 概要を編集',
    'es':    '📝 Editar Nosotros',
    'zh':    '📝 编辑关于我们',
  },
  admin_add_news_title: {
    'en-us': 'Add New Article',
    'en-uk': 'Add New Article',
    'ja':    '新しい記事を追加',
    'es':    'Agregar Nuevo Artículo',
    'zh':    '添加新文章',
  },
  admin_news_title_ph: {
    'en-us': 'Article title *',
    'en-uk': 'Article title *',
    'ja':    '記事のタイトル *',
    'es':    'Título del artículo *',
    'zh':    '文章标题 *',
  },
  admin_news_img_ph: {
    'en-us': 'Image URL (optional)',
    'en-uk': 'Image URL (optional)',
    'ja':    '画像URL（任意）',
    'es':    'URL de imagen (opcional)',
    'zh':    '图片链接（可选）',
  },
  admin_news_content_ph: {
    'en-us': 'Full article content *',
    'en-uk': 'Full article content *',
    'ja':    '記事の全文 *',
    'es':    'Contenido completo del artículo *',
    'zh':    '完整文章内容 *',
  },
  admin_btn_add_news: {
    'en-us': '+ Add Article',
    'en-uk': '+ Add Article',
    'ja':    '+ 記事を追加',
    'es':    '+ Agregar Artículo',
    'zh':    '+ 添加文章',
  },
  admin_news_list_title: {
    'en-us': 'News List',
    'en-uk': 'News List',
    'ja':    '記事一覧',
    'es':    'Lista de Noticias',
    'zh':    '新闻列表',
  },
  admin_btn_delete: {
    'en-us': 'Delete',
    'en-uk': 'Delete',
    'ja':    '削除',
    'es':    'Eliminar',
    'zh':    '删除',
  },
  admin_about_title: {
    'en-us': 'Edit About Us Page',
    'en-uk': 'Edit About Us Page',
    'ja':    '概要ページを編集',
    'es':    'Editar Página Sobre Nosotros',
    'zh':    '编辑关于我们页面',
  },
  admin_btn_save: {
    'en-us': '💾 Save Changes',
    'en-uk': '💾 Save Changes',
    'ja':    '💾 変更を保存',
    'es':    '💾 Guardar Cambios',
    'zh':    '💾 保存更改',
  },
  admin_confirm_delete: {
    'en-us': 'Are you sure you want to delete this article?',
    'en-uk': 'Are you sure you want to delete this article?',
    'ja':    'この記事を削除してもよろしいですか？',
    'es':    '¿Estás seguro de que quieres eliminar este artículo?',
    'zh':    '确定要删除这篇文章吗？',
  },

  // ---- FOOTER ----
  footer_tagline: {
    'en-us': 'A trusted digital news portal with accurate, balanced, and up-to-date daily information.',
    'en-uk': 'A trusted digital news portal with accurate, balanced, and up-to-date daily information.',
    'ja':    '正確でバランスのとれた最新の日々の情報をお届けする信頼できるデジタルニュースポータル。',
    'es':    'Un portal de noticias digital confiable con información diaria precisa, equilibrada y actualizada.',
    'zh':    '值得信赖的数字新闻门户，每日为您提供准确、平衡的最新信息。',
  },
  footer_nav_label: {
    'en-us': 'Navigation',
    'en-uk': 'Navigation',
    'ja':    'ナビゲーション',
    'es':    'Navegación',
    'zh':    '导航',
  },
  footer_other_label: {
    'en-us': 'Other',
    'en-uk': 'Other',
    'ja':    'その他',
    'es':    'Otros',
    'zh':    '其他',
  },
  footer_privacy: {
    'en-us': 'Privacy Policy',
    'en-uk': 'Privacy Policy',
    'ja':    'プライバシーポリシー',
    'es':    'Política de Privacidad',
    'zh':    '隐私政策',
  },
  footer_terms: {
    'en-us': 'Terms & Conditions',
    'en-uk': 'Terms & Conditions',
    'ja':    '利用規約',
    'es':    'Términos y Condiciones',
    'zh':    '条款与条件',
  },
  footer_contact: {
    'en-us': 'Contact Us',
    'en-uk': 'Contact Us',
    'ja':    'お問い合わせ',
    'es':    'Contáctanos',
    'zh':    '联系我们',
  },
  footer_copyright: {
    'en-us': '© {year} NewsPortal. All rights reserved. Made with ❤ for quality information.',
    'en-uk': '© {year} NewsPortal. All rights reserved. Made with ❤ for quality information.',
    'ja':    '© {year} NewsPortal. 全著作権所有。質の高い情報のために ❤ を込めて作られました。',
    'es':    '© {year} NewsPortal. Todos los derechos reservados. Hecho con ❤ para información de calidad.',
    'zh':    '© {year} NewsPortal. 保留所有权利。用 ❤ 为高质量信息而制作。',
  },

  // ---- TOAST MESSAGES ----
  toast_welcome: {
    'en-us': 'Welcome,',
    'en-uk': 'Welcome,',
    'ja':    'ようこそ、',
    'es':    'Bienvenido,',
    'zh':    '欢迎，',
  },
  toast_logged_out: {
    'en-us': 'Successfully signed out.',
    'en-uk': 'Successfully logged out.',
    'ja':    'ログアウトしました。',
    'es':    'Sesión cerrada correctamente.',
    'zh':    '已成功退出登录。',
  },
  toast_login_required: {
    'en-us': 'Please sign in first.',
    'en-uk': 'Please log in first.',
    'ja':    '先にログインしてください。',
    'es':    'Por favor, inicia sesión primero.',
    'zh':    '请先登录。',
  },
  toast_news_added: {
    'en-us': 'Article added successfully!',
    'en-uk': 'Article added successfully!',
    'ja':    '記事が正常に追加されました！',
    'es':    '¡Artículo agregado correctamente!',
    'zh':    '文章添加成功！',
  },
  toast_news_deleted: {
    'en-us': 'Article deleted successfully.',
    'en-uk': 'Article deleted successfully.',
    'ja':    '記事が削除されました。',
    'es':    'Artículo eliminado correctamente.',
    'zh':    '文章已成功删除。',
  },
  toast_saved: {
    'en-us': 'Changes saved!',
    'en-uk': 'Changes saved!',
    'ja':    '変更を保存しました！',
    'es':    '¡Cambios guardados!',
    'zh':    '更改已保存！',
  },
  toast_error_generic: {
    'en-us': 'Something went wrong. Please try again.',
    'en-uk': 'Something went wrong. Please try again.',
    'ja':    'エラーが発生しました。もう一度お試しください。',
    'es':    'Algo salió mal. Inténtalo de nuevo.',
    'zh':    '出现错误，请重试。',
  },
  toast_account_created: {
    'en-us': 'Account created! Welcome,',
    'en-uk': 'Account created! Welcome,',
    'ja':    'アカウントが作成されました！ようこそ、',
    'es':    '¡Cuenta creada! Bienvenido,',
    'zh':    '账户已创建！欢迎，',
  },
};

// =============================================
// CORE ENGINE
// =============================================

const EMAIL_REGEX = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;
const PHONE_REGEX = /(\+?[\d\s\-().]{7,20})/g;

let currentLang = localStorage.getItem('np_lang') || 'id'; // 'id' = default Bahasa Indonesia

function t(key) {
  if (currentLang === 'id') return null; // use default PHP-rendered text
  const entry = T[key];
  if (!entry) return null;
  return entry[currentLang] || entry['en-us'] || null;
}

function applyTranslations() {
  // All elements with data-t attribute
  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.getAttribute('data-t');
    const translation = t(key);
    if (translation === null) return;

    const attr = el.getAttribute('data-t-attr');
    if (attr === 'placeholder') {
      el.placeholder = translation;
    } else if (attr === 'value') {
      el.value = translation;
    } else if (attr === 'title') {
      el.title = translation;
    } else {
      // Protect email and phone inside element
      el.innerHTML = protectSpecialContent(el, translation);
    }
  });

  // Copyright year replacement
  document.querySelectorAll('[data-t="footer_copyright"]').forEach(el => {
    const translation = t('footer_copyright');
    if (translation) {
      el.textContent = translation.replace('{year}', new Date().getFullYear());
    }
  });

  // Update html lang attribute
  const langMap = { 'en-us': 'en', 'en-uk': 'en-GB', 'ja': 'ja', 'es': 'es', 'zh': 'zh', 'id': 'id' };
  document.documentElement.lang = langMap[currentLang] || 'id';
}

function protectSpecialContent(el, newText) {
  // Check if original element has email/phone — don't translate those nodes
  const original = el.innerHTML;
  const hasEmail = EMAIL_REGEX.test(original);
  const hasPhone = PHONE_REGEX.test(original);
  EMAIL_REGEX.lastIndex = 0;
  PHONE_REGEX.lastIndex = 0;
  if (hasEmail || hasPhone) return original; // don't touch
  return newText;
}

// =============================================
// LANGUAGE SWITCHER UI
// =============================================

function buildLangSwitcher() {
  const existing = document.getElementById('lang-switcher');
  if (existing) existing.remove();

  const wrapper = document.createElement('div');
  wrapper.id = 'lang-switcher';
  wrapper.innerHTML = `
    <button class="lang-current" onclick="toggleLangDropdown()" title="Change Language">
      <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
      <span id="lang-current-label">${currentLang === 'id' ? '🇮🇩 ID' : LANGUAGES[currentLang]?.short || currentLang.toUpperCase()}</span>
      <svg class="lang-chevron" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </button>
    <div class="lang-dropdown" id="lang-dropdown">
      <div class="lang-option ${currentLang === 'id' ? 'active' : ''}" onclick="setLanguage('id')">
        🇮🇩 <span>Bahasa Indonesia</span>
      </div>
      ${Object.entries(LANGUAGES).map(([code, info]) => `
        <div class="lang-option ${currentLang === code ? 'active' : ''}" onclick="setLanguage('${code}')">
          ${info.label.split(' ')[0]} <span>${info.label.split(' ').slice(1).join(' ')}</span>
        </div>
      `).join('')}
    </div>
  `;

  // Inject styles
  if (!document.getElementById('lang-switcher-style')) {
    const style = document.createElement('style');
    style.id = 'lang-switcher-style';
    style.textContent = `
      #lang-switcher {
        position: fixed;
        bottom: 28px;
        left: 28px;
        z-index: 8888;
        font-family: 'DM Sans', sans-serif;
      }
      .lang-current {
        display: flex;
        align-items: center;
        gap: 7px;
        padding: 9px 16px;
        background: #0a0a0a;
        color: #fff;
        border: none;
        border-radius: 100px;
        cursor: pointer;
        font-size: 0.82rem;
        font-weight: 600;
        font-family: inherit;
        box-shadow: 0 4px 20px rgba(0,0,0,0.25);
        transition: background 0.2s ease, transform 0.2s ease;
        white-space: nowrap;
      }
      .lang-current:hover {
        background: #333;
        transform: translateY(-1px);
      }
      .lang-chevron {
        transition: transform 0.2s ease;
      }
      .lang-dropdown-open .lang-chevron {
        transform: rotate(180deg);
      }
      .lang-dropdown {
        position: absolute;
        bottom: calc(100% + 10px);
        left: 0;
        background: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 12px;
        box-shadow: 0 8px 40px rgba(0,0,0,0.15);
        min-width: 200px;
        overflow: hidden;
        display: none;
        animation: langDropIn 0.2s cubic-bezier(0.4,0,0.2,1) both;
      }
      @keyframes langDropIn {
        from { opacity: 0; transform: translateY(8px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .lang-dropdown.open { display: block; }
      .lang-option {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 11px 16px;
        cursor: pointer;
        font-size: 0.88rem;
        font-family: inherit;
        color: #333;
        transition: background 0.15s ease;
        border-bottom: 1px solid #f4f4f4;
      }
      .lang-option:last-child { border-bottom: none; }
      .lang-option:hover { background: #f4f4f4; }
      .lang-option.active {
        background: #0a0a0a;
        color: #fff;
        font-weight: 600;
      }
      .lang-option span { flex: 1; }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(wrapper);

  // Close dropdown when clicking outside
  document.addEventListener('click', e => {
    if (!wrapper.contains(e.target)) {
      closeLangDropdown();
    }
  });
}

function toggleLangDropdown() {
  const dropdown = document.getElementById('lang-dropdown');
  const btn = document.querySelector('.lang-current');
  const isOpen = dropdown.classList.contains('open');
  if (isOpen) {
    dropdown.classList.remove('open');
    btn.classList.remove('lang-dropdown-open');
  } else {
    dropdown.classList.add('open');
    btn.classList.add('lang-dropdown-open');
  }
}

function closeLangDropdown() {
  const dropdown = document.getElementById('lang-dropdown');
  const btn = document.querySelector('.lang-current');
  if (dropdown) dropdown.classList.remove('open');
  if (btn) btn.classList.remove('lang-dropdown-open');
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('np_lang', lang);
  closeLangDropdown();
  applyTranslations();

  // Update current label
  const label = document.getElementById('lang-current-label');
  if (label) {
    label.textContent = lang === 'id' ? '🇮🇩 ID' : (LANGUAGES[lang]?.short || lang.toUpperCase());
  }

  // Update active state in dropdown
  document.querySelectorAll('.lang-option').forEach((el, i) => {
    el.classList.remove('active');
    const code = i === 0 ? 'id' : Object.keys(LANGUAGES)[i - 1];
    if (code === lang) el.classList.add('active');
  });

  // Re-render dynamic content if on news page
  if (typeof loadNews === 'function') {
    loadNews();
  }
}

// =============================================
// OVERRIDE dynamic JS strings to use translations
// =============================================

// Wrap the original showToast to handle translated messages
const _origShowToast = window.showToast;

// Override renderNewsCard comment placeholder
const _origRenderNewsCard = window.renderNewsCard;
if (typeof _origRenderNewsCard === 'function') {
  window.renderNewsCard = function(n) {
    let html = _origRenderNewsCard(n);
    // replace static Indonesian strings in rendered HTML
    return html;
  };
}

// =============================================
// INIT
// =============================================

// Expose globally IMMEDIATELY so main.js can call it anytime
window.applyTranslations = applyTranslations;
window.reTranslate = applyTranslations;
window.currentLang = () => currentLang;
window.tGet = t;

document.addEventListener('DOMContentLoaded', () => {
  buildLangSwitcher();
  if (currentLang !== 'id') {
    applyTranslations();
  }
  // Also re-apply after a short delay to catch dynamic navbar from main.js
  setTimeout(() => {
    if (currentLang !== 'id') applyTranslations();
  }, 500);
});
