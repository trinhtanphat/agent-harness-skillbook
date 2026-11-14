---
name: binary-format-inspection
description: "Đọc cấu trúc file thực thi có quyền cho mục đích tương thích, bảo mật hoặc đào tạo. Chỉ kích hoạt khi người dùng yêu cầu kiểm kê định dạng pe, elf và metadata."
license: MIT
---

# Kiểm kê định dạng PE, ELF và metadata

**Chuyên mục:** Reverse Engineering & Forensics  
**Mức độ:** Trung cấp  
**Nguồn:** Tự biên soạn

## Khi nào dùng

Đọc cấu trúc file thực thi có quyền cho mục đích tương thích, bảo mật hoặc đào tạo.

## Đầu vào

- Nhiệm vụ, kết quả đầu ra và phạm vi được phép.
- Hệ thống/tài liệu/source identifiers hoặc môi trường kiểm thử đã xác nhận.
- Tình trạng dữ liệu, người duyệt, thời hạn và tiêu chí nghiệm thu.

## Quy trình

1. Xác minh nguồn và SHA, xác định PE/ELF/Mach-O cùng kiến trúc CPU.
2. Kiểm tra headers, sections, imports, libraries, symbols và metadata trong môi trường tĩnh.
3. Liệt kê network permission, signer, build time và khả năng bị đóng gói.
4. Tách facts quan sát được khỏi giả thuyết, tránh kết luận malware chỉ vì heuristic.
5. Viết báo cáo với công cụ, phiên bản, lệnh kiểm tra và hash provenance.

## Kết quả

Binary metadata report, dependency inventory, risk notes.

## Bằng chứng nghiệm thu

- [ ] Không chạy file lạ trên thiết bị production.
- [ ] Không cung cấp hướng vượt DRM/đăng nhập.
- [ ] Có nguồn, SHA hoặc thời gian cho các trạng thái đã xác minh.
- [ ] Việc chưa xác minh phải được ghi PARTIAL/BLOCKED thay vì PASS.

## Ví dụ yêu cầu

> Áp dụng skill `binary-format-inspection` cho một công việc được phép. Ghi phạm vi, bước thực hiện, bằng chứng, mức rủi ro và điều kiện kết thúc. Không thao tác với production ngoài phạm vi được phê duyệt.

## Giới hạn an toàn

- Chỉ xử lý tài nguyên được ủy quyền, không bypass đăng nhập/DRM/anti-bot hay hành động ngoài scope.
- Không ghi token, cookie, PII hoặc nội dung có bản quyền vào log/repo công khai.
- Chạy read-only trước; checkpoint trước thay đổi; backup/rollback khi có dữ liệu.
- Không tự tuyên bố thành công khi chỉ mới chạy tool hoặc có HTTP 200.

## Nguồn tham khảo

- https://learn.microsoft.com/en-us/windows/win32/debug/pe-format
- https://agentskills.io/specification
