---
name: author-skill
description: "Tạo skill đơn nhiệm vụ với metadata, trigger, quy trình và kiểm thử. Chỉ dùng khi yêu cầu liên quan đến viết skill.md đúng chuẩn."
---

# Viết SKILL.md đúng chuẩn

**Chuyên mục:** Agent Harness & Skills  
**Mức độ:** Cơ bản  
**Nguồn:** Tham khảo và biên soạn — https://learn.chatgpt.com/docs/build-skills

## Khi nào sử dụng

Tạo skill đơn nhiệm vụ với metadata, trigger, quy trình và kiểm thử.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Định nghĩa một nhiệm vụ và trường hợp kích hoạt.
2. Viết frontmatter name và description rõ ràng.
3. Thêm Input, Steps, Verification, Safety.
4. Đặt vào .agents/skills/skill-name/SKILL.md.
5. Thử prompt kích hoạt và prompt không phù hợp.

## Kết quả phải bàn giao

SKILL.md tái sử dụng và test kích hoạt.

## Bằng chứng nghiệm thu

- [ ] Frontmatter hợp lệ.
- [ ] Không chứa token hay thông tin nhạy cảm.
- [ ] Ghi chính xác việc đã chạy thực tế và việc chưa kiểm chứng.
- [ ] Có nguồn, timestamp hoặc định danh artifact nếu có thay đổi.

## Giới hạn an toàn

- Chỉ thao tác với tài nguyên được cấp quyền; không vượt qua kiểm soát truy cập.
- Không xuất bản bí mật, token, dữ liệu cá nhân, khóa riêng hoặc nội dung có bản quyền khi chưa có phép.
- Thực hiện read-only trước, checkpoint trước write, giữ rollback cho thay đổi quan trọng.
- Không khẳng định hoàn tất 100% nếu các tiêu chí ở trên còn thiếu.

## Tham khảo

- https://learn.chatgpt.com/docs/build-skills
- https://learn.chatgpt.com/docs/build-skills
