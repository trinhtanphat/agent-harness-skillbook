---
name: harness-routing
description: "Dùng công cụ nào cho web, file, mã nguồn, máy tính hoặc dịch vụ từ xa. Chỉ dùng khi yêu cầu liên quan đến chọn công cụ theo năng lực và bằng chứng."
---

# Chọn công cụ theo năng lực và bằng chứng

**Chuyên mục:** Agent Harness & Skills  
**Mức độ:** Trung cấp  
**Nguồn:** Tự biên soạn — https://learn.chatgpt.com/docs/customization/overview

## Khi nào sử dụng

Dùng công cụ nào cho web, file, mã nguồn, máy tính hoặc dịch vụ từ xa.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Phân loại nguồn dữ liệu công khai hay riêng tư.
2. Kiểm tra quyền và khả dụng từng connector.
3. Chọn công cụ chuyên dụng thay vì suy đoán.
4. Chặn công cụ ghi khi chỉ cần đọc.
5. Ghi nguồn và kết quả kiểm chứng.

## Kết quả phải bàn giao

Sơ đồ định tuyến tools và ma trận quyền.

## Bằng chứng nghiệm thu

- [ ] Đúng nguồn dữ liệu.
- [ ] Không dùng web thay cho tài liệu riêng tư.
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
