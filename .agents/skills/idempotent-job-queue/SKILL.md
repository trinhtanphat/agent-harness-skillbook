---
name: idempotent-job-queue
description: "Thiết kế xử lý có thể retry mà không tạo đơn hàng hoặc ghi dữ liệu trùng. Chỉ kích hoạt khi người dùng yêu cầu hàng đợi xử lý đúng một lần theo nghiệp vụ."
license: MIT
---

# Hàng đợi xử lý đúng một lần theo nghiệp vụ

**Chuyên mục:** Data & Automation  
**Mức độ:** Nâng cao  
**Nguồn:** Tự biên soạn

## Khi nào dùng

Thiết kế xử lý có thể retry mà không tạo đơn hàng hoặc ghi dữ liệu trùng.

## Đầu vào

- Nhiệm vụ, kết quả đầu ra và phạm vi được phép.
- Hệ thống/tài liệu/source identifiers hoặc môi trường kiểm thử đã xác nhận.
- Tình trạng dữ liệu, người duyệt, thời hạn và tiêu chí nghiệm thu.

## Quy trình

1. Tách at-least-once delivery khỏi business exactly-once effects.
2. Tạo idempotency key, unique constraint, transaction boundary và dedupe window.
3. Ghi trạng thái pending, running, succeeded, failed và dead-letter.
4. Thử duplicate webhook, concurrent workers, process crash và delayed retries.
5. Đối chiếu số receipt/side-effect với số unique business operations.

## Kết quả

Queue state machine, concurrency tests, receipt reconciliation.

## Bằng chứng nghiệm thu

- [ ] Không có side effect trùng trong các ca retry.
- [ ] Có đường xử lý message không thể phục hồi.
- [ ] Có nguồn, SHA hoặc thời gian cho các trạng thái đã xác minh.
- [ ] Việc chưa xác minh phải được ghi PARTIAL/BLOCKED thay vì PASS.

## Ví dụ yêu cầu

> Áp dụng skill `idempotent-job-queue` cho một công việc được phép. Ghi phạm vi, bước thực hiện, bằng chứng, mức rủi ro và điều kiện kết thúc. Không thao tác với production ngoài phạm vi được phê duyệt.

## Giới hạn an toàn

- Chỉ xử lý tài nguyên được ủy quyền, không bypass đăng nhập/DRM/anti-bot hay hành động ngoài scope.
- Không ghi token, cookie, PII hoặc nội dung có bản quyền vào log/repo công khai.
- Chạy read-only trước; checkpoint trước thay đổi; backup/rollback khi có dữ liệu.
- Không tự tuyên bố thành công khi chỉ mới chạy tool hoặc có HTTP 200.

## Nguồn tham khảo

- https://www.postgresql.org/docs/current/transaction-iso.html
- https://agentskills.io/specification
