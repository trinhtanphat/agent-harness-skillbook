---
name: mcp-device-workflow
description: "Thiết kế orchestration remote computer giữ nguyên phiên người dùng. Chỉ dùng khi yêu cầu liên quan đến điều phối nhiều thiết bị không phá phiên đang dùng."
---

# Điều phối nhiều thiết bị không phá phiên đang dùng

**Chuyên mục:** MCP & Integrations  
**Mức độ:** Nâng cao  
**Nguồn:** Tự biên soạn — https://learn.chatgpt.com/docs/customization/overview

## Khi nào sử dụng

Thiết kế orchestration remote computer giữ nguyên phiên người dùng.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Kiểm tra online/identity/capabilities.
2. Tách job khỏi phiên GUI người dùng.
3. Dùng workspace được phép và sandbox.
4. Tạo checkpoint trước thay đổi hệ thống.
5. Xác minh phục hồi và chỉ đóng tiến trình thuộc job.

## Kết quả phải bàn giao

Device plan, session map, rollback steps.

## Bằng chứng nghiệm thu

- [ ] Không đóng tab/Session 2 nếu chưa được phép.
- [ ] Không đổi production chỉ để test.
- [ ] Ghi chính xác việc đã chạy thực tế và việc chưa kiểm chứng.
- [ ] Có nguồn, timestamp hoặc định danh artifact nếu có thay đổi.

## Giới hạn an toàn

- Chỉ thao tác với tài nguyên được cấp quyền; không vượt qua kiểm soát truy cập.
- Không xuất bản bí mật, token, dữ liệu cá nhân, khóa riêng hoặc nội dung có bản quyền khi chưa có phép.
- Thực hiện read-only trước, checkpoint trước write, giữ rollback cho thay đổi quan trọng.
- Không khẳng định hoàn tất 100% nếu các tiêu chí ở trên còn thiếu.

## Tham khảo

- https://learn.chatgpt.com/docs/customization/overview
- https://learn.chatgpt.com/docs/build-skills
