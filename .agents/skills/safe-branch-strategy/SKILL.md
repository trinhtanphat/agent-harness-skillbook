---
name: safe-branch-strategy
description: "Tách nhánh phát triển, preview, staging và production để tránh ghi đè thay đổi đã có. Chỉ kích hoạt khi người dùng yêu cầu thiết kế branch và pr an toàn."
license: MIT
---

# Thiết kế branch và PR an toàn

**Chuyên mục:** Git & Release Engineering  
**Mức độ:** Trung cấp  
**Nguồn:** Tự biên soạn

## Khi nào dùng

Tách nhánh phát triển, preview, staging và production để tránh ghi đè thay đổi đã có.

## Đầu vào

- Nhiệm vụ, kết quả đầu ra và phạm vi được phép.
- Hệ thống/tài liệu/source identifiers hoặc môi trường kiểm thử đã xác nhận.
- Tình trạng dữ liệu, người duyệt, thời hạn và tiêu chí nghiệm thu.

## Quy trình

1. Xác định protected branch, review requirements và responsible owner.
2. Tạo worktree riêng; bảo toàn dirty state và commit chưa merge.
3. Rebase/merge dựa trên SHA hiện tại và xử lý conflict trong workspace cô lập.
4. Chạy regression độc lập theo commit merge candidate.
5. Push bằng expected SHA, mở PR, ghi release gate; rollback khi kiểm thử không đạt.

## Kết quả

Branch policy, PR gate, conflict resolution log.

## Bằng chứng nghiệm thu

- [ ] Không force push lên protected/source branch.
- [ ] Không làm mất thay đổi chưa commit.
- [ ] Có nguồn, SHA hoặc thời gian cho các trạng thái đã xác minh.
- [ ] Việc chưa xác minh phải được ghi PARTIAL/BLOCKED thay vì PASS.

## Ví dụ yêu cầu

> Áp dụng skill `safe-branch-strategy` cho một công việc được phép. Ghi phạm vi, bước thực hiện, bằng chứng, mức rủi ro và điều kiện kết thúc. Không thao tác với production ngoài phạm vi được phê duyệt.

## Giới hạn an toàn

- Chỉ xử lý tài nguyên được ủy quyền, không bypass đăng nhập/DRM/anti-bot hay hành động ngoài scope.
- Không ghi token, cookie, PII hoặc nội dung có bản quyền vào log/repo công khai.
- Chạy read-only trước; checkpoint trước thay đổi; backup/rollback khi có dữ liệu.
- Không tự tuyên bố thành công khi chỉ mới chạy tool hoặc có HTTP 200.

## Nguồn tham khảo

- https://docs.github.com/en/pull-requests
- https://agentskills.io/specification
