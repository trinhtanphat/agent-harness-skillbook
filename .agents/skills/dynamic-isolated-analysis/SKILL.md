---
name: dynamic-isolated-analysis
description: "Quan sát ứng dụng được ủy quyền dưới debugger hoặc máy ảo mà không ảnh hưởng thiết bị người dùng. Chỉ kích hoạt khi người dùng yêu cầu phân tích động trong sandbox cách ly."
license: MIT
---

# Phân tích động trong sandbox cách ly

**Chuyên mục:** Reverse Engineering & Forensics  
**Mức độ:** Nâng cao  
**Nguồn:** Tự biên soạn

## Khi nào dùng

Quan sát ứng dụng được ủy quyền dưới debugger hoặc máy ảo mà không ảnh hưởng thiết bị người dùng.

## Đầu vào

- Nhiệm vụ, kết quả đầu ra và phạm vi được phép.
- Hệ thống/tài liệu/source identifiers hoặc môi trường kiểm thử đã xác nhận.
- Tình trạng dữ liệu, người duyệt, thời hạn và tiêu chí nghiệm thu.

## Quy trình

1. Chỉ dùng mẫu hoặc ứng dụng có quyền; tạo VM snapshot và mạng cách ly.
2. Xác minh hash nguồn và bảo đảm hệ thống không có thông tin thật hoặc token.
3. Chạy kiểm thử có giới hạn, theo dõi process tree, file I/O, DNS và crash.
4. Đối chiếu hành vi với giả thuyết, không sửa binary hoặc vô hiệu hóa kiểm soát truy cập.
5. Phục hồi snapshot và bàn giao trace đã khử thông tin nhạy cảm.

## Kết quả

VM baseline, trace, behavior matrix, clean rollback proof.

## Bằng chứng nghiệm thu

- [ ] Nguồn mẫu xác thực và phạm vi phân tích hợp lệ.
- [ ] VM phục hồi về baseline.
- [ ] Có nguồn, SHA hoặc thời gian cho các trạng thái đã xác minh.
- [ ] Việc chưa xác minh phải được ghi PARTIAL/BLOCKED thay vì PASS.

## Ví dụ yêu cầu

> Áp dụng skill `dynamic-isolated-analysis` cho một công việc được phép. Ghi phạm vi, bước thực hiện, bằng chứng, mức rủi ro và điều kiện kết thúc. Không thao tác với production ngoài phạm vi được phê duyệt.

## Giới hạn an toàn

- Chỉ xử lý tài nguyên được ủy quyền, không bypass đăng nhập/DRM/anti-bot hay hành động ngoài scope.
- Không ghi token, cookie, PII hoặc nội dung có bản quyền vào log/repo công khai.
- Chạy read-only trước; checkpoint trước thay đổi; backup/rollback khi có dữ liệu.
- Không tự tuyên bố thành công khi chỉ mới chạy tool hoặc có HTTP 200.

## Nguồn tham khảo

- https://learn.microsoft.com/en-us/sysinternals/
- https://agentskills.io/specification
