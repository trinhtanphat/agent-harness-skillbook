---
name: github-releases-assets-audit
description: "Tách repository Git refs khỏi GitHub Releases và binary assets khi sao lưu. Chỉ kích hoạt khi người dùng yêu cầu audit releases và các tệp phát hành."
license: MIT
---

# Audit Releases và các tệp phát hành

**Chuyên mục:** Git & Release Engineering  
**Mức độ:** Trung cấp  
**Nguồn:** Tự biên soạn

## Khi nào dùng

Tách repository Git refs khỏi GitHub Releases và binary assets khi sao lưu.

## Đầu vào

- Nhiệm vụ, kết quả đầu ra và phạm vi được phép.
- Hệ thống/tài liệu/source identifiers hoặc môi trường kiểm thử đã xác nhận.
- Tình trạng dữ liệu, người duyệt, thời hạn và tiêu chí nghiệm thu.

## Quy trình

1. Liệt kê releases/tags qua API, xử lý pagination, prereleases, drafts theo quyền.
2. Ghi assets id, file size, digest nếu có và URL metadata.
3. Tải binary chỉ khi có quyền và kiểm tra hash sau tải.
4. Đối chiếu bản phát hành với commit/tag trên source và destination.
5. Ghi phần release metadata/asset chưa mirror vì không có API permission.

## Kết quả

Release inventory, asset hash manifest, migration gaps.

## Bằng chứng nghiệm thu

- [ ] Không báo tất cả hoàn tất khi thiếu release assets.
- [ ] Không upload tệp có license/secret bị hạn chế.
- [ ] Có nguồn, SHA hoặc thời gian cho các trạng thái đã xác minh.
- [ ] Việc chưa xác minh phải được ghi PARTIAL/BLOCKED thay vì PASS.

## Ví dụ yêu cầu

> Áp dụng skill `github-releases-assets-audit` cho một công việc được phép. Ghi phạm vi, bước thực hiện, bằng chứng, mức rủi ro và điều kiện kết thúc. Không thao tác với production ngoài phạm vi được phê duyệt.

## Giới hạn an toàn

- Chỉ xử lý tài nguyên được ủy quyền, không bypass đăng nhập/DRM/anti-bot hay hành động ngoài scope.
- Không ghi token, cookie, PII hoặc nội dung có bản quyền vào log/repo công khai.
- Chạy read-only trước; checkpoint trước thay đổi; backup/rollback khi có dữ liệu.
- Không tự tuyên bố thành công khi chỉ mới chạy tool hoặc có HTTP 200.

## Nguồn tham khảo

- https://docs.github.com/en/rest/releases/releases
- https://agentskills.io/specification
