# Playbook — Data pipelines và scheduler bền vững

> Áp dụng cho công việc có quyền, với đầu ra tái lập được, có bằng chứng kiểm toán.

## 1. Thiết kế job contract

1. Ghi run_id, job_name, trigger time zone, deadline, scope, output artifact, owner và idempotency_key.

2. Tách nguồn, queue, state storage, lease lock, worker và alerting.

3. Định nghĩa SUCCESS, PARTIAL, FAILED, BLOCKED và SKIPPED theo dữ liệu thực.

## 2. Chống chạy trùng

1. Dùng lock với owner, expiry và heartbeat, bỏ qua job khi đã bị lock hợp lệ.

2. Dùng unique business key, transaction và receipt ledger để không tạo side effect trùng khi retries.

3. Thử duplicate webhook, worker crash và concurrent runners; không gọi at-least-once delivery là exactly-once effects.

## 3. Data quality

1. Định nghĩa schema, nullability, uniqueness, amount ranges, timezone và source reconciliation.

2. Delta crawl dùng ETag, Last-Modified hoặc content hash có hạn mức; không coi 403/429 là trang đã bị xóa.

3. Giữ quarantine và last-good checkpoint; không silent drop hoặc ghi đè dữ liệu gốc.

## 4. Observability

1. Dashboard cần p95 latency, error taxonomy, job freshness, backup state và deployment SHA.

2. Nếu RBAC 403, ghi principal/action/resource, BLOCKED và alert; không dùng quyền cao hơn để retry mù.

3. Nghiệm thu khi lock, idempotency, restore, checksum và rollback test đã đạt.

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

Nguồn: https://opentelemetry.io/docs/
