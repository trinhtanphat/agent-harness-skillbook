---
name: artifact-attestation
description: "Kiểm chứng chuỗi provenance từ commit Git qua artifact đến service đang chạy. Chỉ kích hoạt khi người dùng yêu cầu đối chiếu mã nguồn, build và runtime."
license: MIT
---

# Đối chiếu mã nguồn, build và runtime

**Chuyên mục:** Git & Release Engineering  
**Mức độ:** Nâng cao  
**Nguồn:** Tự biên soạn

## Khi nào dùng

Kiểm chứng chuỗi provenance từ commit Git qua artifact đến service đang chạy.

## Đầu vào

- Nhiệm vụ, kết quả đầu ra và phạm vi được phép.
- Hệ thống/tài liệu/source identifiers hoặc môi trường kiểm thử đã xác nhận.
- Tình trạng dữ liệu, người duyệt, thời hạn và tiêu chí nghiệm thu.

## Quy trình

1. Chốt source SHA và dependency lockfile trước build.
2. Tạo artifact manifest gồm file paths, sizes và checksums.
3. Deploy artifact bất biến, gắn version rõ ở health/debug endpoint phù hợp.
4. Đối chiếu SHA runtime/proxy/backend với manifest và thời gian phát hành.
5. Xác minh user journey và ghi sign-off hoặc BLOCKED khi lệch.

## Kết quả

Build manifest, runtime reconciliation, acceptance evidence.

## Bằng chứng nghiệm thu

- [ ] Không lấy main HEAD thay cho runtime SHA.
- [ ] Có đường rollback được kiểm tra.
- [ ] Có nguồn, SHA hoặc thời gian cho các trạng thái đã xác minh.
- [ ] Việc chưa xác minh phải được ghi PARTIAL/BLOCKED thay vì PASS.

## Ví dụ yêu cầu

> Áp dụng skill `artifact-attestation` cho một công việc được phép. Ghi phạm vi, bước thực hiện, bằng chứng, mức rủi ro và điều kiện kết thúc. Không thao tác với production ngoài phạm vi được phê duyệt.

## Giới hạn an toàn

- Chỉ xử lý tài nguyên được ủy quyền, không bypass đăng nhập/DRM/anti-bot hay hành động ngoài scope.
- Không ghi token, cookie, PII hoặc nội dung có bản quyền vào log/repo công khai.
- Chạy read-only trước; checkpoint trước thay đổi; backup/rollback khi có dữ liệu.
- Không tự tuyên bố thành công khi chỉ mới chạy tool hoặc có HTTP 200.

## Nguồn tham khảo

- https://slsa.dev/
- https://agentskills.io/specification
