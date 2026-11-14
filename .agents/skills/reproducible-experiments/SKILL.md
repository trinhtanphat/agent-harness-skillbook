---
name: reproducible-experiments
description: "Tái hiện lỗi, đo lường hoặc giả thuyết trên dữ liệu độc lập. Chỉ dùng khi yêu cầu liên quan đến thiết kế thí nghiệm tái lập được."
---

# Thiết kế thí nghiệm tái lập được

**Chuyên mục:** Problem Solving  
**Mức độ:** Trung cấp  
**Nguồn:** Tự biên soạn — https://playwright.dev/docs/intro

## Khi nào sử dụng

Tái hiện lỗi, đo lường hoặc giả thuyết trên dữ liệu độc lập.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Cố định version, seed, locale và môi trường.
2. Lưu input fixtures và command tái lập.
3. Chạy kiểm chứng với positive/negative control.
4. Lưu metrics và artifacts.
5. Đọc lại từ máy/tài khoản khác nếu phù hợp.

## Kết quả phải bàn giao

Reproduction kit, checksums, result table.

## Bằng chứng nghiệm thu

- [ ] Không báo test PASS nếu không chạy thực tế.
- [ ] Ghi chính xác việc đã chạy thực tế và việc chưa kiểm chứng.
- [ ] Có nguồn, timestamp hoặc định danh artifact nếu có thay đổi.

## Giới hạn an toàn

- Chỉ thao tác với tài nguyên được cấp quyền; không vượt qua kiểm soát truy cập.
- Không xuất bản bí mật, token, dữ liệu cá nhân, khóa riêng hoặc nội dung có bản quyền khi chưa có phép.
- Thực hiện read-only trước, checkpoint trước write, giữ rollback cho thay đổi quan trọng.
- Không khẳng định hoàn tất 100% nếu các tiêu chí ở trên còn thiếu.

## Tham khảo

- https://playwright.dev/docs/intro
- https://learn.chatgpt.com/docs/build-skills
