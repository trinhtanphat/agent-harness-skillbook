---
name: scientific-debugging
description: "Không sửa mò; tiến hành quan sát, giả thuyết, thử nghiệm và kết luận. Chỉ dùng khi yêu cầu liên quan đến gỡ lỗi theo giả thuyết có thể bác bỏ."
---

# Gỡ lỗi theo giả thuyết có thể bác bỏ

**Chuyên mục:** Problem Solving  
**Mức độ:** Cơ bản  
**Nguồn:** Tự biên soạn — https://www.nist.gov/itl/ai-risk-management-framework

## Khi nào sử dụng

Không sửa mò; tiến hành quan sát, giả thuyết, thử nghiệm và kết luận.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Định nghĩa expected vs actual và cách tái hiện.
2. Thu thập log, config, diff và mốc thời gian.
3. Đưa ít nhất hai giả thuyết thay thế.
4. Thiết kế phép thử phân biệt các giả thuyết.
5. Chỉ sửa sau khi đủ bằng chứng; regression sau sửa.

## Kết quả phải bàn giao

Repro steps, hypotheses, test evidence, fix.

## Bằng chứng nghiệm thu

- [ ] Không thay đổi nhiều biến trong một phép thử.
- [ ] Ghi chính xác việc đã chạy thực tế và việc chưa kiểm chứng.
- [ ] Có nguồn, timestamp hoặc định danh artifact nếu có thay đổi.

## Giới hạn an toàn

- Chỉ thao tác với tài nguyên được cấp quyền; không vượt qua kiểm soát truy cập.
- Không xuất bản bí mật, token, dữ liệu cá nhân, khóa riêng hoặc nội dung có bản quyền khi chưa có phép.
- Thực hiện read-only trước, checkpoint trước write, giữ rollback cho thay đổi quan trọng.
- Không khẳng định hoàn tất 100% nếu các tiêu chí ở trên còn thiếu.

## Tham khảo

- https://www.nist.gov/itl/ai-risk-management-framework
- https://learn.chatgpt.com/docs/build-skills
