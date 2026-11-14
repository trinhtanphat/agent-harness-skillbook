# Playbook — QA, Blue/Green, Rollback và phát hành

> Các cổng nghiệm thu từ unit đến runtime, giữ production ổn định và không phụ thuộc GitHub Actions.

**Workflow:** scope → evidence → controlled execution → independent verification → truthful handoff.

## 1. Test matrix

1. Static/lint/secret scan khác unit; unit khác contract, integration, E2E và visual.

2. Thiết kế happy path, boundary, denied role, retries, timeout, idempotency, đa viewport và browser.

3. Với 3D kiểm tra đồ họa phần cứng và screenshot thực tế.

## 2. Trước triển khai

1. Chạy QA cục bộ trên máy được cho phép; ghi command, timestamp, dependency versions, logs.

2. Kiểm tra disk, release lock, backup, DB migration, artifact manifest và hash.

3. Không xóa release/worktree có commit chưa merge hoặc đang được tiến trình dùng.

## 3. Blue/Green

1. Giữ blue phục vụ, build green tách biệt, chạy smoke, readiness và E2E với SHA hiện tại.

2. Chỉ chuyển traffic khi gate còn hiệu lực, mọi yêu cầu rollback đã chuẩn bị.

3. Giám sát post-deploy, revert nếu SLI xấu hoặc runtime drift.

## 4. Báo cáo kết quả

1. Ghi branch, SHA, build artifact, environment, số test đã chạy, thời gian và quality review.

2. API 200 không chứng minh visual match; snapshot tải được không chứng minh đã nghiệm thu.

3. Không claim production verified nếu chưa kiểm chứng user journey thực tế.

## Bàn giao

Test logs, release manifest, rollback rehearsal, deployment verification report.

## Checklist nghiệm thu

- [ ] Có quyền thực hiện và ranh giới hệ thống rõ ràng.
- [ ] Có log hoặc nguồn cho từng khẳng định về kết quả.
- [ ] Có negative test và kiểm tra sai lệch giả định.
- [ ] Có rollback hoặc phương án khôi phục nếu tác động dữ liệu.
- [ ] Có báo cáo PARTIAL nếu còn bất kỳ bước nào chưa kiểm chứng.

## Nguồn tham khảo

- https://docs.github.com/en/pages
- https://learn.chatgpt.com/docs/build-skills
