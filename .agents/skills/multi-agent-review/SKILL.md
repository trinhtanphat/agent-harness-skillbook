---
name: multi-agent-review
description: "Chia việc độc lập để tăng tốc mà không gây tranh chấp branch hoặc tệp. Chỉ dùng khi yêu cầu liên quan đến điều phối nhiều agent và phản biện độc lập."
---

# Điều phối nhiều agent và phản biện độc lập

**Chuyên mục:** Agent Harness & Skills  
**Mức độ:** Nâng cao  
**Nguồn:** Tự biên soạn — https://learn.chatgpt.com/docs/customization/overview

## Khi nào sử dụng

Chia việc độc lập để tăng tốc mà không gây tranh chấp branch hoặc tệp.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Chọn các phần việc có ranh giới độc lập.
2. Mỗi agent có workspace và mục tiêu rõ.
3. Cấm cùng sửa tệp khi chưa phối hợp.
4. Tổng hợp theo ma trận evidence.
5. Review chéo và chạy regression hợp nhất.

## Kết quả phải bàn giao

Worktree plan, review findings, integrated report.

## Bằng chứng nghiệm thu

- [ ] Không có ghi đè cạnh tranh.
- [ ] Chỉ merge sau test hợp nhất.
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
