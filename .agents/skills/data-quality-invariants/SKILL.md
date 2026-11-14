---
name: data-quality-invariants
description: "Ngăn pipeline âm thầm sai dữ liệu qua constraints và kiểm tra thay đổi. Chỉ kích hoạt khi người dùng yêu cầu xác minh dữ liệu bằng bất biến."
license: MIT
---

# Xác minh dữ liệu bằng bất biến

**Chuyên mục:** Data & Automation  
**Mức độ:** Trung cấp  
**Nguồn:** Tự biên soạn

## Khi nào dùng

Ngăn pipeline âm thầm sai dữ liệu qua constraints và kiểm tra thay đổi.

## Đầu vào

- Nhiệm vụ, kết quả đầu ra và phạm vi được phép.
- Hệ thống/tài liệu/source identifiers hoặc môi trường kiểm thử đã xác nhận.
- Tình trạng dữ liệu, người duyệt, thời hạn và tiêu chí nghiệm thu.

## Quy trình

1. Ghi uniqueness, nullability, foreign keys, range và monotonicity expectations.
2. Tạo sample data và negative fixtures bao gồm Unicode, timezones và duplicate.
3. Chạy pre/post validation và quarantine bản ghi bất thường.
4. Phân biệt dữ liệu chậm đến với bản ghi lỗi; không tự xóa bản gốc.
5. Lưu anomaly counts, phân phối và lineage qua từng bước.

## Kết quả

Data contract, invariant suite, anomaly dashboard.

## Bằng chứng nghiệm thu

- [ ] Không có silent drop trong data pipeline.
- [ ] Có dữ liệu reconciliation/source counts.
- [ ] Có nguồn, SHA hoặc thời gian cho các trạng thái đã xác minh.
- [ ] Việc chưa xác minh phải được ghi PARTIAL/BLOCKED thay vì PASS.

## Ví dụ yêu cầu

> Áp dụng skill `data-quality-invariants` cho một công việc được phép. Ghi phạm vi, bước thực hiện, bằng chứng, mức rủi ro và điều kiện kết thúc. Không thao tác với production ngoài phạm vi được phê duyệt.

## Giới hạn an toàn

- Chỉ xử lý tài nguyên được ủy quyền, không bypass đăng nhập/DRM/anti-bot hay hành động ngoài scope.
- Không ghi token, cookie, PII hoặc nội dung có bản quyền vào log/repo công khai.
- Chạy read-only trước; checkpoint trước thay đổi; backup/rollback khi có dữ liệu.
- Không tự tuyên bố thành công khi chỉ mới chạy tool hoặc có HTTP 200.

## Nguồn tham khảo

- https://opentelemetry.io/docs/
- https://agentskills.io/specification
