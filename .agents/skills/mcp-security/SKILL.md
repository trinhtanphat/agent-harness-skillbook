---
name: mcp-security
description: "Áp dụng least privilege, xác thực và phân quyền theo hành động. Chỉ dùng khi yêu cầu liên quan đến bảo mật mcp — oauth, rbac, capability."
---

# Bảo mật MCP: OAuth, RBAC, capability

**Chuyên mục:** MCP & Integrations  
**Mức độ:** Nâng cao  
**Nguồn:** Tham khảo và biên soạn — https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization

## Khi nào sử dụng

Áp dụng least privilege, xác thực và phân quyền theo hành động.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Lập principal-to-resource matrix.
2. Chọn OAuth/OIDC phù hợp transport và client.
3. Phân tách read/write/admin và scope.
4. Chống confused deputy, token exfiltration.
5. Test 401/403, replay, expiry và audit.

## Kết quả phải bàn giao

Threat model, RBAC matrix, negative tests.

## Bằng chứng nghiệm thu

- [ ] 403 không được coi là thành công.
- [ ] Không đưa token vào log.
- [ ] Ghi chính xác việc đã chạy thực tế và việc chưa kiểm chứng.
- [ ] Có nguồn, timestamp hoặc định danh artifact nếu có thay đổi.

## Giới hạn an toàn

- Chỉ thao tác với tài nguyên được cấp quyền; không vượt qua kiểm soát truy cập.
- Không xuất bản bí mật, token, dữ liệu cá nhân, khóa riêng hoặc nội dung có bản quyền khi chưa có phép.
- Thực hiện read-only trước, checkpoint trước write, giữ rollback cho thay đổi quan trọng.
- Không khẳng định hoàn tất 100% nếu các tiêu chí ở trên còn thiếu.

## Tham khảo

- https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization
- https://learn.chatgpt.com/docs/build-skills
