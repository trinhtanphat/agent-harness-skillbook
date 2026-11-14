---
name: mcp-observability
description: "Lập dashboard latency, error, retries, cache và auth-deny. Chỉ dùng khi yêu cầu liên quan đến theo dõi vận hành mcp và tỷ lệ lỗi."
---

# Theo dõi vận hành MCP và tỷ lệ lỗi

**Chuyên mục:** MCP & Integrations  
**Mức độ:** Nâng cao  
**Nguồn:** Tự biên soạn — https://opentelemetry.io/docs/

## Khi nào sử dụng

Lập dashboard latency, error, retries, cache và auth-deny.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Phân định trace/span giữa host/client/server.
2. Chỉ log metadata an toàn đã lọc.
3. Đặt SLI về success và p95.
4. Đánh dấu RBAC denial khác transport outage.
5. Bật alert theo ngưỡng và kiểm tra false positives.

## Kết quả phải bàn giao

Telemetry spec, runbook, alert matrix.

## Bằng chứng nghiệm thu

- [ ] Trace không chứa prompt bí mật.
- [ ] Có correlation ID xuyên suốt.
- [ ] Ghi chính xác việc đã chạy thực tế và việc chưa kiểm chứng.
- [ ] Có nguồn, timestamp hoặc định danh artifact nếu có thay đổi.

## Giới hạn an toàn

- Chỉ thao tác với tài nguyên được cấp quyền; không vượt qua kiểm soát truy cập.
- Không xuất bản bí mật, token, dữ liệu cá nhân, khóa riêng hoặc nội dung có bản quyền khi chưa có phép.
- Thực hiện read-only trước, checkpoint trước write, giữ rollback cho thay đổi quan trọng.
- Không khẳng định hoàn tất 100% nếu các tiêu chí ở trên còn thiếu.

## Tham khảo

- https://opentelemetry.io/docs/
- https://learn.chatgpt.com/docs/build-skills
