---
name: truthful-status
description: "Phân biệt code viết xong với hệ thống đã chạy và người dùng đã nghiệm thu. Chỉ dùng khi yêu cầu liên quan đến báo cáo tiến độ bằng bằng chứng đa tầng."
---

# Báo cáo tiến độ bằng bằng chứng đa tầng

**Chuyên mục:** Problem Solving  
**Mức độ:** Cơ bản  
**Nguồn:** Tự biên soạn — https://docs.github.com/en/pages

## Khi nào sử dụng

Phân biệt code viết xong với hệ thống đã chạy và người dùng đã nghiệm thu.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Ghi commit SHA, branch và artifact SHA.
2. Chạy test với môi trường ghi rõ.
3. Kiểm chứng staging trước production.
4. Đối chiếu runtime SHA, API, E2E và visual review.
5. Ghi blockers và bằng chứng còn thiếu.

## Kết quả phải bàn giao

Release scorecard, evidence links.

## Bằng chứng nghiệm thu

- [ ] Không dùng từ 100% nếu thiếu checklist scope.
- [ ] Ghi chính xác việc đã chạy thực tế và việc chưa kiểm chứng.
- [ ] Có nguồn, timestamp hoặc định danh artifact nếu có thay đổi.

## Giới hạn an toàn

- Chỉ thao tác với tài nguyên được cấp quyền; không vượt qua kiểm soát truy cập.
- Không xuất bản bí mật, token, dữ liệu cá nhân, khóa riêng hoặc nội dung có bản quyền khi chưa có phép.
- Thực hiện read-only trước, checkpoint trước write, giữ rollback cho thay đổi quan trọng.
- Không khẳng định hoàn tất 100% nếu các tiêu chí ở trên còn thiếu.

## Tham khảo

- https://docs.github.com/en/pages
- https://learn.chatgpt.com/docs/build-skills
