---
name: agent-operating-loop
description: "Biến yêu cầu mở thành kế hoạch có đầu ra, bằng chứng và giới hạn quyền. Chỉ dùng khi yêu cầu liên quan đến vòng lặp agent có kiểm soát."
---

# Vòng lặp agent có kiểm soát

**Chuyên mục:** Agent Harness & Skills  
**Mức độ:** Cơ bản  
**Nguồn:** Tự biên soạn — https://learn.chatgpt.com/docs/customization/overview

## Khi nào sử dụng

Biến yêu cầu mở thành kế hoạch có đầu ra, bằng chứng và giới hạn quyền.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Xác định mục tiêu và điều kiện kết thúc.
2. Liệt kê công cụ có quyền truy cập thực tế.
3. Thu thập bằng chứng trước thay đổi.
4. Thực hiện theo bước nhỏ có checkpoint.
5. Đối chiếu bằng chứng và báo cáo phần chưa xong.

## Kết quả phải bàn giao

Bảng mục tiêu, nhật ký công cụ, checklist nghiệm thu.

## Bằng chứng nghiệm thu

- [ ] Không có lời khẳng định thành công thiếu chứng cứ.
- [ ] Thay đổi ngoài phạm vi phải được ngăn.
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
