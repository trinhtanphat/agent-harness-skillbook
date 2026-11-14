---
name: visual-diff-gate
description: "Phát hiện lệch giao diện thay vì chỉ test HTTP 200. Chỉ dùng khi yêu cầu liên quan đến kiểm thử visual regression có ngưỡng."
---

# Kiểm thử visual regression có ngưỡng

**Chuyên mục:** Crawl & App Reconstruction  
**Mức độ:** Nâng cao  
**Nguồn:** Tự biên soạn — https://playwright.dev/docs/intro

## Khi nào sử dụng

Phát hiện lệch giao diện thay vì chỉ test HTTP 200.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Cố định browser, viewport, font, locale và dữ liệu.
2. Chụp baseline và candidate.
3. Tạo diff và khoanh vùng sai khác.
4. Phân biệt thay đổi mong muốn với regression.
5. Lưu bằng chứng trước khi phê duyệt.

## Kết quả phải bàn giao

Baseline, actual, diff, waiver log.

## Bằng chứng nghiệm thu

- [ ] Không bỏ qua vùng sai khác chưa giải thích.
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
