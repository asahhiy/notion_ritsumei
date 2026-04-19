# アプリの背景色・テーマ管理に関する調査報告

このプロジェクトにおける背景色やテーマ管理の方法を調査した結果をまとめます。

## 1. 背景色の定義場所

背景色は主に以下の3つの場所で管理・指定されています。

### A. テーマ定数 (`src/constants/theme.ts`)
アプリ全体のライトモード・ダークモードに応じた色が定義されています。

```typescript
export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    // ...
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    // ...
  },
};
```

### B. Tailwind / NativeWind 設定 (`tailwind.config.js`)
プロジェクト独自のカラーパレットが定義されています。Notion風の背景色として `neutral: "#F7F7F5"` などが定義されています。

```javascript
      colors: {
        primary: "#000000",
        secondary: "#37352F",
        tertiary: "#6B6B6B",
        neutral: "#F7F7F5",
      },
```

### C. グローバルテーマ設定 (`app/_layout.tsx`)
React Navigationの `ThemeProvider` を使用して、ナビゲーション全体のベーステーマが適用されています。現在は `DefaultTheme`（ライトモード標準）がハードコードされています。

```tsx
<ThemeProvider value={DefaultTheme}>
```

## 2. 背景色の適用メカニズム

背景色は以下のコンポーネントやクラスを通じて画面に適用されます。

### A. ThemedView コンポーネント (`src/views/components/themed-view.tsx`)
`src/constants/theme.ts` で定義された色を自動的に適用するカスタムコンポーネントです。
- `useThemeColor` フックを介して、現在のテーマ（ライト/ダーク）に基づいた `background` 色を取得し、`View` の `backgroundColor` に設定します。
- 主に `modal.tsx` や `collapsible.tsx` などで使用されています。

### B. NativeWind (Tailwind CSS) クラス
各画面のコンポーネントで、ユーティリティクラスを使用して直接指定されています。
- 例: `bg-slate-100`, `bg-yellow-100` など
- 多くの画面（`index.tsx` や `today-task-view.tsx` など）では、標準の `View` コンポーネントにこれらのクラスを付与して背景色を設定しています。

## 3. 現状の課題と提案

- **グローバルテーマの固定**: `app/_layout.tsx` で `DefaultTheme` が固定されているため、システム設定に応じたダークモードへの自動切り替えがナビゲーションレイヤーで完全には機能していない可能性があります。
- **背景色指定の混在**: `ThemedView` による自動テーマ切り替えと、NativeWindによるハードコードされた背景色指定が混在しています。アプリ全体で統一感のあるテーマ（特にダークモード対応）を実現するには、`ThemedView` への統一や、NativeWindでのテーマ変数利用を検討すると良いでしょう。
