---
name: pii-safe-knowledge-base
description: "Bảo vệ dữ liệu trong RAG bằng chính sách truy cập, data minimization và lọc đầu ra. Chỉ kích hoạt khi người dùng yêu cầu kiến thức có phân quyền và pii-safe."
license: MIT
---

# Kiến thức có phân quyền và PII-safe

**Chuyên mục:** Knowledge & RAG  
**Mức độ:** Nâng cao  
**Nguồn:** Tự biên soạn

## Khi nào dùng

Bảo vệ dữ liệu trong RAG bằng chính sách truy cập, data minimization và lọc đầu ra.

## Đầu vào

- Nhiệm vụ, kết quả đầu ra và phạm vi được phép.
- Hệ thống/tài liệu/source identifiers hoặc môi trường kiểm thử đã xác nhận.
- Tình trạng dữ liệu, người duyệt, thời hạn và tiêu chí nghiệm thu.

## Quy trình

1. Phân loại công khai, nội bộ, hạn chế và dữ liệu người tham gia.
2. Buộc authorization trước truy xuất và trước hiển thị chunk.
3. Xóa hoặc mask PII theo mục đích, có retention/deletion policy.
4. Kiểm thử cross-tenant leakage và prompt injection qua tài liệu.
5. Log bản ghi audit có ID nhưng không có raw sensitive prompts.

## Kết quả

Access policy, tenant isolation tests, retention spec.

## Bằng chứng nghiệm thu

- [ ] Không lộ chunk của tenant khác.
- [ ] Phương án xóa/thu hồi index đã kiểm chứng.
- [ ] Có nguồn, SHA hoặc thời gian cho các trạng thái đã xác minh.
- [ ] Việc chưa xác minh phải được ghi PARTIAL/BLOCKED thay vì PASS.

## Ví dụ yêu cầu

> Áp dụng skill `pii-safe-knowledge-base` cho một công việc được phép. Ghi phạm vi, bước thực hiện, bằng chứng, mức rủi ro và điều kiện kết thúc. Không thao tác với production ngoài phạm vi được phê duyệt.

## Giới hạn an toàn

- Chỉ xử lý tài nguyên được ủy quyền, không bypass đăng nhập/DRM/anti-bot hay hành động ngoài scope.
- Không ghi token, cookie, PII hoặc nội dung có bản quyền vào log/repo công khai.
- Chạy read-only trước; checkpoint trước thay đổi; backup/rollback khi có dữ liệu.
- Không tự tuyên bố thành công khi chỉ mới chạy tool hoặc có HTTP 200.

## Nguồn tham khảo

- https://owasp.org/www-project-top-10-for-large-language-model-applications/
- https://agentskills.io/specification
