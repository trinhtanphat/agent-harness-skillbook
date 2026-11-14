---
name: literature-protocol
description: "Định nghĩa cơ sở dữ liệu, truy vấn, tiêu chí chọn và phương pháp sàng lọc. Chỉ dùng khi yêu cầu liên quan đến thiết kế protocol tổng quan tài liệu."
---

# Thiết kế protocol tổng quan tài liệu

**Chuyên mục:** Research & PhD  
**Mức độ:** Trung cấp  
**Nguồn:** Tham khảo và biên soạn — https://www.prisma-statement.org/

## Khi nào sử dụng

Định nghĩa cơ sở dữ liệu, truy vấn, tiêu chí chọn và phương pháp sàng lọc.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Xác định review type và cơ sở dữ liệu.
2. Soạn chuỗi Boolean đa ngôn ngữ.
3. Công bố inclusion/exclusion và mốc thời gian.
4. Đăng ký protocol nếu phù hợp.
5. Chuẩn bị bảng quyết định có lý do loại.

## Kết quả phải bàn giao

Review protocol, search strings, screening rules.

## Bằng chứng nghiệm thu

- [ ] Có thể tái lập tìm kiếm.
- [ ] Không đổi tiêu chí theo kết quả không ghi chú.
- [ ] Ghi chính xác việc đã chạy thực tế và việc chưa kiểm chứng.
- [ ] Có nguồn, timestamp hoặc định danh artifact nếu có thay đổi.

## Giới hạn an toàn

- Chỉ thao tác với tài nguyên được cấp quyền; không vượt qua kiểm soát truy cập.
- Không xuất bản bí mật, token, dữ liệu cá nhân, khóa riêng hoặc nội dung có bản quyền khi chưa có phép.
- Thực hiện read-only trước, checkpoint trước write, giữ rollback cho thay đổi quan trọng.
- Không khẳng định hoàn tất 100% nếu các tiêu chí ở trên còn thiếu.

## Tham khảo

- https://www.prisma-statement.org/
- https://learn.chatgpt.com/docs/build-skills
