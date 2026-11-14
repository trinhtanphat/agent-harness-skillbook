---
name: mcp-architecture
description: "Phân biệt host, client, server, tools, resources, prompts và transport. Chỉ dùng khi yêu cầu liên quan đến hiểu kiến trúc mcp từ host đến tool."
---

# Hiểu kiến trúc MCP từ host đến tool

**Chuyên mục:** MCP & Integrations  
**Mức độ:** Cơ bản  
**Nguồn:** Tham khảo và biên soạn — https://modelcontextprotocol.io/

## Khi nào sử dụng

Phân biệt host, client, server, tools, resources, prompts và transport.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Xác định host và ranh giới tin cậy.
2. Liệt kê tools/resources/prompts cần thiết.
3. Chọn local stdio hoặc remote Streamable HTTP.
4. Xác định auth và permission cho từng action.
5. Đo thử thời gian, lỗi và tracing.

## Kết quả phải bàn giao

MCP architecture diagram, capability map.

## Bằng chứng nghiệm thu

- [ ] Không để tool đọc/ghi vượt phạm vi yêu cầu.
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
