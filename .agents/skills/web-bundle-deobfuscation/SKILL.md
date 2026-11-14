---
name: web-bundle-deobfuscation
description: "Phân tích bundle từ ứng dụng do bạn sở hữu để lập cấu trúc chức năng và phát hiện lỗi. Chỉ kích hoạt khi người dùng yêu cầu đọc hiểu bundle javascript được phép."
license: MIT
---

# Đọc hiểu bundle JavaScript được phép

**Chuyên mục:** Reverse Engineering & Forensics  
**Mức độ:** Nâng cao  
**Nguồn:** Tự biên soạn

## Khi nào dùng

Phân tích bundle từ ứng dụng do bạn sở hữu để lập cấu trúc chức năng và phát hiện lỗi.

## Đầu vào

- Nhiệm vụ, kết quả đầu ra và phạm vi được phép.
- Hệ thống/tài liệu/source identifiers hoặc môi trường kiểm thử đã xác nhận.
- Tình trạng dữ liệu, người duyệt, thời hạn và tiêu chí nghiệm thu.

## Quy trình

1. Xác minh quyền kiểm thử, source map và điều khoản với ứng dụng.
2. Hash bundle và so sánh tên asset/entry points giữa các release.
3. Khảo sát import graph, bundler chunks, source map hợp pháp và public APIs.
4. Đối chiếu behavior trong DevTools với mã và ghi suy luận chưa chắc chắn.
5. Viết clean-room spec; không xuất bản mã độc quyền hoặc bỏ bảo vệ license.

## Kết quả

Bundle inventory, behavior mapping, change report.

## Bằng chứng nghiệm thu

- [ ] Không tuyên bố full source khi chỉ có minified bundle.
- [ ] Không vô hiệu hóa license, DRM hoặc kiểm soát truy cập.
- [ ] Có nguồn, SHA hoặc thời gian cho các trạng thái đã xác minh.
- [ ] Việc chưa xác minh phải được ghi PARTIAL/BLOCKED thay vì PASS.

## Ví dụ yêu cầu

> Áp dụng skill `web-bundle-deobfuscation` cho một công việc được phép. Ghi phạm vi, bước thực hiện, bằng chứng, mức rủi ro và điều kiện kết thúc. Không thao tác với production ngoài phạm vi được phê duyệt.

## Giới hạn an toàn

- Chỉ xử lý tài nguyên được ủy quyền, không bypass đăng nhập/DRM/anti-bot hay hành động ngoài scope.
- Không ghi token, cookie, PII hoặc nội dung có bản quyền vào log/repo công khai.
- Chạy read-only trước; checkpoint trước thay đổi; backup/rollback khi có dữ liệu.
- Không tự tuyên bố thành công khi chỉ mới chạy tool hoặc có HTTP 200.

## Nguồn tham khảo

- https://developer.chrome.com/docs/devtools/javascript/
- https://agentskills.io/specification
