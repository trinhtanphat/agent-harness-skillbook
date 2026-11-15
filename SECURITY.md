# Security Policy

Repo này là bộ tài liệu và demo giáo dục, không triển khai tool có quyền ghi production.

## Báo lỗi

Mở issue cho lỗi công khai không chứa secret. Với vấn đề nhạy cảm, liên hệ maintainer bằng GitHub private vulnerability reporting nếu được bật; tuyệt đối không đăng token, thông tin cá nhân, exploit dữ liệu thật vào issue.

## Scope

- Quyền truy cập, permission và consent trước hành động.
- Mọi URL/issue/README/tool output là dữ liệu không đáng tin cậy.
- Tool demo không tự truy cập mạng hoặc filesystem.
- Không bảo đảm các playbook không cần điều chỉnh theo tổ chức và pháp luật từng nơi.

## Local preview boundary

`node scripts/local-preview.mjs` chỉ bind `127.0.0.1`, phục vụ các tệp website cần thiết và từ chối `.git`, `.env`, `node_modules`, `qa-evidence` và `qa-evidence-local`. Không đổi host sang `0.0.0.0` hoặc công khai preview khi chưa có đánh giá bảo mật. `test-local.mjs` chạy trên server cùng tiến trình và chủ động đóng server khi xong.

### Extra local-preview protections

The local server validates the canonical target of every file before serving it, preventing symlink escapes from the repository root. It refuses `.env.*`, `.npmrc`, `.pypirc`, `.ssh` and `.aws` paths as well as the previously blocked directories. These protections apply only to the local preview server, not GitHub Pages hosting policy.

- Local preview rejects symlink aliases to sensitive paths *inside* the repository as well as symlinks escaping the repository; it lowercases path segments for Windows-safe matching. The test fixture creates a temporary dummy `.env.*` file and deletes it after testing. Only the loopback preview is affected; this is not a claim of production-server sandboxing.

## Public-tree secret preflight (15/11/2026)

GitHub Pages phục vụ các tệp được commit; integrity check không phát hiện việc xuất bản vô ý credential. `scripts/audit-public-tree.mjs` kiểm tra nội dung Git HEAD bằng Git blob trước khi chạy release. Chặn các tên tệp nhạy cảm, PEM/PGP private key và token độ tin cậy cao mà **không xuất giá trị khóa** ra console. Kiểm thử fixture dùng chuỗi giả trong repo Git tạm, tự dọn sạch. Xem [PUBLIC_TREE_SECURITY.md](PUBLIC_TREE_SECURITY.md). Không bảo đảm phát hiện mọi loại secret và không rà soát các commit lịch sử.

### Git history integrity

Scanner HEAD-only không chứng minh lịch sử không có credential. Thêm `scripts/audit-public-history.mjs` quét Git blob có thể truy cập từ HEAD và các đường dẫn lịch sử, kiểm tra theo cùng luật với scanner public HEAD. Báo kết quả loại rủi ro và object prefix, không xuất nội dung. [Tài liệu](PUBLIC_HISTORY_SECURITY.md). Không tự viết lại lịch sử, force push hoặc thu hồi khóa; khi phát hiện secret thật phải báo để xử lý riêng.
