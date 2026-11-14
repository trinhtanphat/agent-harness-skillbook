---
name: mcp-server
description: "Xây MCP server với tool schema rõ, phản hồi có cấu trúc và error handling. Chỉ dùng khi yêu cầu liên quan đến thiết kế mcp server tối giản."
---

# Thiết kế MCP server tối giản

**Chuyên mục:** MCP & Integrations  
**Mức độ:** Trung cấp  
**Nguồn:** Tham khảo và biên soạn — https://modelcontextprotocol.io/

## Khi nào sử dụng

Xây MCP server với tool schema rõ, phản hồi có cấu trúc và error handling.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Lựa chọn SDK chính thức và khóa version.
2. Định nghĩa input schema chặt.
3. Kiểm tra quyền tại server cho từng tool.
4. Chống path traversal và SSRF.
5. Viết test happy/denied/timeout và log redacted.

## Kết quả phải bàn giao

Server skeleton, tool contracts, test fixtures.

## Bằng chứng nghiệm thu

- [ ] Không hardcode API key.
- [ ] Đường dẫn ngoài allowlist bị từ chối.
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
