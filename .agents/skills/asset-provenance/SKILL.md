---
name: asset-provenance
description: "Tách kiểm tra hash/tải thành công khỏi kiểm duyệt chất lượng hình ảnh. Chỉ dùng khi yêu cầu liên quan đến kiểm kê và nghiệm thu tài nguyên 2d/3d."
---

# Kiểm kê và nghiệm thu tài nguyên 2D/3D

**Chuyên mục:** Crawl & App Reconstruction  
**Mức độ:** Nâng cao  
**Nguồn:** Tự biên soạn — https://playwright.dev/docs/intro

## Khi nào sử dụng

Tách kiểm tra hash/tải thành công khỏi kiểm duyệt chất lượng hình ảnh.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Ghi license, nguồn và mục đích từng asset.
2. Hash SHA-256 bản gốc và bản xuất.
3. Render đúng camera/ánh sáng/tỷ lệ.
4. Chụp screenshot cùng viewport mục tiêu.
5. Reviewer kiểm tra xuất xứ, chất lượng và vị trí.

## Kết quả phải bàn giao

Asset ledger, checksums, review sheet.

## Bằng chứng nghiệm thu

- [ ] Hash PASS không thay thế human art approval.
- [ ] Không claim 100% khi thiếu review.
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
