---
name: operational-observability
description: "Theo dõi tiến trình nhiều service bằng metrics, traces và logs có correlation ID. Chỉ kích hoạt khi người dùng yêu cầu slo, tracing và alert có ý nghĩa."
license: MIT
---

# SLO, tracing và alert có ý nghĩa

**Chuyên mục:** Data & Automation  
**Mức độ:** Trung cấp  
**Nguồn:** Tự biên soạn

## Khi nào dùng

Theo dõi tiến trình nhiều service bằng metrics, traces và logs có correlation ID.

## Đầu vào

- Nhiệm vụ, kết quả đầu ra và phạm vi được phép.
- Hệ thống/tài liệu/source identifiers hoặc môi trường kiểm thử đã xác nhận.
- Tình trạng dữ liệu, người duyệt, thời hạn và tiêu chí nghiệm thu.

## Quy trình

1. Đặt user-facing SLI như availability, latency, error và freshness.
2. Chuẩn hóa trace context, event severity, span name và sanitized attributes.
3. Xây dashboard p50/p95, errors theo loại, job lag và deploy version.
4. Phân biệt auth-deny với outage, đặt alert dựa trên error budgets.
5. Chạy kiểm tra alert và postmortem chống false-positive fatigue.

## Kết quả

SLI/SLO definitions, instrumentation map, alert runbook.

## Bằng chứng nghiệm thu

- [ ] Không lộ secrets và PII trong traces.
- [ ] Alert liên kết với hành động xử lý được.
- [ ] Có nguồn, SHA hoặc thời gian cho các trạng thái đã xác minh.
- [ ] Việc chưa xác minh phải được ghi PARTIAL/BLOCKED thay vì PASS.

## Ví dụ yêu cầu

> Áp dụng skill `operational-observability` cho một công việc được phép. Ghi phạm vi, bước thực hiện, bằng chứng, mức rủi ro và điều kiện kết thúc. Không thao tác với production ngoài phạm vi được phê duyệt.

## Giới hạn an toàn

- Chỉ xử lý tài nguyên được ủy quyền, không bypass đăng nhập/DRM/anti-bot hay hành động ngoài scope.
- Không ghi token, cookie, PII hoặc nội dung có bản quyền vào log/repo công khai.
- Chạy read-only trước; checkpoint trước thay đổi; backup/rollback khi có dữ liệu.
- Không tự tuyên bố thành công khi chỉ mới chạy tool hoặc có HTTP 200.

## Nguồn tham khảo

- https://opentelemetry.io/docs/
- https://agentskills.io/specification
