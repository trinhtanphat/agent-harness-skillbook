# Reproducible QA & release gate — GitHub là nguồn mã chính

Dùng Node.js 22+ và các script đi kèm repository; không cần GitHub Actions, không cần npm install, không tự động deploy. Các lệnh có thể chạy trong worktree QA cô lập trên WIN11-181 hoặc DESKTOP-PHA1S90.

## Kiểm tra mã nguồn, không cần trình duyệt

~~~bash
node scripts/release-gate.mjs --mode node
~~~

Chạy tuần tự validator, kiểm thử loopback/symlink, installer 60 skills, MCP smoke, kiểm tra chính công cụ release gate và `git fsck`. Khi một bước FAIL, script **dừng ngay**, trả exit code khác 0 và in tên cổng thất bại.

## Kiểm tra giao diện trong worktree QA

~~~bash
node scripts/release-gate.mjs --mode local
~~~

Bao gồm toàn bộ bước Node, sau đó mở Chrome/Chromium bằng profile **tạm, cô lập** và kiểm thử website chạy trên loopback. Không can thiệp Edge Session 2. `BROWSER_BIN` có thể chỉ định trình duyệt độc lập; nếu không có Chromium, test sẽ FAIL, không tự đánh dấu PASS.

## Kiểm tra phát hành thực sự trên GitHub Pages

~~~bash
node scripts/release-gate.mjs --mode release
~~~

**Release mode là chế độ chỉ đọc.** Trước khi chạy, xác minh `origin` đúng repository chính, worktree sạch, nhánh `main` (hoặc detached HEAD trùng main), và SHA HEAD **khớp trực tiếp** `git ls-remote origin refs/heads/main`. Không dùng cache `origin/main` để kết luận remote đã push. Từ chối chạy nếu xác minh này không PASS.

Sau đó chạy các bài test Node, local browser, browser trên URL Pages công khai và `scripts/verify-pages.ps1 -Full` đối chiếu blob SHA từng file đã deploy. Cần PowerShell (Windows) hoặc pwsh (Unix) để chạy verifier; không thay đổi production.

## Xem trước kế hoạch, không chạy

~~~bash
node scripts/release-gate.mjs --mode release --plan
node scripts/test-release-gate.mjs
~~~

Script ghi JSON mới mỗi lần chạy vào `qa-evidence/release-gate-<mode>.json` (được `.gitignore`). File JSON ghi mode, SHA HEAD, từng cổng PASS/FAIL, thời điểm và thời lượng; **không tự động cam kết bằng chứng vào Git**. Chỉ đưa báo cáo lên repository sau khi rà soát và xác minh đúng phiên bản.

## Điều kiện báo cáo

Chỉ kết luận đợt phát hành PASS khi `--mode release` exit 0, GitHub Pages `BUILT`, HEAD trên GitHub đúng commit cần phát hành, và không còn blocker thuộc release scope. Cần báo riêng repository URL, branch, commit SHA, trạng thái PR/review/merge và production. **Merge không đồng nghĩa deploy.**

Giới hạn: đây là QA smoke/release integrity theo các cổng đã cấu hình; không thay thế đánh giá WCAG, bảo mật chuyên sâu, đúng nội dung học thuật hoặc thử nghiệm nhiều trình duyệt.

## Bảo đảm coverage khi thêm file mới

`--mode release` gọi `scripts/verify-pages.ps1 -Full`, giờ bao phủ **tất cả tệp Git-tracked**, không chỉ file điền tay. Bài `node scripts/test-release-gate.mjs` so sánh manifest Full với `git ls-files` (PowerShell bắt buộc trên Windows; có thể chạy cùng `pwsh` trên Unix). Có thể kiểm tra danh sách mà không mở trình duyệt hoặc truy cập mạng: `powershell -NoProfile -File scripts/verify-pages.ps1 -Full -ListOnly`. Mỗi đường dẫn phải nhận HTTP 200 và Git blob SHA đúng. Các file phục vụ công khai như `.gitignore` và `.nojekyll` cũng được kiểm tra; không commit bí mật vào repository công khai.
