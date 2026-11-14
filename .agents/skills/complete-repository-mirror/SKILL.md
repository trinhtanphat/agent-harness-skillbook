---
name: complete-repository-mirror
description: "Sao chép đầy đủ repository mình được phép dùng, kiểm tra branches, tags, LFS, submodules và releases. Chỉ kích hoạt khi người dùng yêu cầu mirror toàn bộ nhánh và refs có quyền."
license: MIT
---

# Mirror toàn bộ nhánh và refs có quyền

**Chuyên mục:** Git & Release Engineering  
**Mức độ:** Nâng cao  
**Nguồn:** Tự biên soạn

## Khi nào dùng

Sao chép đầy đủ repository mình được phép dùng, kiểm tra branches, tags, LFS, submodules và releases.

## Đầu vào

- Nhiệm vụ, kết quả đầu ra và phạm vi được phép.
- Hệ thống/tài liệu/source identifiers hoặc môi trường kiểm thử đã xác nhận.
- Tình trạng dữ liệu, người duyệt, thời hạn và tiêu chí nghiệm thu.

## Quy trình

1. Kiểm tra quyền, repo gốc, license, số lượng refs và trạng thái branch protection.
2. Clone --mirror để giữ các refs được server quảng bá; ghi remote SHA và git fsck.
3. Kiểm tra LFS, submodules, tags, notes và worktrees; các refs ẩn có thể không được clone.
4. Mirror push đến repo đích do mình kiểm soát; không ghi đè source.
5. Đối chiếu SHA mỗi ref, phát hành GitHub Releases/assets riêng qua API, và ghi các thiếu sót.

## Kết quả

Ref manifest, fsck log, LFS/submodule inventory, release assets report.

## Bằng chứng nghiệm thu

- [ ] Mọi ref trong scope có SHA khớp.
- [ ] Không tuyên bố fork đầy đủ nếu assets/releases chưa kiểm.
- [ ] Có nguồn, SHA hoặc thời gian cho các trạng thái đã xác minh.
- [ ] Việc chưa xác minh phải được ghi PARTIAL/BLOCKED thay vì PASS.

## Ví dụ yêu cầu

> Áp dụng skill `complete-repository-mirror` cho một công việc được phép. Ghi phạm vi, bước thực hiện, bằng chứng, mức rủi ro và điều kiện kết thúc. Không thao tác với production ngoài phạm vi được phê duyệt.

## Giới hạn an toàn

- Chỉ xử lý tài nguyên được ủy quyền, không bypass đăng nhập/DRM/anti-bot hay hành động ngoài scope.
- Không ghi token, cookie, PII hoặc nội dung có bản quyền vào log/repo công khai.
- Chạy read-only trước; checkpoint trước thay đổi; backup/rollback khi có dữ liệu.
- Không tự tuyên bố thành công khi chỉ mới chạy tool hoặc có HTTP 200.

## Nguồn tham khảo

- https://git-scm.com/docs/git-clone
- https://agentskills.io/specification
