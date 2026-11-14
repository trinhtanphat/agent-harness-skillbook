# Playbook — Crawl / Clone ứng dụng có quyền

> Xây dựng ứng dụng độc lập hoặc chuyển đổi hệ thống bạn sở hữu dựa trên khảo sát hợp pháp; tách biệt quyền truy cập và quyền sao chép.

**Workflow:** scope → evidence → controlled execution → independent verification → truthful handoff.

## 1. Quyền, phạm vi và dữ liệu

1. Ghi người/công ty sở hữu; URL, route, tài khoản kiểm thử, hạn mức request, tài sản có quyền, những phần tuyệt đối không được thu thập.

2. Xem robots.txt và Terms of Service. Không vượt đăng nhập, CAPTCHA, paywall, rate limit hoặc bot defense.

3. Chọn dùng mã nguồn có giấy phép, hay clean-room reimplementation từ đặc tả; không lấy thương hiệu, hình ảnh, âm thanh không được cấp phép.

## 2. Khảo sát route × state × viewport

1. Điều tra route công khai và phiên test được phép; lập bảng route, persona, trạng thái, viewport và trường hợp lỗi.

2. Mỗi route ghi screenshot, hành động người dùng, network contract đã lọc token và PII.

3. Đặt coverage = số tổ hợp có bằng chứng / tổng tổ hợp đã nằm trong scope; đừng loại những ô chưa khám phá khỏi mẫu số.

## 3. Tái dựng chức năng và hình ảnh

1. Tạo design tokens, component inventory, responsive breakpoint và keyboard support.

2. Đặc tả method, schema, auth, status, idempotency của API; dùng mock có dữ liệu giả.

3. Với 3D, kiểm chứng WebGL hardware, canvas, animation, camera, lighting và screenshot thay vì chỉ test shader.

## 4. Nghiệm thu và deploy

1. Chạy unit, contract, integration, E2E và visual baseline tại môi trường riêng.

2. Ghi license, checksum SHA-256, render chứng cứ và reviewer cho từng asset; tải được không đồng nghĩa đã duyệt.

3. Giữ rollback, xác minh SHA artifact và runtime production trước khi khẳng định hoàn thành.

## Bàn giao

Route inventory, asset ledger, contract tests, screenshot baseline/diff, release manifest.

## Checklist nghiệm thu

- [ ] Có quyền thực hiện và ranh giới hệ thống rõ ràng.
- [ ] Có log hoặc nguồn cho từng khẳng định về kết quả.
- [ ] Có negative test và kiểm tra sai lệch giả định.
- [ ] Có rollback hoặc phương án khôi phục nếu tác động dữ liệu.
- [ ] Có báo cáo PARTIAL nếu còn bất kỳ bước nào chưa kiểm chứng.

## Nguồn tham khảo

- https://playwright.dev/
- https://learn.chatgpt.com/docs/build-skills
