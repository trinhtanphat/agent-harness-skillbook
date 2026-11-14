---
name: accessible-web
description: "Duy trì UX tốt trên keyboard, mobile và screen reader. Chỉ dùng khi yêu cầu liên quan đến kiểm toán accessibility và responsive."
---

# Kiểm toán accessibility và responsive

**Chuyên mục:** QA, Security & Delivery  
**Mức độ:** Trung cấp  
**Nguồn:** Tham khảo và biên soạn — https://www.w3.org/TR/WCAG22/

## Khi nào sử dụng

Duy trì UX tốt trên keyboard, mobile và screen reader.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Dùng semantic HTML và labels.
2. Kiểm tra contrast và focus visible.
3. Test keyboard-only và reduced motion.
4. Chụp ở viewport 390px, 768px, 1440px.
5. Dùng axe/manual review với vấn đề được ghi nhận.

## Kết quả phải bàn giao

A11y report, mobile screenshots, fixes.

## Bằng chứng nghiệm thu

- [ ] Không coi tự động PASS là đủ WCAG.
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
