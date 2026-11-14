---
name: static-code-archeology
description: "Điều tra cấu trúc một ứng dụng mình sở hữu, xác định điểm vào, luồng dữ liệu, module và phụ thuộc. Chỉ kích hoạt khi người dùng yêu cầu khảo cổ mã nguồn và dependency."
license: MIT
---

# Khảo cổ mã nguồn và dependency

**Chuyên mục:** Reverse Engineering & Forensics  
**Mức độ:** Trung cấp  
**Nguồn:** Tự biên soạn

## Khi nào dùng

Điều tra cấu trúc một ứng dụng mình sở hữu, xác định điểm vào, luồng dữ liệu, module và phụ thuộc.

## Đầu vào

- Nhiệm vụ, kết quả đầu ra và phạm vi được phép.
- Hệ thống/tài liệu/source identifiers hoặc môi trường kiểm thử đã xác nhận.
- Tình trạng dữ liệu, người duyệt, thời hạn và tiêu chí nghiệm thu.

## Quy trình

1. Chụp commit, branch, lockfile, runtime version và sơ đồ thư mục trước khi sửa.
2. Tìm entry points, route map, build scripts, feature flags và generated code.
3. Tạo call graph ở mức module rồi bám theo hành vi liên quan yêu cầu.
4. Phân loại code gốc, code được sinh và thư viện bên thứ ba theo license.
5. Tổng kết source-to-behavior mapping kèm line references thay vì đoán qua tên file.

## Kết quả

Entry-point map, module graph, source-to-feature matrix.

## Bằng chứng nghiệm thu

- [ ] Mỗi chức năng có vị trí code và cách xác minh.
- [ ] Không sao chép mã độc quyền sang repo khác.
- [ ] Có nguồn, SHA hoặc thời gian cho các trạng thái đã xác minh.
- [ ] Việc chưa xác minh phải được ghi PARTIAL/BLOCKED thay vì PASS.

## Ví dụ yêu cầu

> Áp dụng skill `static-code-archeology` cho một công việc được phép. Ghi phạm vi, bước thực hiện, bằng chứng, mức rủi ro và điều kiện kết thúc. Không thao tác với production ngoài phạm vi được phê duyệt.

## Giới hạn an toàn

- Chỉ xử lý tài nguyên được ủy quyền, không bypass đăng nhập/DRM/anti-bot hay hành động ngoài scope.
- Không ghi token, cookie, PII hoặc nội dung có bản quyền vào log/repo công khai.
- Chạy read-only trước; checkpoint trước thay đổi; backup/rollback khi có dữ liệu.
- Không tự tuyên bố thành công khi chỉ mới chạy tool hoặc có HTTP 200.

## Nguồn tham khảo

- https://git-scm.com/docs
- https://agentskills.io/specification
