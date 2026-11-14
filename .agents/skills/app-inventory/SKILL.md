---
name: app-inventory
description: "Tạo bản đồ đầy đủ những phần có thể quan sát hợp pháp của ứng dụng. Chỉ dùng khi yêu cầu liên quan đến khảo sát route, state, asset và api."
---

# Khảo sát route, state, asset và API

**Chuyên mục:** Crawl & App Reconstruction  
**Mức độ:** Trung cấp  
**Nguồn:** Tự biên soạn — https://playwright.dev/docs/intro

## Khi nào sử dụng

Tạo bản đồ đầy đủ những phần có thể quan sát hợp pháp của ứng dụng.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Duyệt các route công khai và phiên có quyền.
2. Thu thập sitemap, navigation, network log.
3. Ghi state đăng nhập/khách và desktop/mobile.
4. Liệt kê fonts, hình ảnh, 3D và API contracts.
5. Lập coverage matrix và ưu tiên chưa thấy.

## Kết quả phải bàn giao

Route inventory, API inventory, asset manifest.

## Bằng chứng nghiệm thu

- [ ] Coverage mỗi route có nguồn và screenshot.
- [ ] Không tải nội dung ngoài scope.
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
