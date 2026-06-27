# PostEngine v3 - Next.js版

地方エンジニア × 育児 × 移住 をコンセプトとした5プラットフォーム対応SNS投稿自動生成ツール。

## 技術スタック
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui（手動セットアップ）
- Anthropic API（claude-sonnet-4-6）
- Notion API

## ページ構成
- `/` → ダッシュボード
- `/video` → TikTok / Instagram
- `/text` → X / Threads
- `/note` → note
- `/settings` → Notion連携・プロフィール設定

## セットアップ

### 1. 依存パッケージインストール
```bash
npm install
```

### 2. 環境変数の設定
```bash
cp .env.example .env.local
# .env.localにANTHROPIC_API_KEYを設定
```

### 3. ローカル起動
```bash
npm run dev
```

### 4. Vercelデプロイ
1. GitHubにプッシュ
2. VercelでGitHubリポジトリを連携
3. Environment Variablesに `ANTHROPIC_API_KEY` を追加
4. デプロイ

## Notion連携
1. [notion.so/my-integrations](https://www.notion.so/my-integrations) でIntegrationを作成
2. SNS_POST_DBを開いて右上「…」→「接続」でIntegrationを追加
3. `/settings` ページでTokenとDB IDを入力
