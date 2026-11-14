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
