---
name: reconstruct-ui
description: "Dựng lại chức năng và bố cục từ đặc tả, không sao chép mã độc quyền. Chỉ dùng khi yêu cầu liên quan đến tái dựng giao diện responsive bằng đặc tả."
---

# Tái dựng giao diện responsive bằng đặc tả

**Chuyên mục:** Crawl & App Reconstruction  
**Mức độ:** Trung cấp  
**Nguồn:** Tự biên soạn — https://www.w3.org/TR/WCAG22/

## Khi nào sử dụng

Dựng lại chức năng và bố cục từ đặc tả, không sao chép mã độc quyền.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Tạo token màu, typography, spacing và grid.
2. Xây component map có trạng thái.
3. Thiết kế breakpoint và a11y.
4. Dùng tài sản được cấp phép hoặc tự tạo.
5. So sánh screenshot ở viewport cố định.

## Kết quả phải bàn giao

Design tokens, UI components, screenshots.

## Bằng chứng nghiệm thu

- [ ] Không còn text overflow và lỗi tương tác.
- [ ] Đạt keyboard navigation cơ bản.
- [ ] Ghi chính xác việc đã chạy thực tế và việc chưa kiểm chứng.
- [ ] Có nguồn, timestamp hoặc định danh artifact nếu có thay đổi.

## Giới hạn an toàn

- Chỉ thao tác với tài nguyên được cấp quyền; không vượt qua kiểm soát truy cập.
- Không xuất bản bí mật, token, dữ liệu cá nhân, khóa riêng hoặc nội dung có bản quyền khi chưa có phép.
- Thực hiện read-only trước, checkpoint trước write, giữ rollback cho thay đổi quan trọng.
- Không khẳng định hoàn tất 100% nếu các tiêu chí ở trên còn thiếu.

## Tham khảo

- https://www.w3.org/TR/WCAG22/
- https://learn.chatgpt.com/docs/build-skills
