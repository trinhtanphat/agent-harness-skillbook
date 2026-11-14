---
name: test-pyramid
description: "Dùng đúng loại test cho logic, tích hợp, luồng người dùng và rủi ro. Chỉ dùng khi yêu cầu liên quan đến thiết kế kiểm thử từ unit đến e2e."
---

# Thiết kế kiểm thử từ unit đến E2E

**Chuyên mục:** QA, Security & Delivery  
**Mức độ:** Trung cấp  
**Nguồn:** Tự biên soạn — https://playwright.dev/docs/intro

## Khi nào sử dụng

Dùng đúng loại test cho logic, tích hợp, luồng người dùng và rủi ro.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Lập risk-based test matrix.
2. Viết unit cho logic thuần.
3. Viết integration/contract cho API và DB.
4. Viết E2E cho luồng quan trọng và negative cases.
5. Thêm visual, a11y, performance theo scope.

## Kết quả phải bàn giao

Test plan, coverage matrix, reproducible commands.

## Bằng chứng nghiệm thu

- [ ] Không nhầm unit PASS với user-journey PASS.
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
