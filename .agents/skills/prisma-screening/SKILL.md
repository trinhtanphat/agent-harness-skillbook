---
name: prisma-screening
description: "Lập flow từ nhận diện đến full text và nghiên cứu đưa vào. Chỉ dùng khi yêu cầu liên quan đến sàng lọc và báo cáo prisma."
---

# Sàng lọc và báo cáo PRISMA

**Chuyên mục:** Research & PhD  
**Mức độ:** Trung cấp  
**Nguồn:** Tham khảo và biên soạn — https://www.prisma-statement.org/

## Khi nào sử dụng

Lập flow từ nhận diện đến full text và nghiên cứu đưa vào.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Tổng hợp số records theo nguồn.
2. Ghi số duplicate và số bị loại từng vòng.
3. Đánh giá title/abstract, rồi full-text.
4. Lưu lý do loại full text.
5. Kiểm tra phương trình số lượng PRISMA.

## Kết quả phải bàn giao

PRISMA flow, exclusion table, audit trail.

## Bằng chứng nghiệm thu

- [ ] Số lượng luôn cân đối.
- [ ] Không ghi full-text reviewed khi chưa đọc.
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
