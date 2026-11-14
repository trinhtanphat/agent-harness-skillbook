---
name: legal-scope
description: "Phân biệt nghiên cứu kỹ thuật với sao chép tài sản thương mại hoặc thông tin không được phép. Chỉ dùng khi yêu cầu liên quan đến xác lập quyền và phạm vi tái tạo."
---

# Xác lập quyền và phạm vi tái tạo

**Chuyên mục:** Crawl & App Reconstruction  
**Mức độ:** Cơ bản  
**Nguồn:** Tự biên soạn — https://www.rfc-editor.org/rfc/rfc9309

## Khi nào sử dụng

Phân biệt nghiên cứu kỹ thuật với sao chép tài sản thương mại hoặc thông tin không được phép.

## Đầu vào bắt buộc

- Mục tiêu và giới hạn công việc đã được người yêu cầu xác định.
- Danh sách hệ thống/tài liệu/URL liên quan và quyền truy cập hợp lệ.
- Điều kiện nghiệm thu và các môi trường có thể tác động.

## Quy trình

1. Ghi chủ sở hữu và quyền thu thập.
2. Xác định URL, chức năng, dữ liệu được phép.
3. Kiểm tra robots.txt, ToS và hạn chế truy cập.
4. Phân loại tài sản bên thứ ba.
5. Dự kiến giải pháp clean-room cho phần bị hạn chế.

## Kết quả phải bàn giao

Scope, permission record, asset rights matrix.

## Bằng chứng nghiệm thu

- [ ] Không bypass login/CAPTCHA/paywall.
- [ ] Không sao chép dữ liệu cá nhân.
- [ ] Ghi chính xác việc đã chạy thực tế và việc chưa kiểm chứng.
- [ ] Có nguồn, timestamp hoặc định danh artifact nếu có thay đổi.

## Giới hạn an toàn

- Chỉ thao tác với tài nguyên được cấp quyền; không vượt qua kiểm soát truy cập.
- Không xuất bản bí mật, token, dữ liệu cá nhân, khóa riêng hoặc nội dung có bản quyền khi chưa có phép.
- Thực hiện read-only trước, checkpoint trước write, giữ rollback cho thay đổi quan trọng.
- Không khẳng định hoàn tất 100% nếu các tiêu chí ở trên còn thiếu.

## Tham khảo

- https://www.rfc-editor.org/rfc/rfc9309
- https://learn.chatgpt.com/docs/build-skills
