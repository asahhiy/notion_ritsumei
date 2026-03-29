# SQLiteキャッシング & マネタイズ実装計画

## 📋 概要

本ドキュメントは、Notionからのデータ同期をSQLiteキャッシュで最適化し、フリーミアムモデルでマネタイズする実装計画です。

---

## 1. 現状分析

### 現在のデータフロー

```
Notion API (毎回呼び出し)
    ↓
getsubjectlist.ts で形式変換
    ↓
SubjectData 型で返却
    ↓
UI表示
```

### 課題点

- ⚠️ **毎回Notionへのネットワークリクエスト** → API制限のリスク、遅延
- ⚠️ **オフライン非対応** → インターネット接続必須
- ⚠️ **スキーマ不一致**
  - `SubjectData` が取得できるフィールド：`subjectName, when, day, pageId`
  - `lessons` テーブルが持つフィールド：`fullName, instructor, room, syllabusUrl, term, day, period`
  - データ損失：`instructor, room, syllabusUrl` が未取得

---

## 2. 提案するデータフロー

### フェーズ1: 初回起動時

```
Notion API fetch
    ↓
getsubjectlist.ts で全フィールド取得・正規化
    ↓
Lessons テーブルに挿入（SQLiteキャッシュ）
    + last_synced, created_at 記録
    ↓
UI表示
```

### フェーズ2: 2回目以降の起動

```
SQLite から lessons テーブル読込
    ↓
UI表示（高速、オフライン対応）
```

### フェーズ3: 手動更新（useEffect使用）

```
ユーザーが画面を開く
    ↓
useEffect 実行 → Notion API fetch (差分更新)
    ↓
SQLite 更新
    ↓
UI更新
```

---

## 3. スキーマ設計

### 3.1 拡張 lessons テーブル

```sql
CREATE TABLE IF NOT EXISTS lessons (
  id TEXT PRIMARY KEY NOT NULL,
  full_name TEXT NOT NULL,
  instructor TEXT,
  room TEXT,
  syllabus_url TEXT,
  term TEXT NOT NULL,
  day TEXT NOT NULL,
  period INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_synced DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**新規カラム：**

- `created_at` - レコード作成時刻（統計用）
- `last_synced` - 最終同期時刻（データ鮮度確認用）

### 3.2 型統一

#### SubjectData (UI表示用)

```typescript
export type SubjectData = {
  pageId?: string;
  subjectName: string;
  when: number; // ✨ 変更: string → number
  day: string;
  instructor?: string; // ✨ 新規
  room?: string; // ✨ 新規
  syllabusUrl?: string; // ✨ 新規
  semester: string; // ✨ 新規
};
```

#### LessonDataMasterProps (DB永続化用)

```typescript
export type LessonDataMasterProps = {
  id: string;
  fullName: string;
  instructor: string;
  room: string;
  syllabusUrl: string;
  term: string;
  day: string;
  period: number;
  createdAt: string; // ✨ 新規
  lastSynced: string; // ✨ 新規
};
```

---

## 4. 実装タスク

### タスク4.1: getsubjectlist.ts 修正

**目標：** Notionから全フィールドを取得

```typescript
// 変更前: subjectName, when, day のみ
// 変更後: instructorも取得

const instructorProp = page.properties.Professor; // ← 追加
let instructor = "未設定";
if (instructorProp.type === "rich_text") {
  instructor =
    instructorProp.rich_text.map((t) => t.plain_text).join("") || "未設定";
}

// room, syllabusUrl についても同様
```

**取得フィールド（Notionカラムと対応）：**
| 取得データ | Notionカラム | 型 |
|---|---|---|
| subjectName | SubjectName | title |
| when (period) | When | select |
| day | Day | select |
| instructor | Professor | rich_text |
| room | Room | rich_text |
| syllabusUrl | Syllabus URL | url |
| semester | Semester | select |

### タスク4.2: migrate.ts 拡張

**変更内容：**

```sql
-- 新規カラム追加
ALTER TABLE lessons ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE lessons ADD COLUMN last_synced DATETIME DEFAULT CURRENT_TIMESTAMP;
```

### タスク4.3: seed.ts 修正

**現在の流れ：**

```typescript
allSubjectData_2026_spring → lessons 投入
```

**新しい流れ：**

```typescript
getSubjectList() (Notion fetch)
  → 正規化 / LessonDataMasterProps に変換
  → lessons 投入 (last_synced = now)
  → キャッシュ成功ログ
```

### タスク4.4: type.ts 統一

- `SubjectData` 拡張（instructor, room, syllabusUrl, semester追加）
- `when` の型を `string` → `number` に統一

### タスク4.5: 画面で useEffect 実装

```typescript
// 例: app/(tabs)/index.tsx
useEffect(() => {
  const syncWithNotion = async () => {
    try {
      const freshData = await getSubjectList();
      // ← DB更新ロジック
      setSubjects(freshData);
    } catch (error) {
      console.error("Notion sync failed", error);
      // ← DBから前回のデータを読込
    }
  };

  syncWithNotion();
}, []);
```

---

## 5. マネタイズ戦略

### 5.1 アプリのUSP（Unique Selling Point）

✅ **大学公式シラバスがDB化されている**

- → ユーザーは手動入力不要
- → 情報の正確性が保証される

✅ **タスク管理と時間割の統合**

- → 授業と課題の相関関係を可視化

### 5.2 フリーミアムモデル設计

#### 無料ティア（All Users）

```
機能:
  ├─ 時間割表示（自動生成）
  ├─ 科目情報表示（シラバスDB完全対応）
  ├─ 基本タスク登録（上限：週5タスク or 30日間）
  └─ 1デバイス同期

営業ポイント:
  「他アプリは手動でシラバス情報を入力？
   このアプリは大学公式DBから自動取得」
```

#### プレミアムティア（月額/年額）

```
追加機能:
  ├─ 無制限タスク管理
  ├─ タスク詳細記録
  │   ├─ 進捗率管理
  │   ├─ 優先度設定
  │   └─ 時間予測
  ├─ タスク × 授業のリンク機能
  │   ├─ 「○○の授業に向けた課題」を自動グループ化
  │   └─ 授業出欠と課題の関連付け
  ├─ データ分析・可視化
  │   ├─ 成績予測AI
  │   ├─ 学習時間の可視化
  │   └─ 学習効率分析
  ├─ クラウド同期（複数デバイス）
  ├─ エクスポート機能（PDF, CSV）
  └─ カスタマイズ（テーマ、通知設定など）
```

**価格案：**

- 月額：$2.99 USD (約330円)
- 年額：$19.99 USD (約2,200円) ← 年額割引で転換率↑

### 5.3 収益化のコツ

| 施策                             | 効果                                              |
| -------------------------------- | ------------------------------------------------- |
| **7日間無料トライアル**          | 有料機能を試させる → 転換率+15%                   |
| **セメスター開始時キャンペーン** | 「新年度、学習管理の新習慣」                      |
| **B2C学生マーケ**                | SNS (Twitter/Instagram) で大学アカウント連携      |
| **デジタルマーケティング**       | 大学のオンライン掲示板、教育系YouTubeチャネルなど |

---

## 6. 実装ロードマップ

### Phase 1: SQLiteキャッシング最適化（今週）

- [ ] getsubjectlist.ts 修正（全フィールド取得）
- [ ] schema.ts & migrate.ts 拡張
- [ ] seed.ts でNotion → SQLite の流れ実装
- [ ] type.ts の型統一
- [ ] useEffect での差分シンク実装
- [ ] 検証・テスト

**目標：** 初回起動は遅延するが、2回目以降は高速

### Phase 2: タスク管理テーブル設計（1-2週間後）

- [ ] tasks テーブルスキーマ設計
- [ ] task × lessons の関連付けテーブル
- [ ] Notionからのタスク自動取得ロジック

### Phase 3: 基本的なタスク管理UI（2-3週間後）

- [ ] タスク作成・編集・削除画面
- [ ] タスクとレッスンのリンク機能
- [ ] 基本的なフィルタリング・ソート

### Phase 4: プレミアム機能実装（4-6週間後）

- [ ] Stripe/RevenueCat統合
- [ ] ペイウォール実装
- [ ] データ分析・可視化機能
- [ ] A/Bテスト（試験的課金機能確認）

### Phase 5: リリース・マーケティング（6-8週間後）

- [ ] App Store / Google Play デプロイ
- [ ] SNS宣伝（大学垢連携）
- [ ] 初期ユーザー獲得

---

## 7. 技術スタック確認

| レイヤー | 選択肢              | 採用予定       |
| -------- | ------------------- | -------------- |
| **DB**   | SQLite              | ✅ expo-sqlite |
| **ORM**  | Drizzle             | ✅ 既導入      |
| **API**  | Notion SDK          | ✅ 既導入      |
| **決済** | Stripe / RevenueCat | 🔧 要統合      |
| **分析** | Firebase Analytics  | 🔧 検討        |

---

## 8. リスク・対策

| リスク                     | 対策                                            |
| -------------------------- | ----------------------------------------------- |
| Notion API 呼び出し上限    | useEffect で同期頻度を制限（1時間1回など）      |
| データが古い（キャッシュ） | last_synced を表示、手動更新ボタン提供          |
| ユーザー獲得困難           | 大学内での口コミ → インフルエンサー（学生）連携 |
| 有料機能の需要が低い       | 初期段階で学生インタビュー実施                  |

---

## 9. 次のアクション

1. **スキーマ統一を実装** → getsubjectlist.ts, schema.ts, seed.ts, type.ts の修正
2. **useEffect での同期テスト** → 画面でのリアルタイムシンク確認
3. **学生ターゲットをインタビュー** → 有料機能の実際の需要確認
4. **MVP版リリース** → フリーティアで初期ユーザー獲得
