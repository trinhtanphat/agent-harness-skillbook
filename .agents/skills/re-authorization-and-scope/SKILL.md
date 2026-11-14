---
name: re-authorization-and-scope
description: "Xác nhận quyền phân tích đối tượng trước khi đọc binary, dump network hoặc khảo sát hệ thống. Chỉ kích hoạt khi người dùng yêu cầu kiểm tra quyền trước reverse engineering."
license: MIT
---

# Kiểm tra quyền trước reverse engineering

**Chuyên mục:** Reverse Engineering & Forensics  
**Mức độ:** Cơ bản  
**Nguồn:** Tự biên soạn

## Khi nào dùng

Xác nhận quyền phân tích đối tượng trước khi đọc binary, dump network hoặc khảo sát hệ thống.

## Đầu vào

- Nhiệm vụ, kết quả đầu ra và phạm vi được phép.
- Hệ thống/tài liệu/source identifiers hoặc môi trường kiểm thử đã xác nhận.
- Tình trạng dữ liệu, người duyệt, thời hạn và tiêu chí nghiệm thu.

## Quy trình

1. Xác định chủ sở hữu, giấy phép, hợp đồng và điều kiện cho phép phân tích.
2. Ghi tên artifact, SHA-256, hệ điều hành và nguồn cung cấp; không tải bản không rõ nguồn.
3. Giới hạn phạm vi vào chương trình hoặc challenge được phép, không mở rộng tới production.
4. Phân loại dữ liệu nhạy cảm trong ảnh chụp, logs, traffic và các tệp xuất.
5. Tạo scope.md và tiêu chí kết thúc; mọi thay đổi ngoài scope cần chấp thuận mới.

## Kết quả

Scope checklist, permission ledger, artifact manifest.

## Bằng chứng nghiệm thu

- [ ] Có bằng chứng quyền cho mỗi artifact.
- [ ] Không đưa PII hoặc secrets vào tài liệu.
- [ ] Có nguồn, SHA hoặc thời gian cho các trạng thái đã xác minh.
- [ ] Việc chưa xác minh phải được ghi PARTIAL/BLOCKED thay vì PASS.

## Ví dụ yêu cầu

> Áp dụng skill `re-authorization-and-scope` cho một công việc được phép. Ghi phạm vi, bước thực hiện, bằng chứng, mức rủi ro và điều kiện kết thúc. Không thao tác với production ngoài phạm vi được phê duyệt.

## Giới hạn an toàn

- Chỉ xử lý tài nguyên được ủy quyền, không bypass đăng nhập/DRM/anti-bot hay hành động ngoài scope.
- Không ghi token, cookie, PII hoặc nội dung có bản quyền vào log/repo công khai.
- Chạy read-only trước; checkpoint trước thay đổi; backup/rollback khi có dữ liệu.
- Không tự tuyên bố thành công khi chỉ mới chạy tool hoặc có HTTP 200.

## Nguồn tham khảo

- https://www.nist.gov/itl/ai-risk-management-framework
- https://agentskills.io/specification
