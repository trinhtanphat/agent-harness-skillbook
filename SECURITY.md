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
