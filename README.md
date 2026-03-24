# Codex Desk

Desktop app local-first de quan ly nhieu tai khoan ChatGPT Plus/Codex tren macOS va Windows.

## MVP co san

- Quan ly ho so tai khoan: email, plan, status, priority, browser profile, launch command.
- Gan repo, branch va muc dich su dung theo tung account.
- Luu du lieu local vao file JSON trong `userData` cua Electron.
- Moi tai khoan co the mo trong mot session Electron rieng va giu cookie dang nhap local.
- Moi slot Codex duoc mo voi `CODEX_HOME` rieng de giu profile/auth tach biet, khong can copy auth global qua lai.
- Import/export JSON.
- Mo nhanh profile path, repo path va thu muc du lieu local.
- Dong cua so chinh de app tiep tuc chay nen o tray/menu bar; chon `Thoat` tu tray de tat han.
- Kiem tra ban moi tu GitHub Releases va cho phep cai dat update ngay trong app.
- Build desktop cho macOS va Windows bang `electron-builder`.
- Workflow GitHub Actions de dong goi artifact cho ca 2 he dieu hanh.

## Stack

- Electron
- React 19
- TypeScript
- Vite
- electron-builder

## Chay local

```bash
npm install
npm run dev
```

`npm run dev` se mo renderer Vite va Electron desktop app.

## Build package

```bash
npm run dist:mac
npm run dist:win
```

Artifact se duoc xuat vao thu muc `release/`.

Luu y:

- Build `macOS` nen chay tren macOS.
- Build `Windows` on dinh nhat khi chay tren Windows hoac dung workflow CI da kem san.
- App nay chi quan ly metadata va van hanh account. No khong hop nhat quota hay vuot gioi han cua OpenAI.

## Auto update

- Can tang `version` trong `package.json` moi lan release.
- Push tag theo dang `v1.2.3` de workflow publish len GitHub Releases cung metadata update.
- Windows auto-update voi target `nsis`.
- macOS can code signing thi auto-update moi hoat dong on dinh.

## Release len GitHub

- App release can 3 bien moi truong: `GH_OWNER`, `GH_REPO`, `GH_TOKEN`.
- Build va publish macOS:

```bash
GH_OWNER=ten-owner GH_REPO=ten-repo GH_TOKEN=github_pat_xxx npm run release:mac
```

- Build va publish Windows:

```bash
GH_OWNER=ten-owner GH_REPO=ten-repo GH_TOKEN=github_pat_xxx npm run release:win
```

- Neu dung GitHub Actions thi workflow da tu truyen `GH_OWNER`, `GH_REPO`, `GH_TOKEN` khi push tag `v*`.
- Thu muc hien tai van can duoc `git init`, them remote GitHub va push len repo that truoc khi workflow co the chay.
