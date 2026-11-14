# Playbook — Evidence ledger và nghiệm thu đúng nghĩa

> Thang bằng chứng PLANNED → IMPLEMENTED → TESTED → REVIEWED → DEPLOYED → PRODUCTION_VERIFIED → ACCEPTED.

**Workflow:** scope → evidence → controlled execution → independent verification → truthful handoff.

## 1. Định nghĩa mẫu số

1. Liệt kê requirement ids, expected outcome, môi trường và reviewer cần thiết.

2. Một tỷ lệ 100% chỉ có nghĩa trong scope có mẫu số cố định; không dùng làm lời bảo đảm tuyệt đối.

3. Tách tỷ lệ logic tests, coverage, route UI, asset review và production checks.

## 2. Ghi chứng cứ

1. Mỗi requirement có commit SHA, artifact hash, test id, environment, timestamp, link proof và reviewer decision.

2. Trạng thái pending/blocked phải nằm trong báo cáo thay vì ẩn.

3. Bảo vệ log có PII, token, cookie hoặc internal URL.

## 3. Phản ví dụ thường gặp

1. 66 assets render PASS nhưng chưa được duyệt nguồn gốc, vị trí hiển thị và chất lượng: art gate vẫn mở.

2. 3700 tests PASS nhưng chưa xác nhận GPU và user journey: E2E/visual gate chưa xong.

3. PR Draft/no reviews không có nghĩa production release approved.

## 4. Sign-off

1. Người chịu trách nhiệm kiểm tra proof theo checklist; không thay sign-off bằng nhãn auto PASS.

2. Nếu còn ô pending, report PARTIAL/BLOCKED có owner và blocker.

3. Giữ QA evidence immutable khi có thể để truy vết thay đổi.

## Bàn giao

Acceptance matrix, evidence ledger, scope status report, sign-off history.

## Checklist nghiệm thu

- [ ] Có quyền thực hiện và ranh giới hệ thống rõ ràng.
- [ ] Có log hoặc nguồn cho từng khẳng định về kết quả.
- [ ] Có negative test và kiểm tra sai lệch giả định.
- [ ] Có rollback hoặc phương án khôi phục nếu tác động dữ liệu.
- [ ] Có báo cáo PARTIAL nếu còn bất kỳ bước nào chưa kiểm chứng.

## Nguồn tham khảo

- https://playwright.dev/
- https://learn.chatgpt.com/docs/build-skills
