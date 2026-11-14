---
name: resilient-scheduler
description: "Làm job định kỳ đáng tin cậy với distributed lock, checkpoint, retry và trạng thái có thể kiểm toán. Chỉ kích hoạt khi người dùng yêu cầu thiết kế lịch tự động có recovery."
license: MIT
---

# Thiết kế lịch tự động có recovery

**Chuyên mục:** Data & Automation  
**Mức độ:** Nâng cao  
**Nguồn:** Tự biên soạn

## Khi nào dùng

Làm job định kỳ đáng tin cậy với distributed lock, checkpoint, retry và trạng thái có thể kiểm toán.

## Đầu vào

- Nhiệm vụ, kết quả đầu ra và phạm vi được phép.
- Hệ thống/tài liệu/source identifiers hoặc môi trường kiểm thử đã xác nhận.
- Tình trạng dữ liệu, người duyệt, thời hạn và tiêu chí nghiệm thu.

## Quy trình

1. Ghi recurrence và timezone, xử lý DST và trùng lịch.
2. Định nghĩa run_id, idempotency key, lease lock, timeout và heartbeat.
3. Retry exponential backoff với jitter, không retry vĩnh viễn lỗi RBAC.
4. Ghi SUCCESS/PARTIAL/FAILED cùng proof và last-good checkpoint.
5. Có dead-letter queue hoặc manual intervention cho sự cố kéo dài.

## Kết quả

Runbook, scheduler state schema, recovery tests.

## Bằng chứng nghiệm thu

- [ ] Không chạy đồng thời các job ghi cùng tài nguyên.
- [ ] Không bỏ sót lỗi quyền truy cập.
- [ ] Có nguồn, SHA hoặc thời gian cho các trạng thái đã xác minh.
- [ ] Việc chưa xác minh phải được ghi PARTIAL/BLOCKED thay vì PASS.

## Ví dụ yêu cầu

> Áp dụng skill `resilient-scheduler` cho một công việc được phép. Ghi phạm vi, bước thực hiện, bằng chứng, mức rủi ro và điều kiện kết thúc. Không thao tác với production ngoài phạm vi được phê duyệt.

## Giới hạn an toàn

- Chỉ xử lý tài nguyên được ủy quyền, không bypass đăng nhập/DRM/anti-bot hay hành động ngoài scope.
- Không ghi token, cookie, PII hoặc nội dung có bản quyền vào log/repo công khai.
- Chạy read-only trước; checkpoint trước thay đổi; backup/rollback khi có dữ liệu.
- Không tự tuyên bố thành công khi chỉ mới chạy tool hoặc có HTTP 200.

## Nguồn tham khảo

- https://opentelemetry.io/docs/
- https://agentskills.io/specification
