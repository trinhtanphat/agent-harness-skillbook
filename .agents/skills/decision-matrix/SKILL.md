---
name: decision-matrix
description: "Chọn phương án tối ưu khi thời gian, chi phí và độ tin cậy xung đột. Chỉ dùng khi yêu cầu liên quan đến đánh giá phương án bằng ma trận rủi ro."
---

# Đánh giá phương án bằng ma trận rủi ro

**Chuyên mục:** Problem Solving  
**Mức độ:** Trung cấp  
**Nguồn:** Tự biên soạn — https://www.nist.gov/itl/ai-risk-management-framework

## Khi nào sử dụng

Chọn phương án tối ưu khi thời gian, chi phí và độ tin cậy xung đột.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Đặt tiêu chí và trọng số minh bạch.
2. Định nghĩa baseline và phương án tối thiểu.
3. Ước lượng tác động cùng độ bất định.
4. Chạy sensitivity analysis.
5. Ghi quyết định, giả định và điểm xét lại.

## Kết quả phải bàn giao

ADR, scoring matrix, decision log.

## Bằng chứng nghiệm thu

- [ ] Tránh ngụy chính xác khi thiếu dữ liệu.
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
