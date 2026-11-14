# Playbook — Reverse engineering và forensics có quyền

> Áp dụng cho công việc có quyền, với đầu ra tái lập được, có bằng chứng kiểm toán.

## 1. Xác định quyền và phạm vi

1. Chỉ phân tích ứng dụng, bản thực thi hoặc capture được chủ sở hữu ủy quyền; ghi giấy phép và mục đích rõ.

2. Chụp SHA-256, file size, nguồn, timestamp và phiên bản công cụ để tạo chain-of-custody.

3. Giữ file gốc read-only, dùng bản sao hoặc máy ảo cô lập; không động tới production.

## 2. Khảo sát tĩnh

1. Kiểm kê PE/ELF headers, imported libraries, entry points và thư viện; không khẳng định file độc hại chỉ vì heuristic.

2. Với JavaScript bundle có quyền, đọc chunks, source maps, route và import graph; không nhầm minified JS với full source.

3. Mỗi kết luận đánh dấu observed, inferred hoặc unknown, liên kết với offset, source line hoặc artifact hash.

## 3. Quan sát động và network

1. Chạy trong VM đã snapshot, tài khoản giả, network scope giới hạn và logging đã lọc thông tin nhạy cảm.

2. Phân tích process tree, file I/O, DNS, TLS, HTTP errors, retry và timeout theo timeline.

3. Phân biệt 403 do authorization với CORS hoặc CSRF; không tự bypass cơ chế hạn chế truy cập.

## 4. Bàn giao và nghiệm thu

1. Tạo static report, behavior map, network timeline, trace đã redacted, VM rollback proof.

2. Có bằng chứng file gốc không bị thay đổi và báo cáo không tiết lộ cookie, credential, PII.

3. Nếu không đủ quyền hoặc tool, kết luận PARTIAL/BLOCKED thay vì tự nhận full source recovered.

## Mẫu báo cáo

- Tên nhiệm vụ và phạm vi được phép
- Source ID, timestamp và SHA artifact
- Phương pháp/công cụ/phiên bản
- Kết quả kiểm thử tích cực và tiêu cực
- Hạn chế, blocker và quyết định PASS/PARTIAL/BLOCKED
- Owner và rollback point

## Tiêu chí nghiệm thu

- [ ] Không ra ngoài scope hoặc tiết lộ bí mật.
- [ ] Mỗi tuyên bố có evidence thực tế.
- [ ] Negative cases được kiểm chứng.
- [ ] Dữ liệu quan trọng có backup và rollback phù hợp.

Nguồn: https://www.wireshark.org/docs/
