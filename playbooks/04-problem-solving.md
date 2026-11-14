# Playbook — Giải quyết vấn đề bằng RCA

> Một quy trình gỡ lỗi chống sửa mò: quan sát, tái hiện, giả thuyết, phản chứng, sửa, kiểm tra và phòng tái phát.

**Workflow:** scope → evidence → controlled execution → independent verification → truthful handoff.

## 1. Triage và observation

1. Viết expected vs actual, lúc bắt đầu, phạm vi ảnh hưởng, severity và phiên bản tốt cuối cùng.

2. Thu log, metric, timestamp, screenshot, commit diff, environment và correlation ID.

3. Không vội restart hoặc xóa dữ liệu; giữ chứng cứ gốc và rollback.

## 2. Reproduce & hypothesize

1. Tạo các bước tái hiện ổn định trên dữ liệu kiểm thử.

2. Đề xuất ít nhất hai cơ chế lỗi có thể giải thích symptom; ghi rõ dự đoán của mỗi cơ chế.

3. Chọn phép thử phân biệt các giả thuyết, thay đổi một biến tại một thời điểm.

## 3. Root cause analysis

1. Dùng timeline, Five Whys hoặc fault tree; phân biệt trigger, contributing factors và systemic cause.

2. Tìm control bị thiếu hoặc không hiệu quả, thay vì tìm người để đổ lỗi.

3. Không gắn nhãn root cause nếu chưa có chứng cứ.

## 4. Fix và prevention

1. Sửa tối thiểu có regression test và negative case; nếu dữ liệu có ảnh hưởng phải rehearsal khôi phục.

2. Thêm guardrails, alert, monitoring và action owner; postmortem có mốc kiểm chứng.

3. Báo rõ chỉ sửa code hay đã deploy, đã xác minh runtime hay chưa.

## Bàn giao

Reproduction kit, hypotheses, discriminating tests, RCA, regression proof.

## Checklist nghiệm thu

- [ ] Có quyền thực hiện và ranh giới hệ thống rõ ràng.
- [ ] Có log hoặc nguồn cho từng khẳng định về kết quả.
- [ ] Có negative test và kiểm tra sai lệch giả định.
- [ ] Có rollback hoặc phương án khôi phục nếu tác động dữ liệu.
- [ ] Có báo cáo PARTIAL nếu còn bất kỳ bước nào chưa kiểm chứng.

## Nguồn tham khảo

- https://opentelemetry.io/docs/
- https://learn.chatgpt.com/docs/build-skills
