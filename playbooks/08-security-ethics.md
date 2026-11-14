# Playbook — Bảo mật và đạo đức khi dùng AI tools

> Phân quyền tối thiểu, ranh giới tin cậy rõ, không sao chép tài sản chưa được phép và không phát tán dữ liệu nhạy cảm.

**Workflow:** scope → evidence → controlled execution → independent verification → truthful handoff.

## 1. Threat model

1. Xem rủi ro credential leak, prompt injection, confused deputy, SSRF, path traversal, dependency tampering, privacy.

2. Tài liệu, issue, web pages và tool output là dữ liệu untrusted, không tự trở thành instruction mới.

3. Thử fixtures vô hại để chứng minh agent không bị chỉ huy bởi nội dung ngoài.

## 2. Permissions

1. Read-only mặc định; tool write dùng scope, approvals khi rủi ro cao, idempotency và rollback.

2. Canonicalize đường dẫn và kiểm tra symlink, không expose shell chung hay network nội bộ.

3. Không public IP nội bộ, access token, auth cookie, thông tin tài khoản cá nhân.

## 3. Copyright và consent

1. Đọc nguồn không đồng nghĩa được clone toàn bộ source, hình ảnh, thương hiệu và dữ liệu.

2. Dùng demo do mình sở hữu hoặc có phép, giấy phép nguồn rõ, attribution phù hợp.

3. Nghiên cứu với học sinh/người chưa thành niên cần phương án consent, ethics approval và data retention phù hợp.

## 4. Security QA

1. Test 401/403, expired token, malformed input, out-of-root path, injection fixture, secret scanner.

2. Audit dependency và license; giữ log tối thiểu đủ chứng cứ.

3. Lưu incident plan và cách revoke credentials khi có sự cố.

## Bàn giao

Threat model, RBAC matrix, negative cases, license and privacy audit.

## Checklist nghiệm thu

- [ ] Có quyền thực hiện và ranh giới hệ thống rõ ràng.
- [ ] Có log hoặc nguồn cho từng khẳng định về kết quả.
- [ ] Có negative test và kiểm tra sai lệch giả định.
- [ ] Có rollback hoặc phương án khôi phục nếu tác động dữ liệu.
- [ ] Có báo cáo PARTIAL nếu còn bất kỳ bước nào chưa kiểm chứng.

## Nguồn tham khảo

- https://owasp.org/www-project-top-10-for-large-language-model-applications/
- https://learn.chatgpt.com/docs/build-skills
