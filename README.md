# PostEngine v3

地方エンジニア × 育児 × 移住 をコンセプトとした5プラットフォーム対応SNS投稿自動生成ツール。

## 対応プラットフォーム
- TikTok / Instagram（動画キャプション・ハッシュタグ・シーン構成案）
- X / Threads（テキスト投稿）
- note（記事ドラフト 1,000〜1,200字）

## 機能
- Anthropic API（claude-sonnet-4-6）で投稿を自動生成
- 生成した内容をNotion SNS_POST_DBに自動記録

## フォルダ構成
```
postengine/
├── api/
│   ├── notion.js     # Notion APIプロキシ
│   └── claude.js     # Anthropic APIプロキシ
├── public/
│   └── index.html    # メインUI
├── vercel.json       # Vercel設定
└── README.md
```

## セットアップ

### 1. 環境変数の設定（Vercel）
Vercelのダッシュボード → Settings → Environment Variables に以下を追加：

| Key | Value |
|-----|-------|
| `ANTHROPIC_API_KEY` | Anthropic APIキー（`sk-ant-...`） |

### 2. Notion連携
1. [notion.so/my-integrations](https://www.notion.so/my-integrations) でIntegrationを作成
2. SNS_POST_DBを開いて右上「…」→「接続」でIntegrationを追加
3. ツール上部にIntegration Token（`ntn_xxx...`）とDB IDを入力

### 3. デプロイ
```bash
# GitHubにプッシュ → Vercelと連携して自動デプロイ
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/yourname/postengine.git
git push -u origin main
```

## 注意
- Anthropic APIキーはVercelの環境変数で管理（コードに書かない）
- NotionのTokenはブラウザのlocalStorageに保存（自分のブラウザのみ）
