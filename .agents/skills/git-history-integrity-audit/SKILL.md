---
name: git-history-integrity-audit
description: "Xác minh các object, ref, commit cha, tag và chứng cứ nguồn trước khi phát hành. Chỉ kích hoạt khi người dùng yêu cầu kiểm toán integrity lịch sử git."
license: MIT
---

# Kiểm toán integrity lịch sử Git

**Chuyên mục:** Git & Release Engineering  
**Mức độ:** Trung cấp  
**Nguồn:** Tự biên soạn

## Khi nào dùng

Xác minh các object, ref, commit cha, tag và chứng cứ nguồn trước khi phát hành.

## Đầu vào

- Nhiệm vụ, kết quả đầu ra và phạm vi được phép.
- Hệ thống/tài liệu/source identifiers hoặc môi trường kiểm thử đã xác nhận.
- Tình trạng dữ liệu, người duyệt, thời hạn và tiêu chí nghiệm thu.

## Quy trình

1. Chụp remote, branch heads và exact commit SHA.
2. Chạy git fsck và đối chiếu refs với remote qua ls-remote.
3. Kiểm tra shallow clone, tags annotated, submodules và missing objects.
4. Lưu manifest sorted và hash để so sánh trước/sau chuyển kho.
5. Ghi bản ghi chưa thể kiểm tra (private/hidden refs, assets ngoài Git).

## Kết quả

Object health report, ref-diff, provenance manifest.

## Bằng chứng nghiệm thu

- [ ] Không có object corruption trong phạm vi.
- [ ] Danh sách ngoại lệ/không truy xuất được được công khai rõ.
- [ ] Có nguồn, SHA hoặc thời gian cho các trạng thái đã xác minh.
- [ ] Việc chưa xác minh phải được ghi PARTIAL/BLOCKED thay vì PASS.

## Ví dụ yêu cầu

> Áp dụng skill `git-history-integrity-audit` cho một công việc được phép. Ghi phạm vi, bước thực hiện, bằng chứng, mức rủi ro và điều kiện kết thúc. Không thao tác với production ngoài phạm vi được phê duyệt.

## Giới hạn an toàn

- Chỉ xử lý tài nguyên được ủy quyền, không bypass đăng nhập/DRM/anti-bot hay hành động ngoài scope.
- Không ghi token, cookie, PII hoặc nội dung có bản quyền vào log/repo công khai.
- Chạy read-only trước; checkpoint trước thay đổi; backup/rollback khi có dữ liệu.
- Không tự tuyên bố thành công khi chỉ mới chạy tool hoặc có HTTP 200.

## Nguồn tham khảo

- https://git-scm.com/docs/git-fsck
- https://agentskills.io/specification
