# AGENTS.md — Agent Harness Skillbook

## Phạm vi

Repo này là thư viện kỹ năng và GitHub Pages tĩnh. **Không kết nối tới các hệ thống production**, không lưu credential hoặc dữ liệu nhạy cảm. Chỉ chỉnh sửa repo này trừ khi có yêu cầu riêng.

## Quy tắc

- Skill phải có frontmatter `name` và `description`, phạm vi đơn nhiệm vụ, input/output và verification.
- Giữ nguồn trích dẫn/attribution; không sao chép nguyên văn tư liệu có bản quyền.
- Không claim đã chạy lệnh/test/deploy nếu không có output kiểm chứng.
- Tránh mọi GitHub Actions (kiểm thử bằng Node trên máy local hoặc máy được cấp phép).
- Không chèn network SDK, analytics, trackers hoặc hình ảnh từ bên thứ ba vào GitHub Pages.
- Ưu tiên relative URLs để site chạy dưới path `/agent-harness-skillbook/`.

## Kiểm thử

```bash
node --check assets/app.js
node --check data/catalog.js
node scripts/validate.mjs
```

## Hợp nhất

Chỉ merge thay đổi sau khi kiểm tra cấu trúc, liên kết nội bộ, khả năng tìm kiếm/filter và responsive. Cấm commit `.env`, khóa và dữ liệu người dùng.
