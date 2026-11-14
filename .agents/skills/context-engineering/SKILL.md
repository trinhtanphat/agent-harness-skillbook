---
name: context-engineering
description: "Giữ được ràng buộc dài hạn mà không để ngữ cảnh cũ lấn át bằng chứng mới. Chỉ dùng khi yêu cầu liên quan đến quản trị context, memory và handoff."
---

# Quản trị context, memory và handoff

**Chuyên mục:** Agent Harness & Skills  
**Mức độ:** Trung cấp  
**Nguồn:** Tự biên soạn — https://learn.chatgpt.com/docs/customization/overview

## Khi nào sử dụng

Giữ được ràng buộc dài hạn mà không để ngữ cảnh cũ lấn át bằng chứng mới.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Tách user intent, policy, evidence và assumption.
2. Tóm tắt state bằng file checkpoint.
3. Gắn timestamp và nguồn cho mỗi fact.
4. Chuyển giao qua handoff ngắn, đủ đường dẫn và trạng thái.
5. Xóa thông tin mật và đánh dấu dữ liệu hết hạn.

## Kết quả phải bàn giao

Checkpoint, handoff.md, evidence ledger.

## Bằng chứng nghiệm thu

- [ ] Không gán suy luận thành thực tế.
- [ ] Không lộ PII trong log.
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
