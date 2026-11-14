# Playbook — Thiết kế MCP và điều phối thiết bị

> Hiểu host, MCP client, server, tools, resources, prompts và trust boundary; kết nối không có nghĩa tự động có quyền truy cập toàn máy.

**Workflow:** scope → evidence → controlled execution → independent verification → truthful handoff.

## 1. Architecture

1. Host như ChatGPT hoặc Codex sử dụng client; client giao tiếp MCP server cục bộ qua stdio hoặc remote qua Streamable HTTP khi được hỗ trợ.

2. Tools thực hiện hành động; Resources cung cấp dữ liệu; Prompts cung cấp mẫu tương tác.

3. Mỗi server, device và tool phải có quyền riêng.

## 2. Tool contract

1. Định nghĩa input schema chặt, enum, maxLength, required, additionalProperties=false.

2. Output có status, error code, correlation ID; giới hạn bytes, timeout, concurrency và retries.

3. Cho write dùng optimistic concurrency và idempotency; không cho arbitrary shell theo mặc định.

## 3. Authentication và Authorization

1. Phân biệt xác thực ai, phân quyền hành động nào, trên resource nào, vào thời điểm nào.

2. Kết hợp OAuth/scope khi phù hợp HTTP transport; local stdio giữ credential qua env với cách bảo vệ hợp lệ.

3. 403 phải ghi DENIED cùng principal, action, policy; không tự tăng quyền để tránh lỗi.

## 4. Remote operations

1. Discovery thiết bị online, pin device id, giữ phiên GUI người dùng và production hiện có.

2. Kiểm tra disk, process, lock, network, runtime version theo read-only trước khi write.

3. Tạo workspace riêng, checkpoint, rollback; chú ý SSRF, path traversal, symlink và secret leakage.

## Bàn giao

Tool matrix, permissions/RBAC, test 401/403, tracing, rollback playbook.

## Checklist nghiệm thu

- [ ] Có quyền thực hiện và ranh giới hệ thống rõ ràng.
- [ ] Có log hoặc nguồn cho từng khẳng định về kết quả.
- [ ] Có negative test và kiểm tra sai lệch giả định.
- [ ] Có rollback hoặc phương án khôi phục nếu tác động dữ liệu.
- [ ] Có báo cáo PARTIAL nếu còn bất kỳ bước nào chưa kiểm chứng.

## Nguồn tham khảo

- https://modelcontextprotocol.io/
- https://learn.chatgpt.com/docs/build-skills
