---
name: network-trace-investigation
description: "Phân tích lưu lượng do bạn sở hữu hoặc được cấp phép để truy nguyên timeout, lỗi TLS và API. Chỉ kích hoạt khi người dùng yêu cầu điều tra pcap và network trace."
license: MIT
---

# Điều tra PCAP và network trace

**Chuyên mục:** Reverse Engineering & Forensics  
**Mức độ:** Trung cấp  
**Nguồn:** Tự biên soạn

## Khi nào dùng

Phân tích lưu lượng do bạn sở hữu hoặc được cấp phép để truy nguyên timeout, lỗi TLS và API.

## Đầu vào

- Nhiệm vụ, kết quả đầu ra và phạm vi được phép.
- Hệ thống/tài liệu/source identifiers hoặc môi trường kiểm thử đã xác nhận.
- Tình trạng dữ liệu, người duyệt, thời hạn và tiêu chí nghiệm thu.

## Quy trình

1. Chỉ thu thập trên mạng/cổng/tài khoản có phép; ghi thời điểm, interface, time zone.
2. Lọc capture để giảm PII, session cookie, token và payload người dùng.
3. Phân tích handshake, DNS, HTTP, retries, TCP reset và sequence events.
4. So sánh trace trước/sau lỗi hoặc healthy/failing để chứng minh giả thuyết.
5. Ghi findings với packet index và timestamps; lưu capture gốc có quyền hạn.

## Kết quả

Timeline mạng, root-cause hypotheses, redacted PCAP report.

## Bằng chứng nghiệm thu

- [ ] Không có credential trong report công khai.
- [ ] Có packet reference cho kết luận.
- [ ] Có nguồn, SHA hoặc thời gian cho các trạng thái đã xác minh.
- [ ] Việc chưa xác minh phải được ghi PARTIAL/BLOCKED thay vì PASS.

## Ví dụ yêu cầu

> Áp dụng skill `network-trace-investigation` cho một công việc được phép. Ghi phạm vi, bước thực hiện, bằng chứng, mức rủi ro và điều kiện kết thúc. Không thao tác với production ngoài phạm vi được phê duyệt.

## Giới hạn an toàn

- Chỉ xử lý tài nguyên được ủy quyền, không bypass đăng nhập/DRM/anti-bot hay hành động ngoài scope.
- Không ghi token, cookie, PII hoặc nội dung có bản quyền vào log/repo công khai.
- Chạy read-only trước; checkpoint trước thay đổi; backup/rollback khi có dữ liệu.
- Không tự tuyên bố thành công khi chỉ mới chạy tool hoặc có HTTP 200.

## Nguồn tham khảo

- https://www.wireshark.org/docs/
- https://agentskills.io/specification
