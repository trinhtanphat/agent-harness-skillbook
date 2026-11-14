---
name: tool-schema-design
description: "Tạo input hợp lệ, output ít nhiễu và thao tác idempotent. Chỉ dùng khi yêu cầu liên quan đến thiết kế tool schema chống lỗi agent."
---

# Thiết kế tool schema chống lỗi agent

**Chuyên mục:** MCP & Integrations  
**Mức độ:** Trung cấp  
**Nguồn:** Tự biên soạn — https://modelcontextprotocol.io/

## Khi nào sử dụng

Tạo input hợp lệ, output ít nhiễu và thao tác idempotent.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Đặt tên tool theo động từ và phạm vi.
2. Giới hạn type, enum, size, timeout và retry.
3. Chuẩn hóa error code cùng correlation ID.
4. Có dry-run, expected version và idempotency key khi ghi.
5. Tạo contract tests cho malformed input.

## Kết quả phải bàn giao

JSON schemas, examples, contracts.

## Bằng chứng nghiệm thu

- [ ] Không cho phép arbitrary shell theo mặc định.
- [ ] Ghi chính xác việc đã chạy thực tế và việc chưa kiểm chứng.
- [ ] Có nguồn, timestamp hoặc định danh artifact nếu có thay đổi.

## Giới hạn an toàn

- Chỉ thao tác với tài nguyên được cấp quyền; không vượt qua kiểm soát truy cập.
- Không xuất bản bí mật, token, dữ liệu cá nhân, khóa riêng hoặc nội dung có bản quyền khi chưa có phép.
- Thực hiện read-only trước, checkpoint trước write, giữ rollback cho thay đổi quan trọng.
- Không khẳng định hoàn tất 100% nếu các tiêu chí ở trên còn thiếu.

## Tham khảo

- https://modelcontextprotocol.io/
- https://learn.chatgpt.com/docs/build-skills
