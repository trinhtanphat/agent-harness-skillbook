---
name: local-ci-runner
description: "Tạo pipeline QA chạy trên máy được phép khi Actions quota không khả dụng. Chỉ kích hoạt khi người dùng yêu cầu chạy ci cục bộ không dùng actions."
license: MIT
---

# Chạy CI cục bộ không dùng Actions

**Chuyên mục:** Git & Release Engineering  
**Mức độ:** Trung cấp  
**Nguồn:** Tự biên soạn

## Khi nào dùng

Tạo pipeline QA chạy trên máy được phép khi Actions quota không khả dụng.

## Đầu vào

- Nhiệm vụ, kết quả đầu ra và phạm vi được phép.
- Hệ thống/tài liệu/source identifiers hoặc môi trường kiểm thử đã xác nhận.
- Tình trạng dữ liệu, người duyệt, thời hạn và tiêu chí nghiệm thu.

## Quy trình

1. Pin Node/Python/SDK versions và lockfile, chạy trong workspace riêng.
2. Định nghĩa script lint, unit, contract, E2E, accessibility và build.
3. Lưu stdout/stderr, exit codes, artifact hashes cùng timestamp.
4. Chống ghi đè giữa job bằng lock có timeout và cleanup chỉ trong sandbox.
5. Chỉ báo PASS khi lệnh thực chạy thành công; không thay môi trường production.

## Kết quả

Local QA runner, logs, artifact manifest.

## Bằng chứng nghiệm thu

- [ ] Không kích hoạt GitHub Actions.
- [ ] Mọi test có command và exit code thực.
- [ ] Có nguồn, SHA hoặc thời gian cho các trạng thái đã xác minh.
- [ ] Việc chưa xác minh phải được ghi PARTIAL/BLOCKED thay vì PASS.

## Ví dụ yêu cầu

> Áp dụng skill `local-ci-runner` cho một công việc được phép. Ghi phạm vi, bước thực hiện, bằng chứng, mức rủi ro và điều kiện kết thúc. Không thao tác với production ngoài phạm vi được phê duyệt.

## Giới hạn an toàn

- Chỉ xử lý tài nguyên được ủy quyền, không bypass đăng nhập/DRM/anti-bot hay hành động ngoài scope.
- Không ghi token, cookie, PII hoặc nội dung có bản quyền vào log/repo công khai.
- Chạy read-only trước; checkpoint trước thay đổi; backup/rollback khi có dữ liệu.
- Không tự tuyên bố thành công khi chỉ mới chạy tool hoặc có HTTP 200.

## Nguồn tham khảo

- https://docs.github.com/en/actions
- https://agentskills.io/specification
