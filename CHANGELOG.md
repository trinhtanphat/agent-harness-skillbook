## 2026-11-15 — Scan reachable Git history before public release

- Add read-only, bounded Git history credential scanner using batch Git object inspection.
- Reuse HEAD scanner path and content signatures, and anchor PGP signature to avoid source-code false positives.
- Test deleted fake access token and deleted `.env` in temporary Git repositories without exposing values.
- Expand release gates to 9 Node / 10 local / 12 live and document the scope limits.

## 2026-11-15 — Archive original 10-gate public release evidence

- Archived byte-for-byte PHA `--mode release` report for SHA `7e33a1e` (10/10 PASS, 159/159 Git blobs).
- Matched original PHA Git blob SHA to uploaded GitHub object and SHA-256.
- Validator checks evidence provenance; final HEAD will require a separate full Pages verification.

## 2026-11-15 — Public Git tree security preflight

- Add exact-Git-HEAD, read-only security guard before release and public SHA verification.
- Deny sensitive credential file paths and high-confidence private-key/token markers; never print key contents.
- Add isolated temporary Git fixture tests and fail-closed command behavior.
- Extend release gates to 7 node / 8 local / 10 live release checks, with updated security and contributor guidance.

## 2026-11-15 — Preserve complete 154-file release acceptance

- Saved the original PHA release gate JSON (9/9 PASS), including before/after GitHub SHA.
- Verified 154/154 Git-tracked deployed blobs on source SHA `a4d5cba`; archived exact original Git blob and SHA-256.
- Requires rerunning the full site gate on the new evidence-archive commit.

## 2026-11-15 — Full Git-tracked deployment coverage

- Replace the curated-only Full Pages verifier with all Git-tracked paths, so new commits cannot escape SHA verification.
- Add offline `-Full -ListOnly` manifest enumeration, plus contract tests for coverage and duplicate detection.
- Record 153 tracked vs. 133 previously checked; 14 additional public-file probes matched SHA.
- Require new complete GitHub Pages release gate after publication.

## 2026-11-15 — Public release gate evidence preserved

- Archived actual PHA `--mode release` JSON, 9/9 PASS against GitHub Pages on SHA `3abcabf`.
- Verified 132/132 deployed blob SHA and direct remote main SHA before and after the run.
- Added evidence-schema validator and released-file coverage; final repository commit must be re-verified separately.

## 2026-11-15 — One-command, fail-closed release gate

- Add dependency-free `scripts/release-gate.mjs` for node-only, isolated local browser, and full public Pages acceptance.
- Release preflight and postflight require a clean worktree and direct GitHub origin/main SHA equality; any mismatch fails closed.
- Add plan/no-side-effects CLI tests, JSON outcome records in ignored QA directory, timeouts and fail-fast behavior.
- Extend deployed-byte verifier to release tooling and add reproducible QA instructions in RELEASE_GATE.md.

## 2026-11-15 — Preview sensitive-path alias regression

- Deny case variants of sensitive dotfiles and aliases inside the repository after resolving symlinks.
- Stream file content via the canonical path and extend 17 HTTP smoke tests with live symlink aliases.
- Confirmed new negative-case tests PASS on PHA and WIN11-181, 24/24 local browser QA PASS.
- Expanded Pages integrity coverage to the preview scripts, validation and security docs.

## 2026-11-15 — Recover and publish original 24/24 Chrome QA artifacts

- Reconnected to the original PHA QA host; archived untouched `browser-qa.json`, `home-mobile-320.png`, and `install-mobile-320.png`.
- Confirmed source SHA-256, byte lengths, and equality of source Git blob SHA to uploaded GitHub blob SHA.
- Added PROVENANCE.md and validator checks to detect corruption or accidental changes to original evidence.
- QA scope and production deploy integrity remain independently verified; closing Issue #1 requires final HEAD/Pages integrity pass.

## 2026-11-14 — Compact mobile, modal accessibility and preview security

- Sửa overflow tại viewport 320px: thanh điều hướng và các câu lệnh installer dài.
- Sửa SEO mô tả 36 thành 60 skills; tôn trọng reduced-motion; cô lập nội dung nền khi popup modal đang mở.
- Tăng bảo vệ local preview: đường dẫn canonical ngăn symlink escape, deny dotfile nhạy cảm.
- Kiểm thử public 24/24 Chrome headless PASS, local preview 15 cases và symlink negative test PASS.
- Ghi console QA và phạm vi hạn chế trong `evidence/2026-11-14-a11y-24qa`.

## 2026-11-14 — Browser QA 19/19 live PASS

- DESKTOP-PHA1S90 đã chạy Chrome headless cô lập trên public GitHub Pages, 19/19 kiểm thử PASS.
- Đóng ba browser QA blocker trước đó: directory pages, mobile 60-skill index, installer guide.
- Lưu JSON chạy thực tế và ảnh mobile trong `evidence/2026-11-14-19qa`.
- Mở rộng kiểm tra deployed SHA để bao gồm bằng chứng mới.

## 2026-11-14 — Discoverability and safe skill installation

- Trang danh mục riêng `docs/index.html` (14 playbook) và `skills/index.html` (60 skill/10 nhóm), đọc được khi tắt JavaScript.
- Trang `install.html` và trình cài Node.js không có dependencies; chế độ mặc định dry-run, yêu cầu `--write` và thư mục đích rõ ràng, không ghi đè.
- Sửa nhãn FIELD GUIDE và mô tả SEO cho các hướng dẫn 11–14; thêm liên kết chỉ mục và ba URL vào sitemap.
- Bộ kiểm thử Node đã PASS trên WIN11-181 (60 skills, 14 guides, link check, security, installer, MCP, fsck). Ba trường hợp browser mới về trang chỉ mục và hướng dẫn cài cần chạy trên Chrome/Chromium riêng sau triển khai; kết quả 16/16 trước đó vẫn chỉ áp dụng phạm vi cũ.

## 2026-11-14 — Browser blockers closed

**16/16 Browser QA PASS — live GitHub Pages.** Ba ca focus trap, Escape và Back đã được chạy trực tiếp trên bản public; JSON và 4 ảnh bằng chứng đã được đưa vào `evidence/2026-11-14-final`. Script verify-pages kiểm tra cả bộ bằng chứng này.

## 2026-11-14 — UI usability & branch QA

- Thêm deep link cho từng SKILL.md qua `#skill/<id>` và nút sao chép URL.
- Sửa category filter để giữ focus bàn phím; đánh dấu drawer `inert` khi đóng.
- Bổ sung biểu tượng cho bốn chuyên mục mở rộng.
- Thêm server xem trước chỉ trên loopback và bộ kiểm thử branch QA không GitHub Actions.
- Bổ sung test deep-link/reload, focus trap, Escape, Back, liên kết và bảo vệ thư mục nội bộ.

**Trạng thái:** Xem QA_REPORT.md theo commit đã kiểm thử; phần này chỉ ghi thay đổi, không tự tuyên bố production verified.

# Changelog

## 2026-11-14 — Knowledge base expansion

- Tăng thư viện từ 36 lên 60 SKILL.md thuộc 10 nhóm.
- Từ 10 lên 14 playbook và trang HTML điều hướng.
- Nâng ví dụ MCP lên modern 2026-07-28 (client metadata và server/discover).
- QA desktop/mobile bằng Chromium profile độc lập, phát hiện và sửa lỗi bộ test re-render.
- Đưa scripts/validate.mjs kiểm tra cấu trúc, liên kết và metadata.

Kết quả kiểm thử phải được chạy lại trên HEAD hiện tại; changelog không thay thế biên bản QA gần nhất.
